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
    try {
      localStorage.setItem('wallet_mnemonic', fullMnemonic);
    } catch {}

    router.push("/dashboard");
  }

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 shadow-2xl">
      <h2 className="text-xl font-semibold text-white text-center">Import Wallet</h2>
      <p className="mt-1 text-sm text-gray-300 text-center">Enter your 12-word recovery phrase in order.</p>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
        {mnemonic.map((word, index) => (
          <label key={index} className="flex items-center gap-2 rounded-lg bg-black/40 px-3 py-2 ring-1 ring-white/10">
            <span className="text-xs text-gray-400 w-4 text-right">{index + 1}</span>
            <input
              type="text"
              placeholder="word"
              value={word}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
            />
          </label>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          className="inline-flex items-center justify-center rounded-lg bg-[--color-accent] px-5 py-2.5 font-semibold text-white shadow hover:opacity-90 transition"
          onClick={handleRoute}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
