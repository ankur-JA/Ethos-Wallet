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
    }
    return (
        <>
            <div>
                <NavBar/>
            </div>
            <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center">
                {!inputMnemonic ? (
                    <CreatePasswordCard onContinue={handleContinue}/>
                ): (
                    <InputMnemonicCard />
                )}
                
            </div>
        </>
    )
}