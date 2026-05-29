import { useEffect, useState } from 'react';
import Header from './Header.jsx';
import Filter from './Filter.jsx';
import ItemList from './ItemList.jsx';
import AddItemForm from './AddItemForm.jsx';
import Section from './Section.jsx';
import { getBooks } from '../services/api.js';
import { filterBooks } from '../utils/helpers.js';

function App() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('default');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadBooks() {
      setIsLoading(true);
      setError(null);

      try {
        const books = await getBooks(controller.signal);
        setItems(books);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadBooks();

    return () => controller.abort();
  }, []);

  const visibleItems = filterBooks(items, searchQuery, filter);

  function handleAdd(book) {
    setItems((prev) => [book, ...prev]);
  }

  function handleDelete(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleRatingChange(id) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, rating: item.rating === 5 ? 1 : item.rating + 1 }
          : item
      )
    );
  }

  return (
    <div className="page">
      <Header searchQuery={searchQuery} onSearch={setSearchQuery} />

      <main>
        <Section title="Додати книгу">
          <AddItemForm onAdd={handleAdd} />
        </Section>

        <Section title="Каталог">
          <Filter filter={filter} onFilterChange={setFilter} />

          {isLoading && <p className="info">Завантаження...</p>}
          {error && <p className="error">Помилка: {error}</p>}
          {!isLoading && !error && visibleItems.length === 0 && (
            <p className="info">Нічого не знайдено</p>
          )}
          {!isLoading && !error && visibleItems.length > 0 && (
            <ItemList
              items={visibleItems}
              onDelete={handleDelete}
              onRatingChange={handleRatingChange}
            />
          )}
        </Section>
      </main>
    </div>
  );
}

export default App;
