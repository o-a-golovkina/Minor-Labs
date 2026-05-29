function Header({ searchQuery, onSearch }) {
  return (
    <header className="header">
      <div>
        <p className="small-text">React + Vite catalog</p>
        <h1>Book Shelf</h1>
      </div>

      <input
        type="text"
        value={searchQuery}
        onChange={(event) => onSearch(event.target.value)}
        placeholder="Пошук книги за назвою..."
      />
    </header>
  );
}

export default Header;
