import NavBar from "@/components/NavBar";
import CreatePasswordCard from "@/components/CreatePassword";
import hashPassword from "@/utils/hash";
import { useState } from "react";
import InputMnemonicCard from "@/components/InputMnemonicCard";

export default function CreateWalletPage() {
    const [inputMnemonic, setInputMnemonic] = useState(false);
    function handleContinue(password: string) {
        const hashedPassword = hashPassword(password);
        localStorage.setItem('wallet_password_hash', hashedPassword);
        setInputMnemonic(true);
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
            <NavBar/>
            <div className="mx-auto max-w-6xl px-6 py-10">
                <div className="mx-auto mb-6 max-w-md text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white">
                        <span className="inline-block h-2 w-2 rounded-full bg-indigo-400"></span>
                        Import Wallet
                    </div>
                    <h1 className="mt-3 text-2xl font-semibold text-white">Step 1 — Create a password</h1>
                    <p className="mt-1 text-sm text-gray-300">Enter a password for local access, then provide your 12-word recovery phrase.</p>
                </div>
                <div className="min-h-[calc(100vh-96px)] flex items-start justify-center pt-8 md:pt-12">
                    {!inputMnemonic ? (
                        <CreatePasswordCard onContinue={handleContinue}/>
                    ): (
                        <InputMnemonicCard onBack={() => setInputMnemonic(false)} />
                    )}
                </div>
            </div>
        </div>
    )
}