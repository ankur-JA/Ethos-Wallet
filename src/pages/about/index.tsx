import Head from 'next/head';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { Wallet, Shield, Key, RotateCcw, Lock, Unlock, Plus, Download, Eye, Copy, ArrowRight, AlertTriangle } from 'lucide-react';

export default function About() {
  return (
    <>
      <Head>
        <title>About - Ethos Wallet</title>
        <meta name="description" content="Learn how to use Ethos Wallet - create, import, manage, and secure your Ethereum wallet" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
        <NavBar />
        
        <div className="mx-auto max-w-4xl px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 ring-1 ring-white/20 mb-6">
              <Wallet className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">About Ethos Wallet</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A secure, non-custodial Ethereum wallet built with modern web technologies. 
              Your keys, your crypto, your control.
            </p>
          </div>

          {/* Getting Started */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3">
              <ArrowRight className="h-6 w-6 text-indigo-400" />
              Getting Started
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Create Wallet */}
              <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/20 ring-1 ring-green-500/30">
                    <Plus className="h-5 w-5 text-green-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Create New Wallet</h3>
                </div>
                <div className="space-y-3 text-gray-300">
                  <p><strong className="text-white">Step 1:</strong> Click "Create Wallet" on the home page</p>
                  <p><strong className="text-white">Step 2:</strong> Set a strong password (used to encrypt your wallet locally)</p>
                  <p><strong className="text-white">Step 3:</strong> Write down your 12-word seed phrase securely</p>
                  <p><strong className="text-white">Step 4:</strong> Confirm your seed phrase by entering the words</p>
                  <p><strong className="text-white">Result:</strong> Access your new wallet dashboard</p>
                </div>
              </div>

              {/* Import Wallet */}
              <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 ring-1 ring-blue-500/30">
                    <Download className="h-5 w-5 text-blue-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Import Existing Wallet</h3>
                </div>
                <div className="space-y-3 text-gray-300">
                  <p><strong className="text-white">Step 1:</strong> Click "Import Wallet" on the home page</p>
                  <p><strong className="text-white">Step 2:</strong> Set a password for this device</p>
                  <p><strong className="text-white">Step 3:</strong> Enter your existing 12-word seed phrase</p>
                  <p><strong className="text-white">Step 4:</strong> Wallet validates and imports your accounts</p>
                  <p><strong className="text-white">Result:</strong> Access your imported wallet with full history</p>
                </div>
              </div>
            </div>
          </section>

          {/* Wallet Security */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3">
              <Shield className="h-6 w-6 text-indigo-400" />
              Wallet Security Features
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Lock Wallet */}
              <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 ring-1 ring-indigo-500/30">
                    <Lock className="h-5 w-5 text-indigo-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Lock Wallet</h3>
                </div>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p><strong className="text-white">How:</strong> Account dropdown → "Lock Wallet"</p>
                  <p><strong className="text-white">Effect:</strong> Immediately locks access to wallet</p>
                  <p><strong className="text-white">Security:</strong> Requires password to unlock</p>
                  <p><strong className="text-white">Auto-lock:</strong> Locks automatically on browser refresh</p>
                </div>
              </div>

              {/* Unlock Wallet */}
              <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 ring-1 ring-emerald-500/30">
                    <Unlock className="h-5 w-5 text-emerald-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Unlock Wallet</h3>
                </div>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p><strong className="text-white">When:</strong> Appears when wallet is locked</p>
                  <p><strong className="text-white">Process:</strong> Enter your wallet password</p>
                  <p><strong className="text-white">Access:</strong> Unlocks until browser refresh</p>
                  <p><strong className="text-white">Security:</strong> Password validates against stored hash</p>
                </div>
              </div>

              {/* View Private Keys */}
              <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 ring-1 ring-purple-500/30">
                    <Key className="h-5 w-5 text-purple-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Private Keys</h3>
                </div>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p><strong className="text-white">Access:</strong> Account dropdown → "Show Private Keys"</p>
                  <p><strong className="text-white">Security:</strong> Requires password authentication</p>
                  <p><strong className="text-white">View:</strong> Shows seed phrase & current account private key</p>
                  <p><strong className="text-white">Copy:</strong> One-click copy with show/hide toggles</p>
                </div>
              </div>
            </div>
          </section>

          {/* Dashboard Features */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3">
              <Wallet className="h-6 w-6 text-indigo-400" />
              Dashboard Features
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Balance & Assets */}
              <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Balance & Assets</h3>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p>• <strong className="text-white">Real-time balances:</strong> ETH and ERC-20 tokens</p>
                  <p>• <strong className="text-white">Price data:</strong> Live prices from CoinGecko API</p>
                  <p>• <strong className="text-white">Portfolio value:</strong> Total USD value calculation</p>
                  <p>• <strong className="text-white">Token icons:</strong> Visual token identification</p>
                  <p>• <strong className="text-white">24h changes:</strong> Price movement indicators</p>
                </div>
              </div>

              {/* Send & Receive */}
              <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Send & Receive</h3>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p>• <strong className="text-white">Send ETH:</strong> Native Ethereum transfers</p>
                  <p>• <strong className="text-white">Send tokens:</strong> ERC-20 token transfers</p>
                  <p>• <strong className="text-white">Receive:</strong> QR code for your address</p>
                  <p>• <strong className="text-white">Address validation:</strong> Prevents invalid sends</p>
                  <p>• <strong className="text-white">Gas estimation:</strong> Automatic fee calculation</p>
                </div>
              </div>

              {/* Multi-Account */}
              <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Multi-Account Support</h3>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p>• <strong className="text-white">HD derivation:</strong> Multiple accounts from one seed</p>
                  <p>• <strong className="text-white">Account switching:</strong> Easy account navigation</p>
                  <p>• <strong className="text-white">Individual balances:</strong> Each account tracked separately</p>
                  <p>• <strong className="text-white">Standard paths:</strong> Compatible with other wallets</p>
                </div>
              </div>

              {/* Transaction History */}
              <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Transaction History</h3>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p>• <strong className="text-white">Recent activity:</strong> Latest transactions displayed</p>
                  <p>• <strong className="text-white">Transaction details:</strong> Amount, gas, timestamps</p>
                  <p>• <strong className="text-white">Status tracking:</strong> Success/failure indicators</p>
                  <p>• <strong className="text-white">Etherscan links:</strong> View on blockchain explorer</p>
                </div>
              </div>
            </div>
          </section>

          {/* Reset Wallet Warning */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              Reset Wallet
            </h2>
            
            <div className="rounded-2xl bg-red-500/10 p-6 ring-1 ring-red-500/30 border border-red-500/20">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20 ring-1 ring-red-500/30 flex-shrink-0">
                  <RotateCcw className="h-5 w-5 text-red-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-200 mb-3">⚠️ Permanent Action</h3>
                  <div className="space-y-2 text-red-100 text-sm">
                    <p><strong className="text-red-200">Access:</strong> Account dropdown → "Reset Wallet"</p>
                    <p><strong className="text-red-200">Confirmation:</strong> Requires explicit user confirmation</p>
                    <p><strong className="text-red-200">What gets deleted:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Encrypted seed phrase</li>
                      <li>• Password hash</li>
                      <li>• Account preferences</li>
                      <li>• All local wallet data</li>
                    </ul>
                    <p><strong className="text-red-200">Result:</strong> Returns to home page - wallet must be recreated or imported</p>
                    <p><strong className="text-red-200">Recovery:</strong> Only possible with your original seed phrase</p>
                  </div>
                  <div className="mt-4 p-3 bg-red-900/30 rounded-lg">
                    <p className="text-red-200 font-semibold text-sm">
                      💡 Make sure you have your seed phrase backed up before resetting!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Details */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-8">Technical Details</h2>
            
            <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Security</h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p>• <strong className="text-white">Local storage:</strong> All data stored in your browser</p>
                    <p>• <strong className="text-white">Encryption:</strong> AES encryption for seed phrases</p>
                    <p>• <strong className="text-white">Password hashing:</strong> SHA256 for password verification</p>
                    <p>• <strong className="text-white">No servers:</strong> Fully client-side application</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Technology</h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p>• <strong className="text-white">Framework:</strong> Next.js with TypeScript</p>
                    <p>• <strong className="text-white">Blockchain:</strong> Ethers.js for Ethereum interaction</p>
                    <p>• <strong className="text-white">Mnemonics:</strong> BIP39 standard implementation</p>
                    <p>• <strong className="text-white">HD wallets:</strong> BIP44 derivation paths</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center">
            <div className="rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-8 ring-1 ring-indigo-500/20">
              <h3 className="text-2xl font-semibold text-white mb-4">Ready to get started?</h3>
              <p className="text-gray-300 mb-6">
                Create your secure Ethereum wallet in minutes or import an existing one.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/create-wallet">
                  <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg">
                    <Plus className="h-5 w-5" />
                    Create New Wallet
                  </button>
                </Link>
                <Link href="/import-wallet">
                  <button className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-white font-semibold ring-1 ring-white/20 hover:bg-white/15 transition-colors">
                    <Download className="h-5 w-5" />
                    Import Existing Wallet
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
