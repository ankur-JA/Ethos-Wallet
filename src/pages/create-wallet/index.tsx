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
                <div className="min-h-[calc(100vh-96px)] flex items-center justify-center">
                    {!showMnemonic ? (
                        <CreatePasswordCard onContinue={handleContinue}/>
                    ): (
                        <MnemonicCard mnemonic={mnemonic}/>
                    )}
                </div>
            </div>
        </div>
    )
}