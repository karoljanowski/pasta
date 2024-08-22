import { Roboto } from "next/font/google";
import Header from "@/components/dashboard/Header";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });


export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    
    return (
        <div className={`${roboto.className} bg-gray-100 min-h-screen py-2 px-4`}>
            <div className="container mx-auto">
                <h1 className="text-xl uppercase font-bold">Dashboard</h1>
                <Header />
                <div className="bg-white p-4 rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
  }