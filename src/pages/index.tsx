import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import NavBar from "@/components/NavBar";
import HomeCard from "@/components/HomeCard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",           
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",           
});


export default function Home() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]`}>
      <Head>
        <title>Ethos Wallet — Secure, Gas‑Optimized Ethereum Wallet</title>
        <meta name="description" content="Ethos Wallet is a secure, non-custodial Ethereum wallet with gas‑optimized flows. Create or import a wallet in seconds." />
        <meta property="og:title" content="Ethos Wallet" />
        <meta property="og:description" content="Secure, non-custodial, gas‑optimized Ethereum wallet." />
      </Head>
      <NavBar />
      <HomeCard />
    </div>
  );
}
