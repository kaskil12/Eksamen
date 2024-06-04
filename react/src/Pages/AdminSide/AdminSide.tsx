import { useState, useEffect } from "react";

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

const AdminInventar = () => {
  const [items, setItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/getAll")
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

const InventarListeAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const handleLogin = () => {
    if (username === "admin" && password === "123") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
    } else {
      alert("Incorrect username or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-4 border border-green-900 bg-gray-100 text-green-800 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Admin Login</h2>
          <div>
            <input
              type="text"
              placeholder="Brukernavn"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-2 p-2 border border-green-900 rounded-lg w-full"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Passord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 p-2 border border-green-900 rounded-lg w-full"
            />
          </div>
          <button
            onClick={handleLogin}
            className="p-2 bg-green-500 text-white rounded w-full"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-black text">Admin Side</h1>
        <button
          onClick={handleLogout}
          className="p-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
      <AdminInventar />
    </div>
  );
};

export default InventarListeAdmin;
