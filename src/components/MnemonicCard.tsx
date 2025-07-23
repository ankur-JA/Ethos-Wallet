import { useRouter } from "next/router";

interface Props {
  mnemonic: string;
}

export default function MnemonicCard({ mnemonic }: Props) {
    const router = useRouter();
    const words = mnemonic.split(" ");

    function handleRoute() {
        router.push('/dashboard');
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
        <div className="bg-[#1e1b2e] p-9 rounded-xl shadow-lg">
            <div className="grid grid-cols-3 gap-4">
            {words.map((word: string, index: number) => (
                <div
                key={index}
                className="bg-white text-gray-800 font-medium border border-gray-300 rounded-xl px-4 py-2 shadow text-center"
                >
                <span className="text-sm text-gray-500 mr-1">{index + 1}.</span>
                {word}
                </div>
            ))}
            <div className="col-span-3 mt-4 flex justify-center">
                <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition"
                onClick={handleRoute}
                >
                Let's Go
                </button>
            </div>
            </div>
        </div>
        </div>
    );
}
