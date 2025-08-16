import { useRouter } from "next/router";
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface Props {
  mnemonic: string;
  onBack?: () => void;
}

export default function MnemonicCard({ mnemonic, onBack }: Props) {
    const router = useRouter();
    const words = mnemonic.split(" ");

    function handleRoute() {
        try {
            localStorage.setItem('wallet_mnemonic', mnemonic);
        } catch {}
        router.push('/dashboard');
    }

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(mnemonic);
            alert('Recovery phrase copied to clipboard. Store it offline and do not share.');
        } catch (e) {
            alert('Unable to copy. You can select and copy manually.');
        }
    }

    function handleBack() {
        if (onBack) {
            onBack();
        } else {
            router.push('/create-wallet');
        }
    }

    return (
        <div className="w-full max-w-3xl mx-auto rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 shadow-2xl">
            <div className="grid grid-cols-3 items-center">
                <div className="justify-self-start">
                    <button onClick={handleBack} className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 hover:bg-white/15">
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </button>
                </div>
                <div className="justify-self-center text-center">
                    <h2 className="text-xl font-semibold text-white">Your Recovery Phrase</h2>
                    <p className="mt-1 text-sm text-gray-300">Write these 12 words down and keep them offline. Do not share with anyone.</p>
                </div>
                <div className="justify-self-end">
                    <button onClick={handleCopy} className="rounded-md bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 hover:bg-white/15">Copy phrase</button>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
                {words.map((word: string, index: number) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 rounded-lg bg-black/40 px-3 py-2 ring-1 ring-white/10 text-white"
                    >
                        <span className="text-xs text-gray-400 w-4 text-right">{index + 1}</span>
                        <span className="font-medium">{word}</span>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-center">
                <button
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 font-semibold text-white shadow-[0_8px_30px_rgba(99,102,241,0.35)] ring-1 ring-white/20 transition hover:shadow-[0_12px_40px_rgba(99,102,241,0.55)] active:translate-y-px"
                    onClick={handleRoute}
                >
                    <span>Continue</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
            </div>
        </div>
    );
}
