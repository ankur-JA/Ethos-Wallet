import { useRouter } from "next/router";
import { ArrowLeft } from 'lucide-react';
import { useState } from "react";
import { encryptMnemonic } from '@/utils/wallet';

interface Props {
  onBack?: () => void;
}

export default function InputMnemonicCard({ onBack }: Props) {
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
      const key = localStorage.getItem('wallet_password_hash') || '';
      const enc = encryptMnemonic(fullMnemonic, key);
      localStorage.setItem('wallet_mnemonic_enc', enc);
    } catch {}

    router.push("/dashboard");
  }

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      const words = text.trim().split(/\s+/);
      if (words.length === 12) {
        setMnemonic(words);
      } else {
        alert('Clipboard does not contain 12 words.');
      }
    } catch {
      alert('Unable to read from clipboard.');
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 shadow-2xl">
      <div className="grid grid-cols-3 items-center">
        <div className="justify-self-start">
          <button onClick={() => (onBack ? onBack() : router.replace('/import-wallet'))} className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 hover:bg-white/15">
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
        <div className="justify-self-center text-center">
          <h2 className="text-xl font-semibold text-white">Step 2 — Enter your recovery phrase</h2>
          <p className="mt-1 text-sm text-gray-300">Paste or type your 12 words in order. Keep your phrase private.</p>
        </div>
        <div className="justify-self-end">
          <button onClick={handlePaste} className="rounded-md bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 hover:bg-white/15">Paste from clipboard</button>
        </div>
      </div>

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
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 font-semibold text-white shadow-[0_8px_30px_rgba(99,102,241,0.35)] ring-1 ring-white/20 transition hover:shadow-[0_12px_40px_rgba(99,102,241,0.55)] active:translate-y-px"
          onClick={handleRoute}
        >
          <span>Continue</span>
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  );
}
