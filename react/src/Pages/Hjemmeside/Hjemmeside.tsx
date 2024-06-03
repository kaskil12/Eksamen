import { useState, useEffect } from 'react';

const Item = ({ item, onLoanOut, onReturn }: { item: any, onLoanOut: (id: number, name: string) => void, onReturn: (id: number) => void }) => {
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
      <p><strong>Lånt av:</strong> {item.Lånt_av}</p>
      {item.Utlånt === 'Nei' ? (
        <button
          onClick={() => {
            console.log(item)
            const name = prompt('Enter your name:');
            if (name) {
              onLoanOut(item.number, name);
            }
          }}
          className="mt-2 p-2 bg-green-500 text-white rounded"
        >
          Lån ut
        </button>
      ) : (
        <button
          onClick={() => onReturn(item.number)}
          className="mt-2 p-2 bg-red-500 text-white rounded"
        >
          Innlever
        </button>
      )}
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

  const handleLoanOut = (id: any, name: any) => {
    fetch(`http://localhost:3000/loanOut/${encodeURIComponent(id)}/${encodeURIComponent(name)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())  
      .then(() => {
        setItems(prevItems =>
          prevItems.map(item => item.id === id ? { ...item, Utlånt: 'Ja', Lånt_av: name } : item)
        );
      })
      .catch(error => console.error('An error occurred:', error));
  };

  const handleReturn = (id: any) => {
    fetch(`http://localhost:3000/returnDevice/${encodeURIComponent(id)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(() => {
        setItems(prevItems =>
          prevItems.map(item => item.id === id ? { ...item, Utlånt: 'Nei', Lånt_av: 'Tom' } : item)
        );
      })
      .catch(error => console.error('An error occurred:', error));
  };

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
          <Item key={index} item={item} onLoanOut={handleLoanOut} onReturn={handleReturn} />
        ))}
      </div>
    </div>
  );
};

const InventarListe = () => {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-white mb-4">Inventar List</h1>
      <InventoryList />
    </div>
  );
};

export default InventarListe;
