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
            <div className="mx-auto max-w-6xl px-6 py-10 flex items-start justify-center">
                {!inputMnemonic ? (
                    <CreatePasswordCard onContinue={handleContinue}/>
                ): (
                    <InputMnemonicCard />
                )}
            </div>
        </div>
    )
}