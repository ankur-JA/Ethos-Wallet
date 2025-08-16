import { useState } from "react";
import { Eye, EyeOff, Shield } from 'lucide-react';

interface Props {
  onContinue: (password: string) => void;
}

export default function CreatePasswordCard({ onContinue }: Props) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const isValid = password.length >= 6 && password === confirmPassword;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = () => {
    if (password === confirmPassword && password.length >= 6) {
      onContinue(password);
    } else {
      alert("Passwords don't match or are too short");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 shadow-2xl">
      <div className="flex items-center justify-center gap-2">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[--color-accent] ring-1 ring-white/20">
          <Shield className="h-4 w-4 text-white" />
        </div>
        <h1 className="text-2xl font-semibold text-white text-center">Create Password</h1>
      </div>
      <p className="mt-1 text-sm text-gray-300 text-center">Set a password to secure your wallet.</p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm text-gray-300">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="At least 6 characters"
              className="w-full rounded-lg bg-black/40 pr-10 px-3 py-2 text-white placeholder-gray-500 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
            />
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-2 my-auto inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-300 hover:text-white"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-300">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Re-enter password"
              className="w-full rounded-lg bg-black/40 pr-10 px-3 py-2 text-white placeholder-gray-500 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              aria-label="Confirm password"
            />
            <button
              type="button"
              aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute inset-y-0 right-2 my-auto inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-300 hover:text-white"
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="text-xs">
          <div className={`mt-1 ${password.length >= 6 ? 'text-emerald-300' : 'text-red-300'}`}>
            {password.length >= 6 ? '✓ Meets minimum length' : '• At least 6 characters required'}
          </div>
          <div className={`mt-1 ${confirmPassword && password === confirmPassword ? 'text-emerald-300' : confirmPassword ? 'text-red-300' : 'text-gray-400'}`}>
            {confirmPassword ? (password === confirmPassword ? '✓ Passwords match' : '• Passwords do not match') : '• Confirm your password'}
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isValid}
        className="mt-6 w-full inline-flex items-center justify-center rounded-lg bg-[--color-accent] px-4 py-2.5 font-semibold text-white shadow disabled:cursor-not-allowed disabled:opacity-60 hover:opacity-90 transition"
      >
        Continue
      </button>
    </div>
  );
};


