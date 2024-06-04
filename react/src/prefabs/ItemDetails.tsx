const ItemDetails = ({ item }: { item: any }) => {
    return (
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
    );
  };
  
  export default ItemDetails;
  