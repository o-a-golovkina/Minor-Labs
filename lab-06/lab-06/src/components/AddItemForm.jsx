import { useState } from 'react';
import { makeId } from '../utils/helpers.js';

const emptyForm = {
  title: '',
  author: '',
  year: '',
  genre: '',
  rating: '3',
  image: '',
  description: ''
};

function AddItemForm({ onAdd }) {
  const [formData, setFormData] = useState(emptyForm);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title.trim()) {
      return;
    }

    const newBook = {
      ...formData,
      id: makeId(),
      year: formData.year || 'Немає даних',
      genre: formData.genre || 'General',
      rating: Number(formData.rating),
      image: formData.image || 'https://placehold.co/220x320?text=Book',
      description: formData.description || 'Опис додано користувачем.'
    };

    onAdd(newBook);
    setFormData(emptyForm);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Назва книги" />
      <input name="author" value={formData.author} onChange={handleChange} placeholder="Автор" />
      <input name="year" value={formData.year} onChange={handleChange} placeholder="Рік" />
      <input name="genre" value={formData.genre} onChange={handleChange} placeholder="Жанр" />
      <input name="image" value={formData.image} onChange={handleChange} placeholder="URL обкладинки" />

      <select name="rating" value={formData.rating} onChange={handleChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Короткий опис"
      />

      <button type="submit">Додати книгу</button>
    </form>
  );
}

export default AddItemForm;
