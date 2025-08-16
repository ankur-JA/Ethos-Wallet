import BalanceCard from "@/components/BalanceCard";
import NavBar from "@/components/NavBar";
import AssetsCard from "@/components/AssetsCard";
import TransactionCard from "@/components/TransactionCard";
import { useEffect, useState } from "react";
import { generateWalletFromMnemonic } from "@/utils/wallet";

export default function Dashboard() {
    const [address, setAddress] = useState<string>("");

    useEffect(() => {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('wallet_mnemonic') : null;
        if (stored) {
            generateWalletFromMnemonic(stored, 0).then(w => setAddress(w.address)).catch(() => setAddress(""));
        }
    }, []);

    function handleReset() {
        try {
            localStorage.removeItem('wallet_mnemonic');
            localStorage.removeItem('wallet_password_hash');
        } catch {}
        setAddress("");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
            <NavBar/>
            <div className="mx-auto max-w-6xl px-6 py-8 grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="text-sm text-gray-300">Account 1 Address:</div>
                        <div className="truncate rounded-md bg-black/40 px-3 py-1 text-white ring-1 ring-white/10 max-w-[70%]">
                            {address || 'Not set'}
                        </div>
                        <button onClick={handleReset} className="rounded-md bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 hover:bg-white/15">Reset</button>
                    </div>
                    <BalanceCard/>
                    <div className="mt-6">
                        <TransactionCard/>
                    </div>
                </div>
                <div>
                    <AssetsCard/>
                </div>
            </div>
        </div>
    )
}