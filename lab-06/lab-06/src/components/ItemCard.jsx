function ItemCard({ id, title, image, description, rating, author, year, genre, onDelete, onRatingChange }) {
  return (
    <article className="card">
      <img src={image} alt={title} />

      <div className="card-body">
        <h3>{title}</h3>
        <p className="meta">{author} • {year}</p>
        <p className="genre">{genre}</p>
        <p className="description">{description}</p>

        <div className="rating-row">
          <span>Рейтинг: {rating}/5</span>
          <button type="button" onClick={() => onRatingChange(id)}>
            + рейтинг
          </button>
        </div>

        <button className="delete-btn" type="button" onClick={() => onDelete(id)}>
          Видалити
        </button>
      </div>
    </article>
  );
}

export default ItemCard;
