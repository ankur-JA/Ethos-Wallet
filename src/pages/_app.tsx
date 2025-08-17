import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CryptoJS from 'crypto-js';
import Footer from '@/components/Footer';

export default function App({ Component, pageProps }: AppProps) {
  const [unlocked, setUnlocked] = useState(false); // Default to locked
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkWalletState = async () => {
      if (typeof window === 'undefined') {
        setIsLoading(false);
        return;
      }
      
      try {
        // If this navigation is a full page reload, clear the session unlock flag
        try {
          const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
          const isReload = (navEntries && navEntries[0] && navEntries[0].type === 'reload') || (performance as any)?.navigation?.type === 1;
          if (isReload) {
            sessionStorage.removeItem('wallet_unlocked');
          }
        } catch {}

        // Wait a bit to ensure localStorage is ready
        await new Promise(resolve => setTimeout(resolve, 50));
        
        // Check for wallet data in localStorage
        const encryptedMnemonic = localStorage.getItem('wallet_mnemonic_enc');
        const plainMnemonic = localStorage.getItem('wallet_mnemonic');
        const passwordHash = localStorage.getItem('wallet_password_hash');
        
        console.log('Checking wallet data:', {
          encryptedMnemonic: encryptedMnemonic ? 'EXISTS' : 'NULL',
          plainMnemonic: plainMnemonic ? 'EXISTS' : 'NULL', 
          passwordHash: passwordHash ? 'EXISTS' : 'NULL'
        });

        // Migrate plaintext to encrypted if needed
        if (plainMnemonic && !encryptedMnemonic && passwordHash) {
          console.log('Migrating plaintext mnemonic to encrypted');
          const { encryptMnemonic } = await import('@/utils/wallet');
          const encrypted = encryptMnemonic(plainMnemonic, passwordHash);
          localStorage.setItem('wallet_mnemonic_enc', encrypted);
          localStorage.removeItem('wallet_mnemonic');
        }

        // Determine if wallet exists
        const hasWalletData = (encryptedMnemonic || plainMnemonic) && passwordHash;
        
        console.log('Wallet exists:', hasWalletData);

        if (hasWalletData) {
          // Wallet exists - check unlock status
          const sessionUnlocked = sessionStorage.getItem('wallet_unlocked') === '1';
          const explicitlyLocked = localStorage.getItem('wallet_locked') === '1';
          
          console.log('Session unlocked:', sessionUnlocked, 'Explicitly locked:', explicitlyLocked);
          
          if (sessionUnlocked && !explicitlyLocked) {
            console.log('→ Showing dashboard (unlocked)');
            setUnlocked(true);
          } else {
            console.log('→ Showing unlock page (locked)');
            setUnlocked(false);
          }
        } else {
          // No wallet - allow public routes
          console.log('→ No wallet found, showing public routes');
          setUnlocked(true);
          
          // Redirect to home if on protected route
          const publicRoutes = ['/', '/create-wallet', '/import-wallet', '/about'];
          if (!publicRoutes.includes(router.pathname)) {
            console.log('Redirecting to home from protected route');
            router.replace('/');
          }
        }
      } catch (error) {
        console.error('Error in checkWalletState:', error);
        setUnlocked(true); // Fallback to unlocked on error
      } finally {
        setIsLoading(false);
      }
    };

    checkWalletState();

    // Listen for storage changes
    const handleStorageChange = () => {
      checkWalletState();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('wallet_lock_change', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wallet_lock_change', handleStorageChange);
    };
  }, [router.pathname]);

  // Show loading spinner while checking wallet state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-sm rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 text-white">
            <h1 className="text-xl font-semibold text-center">Wallet Locked</h1>
            <p className="mt-1 text-sm text-gray-300 text-center">Enter your password to unlock.</p>
            <UnlockForm onUnlock={() => {
              setUnlocked(true);
              router.replace('/dashboard');
            }} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

function UnlockForm({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isUnlocking, setIsUnlocking] = useState(false);

  async function handleUnlock() {
    if (isUnlocking) return;
    
    setIsUnlocking(true);
    setError("");

    try {
      const storedHash = localStorage.getItem('wallet_password_hash');
      if (!storedHash) {
        setError('No password found');
        return;
      }

      const inputHash = CryptoJS.SHA256(password).toString();
      
      if (inputHash === storedHash) {
        // Password correct - unlock wallet
        localStorage.removeItem('wallet_locked');
        sessionStorage.setItem('wallet_unlocked', '1');
        
        // Trigger the unlock callback
        onUnlock();
      } else {
        setError('Incorrect password');
      }
    } catch (error) {
      console.error('Unlock error:', error);
      setError('Failed to unlock wallet');
    } finally {
      setIsUnlocking(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isUnlocking) {
      handleUnlock();
    }
  };

  return (
    <div className="mt-4">
      <input
        type="password"
        placeholder="Enter your password"
        className="w-full rounded-lg bg-black/40 px-3 py-2 text-white placeholder-gray-500 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isUnlocking}
      />
      {error && <div className="mt-2 text-sm text-red-300">{error}</div>}
      <button 
        onClick={handleUnlock} 
        disabled={isUnlocking || !password}
        className="mt-3 w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-white font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUnlocking ? 'Unlocking...' : 'Unlock Wallet'}
      </button>
    </div>
  );
}

