export function filterBooks(books, searchText, filterValue) {
  let result = books.filter((book) =>
    book.title.toLowerCase().includes(searchText.toLowerCase().trim())
  );

  if (filterValue === 'rating') {
    result = [...result].sort((a, b) => b.rating - a.rating);
  }

  if (filterValue === 'year') {
    result = [...result].sort((a, b) => Number(b.year) - Number(a.year));
  }

  if (filterValue === 'title') {
    result = [...result].sort((a, b) => a.title.localeCompare(b.title));
  }

  return result;
}

export function makeId() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
}
