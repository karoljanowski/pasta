import { Roboto } from "next/font/google";
import Header from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
        <div className={`${roboto.className} bg-gray-100 min-h-screen px-4 py-4`}>
            <div className="container mx-auto">
                <Card>
                    <CardHeader>
                        <Header />
                    </CardHeader>
                    <CardContent>
                        <main>
                            {children}
                        </main>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}