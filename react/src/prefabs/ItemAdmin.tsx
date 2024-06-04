const Item = ({
  item,
  onReturn,
}: {
  item: any;
  onReturn: (id: number) => void;
}) => {
  return (
    <div className="border border-green-900 m-4 p-4 bg-gray-100 text-green-800 rounded-lg shadow-md">
      <div className="font-sans shadow-md bg-gray-100">
        <h2 className="text-xl font-bold mb-4">Produsent</h2>
        <p>
          <strong className="font-bold">Produsent:</strong> {item.Produsent}
        </p>
        <h3 className="text-lg font-bold mt-6 mb-4">Beskrivelse</h3>
        <p>{item.Beskrivelse}</p>
        <h3 className="text-lg font-bold mt-6 mb-4">Spesifikasjoner</h3>
        <p>{item.Spesifikasjoner}</p>
        <h3 className="text-lg font-bold mt-6 mb-4">Kjøpsinformasjon</h3>
        <p>
          <strong className="font-bold">Kjøpsdato:</strong> {item.Innkjopsdato}
        </p>
        <p>
          <strong className="font-bold">Kjøpspris:</strong> {item.Innkjopspris}
        </p>
        <p>
          <strong className="font-bold">Forventet levetid:</strong>{" "}
          {item.ForventetLevetid}
        </p>
        <h3 className="text-lg font-bold mt-6 mb-4">Kategori & Utlånsstatus</h3>
        <p>
          <strong className="font-bold">Kategori:</strong> {item.Kategori}
        </p>
        <p>
          <strong className="font-bold">Utlånt:</strong> {item.Utlånt}
        </p>
        <p>
          <strong className="font-bold">Lånt av:</strong> {item.Lånt_av}
        </p>
        <p>
          <strong className="font-bold">Mobil:</strong> {item.Mobil}
        </p>
      </div>
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
