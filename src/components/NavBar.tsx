import Link from 'next/link';
import { Wallet } from 'lucide-react';

export default function NavBar() {
    return (
        <div className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/40 border-b border-white/10">
            <div className="mx-auto max-w-6xl px-6">
                <div className="flex h-14 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 ring-1 ring-white/20">
                            <Wallet className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-lg font-semibold tracking-tight text-white">
                            Ethos Wallet
                        </span>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                        <Link href="/create-wallet">
                            <button className="rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 hover:opacity-95">Create</button>
                        </Link>
                        <Link href="/import-wallet">
                            <button className="rounded-md bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 hover:bg-white/15">Import</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
