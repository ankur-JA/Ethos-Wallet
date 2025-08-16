import { ArrowDownLeft, ArrowUpRight, Copy, Eye, EyeOff, Plus, Wallet } from 'lucide-react';
import { useState } from 'react';

export default function BalanceCard() {
    const [hidden, setHidden] = useState(false);

    return (
        <div className="min-h-[calc(100vh-56px)] bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
            <div className="mx-auto max-w-6xl px-6 py-8">
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="md:col-span-2 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 shadow-2xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 ring-1 ring-white/20">
                                    <Wallet className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-300">Total Balance</div>
                                    <div className="mt-1 text-3xl font-semibold text-white">
                                        {hidden ? '•••••' : '0.0000 ETH'}
                                    </div>
                                </div>
                            </div>
                            <button className="text-gray-300 hover:text-white" onClick={() => setHidden((v) => !v)}>
                                {hidden ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[--color-accent] px-4 py-2.5 font-semibold text-white shadow hover:opacity-90 transition">
                                <ArrowUpRight className="h-4 w-4" />
                                Send
                            </button>
                            <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 font-semibold text-white ring-1 ring-white/20 hover:bg-white/15 transition">
                                <ArrowDownLeft className="h-4 w-4" />
                                Receive
                            </button>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 shadow-2xl">
                        <div className="flex items-center justify-between">
                            <div className="text-white font-semibold">Accounts</div>
                            <button className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-sm text-white ring-1 ring-white/20 hover:bg-white/15">
                                <Plus className="h-4 w-4" />
                                New
                            </button>
                        </div>
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center justify-between rounded-lg bg-black/40 px-3 py-2 ring-1 ring-white/10">
                                <div>
                                    <div className="text-sm text-white">Account 1</div>
                                    <div className="text-xs text-gray-400">0x0000...0000</div>
                                </div>
                                <button className="text-gray-300 hover:text-white">
                                    <Copy className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 shadow-2xl">
                    <div className="flex items-center justify-between">
                        <div className="text-white font-semibold">Recent Activity</div>
                    </div>
                    <div className="mt-4 text-sm text-gray-300">No recent transactions yet.</div>
                </div>
            </div>
        </div>
    );
}