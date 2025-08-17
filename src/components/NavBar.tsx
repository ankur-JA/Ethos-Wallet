import Link from 'next/link';
import { Lock, RotateCcw, Wallet, Key, Eye, Copy, X } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
// Removed unused imports since we only need account index now

export default function NavBar() {
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [accountIndex, setAccountIndex] = useState<number>(0);
    const [showSecurityModal, setShowSecurityModal] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const onDashboard = router.pathname.startsWith('/dashboard');

    useEffect(() => {
        const syncAccountIndex = () => {
            const idx = Number(localStorage.getItem('wallet_account_index') ?? '0');
            if (Number.isFinite(idx)) setAccountIndex(idx);
        };

        // Initial load
        syncAccountIndex();

        // Listen for localStorage changes (from other tabs/windows)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'wallet_account_index') {
                syncAccountIndex();
            }
        };

        // Listen for account changes within the same tab
        const handleAccountChange = () => {
            syncAccountIndex();
        };

        // Close dropdown when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('account_changed', handleAccountChange);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('account_changed', handleAccountChange);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function handleLock() {
        try { 
            localStorage.setItem('wallet_locked', '1'); 
            sessionStorage.removeItem('wallet_unlocked'); // Clear session unlock flag
        } catch {}
        // notify this tab immediately
        try { window.dispatchEvent(new Event('wallet_lock_change')); } catch {}
        // Force a page refresh to trigger the unlock screen
        window.location.reload();
    }

    function handleReset() {
        if (!confirm('Reset wallet? This will remove the seed phrase from this browser.')) return;
        try {
            localStorage.removeItem('wallet_mnemonic');
            localStorage.removeItem('wallet_mnemonic_enc');
            localStorage.removeItem('wallet_password_hash');
            localStorage.removeItem('wallet_account_index');
            localStorage.removeItem('wallet_locked');
            sessionStorage.removeItem('wallet_unlocked');
        } catch {}
        router.push('/');
    }

    return (
        <div className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/40 border-b border-white/10">
            <div className="mx-auto max-w-6xl px-6">
                <div className="flex h-14 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 ring-1 ring-white/20">
                            <Wallet className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-lg font-semibold tracking-tight text-white">
                            Ethos Wallet
                        </span>
                    </Link>
                    {onDashboard ? (
                        <div className="relative" ref={dropdownRef}>
                            <button onClick={() => setDropdownOpen(v => !v)} className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 hover:bg-white/15">
                                <div className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                                Account {accountIndex + 1}
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-52 rounded-xl bg-[#1a1625] border border-white/20 p-3 shadow-2xl">
                                    <button 
                                        onClick={() => { setShowSecurityModal(true); setDropdownOpen(false); }} 
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-white hover:bg-emerald-500/10 transition-colors group"
                                    >
                                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
                                            <Key className="h-4 w-4 text-emerald-300" />
                                        </div>
                                        <div>
                                            <div className="text-white font-medium">Show Private Keys</div>
                                            <div className="text-xs text-gray-300">View seed & private key</div>
                                        </div>
                                    </button>
                                    <button 
                                        onClick={() => { handleLock(); setDropdownOpen(false); }} 
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-white hover:bg-indigo-500/10 transition-colors group"
                                    >
                                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/20 group-hover:bg-indigo-500/30 transition-colors">
                                            <Lock className="h-4 w-4 text-indigo-300" />
                                        </div>
                                        <div>
                                            <div className="text-white font-medium">Lock Wallet</div>
                                            <div className="text-xs text-gray-300">Secure your wallet</div>
                                        </div>
                                    </button>
                                    <div className="my-2 h-px bg-white/20" />
                                    <button 
                                        onClick={handleReset} 
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-white hover:bg-red-500/10 transition-colors group"
                                    >
                                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/20 group-hover:bg-red-500/30 transition-colors">
                                            <RotateCcw className="h-4 w-4 text-red-300" />
                                        </div>
                                        <div>
                                            <div className="text-red-200 group-hover:text-red-100 font-medium">Reset Wallet</div>
                                            <div className="text-xs text-red-300/80">Remove all data</div>
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="hidden sm:flex items-center gap-2">
                            <Link href="/create-wallet">
                                <button className="rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 hover:opacity-95">Create</button>
                            </Link>
                            <Link href="/import-wallet">
                                <button className="rounded-md bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 hover:bg-white/15">Import</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            {showSecurityModal && typeof window !== 'undefined' && createPortal(
                <SecurityModal onClose={() => setShowSecurityModal(false)} accountIndex={accountIndex} />,
                document.body
            )}
        </div>
    );
}

function SecurityModal({ onClose, accountIndex }: { onClose: () => void; accountIndex: number }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [seedPhrase, setSeedPhrase] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [showSeed, setShowSeed] = useState(false);
    const [showPrivateKey, setShowPrivateKey] = useState(false);

    // Handle escape key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    async function handleAuth() {
        try {
            const storedHash = localStorage.getItem('wallet_password_hash');
            if (!storedHash) {
                setError('No password set');
                return;
            }
            
            const CryptoJS = (await import('crypto-js')).default;
            const hash = CryptoJS.SHA256(password).toString();
            
            if (hash === storedHash) {
                // Get encrypted mnemonic
                const encryptedMnemonic = localStorage.getItem('wallet_mnemonic_enc');
                const plainMnemonic = localStorage.getItem('wallet_mnemonic'); // fallback
                
                let mnemonic = plainMnemonic;
                if (encryptedMnemonic) {
                    mnemonic = CryptoJS.AES.decrypt(encryptedMnemonic, storedHash).toString(CryptoJS.enc.Utf8);
                }
                
                if (mnemonic) {
                    setSeedPhrase(mnemonic);
                    
                    // Generate private key for current account
                    const { Mnemonic, HDNodeWallet } = await import('ethers');
                    const path = `m/44'/60'/0'/0/${accountIndex}`;
                    const hdNode = HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(mnemonic), path);
                    setPrivateKey(hdNode.privateKey);
                    
                    setAuthenticated(true);
                    setError('');
                } else {
                    setError('Failed to decrypt mnemonic');
                }
            } else {
                setError('Incorrect password');
            }
        } catch (e) {
            setError('Authentication failed');
        }
    }

    async function copyToClipboard(text: string, type: string) {
        try {
            await navigator.clipboard.writeText(text);
            alert(`${type} copied to clipboard!`);
        } catch {
            alert(`Failed to copy ${type}`);
        }
    }

    return (
        <div 
            className="fixed top-0 left-0 w-full h-full z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-lg"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
            <div 
                className="w-full max-w-lg mx-4 rounded-2xl bg-gradient-to-br from-[#1a1625] to-[#0f0c29] border border-white/30 p-6 shadow-2xl ring-1 ring-white/10 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 ring-1 ring-emerald-500/30">
                            <Key className="h-5 w-5 text-emerald-300" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-white">Private Keys & Seed</h2>
                            <p className="text-xs text-gray-400">Secure wallet credentials</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {!authenticated ? (
                    <div className="bg-black/20 rounded-xl p-4 ring-1 ring-white/10">
                        <div className="text-center mb-4">
                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/20 mb-3">
                                <Lock className="h-6 w-6 text-indigo-300" />
                            </div>
                            <p className="text-sm text-gray-300">
                                Enter your password to view sensitive information
                            </p>
                        </div>
                        <input
                            type="password"
                            placeholder="Enter wallet password"
                            className="w-full rounded-xl bg-black/40 px-4 py-3 text-white placeholder-gray-500 ring-1 ring-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                        />
                        {error && <div className="text-sm text-red-300 mb-3 text-center">{error}</div>}
                        <button
                            onClick={handleAuth}
                            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-3 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
                        >
                            Authenticate & View
                        </button>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {/* Seed Phrase Section */}
                        <div className="bg-black/20 rounded-xl p-4 ring-1 ring-white/10">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20">
                                        <Key className="h-3 w-3 text-emerald-300" />
                                    </div>
                                    <label className="text-sm font-semibold text-white">Seed Phrase</label>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShowSeed(!showSeed)}
                                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white transition-colors"
                                        title={showSeed ? "Hide seed" : "Show seed"}
                                    >
                                        <Eye className="h-3 w-3" />
                                    </button>
                                    <button
                                        onClick={() => copyToClipboard(seedPhrase, 'Seed phrase')}
                                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white transition-colors"
                                        title="Copy seed phrase"
                                    >
                                        <Copy className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                            <div className="rounded-xl bg-black/40 p-4 ring-1 ring-white/20">
                                <div className="text-sm text-white font-mono break-all leading-relaxed">
                                    {showSeed ? seedPhrase : '•'.repeat(Math.max(seedPhrase.length, 80))}
                                </div>
                            </div>
                        </div>

                        {/* Private Key Section */}
                        <div className="bg-black/20 rounded-xl p-4 ring-1 ring-white/10">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/20">
                                        <Lock className="h-3 w-3 text-purple-300" />
                                    </div>
                                    <label className="text-sm font-semibold text-white">
                                        Private Key (Account {accountIndex + 1})
                                    </label>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShowPrivateKey(!showPrivateKey)}
                                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white transition-colors"
                                        title={showPrivateKey ? "Hide private key" : "Show private key"}
                                    >
                                        <Eye className="h-3 w-3" />
                                    </button>
                                    <button
                                        onClick={() => copyToClipboard(privateKey, 'Private key')}
                                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white transition-colors"
                                        title="Copy private key"
                                    >
                                        <Copy className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                            <div className="rounded-xl bg-black/40 p-4 ring-1 ring-white/20">
                                <div className="text-sm text-white font-mono break-all leading-relaxed">
                                    {showPrivateKey ? privateKey : '•'.repeat(66)}
                                </div>
                            </div>
                        </div>

                        {/* Warning */}
                        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500/20 flex-shrink-0 mt-0.5">
                                    <span className="text-yellow-300 text-xs font-bold">⚠</span>
                                </div>
                                <div className="text-sm text-yellow-200 leading-relaxed">
                                    <strong>Security Warning:</strong> Never share your seed phrase or private key with anyone. 
                                    Anyone with access to these credentials can control your funds permanently.
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
