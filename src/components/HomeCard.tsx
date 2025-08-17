import Link from 'next/link';
import Image from 'next/image';
import { Shield, Zap, Wallet, ArrowRight, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomeCard() {
    return (
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
                        New: Gas-optimized flows
                    </span>
                    <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-white">
                        Ethos Wallet
                    </h1>
                    <p className="mt-4 text-lg leading-relaxed text-gray-300">
                        A secure, non-custodial Ethereum wallet designed for speed and minimal gas usage.
                        Create a new wallet or import an existing one to get started.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Link href="/create-wallet">
                            <button className="relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 font-semibold text-white shadow-[0_8px_30px_rgba(99,102,241,0.35)] ring-1 ring-white/20 transition hover:shadow-[0_12px_40px_rgba(99,102,241,0.55)] active:translate-y-px">
                                <span>Create Wallet</span>
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </Link>
                        <Link href="/import-wallet">
                            <button className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/15 active:translate-y-px">
                                <LogIn className="h-4 w-4" />
                                <span>Import Wallet</span>
                            </button>
                        </Link>
                    </div>

                    <ul className="mt-8 space-y-3 text-sm text-gray-300">
                        <li className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-indigo-300" />
                            Non-custodial — your keys never leave your device
                        </li>
                        <li className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-indigo-300" />
                            Gas-efficient transactions and snappy UX
                        </li>
                        <li className="flex items-center gap-2">
                            <Wallet className="h-4 w-4 text-indigo-300" />
                            Multiple accounts via standard derivation paths
                        </li>
                    </ul>
                </motion.div>

                <motion.div className="relative" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                    <div className="absolute -inset-10 -z-10 opacity-40 blur-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 [mask-image:radial-gradient(closest-side,white,transparent)]" />
                    <div className="relative overflow-hidden rounded-2xl bg-white/5 p-1 ring-1 ring-white/10 shadow-2xl">
                        <Image
                            src="/image.png"
                            alt="Ethos Wallet preview"
                            width={900}
                            height={700}
                            priority
                            className="h-auto w-full rounded-xl object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10" />
                    </div>
                </motion.div>
            </div>

            <motion.div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } } }}>
                {[{
                    title: 'Non‑custodial',
                    desc: 'You own your keys. They never leave your device.'
                },{
                    title: 'Gas‑optimized',
                    desc: 'Smart defaults to keep on-chain costs lower.'
                },{
                    title: 'Multi‑account',
                    desc: 'Derive multiple addresses from one seed.'
                },{
                    title: 'Open & auditable',
                    desc: 'Clean codebase you can inspect and trust.'
                }].map((f) => (
                    <motion.div key={f.title} className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10 text-white" variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}>
                        <div className="text-sm font-semibold">{f.title}</div>
                        <div className="mt-1 text-sm text-gray-300">{f.desc}</div>
                    </motion.div>
                ))}
            </motion.div>

            <div className="mt-16">
                <h2 className="text-center text-white text-xl font-semibold">How it works</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {[{
                        step: '1',
                        title: 'Create a password',
                        desc: 'Protect local access to your wallet.'
                    },{
                        step: '2',
                        title: 'Secure your phrase',
                        desc: 'Write down 12 words shown only once.'
                    },{
                        step: '3',
                        title: 'Start transacting',
                        desc: 'Send, receive, and manage assets.'
                    }].map((s) => (
                        <motion.div key={s.step} className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <div className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[--color-accent] text-white text-sm font-semibold">{s.step}</div>
                            <div className="mt-3 text-white font-medium">{s.title}</div>
                            <div className="text-sm text-gray-300">{s.desc}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.div className="mt-20 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <div className="grid md:grid-cols-3 gap-6 items-center">
                    <div className="md:col-span-2 text-white">
                        <h3 className="text-lg font-semibold">Why Ethos?</h3>
                        <p className="mt-2 text-sm text-gray-300">
                            Built for privacy and performance. Your seed phrase stays encrypted in your browser, accounts derive via standard HD paths, and you can lock the wallet at any time. Bring your own RPC for maximum control.
                        </p>
                    </div>
                    <div className="text-right">
                        <Link href="/create-wallet">
                            <button className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 font-semibold text-white ring-1 ring-white/20">Create Wallet</button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
