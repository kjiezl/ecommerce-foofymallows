import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { saveShippingAddress, savePaymentMethod } from "../../redux/features/cart/cartSlice"
import ProgressSteps from "../../components/ProgressSteps"

const Shipping = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    
    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    const [address, setAddress] = useState(shippingAddress.address || "");
    const [city, setCity] = useState(shippingAddress.city || "");
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
    const [country, setCountry] = useState(shippingAddress.country || "");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
    
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder");
    };

    useEffect(() => {
        if (!shippingAddress.address) {
          navigate("/shipping");
        }
    }, [navigate, shippingAddress]);
    
  return (
    <div className="container mx-auto mt-10">
        <ProgressSteps step1 step2 />
        <div className="mt-[5rem] flex justify-around items-center flex-wrap">
            <form onSubmit={submitHandler} className="w-[40rem]">
                <h1 className="text-3xl font-semibold mb-6">Shipping</h1>
                <div className="mb-4">
                    <label className="block text-slate-800 mb-2">Address</label>
                    <input
                        type="text"
                        className="bg-white text-slate-800 form-input mt-1 p-2 rounded-lg w-full shadow-xl"
                        placeholder="123 Main Street"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-slate-800 mb-2">City</label>
                    <input
                        type="text"
                        className="bg-white text-slate-800 form-input mt-1 p-2 rounded-lg w-full shadow-xl"
                        placeholder="Main City"
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-slate-800 mb-2">Postal Code</label>
                    <input
                        type="text"
                        className="bg-white text-slate-800 form-input mt-1 p-2 rounded-lg w-full shadow-xl"
                        placeholder="12345"
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-slate-800 mb-2">Country</label>
                    <input
                        type="text"
                        className="bg-white text-slate-800 form-input mt-1 p-2 rounded-lg w-full shadow-xl"
                        placeholder="Main Country"
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-slate-800">Select Method</label>
                    <div className="mt-2">
                        <label className="inline-flex items-center">
                        <input
                            type="radio"
                            className="form-radio text-pink-500"
                            name="paymentMethod"
                            value="PayPal"
                            checked={paymentMethod === "PayPal"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                            <span className="ml-2">PayPal or Credit Card</span>
                        </label>
                    </div>
                </div>
                <button
                    className="bg-pink-700 text-white py-2 px-4 rounded-full text-lg w-full hover:brightness-125 hover:scale-105 transition-transform"
                    type="submit"
                >
                    Continue
                </button>
            </form>
        </div>
    </div>
  )
}

export default Shipping