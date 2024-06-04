import InventoryList from "../../prefabs/InventoryListHjem";

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
