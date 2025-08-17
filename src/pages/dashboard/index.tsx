import BalanceCard from "@/components/BalanceCard";
import NavBar from "@/components/NavBar";
import AssetsCard from "@/components/AssetsCard";
import { motion } from "framer-motion";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
            <NavBar/>
            <motion.div 
                className="mx-auto max-w-7xl px-6 py-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="grid gap-6 lg:grid-cols-4">
                    <motion.div 
                        className="lg:col-span-3 space-y-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <BalanceCard/>
                    </motion.div>
                    <motion.div 
                        className="space-y-6"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <AssetsCard/>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}