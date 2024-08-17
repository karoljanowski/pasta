import Header from "@/components/Header";
import HeroButtons from "@/components/HeroButtons";
import HeroImage from "@/components/HeroImage";
import { ParalaxContainer } from "@/components/ParalaxText";
import Image from "next/image";
import Slider from "@/components/Slider";


export default async function Home() {

  const items = [
    <div className="w-20 h-20 text-white flex justify-center items-center rounded-full border bg-red-500">
      1
    </div>,
    <div className="w-20 h-20 text-white flex justify-center items-center rounded-full border bg-green-500">
      2
    </div>,
    <div className="w-20 h-20 text-white flex justify-center items-center rounded-full border bg-yellow-500">
      3
    </div>,
    <div className="w-20 h-20 text-white flex justify-center items-center rounded-full border border-black">
      4
    </div>,
    <div className="w-20 h-20 text-white flex justify-center items-center rounded-full border border-black">
      5
    </div>,
    <div className="w-20 h-20 text-white flex justify-center items-center rounded-full border border-black">
      5
    </div>,
  ];
  return (
    <main className="min-h-screen flex flex-col ">
      <div className="h-screen flex flex-col justify-between container mx-auto">
        <ParalaxContainer baseVelocity={6} text="pizza & pasta" />
        <HeroImage />
        <HeroButtons />
      </div>
      <Slider />
    </main>
  );
}
