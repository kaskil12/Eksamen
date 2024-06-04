import ItemDetails from './ItemDetails';

const Item = ({
  item,
  onReturn,
}: {
  item: any;
  onReturn: (id: number) => void;
}) => {
  return (
    <div className="border border-green-900 m-4 p-4 bg-gray-100 text-green-800 rounded-lg shadow-md">
      <ItemDetails item={item} />
      {item.Utlånt === "Ja" && (
        <button
          onClick={() => onReturn(item.number)}
          className="mt-2 p-2 bg-green-500 text-white rounded"
        >
          Lever Inn
        </button>
      )}
    </div>
  );
};

export default Item;
