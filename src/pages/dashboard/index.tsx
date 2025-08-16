import BalanceCard from "@/components/BalanceCard";
import NavBar from "@/components/NavBar";
import AssetsCard from "@/components/AssetsCard";
import TransactionCard from "@/components/TransactionCard";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
            <NavBar/>
            <div className="mx-auto max-w-6xl px-6 py-8 grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
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