import NavBar from "@/components/NavBar";
import CreatePasswordCard from "@/components/CreatePassword";
import hashPassword from "@/utils/hash";
import {useRouter} from "next/router";
import { useState } from "react";
import MnemonicCard from "@/components/MnemonicCard";
import { generateMnemonic } from "bip39";

export default function CreateWalletPage() {
    const [showMnemonic, setShowMnemonic] = useState(false);
    const [mnemonic, setMnemonic] = useState("");

    function handleContinue(password: string) {
        const hashedPassword = hashPassword(password);
        localStorage.setItem('wallet_password_hash', hashedPassword);
        const newMnemonic = generateMnemonic();
        setMnemonic(newMnemonic);
        setShowMnemonic(true);
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
            <NavBar/>
            <div className="mx-auto max-w-6xl px-6 py-10">
                <div className="mx-auto mb-6 max-w-2xl text-center">
                    {!showMnemonic ? (
                        <>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white">
                                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
                                Create Wallet
                            </div>
                            <h1 className="mt-3 text-2xl font-semibold text-white">Step 1 — Create a password</h1>
                            <p className="mt-1 text-sm text-gray-300">This password protects local access to your wallet on this device.</p>
                        </>
                    ) : (
                        <>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white">
                                <span className="inline-block h-2 w-2 rounded-full bg-indigo-400"></span>
                                Create Wallet
                            </div>
                            <h1 className="mt-3 text-2xl font-semibold text-white">Step 2 — Your recovery phrase</h1>
                            <p className="mt-1 text-sm text-gray-300">Copy your 12 words and store them offline. Do not share with anyone. Anyone with this phrase can access your funds.</p>
                        </>
                    )}
                </div>
                <div className="min-h-[calc(100vh-96px)] flex items-start justify-center pt-8 md:pt-12">
                    {!showMnemonic ? (
                        <CreatePasswordCard onContinue={handleContinue}/>
                    ): (
                        <MnemonicCard mnemonic={mnemonic} onBack={() => setShowMnemonic(false)} />
                    )}
                </div>
            </div>
        </div>
    )
}