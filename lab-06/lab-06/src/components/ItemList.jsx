import ItemCard from './ItemCard.jsx';

function ItemList({ items, onDelete, onRatingChange }) {
  return (
    <div className="grid">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          {...item}
          onDelete={onDelete}
          onRatingChange={onRatingChange}
        />
      ))}
    </div>
  );
}

export default ItemList;
