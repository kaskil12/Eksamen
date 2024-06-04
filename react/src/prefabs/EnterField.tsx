import { useState } from "react";

interface EnterFieldProps {
  onConfirm: (name: string, mobilnummer: string) => void;
  onCancel: () => void;
}

export function EnterField({ onConfirm, onCancel }: EnterFieldProps) {
  const [name, setName] = useState("");
  const [mobilnummer, setMobilnummer] = useState("");

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-md text-center w-full max-w-md border border-green-500">
          <h1 className="text-xl mb-4 font-bold text-slate-500">
            Skriv inn navn og mobilnummer
          </h1>
          <input
            type="text"
            placeholder="Navn"
            className="border border-gray-300 px-4 py-2 rounded-md mb-4 w-full"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="text"
            placeholder="Mobilnummer"
            className="border border-gray-300 px-4 py-2 rounded-md mb-4 w-full"
            value={mobilnummer}
            onChange={(event) => setMobilnummer(event.target.value)}
          />
          <div className="flex justify-center space-x-4">
            <button
              className="bg-red-500 px-4 py-2 rounded-md text-white"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-500 px-4 py-2 rounded-md text-white font-semibold"
              onClick={() => onConfirm(name, mobilnummer)}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
