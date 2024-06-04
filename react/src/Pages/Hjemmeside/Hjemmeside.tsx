import { useState, useEffect } from "react";
import { EnterField } from "../../prefabs/EnterField";
const Item = ({
  item,
  onLoanOut,
  onReturn,
}: {
  item: any;
  onLoanOut: (id: number, name: string, mobilNummer: string) => void;
  onReturn: (id: number) => void;
}) => {
  const [showEnterField, setShowEnterField] = useState(false);
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
      </div>

      {item.Utlånt === "Nei" ? (
        showEnterField ? (
          <EnterField
            onConfirm={(name, mobilnummer) => {
              console.log(name, mobilnummer);
              if (name && mobilnummer) {
                onLoanOut(item.number, name, mobilnummer);
                setShowEnterField(false);
              }
            }}
            onCancel={() => setShowEnterField(false)}
          />
        ) : (
          <button
            onClick={() => setShowEnterField(true)}
            className="mt-2 p-2 bg-red-500 text-white rounded"
          >
            Utlån
          </button>
        )
      ) : (
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

const InventoryList = () => {
  const [items, setItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/getAll")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("An error occurred:", error));
  }, []);

  const filteredItems = items.filter((item) =>
    item.Beskrivelse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoanOut = (id: any, name: any, mobilnummer: any) => {
    fetch(
      `http://localhost:3000/loanOut/${encodeURIComponent(
        id
      )}/${encodeURIComponent(name)}/${encodeURIComponent(mobilnummer)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then(() => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, Utlånt: "Ja", Lånt_av: name } : item
          )
        );
        window.location.reload();
      })
      .catch((error) => console.error("An error occurred:", error));
  };

  const handleReturn = (id: any) => {
    fetch(`http://localhost:3000/returnDevice/${encodeURIComponent(id)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, Utlånt: "Nei", Lånt_av: "Tom" } : item
          )
        );
        window.location.reload();
      })
      .catch((error) => console.error("An error occurred:", error));
  };

  return (
    <div>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="w-full p-2 mb-4 border border-green-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 max-w-xl"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item, index) => (
          <Item
            key={index}
            item={item}
            onLoanOut={handleLoanOut}
            onReturn={handleReturn}
          />
        ))}
      </div>
    </div>
  );
};

const InventarListe = () => {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-black mb-4 text-center">
        Inventar List
      </h1>
      <InventoryList />
    </div>
  );
};

export default InventarListe;
