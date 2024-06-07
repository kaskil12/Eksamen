import { useState, useEffect } from "react";
import Item from "./ItemAdmin";

const AdminInventoryList = () => {
  const [items, setItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://10.0.0.155/getAll")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("An error occurred:", error));
  }, []);

  const filteredItems = items.filter(
    (item) =>
      item.Mobil.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Lånt_av.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Beskrivelse.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          placeholder="Søk..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="w-full p-2 mb-4 border border-green-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 max-w-xl"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item, index) => (
          <Item key={index} item={item} onReturn={handleReturn} />
        ))}
      </div>
    </div>
  );
};

export default AdminInventoryList;
