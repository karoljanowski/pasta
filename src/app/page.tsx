import Header from "@/components/Homepage/Header";
import HeroImage from "@/components/Homepage/HeroImage";
import { ParalaxContainer } from "@/components/Homepage/ParalaxText";
import { Button } from "@/components/ui/button";
import Slider from "@/components/Homepage/Slider";
import About from "@/components/Homepage/About";
import { getMenu } from "@/lib/actions";
import CartModal from "@/components/cart/CartModal";
import Footer from "@/components/Homepage/Footer";
import { Teko } from "next/font/google";

const teko = Teko({ subsets: ["latin"] });

export default async function Home() {
  const menu = await getMenu()

  return (
    <div className={`${teko.className}`}>
      <Header />
      <main className="min-h-screen flex flex-col">
        <div className="h-[90lvh] flex flex-col justify-evenly container mx-auto">
          <ParalaxContainer baseVelocity={6} text="pizza & pasta" />
          <HeroImage />
          <div className="mx-4 flex justify-center gap-4">
            <Button variant="custom1" size="custom1" className="text-3xl py-7">Order</Button>
          </div>
        </div>
        <Slider menu={menu} />
        <About />
      </main>
      <Footer />
      <CartModal />
    </div>
  );
}
