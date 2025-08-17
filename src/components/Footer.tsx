import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full py-6 mt-auto border-t border-purple-500/10 bg-black/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span>Created by</span>
            <span className="font-semibold text-indigo-300">Gearhead</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ankur-JA/Ethos-Wallet"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600/80 to-purple-600/80 px-3 py-2 text-sm font-medium text-white ring-1 ring-indigo-500/30 hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-lg"
            >
              <Github className="h-4 w-4" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-indigo-500/20 text-center">
          <p className="text-xs text-gray-400">
            Ethereum HD Wallet built with React and Next.js using mnemonic-based key generation.
          </p>
        </div>
      </div>
    </footer>
  );
}
