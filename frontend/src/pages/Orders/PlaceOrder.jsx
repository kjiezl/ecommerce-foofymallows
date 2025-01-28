import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
        <div className="mt-10">
            <ProgressSteps step1 step2 step3/>
        </div>

      <div className="container mx-auto mt-[5rem]">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty.</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <td className="px-4 py-2 text-left font-bold bg-pink-100 font-varela align-top">Image</td>
                  <td className="px-4 py-2 text-left font-bold bg-pink-100 font-varela">Product</td>
                  <td className="px-4 py-2 text-left font-bold bg-pink-100 font-varela">Quantity</td>
                  <td className="px-4 py-2 text-left font-bold bg-pink-100 font-varela">Price</td>
                  <td className="px-4 py-2 text-left font-bold bg-pink-100 font-varela">Total</td>
                </tr>
              </thead>

              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>

                    <td className="p-2">
                      <Link to={`/product/${item.product}`} className="px-2">{item.name}</Link>
                    </td>
                    <td className="py-2 px-4">{item.qty}</td>
                    <td className="py-2 px-4">{item.price.toFixed(2)}</td>
                    <td className="py-2 px-4">
                      $ {(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-2xl font-varela font-semibold mb-5">Order Summary</h2>
          <div className="flex justify-between flex-wrap p-8 bg-pink-100">
            <ul className="text-lg">
              <li>
                <span className="font-semibold mb-4">Items Price:</span> $
                {cart.itemsPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Shipping:</span> $
                {cart.shippingPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Tax:</span> $
                {cart.taxPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Total:</span> $
                {cart.totalPrice}
              </li>
            </ul>

            {error && <Message variant="danger">{error.data.message}</Message>}

            <div>
              <h2 className="text-2xl font-semibold mb-4 font-varela">Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} <br /> {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 font-varela">Payment Method</h2>
              <strong>Method:</strong> {cart.paymentMethod}
            </div>
          </div>

          <div className="flex justify-center">
            <button
                type="button"
                className="bg-pink-700 text-white py-2 px-4 rounded-full text-lg w-[20rem] mt-4 hover:brightness-125 hover:scale-105 transition-transform"
                disabled={cart.cartItems === 0}
                onClick={placeOrderHandler}
            >
                Place Order
            </button>
          </div>

          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;