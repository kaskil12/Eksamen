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
      <div className="fixed top-96 botton-0 left-[30rem] right-0 w-[50rem]">
        <div className="bg-white px-16 py-14 rounded-md text-center">
          <h1 className="text-xl mb-4 font-bold text-slate-500">
            Skriv inn navn og mobilNummer
          </h1>
          <input
            type="text"
            placeholder="Navn"
            className="border border-gray-300 px-4 py-2 rounded-md mb-4"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="text"
            placeholder="Mobilnummer"
            className="border border-gray-300 px-4 py-2 rounded-md mb-4"
            value={mobilnummer}
            onChange={(event) => setMobilnummer(event.target.value)}
          />
          <button
            className="bg-red-500 px-4 py-2 rounded-md text-md text-white min-w-[5rem]"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
            onClick={() => onConfirm(name, mobilnummer)}
          >
            Ok
          </button>
        </div>
      </div>
    </>
  );
}
