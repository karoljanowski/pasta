const HeroButtons = () => {

    return (
        <div className="mx-4 flex justify-center gap-4">
            <button className="hover:bg-red-900 transition-all bg-red-700 text-white px-10 py-3 text-3xl border-black border rounded-lg shadow-md shadow-gray-800">Order</button>
            <button className="hover:bg-red-900 transition-all bg-red-700 text-white px-10 py-3 text-3xl border-black border rounded-lg shadow-md shadow-gray-800">Book</button>
        </div>
    );
}

export default HeroButtons;