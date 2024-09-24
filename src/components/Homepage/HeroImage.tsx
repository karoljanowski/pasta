import Image from "next/image";
const HeroImage = () => {
    return (
        <div className="flex items-center justify-center mx-4">
            <div className="bg-red-700 w-[75vw] h-[55vh] my-8 rounded-full overflow-hidden">
                <Image src={'/hero.webp'} width={400} height={400} className="w-full h-full object-cover object-center p-1 rounded-full" alt="Pizza & Pasta" />
            </div>
        </div>
    );
}

export default HeroImage;