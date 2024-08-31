const CheckoutForm = () => {
    return (
        <div>
            <form action="" className="flex flex-col gap-8 mt-10">
                <div className="flex flex-col">
                    <label htmlFor="customerFullName" className="text-xl uppercase">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="customerFullName"
                        name="customerFullName"
                        placeholder="Enter your full name"
                        className="bg-transparent border-b border-white outline-none py-2 text-lg focus:border-red-400 placeholder:text-gray-300"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="customerCity" className="text-xl uppercase">
                        City
                    </label>
                    <input
                        type="text"
                        id="customerCity"
                        name="customerCity"
                        placeholder="Enter your city"
                        className="bg-transparent border-b border-white outline-none py-2 text-lg focus:border-red-400 placeholder:text-gray-300"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="customerStreet" className="text-xl uppercase">
                        Street
                    </label>
                    <input
                        type="text"
                        id="customerStreet"
                        name="customerStreet"
                        placeholder="Enter your street"
                        className="bg-transparent border-b border-white outline-none py-2 text-lg focus:border-red-400 placeholder:text-gray-300"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="paymentType" className="text-xl uppercase">
                        Payment Type
                    </label>
                    <select
                        id="paymentType"
                        name="paymentType"
                        className="bg-transparent border-b border-white outline-none py-2 text-lg focus:border-red-400 placeholder:text-gray-300"
                    >
                        <option value="card">Credit Card</option>
                        <option value="cash">Cash</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="hover:bg-yellow-200 transition-all bg-white text-black px-10 py-2 text-2xl border-black border rounded-lg shadow-md shadow-gray-800"
                >
                    Order with obligation to pay
                </button>
            </form>
        </div>
    );
}

export default CheckoutForm;