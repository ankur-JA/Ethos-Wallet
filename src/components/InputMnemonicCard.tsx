import { useRouter } from "next/router";
import { useState } from "react";

export default function InputMnemonicCard() {
  const [mnemonic, setMnemonic] = useState<string[]>(Array(12).fill("")); // 12 empty words
  const router = useRouter();

  function handleChange(index: number, value: string) {
    const updated = [...mnemonic];
    updated[index] = value;
    setMnemonic(updated);
  }

  function handleRoute() {
    // Optional: validate all fields filled
    if (mnemonic.some((word) => word.trim() === "")) {
      alert("Please fill in all 12 mnemonic words.");
      return;
    }

    // Optional: join and store in localStorage, etc.
    const fullMnemonic = mnemonic.join(" ");
    console.log("Mnemonic:", fullMnemonic);

    router.push("/dashboard");
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-[#1e1b2e] p-9 rounded-xl shadow-lg">
        <div className="grid grid-cols-3 gap-4">
          {mnemonic.map((word, index) => (
            <div
              key={index}
              className="bg-white text-gray-800 font-medium border border-gray-300 rounded-xl px-4 py-2 shadow text-center"
            >
              <span className="text-sm text-gray-500 mr-1">{index + 1}.</span>
              <input
                type="text"
                placeholder="word"
                value={word}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-full focus:outline-none"
              />
            </div>
          ))}
          <div className="col-span-3 mt-4 flex justify-center">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition"
              onClick={handleRoute}
            >
              Let's Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
