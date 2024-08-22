import Header from "@/components/Header";
import HeroButtons from "@/components/HeroButtons";
import HeroImage from "@/components/HeroImage";
import { ParalaxContainer } from "@/components/ParalaxText";
import Image from "next/image";
import Slider from "@/components/Slider";
import About from "@/components/About";


export default async function Home() {

  return (
    <>
      <Header/>
      <main className="min-h-screen flex flex-col ">
        <div className="h-[90lvh] flex flex-col justify-evenly container mx-auto">
          <ParalaxContainer baseVelocity={6} text="pizza & pasta" />
          <HeroImage />
          <HeroButtons />
        </div>
        <Slider />
        <About />
      </main>
    </>
  );
}
