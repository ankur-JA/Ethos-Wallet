import { ArrowDownLeft, ArrowUpRight, Copy, Eye, EyeOff, Plus, Wallet, TrendingUp, Activity } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { decryptMnemonic, deriveAddressesFromMnemonic, getBalance, sendNative } from '@/utils/wallet';
import QRCode from 'react-qr-code';
import { motion, AnimatePresence } from 'framer-motion';

type Activity = { id: string; type: 'send' | 'receive'; amount: string; toFrom: string; hash?: string; time: string };

export default function BalanceCard() {
    const [hidden, setHidden] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [addresses, setAddresses] = useState<{ index: number; address: string; privateKey: string }[]>([]);
    const [balance, setBalance] = useState<string>('0');
    const [showSend, setShowSend] = useState(false);
    const [showReceive, setShowReceive] = useState(false);
    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [activity, setActivity] = useState<Activity[]>([]);

    const current = useMemo(() => addresses.find(a => a.index === selectedIndex), [addresses, selectedIndex]);

    useEffect(() => {
        const cipher = typeof window !== 'undefined' ? localStorage.getItem('wallet_mnemonic_enc') : null;
        const key = typeof window !== 'undefined' ? localStorage.getItem('wallet_password_hash') || '' : '';
        const mnemonic = cipher ? decryptMnemonic(cipher, key) : null;
        if (!mnemonic) return;
        const addrs = deriveAddressesFromMnemonic(mnemonic, 5);
        setAddresses(addrs);
        const savedIndex = Number(localStorage.getItem('wallet_account_index') ?? '0');
        const indexToUse = Number.isFinite(savedIndex) && savedIndex >= 0 && savedIndex < addrs.length ? savedIndex : 0;
        setSelectedIndex(indexToUse);
        getBalance(addrs[indexToUse].address).then(setBalance).catch(() => setBalance('0'));
    }, []);

    useEffect(() => {
        if (!current) return;
        getBalance(current.address).then(setBalance).catch(() => setBalance('0'));
    }, [current?.address]);

    return (
        <>
        <div className="space-y-6">
            {/* Main Balance Card */}
            <motion.div 
                className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-6 ring-1 ring-white/10 shadow-2xl backdrop-blur-sm"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <motion.div 
                            className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 ring-2 ring-white/20"
                            whileHover={{ rotate: 5 }}
                        >
                            <Wallet className="h-6 w-6 text-white" />
                        </motion.div>
                        <div>
                            <div className="text-sm text-gray-300">Portfolio Balance</div>
                            <AnimatePresence mode="wait">
                                <motion.div 
                                    key={hidden ? 'hidden' : balance}
                                    className="mt-1 text-4xl font-bold text-white"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {hidden ? '•••••••' : `${Number(balance).toFixed(4)} ETH`}
                                </motion.div>
                            </AnimatePresence>
                            <div className="text-xs text-gray-400 mt-1">≈ $0.00 USD</div>
                        </div>
                    </div>
                    <motion.button 
                        className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors" 
                        onClick={() => setHidden((v) => !v)}
                        whileTap={{ scale: 0.95 }}
                    >
                        {hidden ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </motion.button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <motion.button 
                        onClick={() => setShowSend(true)} 
                        className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg ring-1 ring-white/20 transition-all hover:shadow-xl"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="relative flex items-center justify-center gap-2">
                            <ArrowUpRight className="h-4 w-4" />
                            Send
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                    <motion.button 
                        onClick={() => setShowReceive(true)} 
                        className="group relative overflow-hidden rounded-xl bg-white/10 px-6 py-3 font-semibold text-white ring-1 ring-white/30 backdrop-blur transition-all hover:bg-white/15"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="relative flex items-center justify-center gap-2">
                            <ArrowDownLeft className="h-4 w-4" />
                            Receive
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                </div>

                {/* Account Selector */}
                <div className="rounded-xl bg-black/20 p-4 ring-1 ring-white/10">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-white font-medium">
                            <TrendingUp className="h-4 w-4" />
                            Active Account
                        </div>
                        <motion.button 
                            onClick={() => setAddresses(prev => [
                                ...prev,
                                ...(() => {
                                    const cipher = localStorage.getItem('wallet_mnemonic_enc');
                                    const key = localStorage.getItem('wallet_password_hash') || '';
                                    const mnemonic = cipher ? decryptMnemonic(cipher, key) : null;
                                    if (!mnemonic) return [] as any[];
                                    const nextIndex = prev.length;
                                    return deriveAddressesFromMnemonic(mnemonic, nextIndex + 1).slice(-1);
                                })()
                            ])} 
                            className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/20 hover:bg-white/15 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Plus className="h-3 w-3" />
                            Add
                        </motion.button>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                        {addresses.map(({ index, address }) => (
                            <motion.button 
                                key={index} 
                                onClick={() => { 
                                    setSelectedIndex(index); 
                                    localStorage.setItem('wallet_account_index', String(index));
                                    // Notify other components about the account change
                                    window.dispatchEvent(new Event('account_changed'));
                                }} 
                                className={`w-full flex items-center justify-between rounded-lg px-3 py-2 ring-1 ring-white/10 transition-all ${
                                    selectedIndex === index ? 'bg-white/20 ring-white/30' : 'bg-white/5 hover:bg-white/10'
                                }`}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="text-left">
                                    <div className="text-sm font-medium text-white">Account {index + 1}</div>
                                    <div className="text-xs text-gray-400 font-mono">{address.slice(0, 8)}...{address.slice(-6)}</div>
                                </div>
                                <motion.button 
                                    type="button" 
                                    onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(address); }} 
                                    className="text-gray-300 hover:text-white p-1 rounded transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Copy className="h-3 w-3" />
                                </motion.button>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Activity Card */}
            <motion.div 
                className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-6 ring-1 ring-white/10 shadow-2xl backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="flex items-center gap-2 mb-4">
                    <Activity className="h-5 w-5 text-indigo-300" />
                    <div className="text-white font-semibold">Recent Activity</div>
                </div>
                <div className="space-y-3">
                    <AnimatePresence>
                        {activity.length === 0 ? (
                            <motion.div 
                                className="text-center py-8 text-gray-400"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                <div className="text-sm">No transactions yet</div>
                                <div className="text-xs mt-1">Your activity will appear here</div>
                            </motion.div>
                        ) : activity.map((a, i) => (
                            <motion.div 
                                key={a.id} 
                                className="flex items-center justify-between rounded-xl bg-black/20 px-4 py-3 ring-1 ring-white/10 hover:bg-black/30 transition-colors"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                                whileHover={{ scale: 1.01 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
                                        a.type === 'send' ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'
                                    }`}>
                                        {a.type === 'send' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-white">{a.type === 'send' ? 'Sent' : 'Received'}</div>
                                        <div className="text-xs text-gray-400">{a.toFrom}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-sm font-medium ${a.type === 'send' ? 'text-red-300' : 'text-green-300'}`}>
                                        {a.amount}
                                    </div>
                                    {a.hash && (
                                        <a 
                                            target="_blank" 
                                            rel="noreferrer" 
                                            href={`https://etherscan.io/tx/${a.hash}`} 
                                            className="text-xs text-indigo-300 hover:text-indigo-200 hover:underline transition-colors"
                                        >
                                            View
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
        {showSend && current && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                <div className="w-full max-w-md rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                    <div className="text-white font-semibold mb-4">Send</div>
                    <label className="block text-sm text-gray-300">To address</label>
                    <input value={toAddress} onChange={e => setToAddress(e.target.value)} className="mt-1 w-full rounded-md bg-black/40 px-3 py-2 text-white ring-1 ring-white/10 focus:outline-none" placeholder="0x..." />
                    <label className="mt-3 block text-sm text-gray-300">Amount (ETH)</label>
                    <input value={amount} onChange={e => setAmount(e.target.value)} className="mt-1 w-full rounded-md bg-black/40 px-3 py-2 text-white ring-1 ring-white/10 focus:outline-none" placeholder="0.01" />
                    <div className="mt-4 flex justify-end gap-2">
                        <button onClick={() => setShowSend(false)} className="rounded-md bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/20 hover:bg-white/15">Cancel</button>
                        <button disabled={loading} onClick={async () => {
                            const mnemonic = localStorage.getItem('wallet_mnemonic');
                            if (!mnemonic || !current) return;
                            try {
                                setLoading(true);
                                const hash = await sendNative(mnemonic, current.index, toAddress, amount);
                                setActivity(prev => [{ id: hash, type: 'send', amount: `${amount} ETH`, toFrom: `to ${toAddress}`, hash, time: new Date().toISOString() }, ...prev]);
                                setShowSend(false);
                                setToAddress(''); setAmount('');
                                getBalance(current.address).then(setBalance).catch(() => {});
                            } catch (e) {
                                alert('Transaction failed');
                            } finally {
                                setLoading(false);
                            }
                        }} className="rounded-md bg-[--color-accent] px-4 py-1.5 text-sm text-white hover:opacity-90">{loading ? 'Sending...' : 'Send'}</button>
                    </div>
                </div>
            </div>
        )}
        {showReceive && current && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                <div className="w-full max-w-md rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                    <div className="text-white font-semibold mb-4">Receive</div>
                    <div className="flex justify-center bg-white p-3 rounded-lg"><QRCode value={current.address} /></div>
                    <div className="mt-3 text-center text-sm text-gray-300 break-all">{current.address}</div>
                    <div className="mt-4 flex justify-end gap-2">
                        <button onClick={() => setShowReceive(false)} className="rounded-md bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/20 hover:bg-white/15">Close</button>
                        <button onClick={() => navigator.clipboard.writeText(current.address)} className="rounded-md bg-[--color-accent] px-4 py-1.5 text-sm text-white hover:opacity-90">Copy</button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}