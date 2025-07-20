export default function HomeCard() {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
            <div className="bg-[#1c1b29] text-white rounded-2xl shadow-xl p-10 text-center w-[400px]">
                <h1 className="text-4xl font-bold mb-4">Ethos Wallet</h1>
                <p className="text-lg text-gray-300 mb-8">
                    A secure, gas-efficient Ethereum wallet.<br />
                    Create or import a wallet to get started.
                </p>
                <div className="flex justify-center space-x-4">
                    <button className="bg-[#5b4ee4] hover:bg-[#6c5ce7] text-white font-semibold py-2 px-6 rounded-lg">
                        Create Wallet
                    </button>
                    <button className="bg-[#4339b3] hover:bg-[#5146d1] text-white font-semibold py-2 px-6 rounded-lg">
                        Import Wallet
                    </button>
                </div>
            </div>
        </div>
    );
}
