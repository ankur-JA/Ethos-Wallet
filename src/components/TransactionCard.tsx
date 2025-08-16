import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

type Tx = {
    id: string;
    type: 'send' | 'receive';
    toFrom: string;
    amount: string;
    time: string;
};

const mockTxs: Tx[] = [
    { id: '1', type: 'send', toFrom: '0x1234...abcd', amount: '-0.01 ETH', time: '2h ago' },
    { id: '2', type: 'receive', toFrom: '0xabcd...1234', amount: '+0.05 ETH', time: '1d ago' },
];

export default function TransactionCard() {
    return (
        <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 shadow-2xl">
            <div className="text-white font-semibold">Transactions</div>
            <div className="mt-4 divide-y divide-white/10">
                {mockTxs.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                            <div className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${tx.type === 'send' ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
                                {tx.type === 'send' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
                            </div>
                            <div>
                                <div className="text-sm text-white">{tx.type === 'send' ? 'Sent' : 'Received'}</div>
                                <div className="text-xs text-gray-400">{tx.toFrom}</div>
                            </div>
                        </div>
                        <div className={`text-sm font-medium ${tx.type === 'send' ? 'text-red-300' : 'text-green-300'}`}>{tx.amount}</div>
                        <div className="text-xs text-gray-400">{tx.time}</div>
                    </div>
                ))}
                {mockTxs.length === 0 && (
                    <div className="py-6 text-center text-sm text-gray-300">No transactions yet.</div>
                )}
            </div>
        </div>
    );
}