import { useRouter } from "next/router";

interface Props {
  mnemonic: string;
}

export default function MnemonicCard({ mnemonic }: Props) {
    const router = useRouter();
    const words = mnemonic.split(" ");

    function handleRoute() {
        try {
            localStorage.setItem('wallet_mnemonic', mnemonic);
        } catch {}
        router.push('/dashboard');
    }

    return (
        <div className="w-full max-w-3xl mx-auto rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 shadow-2xl">
            <h2 className="text-xl font-semibold text-white text-center">Your Recovery Phrase</h2>
            <p className="mt-1 text-sm text-gray-300 text-center">Write these 12 words down and keep them offline. Do not share with anyone.</p>

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
                    className="inline-flex items-center justify-center rounded-lg bg-[--color-accent] px-5 py-2.5 font-semibold text-white shadow hover:opacity-90 transition"
                    onClick={handleRoute}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
