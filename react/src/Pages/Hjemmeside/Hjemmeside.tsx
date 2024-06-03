import { useState, useEffect } from 'react';

const Item = ({ item }: { item: any }) => {
  return (
    <div className="border border-green-500 m-4 p-4 bg-white text-green-800 rounded-lg shadow-md">
      <p><strong>Produsent:</strong> {item.Produsent}</p>
      <p><strong>Beskrivelse:</strong> {item.Beskrivelse}</p>
      <p><strong>Spesifikasjoner:</strong> {item.Spesifikasjoner}</p>
      <p><strong>Innkjøpsdato:</strong> {item.Innkjopsdato}</p>
      <p><strong>Innkjøpspris:</strong> {item.Innkjopspris}</p>
      <p><strong>Forventet Levetid:</strong> {item.ForventetLevetid}</p>
      <p><strong>Kategori:</strong> {item.Kategori}</p>
      <p><strong>Utlånt:</strong> {item.Utlånt}</p>
    </div>
  );
};

const InventoryList = () => {
  const [items, setItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/getAll')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('An error occurred:', error));
  }, []);

  const filteredItems = items.filter(item =>
    item.Produsent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
        className="w-full p-2 mb-4 border border-green-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

const InventarListe = () => {
  return (
    <div className=" min-h-screen p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-4">Inventory List</h1>
      <InventoryList />
    </div>
  );
};

export default InventarListe;
