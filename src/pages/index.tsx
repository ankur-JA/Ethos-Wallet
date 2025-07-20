import { Geist, Geist_Mono } from "next/font/google";
import HomeCard from "@/components/HomeCard";
import CreatePasswordCard from "@/components/CreatePassword";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <HomeCard/>
    </>
  );
}
