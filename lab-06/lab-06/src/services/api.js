const API_URL = 'https://openlibrary.org/search.json?q=javascript&limit=12';

export async function getBooks(signal) {
  const response = await fetch(API_URL, { signal });

  if (!response.ok) {
    throw new Error('Не вдалося завантажити книги');
  }

  const data = await response.json();

  return data.docs.map((book) => ({
    id: book.key,
    title: book.title || 'Без назви',
    author: book.author_name ? book.author_name[0] : 'Невідомий автор',
    year: book.first_publish_year || 'Немає даних',
    genre: book.subject ? book.subject[0] : 'General',
    rating: Math.floor(Math.random() * 5) + 1,
    image: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : 'https://placehold.co/220x320?text=No+Cover',
    description: book.first_sentence ? book.first_sentence[0] : 'Короткий опис відсутній.'
  }));
}
