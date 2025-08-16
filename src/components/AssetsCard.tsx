import Image from 'next/image';

type Asset = {
    symbol: string;
    name: string;
    icon: string;
    balance: string;
    fiat: string;
};

const mockAssets: Asset[] = [
    { symbol: 'ETH', name: 'Ethereum', icon: '/image.png', balance: '0.0000', fiat: '$0.00' },
    { symbol: 'USDC', name: 'USD Coin', icon: '/image.png', balance: '0.00', fiat: '$0.00' },
    { symbol: 'DAI', name: 'DAI', icon: '/image.png', balance: '0.00', fiat: '$0.00' },
];

export default function AssetsCard() {
    return (
        <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 shadow-2xl">
            <div className="flex items-center justify-between">
                <div className="text-white font-semibold">Assets</div>
                <button className="rounded-md bg-white/10 px-3 py-1 text-sm text-white ring-1 ring-white/20 hover:bg-white/15 transition">Add</button>
            </div>

            <div className="mt-4 divide-y divide-white/10">
                {mockAssets.map((asset) => (
                    <div key={asset.symbol} className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 overflow-hidden rounded-full ring-1 ring-white/20">
                                <Image src={asset.icon} alt={asset.name} width={36} height={36} className="h-full w-full object-cover" />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-white">{asset.symbol}</div>
                                <div className="text-xs text-gray-400">{asset.name}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-medium text-white">{asset.balance}</div>
                            <div className="text-xs text-gray-400">{asset.fiat}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}