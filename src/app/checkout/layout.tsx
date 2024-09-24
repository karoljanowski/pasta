import { Teko } from "next/font/google";

const teko = Teko({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`${teko.className} bg-yellow-50`}>
            {children}
        </div>
    );
}
