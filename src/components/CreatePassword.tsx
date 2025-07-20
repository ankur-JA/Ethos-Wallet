import React from 'react';

interface Props {
  onContinue: (password: string) => void;
}

const CreatePasswordCard: React.FC<Props> = ({ onContinue }) => {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleSubmit = () => {
    if (password === confirmPassword && password.length >= 6) {
      onContinue(password);
    } else {
      alert("Passwords don't match or are too short");
    }
  };

  return (
    <div className="bg-[#1e1b2e] text-white rounded-xl shadow-lg p-8 w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-center">Create Wallet</h1>
      <p className="text-sm text-gray-300 mb-6 text-center">
        Set a password to secure your wallet.
      </p>

      <input
        type="password"
        placeholder="Create Password"
        className="w-full mb-4 p-3 bg-[#13121a] rounded-md text-white placeholder-gray-500 focus:outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full mb-6 p-3 bg-[#13121a] rounded-md text-white placeholder-gray-500 focus:outline-none"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
      >
        Continue
      </button>
    </div>
  );
};

export default CreatePasswordCard;
