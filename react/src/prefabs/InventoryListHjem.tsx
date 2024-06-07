import { useState, useEffect } from "react";
import Item from "./ItemHjem";

const InventoryListHjem = () => {
  const [items, setItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://10.0.0.155/getAll")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("An error occurred:", error));
  }, []);

  const filteredItems = items.filter((item) =>
    item.Beskrivelse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoanOut = (id: any, name: any, mobilnummer: any) => {
    fetch(
      `http://10.0.0.155/loanOut/${encodeURIComponent(
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
    fetch(`http://10.0.0.155/returnDevice/${encodeURIComponent(id)}`, {
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

export default InventoryListHjem;
