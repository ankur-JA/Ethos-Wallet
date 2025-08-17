import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, TrendingUp, Coins, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Contract, formatUnits } from 'ethers';
import { getWorkingProvider } from '@/utils/wallet';

type Asset = {
    symbol: string;
    name: string;
    contractAddress?: string;
    balance: string;
    fiat: string;
    change?: string;
    price?: number;
    decimals: number;
    logoURI?: string;
};

// ERC-20 ABI for balance and token info
const ERC20_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
    "function name() view returns (string)"
];

// Popular tokens on Ethereum mainnet
const DEFAULT_TOKENS: Omit<Asset, 'balance' | 'fiat' | 'change' | 'price'>[] = [
    {
        symbol: 'ETH',
        name: 'Ethereum',
        decimals: 18,
        logoURI: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
    },
    {
        symbol: 'USDC',
        name: 'USD Coin',
        contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        decimals: 6,
        logoURI: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png'
    },
    {
        symbol: 'USDT',
        name: 'Tether USD',
        contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        decimals: 6,
        logoURI: 'https://cryptologos.cc/logos/tether-usdt-logo.png'
    },
    {
        symbol: 'DAI',
        name: 'Dai Stablecoin',
        contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        decimals: 18,
        logoURI: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png'
    }
];

export default function AssetsCard() {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);
    const [userAddress, setUserAddress] = useState<string>('');
    const [totalPortfolioValue, setTotalPortfolioValue] = useState<number>(0);
    const [refreshKey, setRefreshKey] = useState(0);

    // Get current user address
    useEffect(() => {
        const getAddress = async () => {
            try {
                const encryptedMnemonic = localStorage.getItem('wallet_mnemonic_enc');
                const plainMnemonic = localStorage.getItem('wallet_mnemonic');
                const passwordHash = localStorage.getItem('wallet_password_hash') || '';
                const accountIndex = parseInt(localStorage.getItem('wallet_account_index') || '0', 10);

                let mnemonic = plainMnemonic;
                if (encryptedMnemonic && passwordHash) {
                    const { decryptMnemonic } = await import('@/utils/wallet');
                    mnemonic = decryptMnemonic(encryptedMnemonic, passwordHash) || '';
                }

                if (mnemonic) {
                    const { generateWalletFromMnemonic } = await import('@/utils/wallet');
                    const wallet = await generateWalletFromMnemonic(mnemonic, accountIndex);
                    setUserAddress(wallet.address);
                }
            } catch (error) {
                console.error('Failed to get user address:', error);
            }
        };
        getAddress();
    }, []);

    // Fetch token balances and prices
    useEffect(() => {
        if (!userAddress) return;

        const fetchAssets = async () => {
            setLoading(true);
            try {
                const provider = await getWorkingProvider();
                const assetsWithBalances: Asset[] = [];

                // Fetch prices from CoinGecko
                const priceResponse = await fetch(
                    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,usd-coin,tether,dai&vs_currencies=usd&include_24hr_change=true'
                );
                const prices = priceResponse.ok ? await priceResponse.json() : {};

                for (const token of DEFAULT_TOKENS) {
                    try {
                        let balance = '0.00';

                        if (token.symbol === 'ETH') {
                            const ethBalance = await provider.getBalance(userAddress);
                            balance = Number(formatUnits(ethBalance, token.decimals)).toFixed(4);
                        } else if (token.contractAddress) {
                            const contract = new Contract(token.contractAddress, ERC20_ABI, provider);
                            const tokenBalance = await contract.balanceOf(userAddress);
                            balance = Number(formatUnits(tokenBalance, token.decimals)).toFixed(token.decimals === 6 ? 2 : 4);
                        }

                        const coinGeckoId = token.symbol.toLowerCase() === 'eth' ? 'ethereum' :
                                          token.symbol.toLowerCase() === 'usdc' ? 'usd-coin' :
                                          token.symbol.toLowerCase() === 'usdt' ? 'tether' :
                                          token.symbol.toLowerCase() === 'dai' ? 'dai' : null;

                        const price = coinGeckoId && prices[coinGeckoId] ? prices[coinGeckoId].usd : 0;
                        const change24h = coinGeckoId && prices[coinGeckoId] ? prices[coinGeckoId].usd_24h_change : 0;
                        const fiatValue = parseFloat(balance) * price;

                        const asset: Asset = {
                            ...token,
                            balance: balance,
                            fiat: `$${fiatValue.toFixed(2)}`,
                            change: change24h ? `${change24h > 0 ? '+' : ''}${change24h.toFixed(2)}%` : '0.00%',
                            price: price
                        };

                        if (parseFloat(balance) > 0 || token.symbol === 'ETH') {
                            assetsWithBalances.push(asset);
                        }
                    } catch (error) {
                        console.error(`Failed to fetch balance for ${token.symbol}:`, error);
                        assetsWithBalances.push({
                            ...token,
                            balance: '0.00',
                            fiat: '$0.00',
                            change: '0.00%',
                            price: 0
                        });
                    }
                }

                const total = assetsWithBalances.reduce((sum, asset) => sum + parseFloat(asset.fiat.replace('$', '')), 0);
                setAssets(assetsWithBalances);
                setTotalPortfolioValue(total);
            } catch (error) {
                console.error('Failed to fetch assets:', error);
                setAssets([]);
                setTotalPortfolioValue(0);
            } finally {
                setLoading(false);
            }
        };

        fetchAssets();
    }, [userAddress, refreshKey]);

    const refreshAssets = () => {
        setRefreshKey((k) => k + 1);
    };

    return (
        <motion.div 
            className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-6 ring-1 ring-white/10 shadow-2xl backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-indigo-300" />
                    <div className="text-white font-semibold">Assets</div>
                </div>
                <div className="flex items-center gap-2">
                    <motion.button 
                        onClick={refreshAssets}
                        className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2 py-1.5 text-sm text-white ring-1 ring-white/20 hover:bg-white/15 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95, rotate: 180 }}
                        disabled={loading}
                    >
                        <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
                    </motion.button>
                    <motion.button 
                        className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/20 hover:bg-white/15 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Plus className="h-3 w-3" />
                        Add
                    </motion.button>
                </div>
            </div>

            <div className="space-y-3">
                {loading ? (
                    <div className="text-center py-8 text-gray-400">
                        <RefreshCw className="h-6 w-6 mx-auto mb-2 animate-spin" />
                        <div className="text-sm">Loading assets...</div>
                    </div>
                ) : assets.length > 0 ? (
                    assets.map((asset, i) => (
                        <motion.div 
                            key={asset.symbol} 
                            className="flex items-center justify-between rounded-xl bg-black/20 p-3 ring-1 ring-white/10 hover:bg-black/30 transition-colors cursor-pointer"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center gap-3">
                                <motion.div 
                                    className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/20 bg-white/10 flex items-center justify-center"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    {asset.logoURI ? (
                                        <Image 
                                            src={asset.logoURI} 
                                            alt={asset.name} 
                                            width={40} 
                                            height={40} 
                                            className="h-full w-full object-cover rounded-full"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <span className="text-white font-semibold text-sm">{asset.symbol.slice(0, 2)}</span>
                                    )}
                                </motion.div>
                                <div>
                                    <div className="text-sm font-semibold text-white">{asset.symbol}</div>
                                    <div className="text-xs text-gray-400">{asset.name}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-semibold text-white">{asset.balance}</div>
                                <div className="flex items-center gap-1 text-xs">
                                    <span className="text-gray-400">{asset.fiat}</span>
                                    <span className={`${asset.change?.startsWith('+') ? 'text-emerald-300' : asset.change?.startsWith('-') ? 'text-red-300' : 'text-gray-400'}`}>
                                        {asset.change}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <motion.div 
                        className="text-center py-8 text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <Coins className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <div className="text-sm">No tokens with balance found</div>
                        <div className="text-xs mt-1">Your assets will appear here</div>
                    </motion.div>
                )}
            </div>

            <motion.div 
                className="mt-4 pt-4 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Total Portfolio</span>
                    <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-emerald-300" />
                        <span className="text-white font-medium">
                            ${totalPortfolioValue.toFixed(2)}
                        </span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}