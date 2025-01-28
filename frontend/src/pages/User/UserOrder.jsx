import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <>
    <div className="mt-4 ml-[7rem]">
        <a href="/" className="text-3xl font-semibold text-pink-600 font-varela ">Foofy<span className="text-pink-400">mallows</span></a><br />
    </div>
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold font-varela my-10">My Orders</h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <table className="w-full">
          <thead className="bg-pink-100">
            <tr>
              <td className="py-2 px-4 font-bold font-varela">IMAGE</td>
              <td className="py-2 font-bold font-varela">ID</td>
              <td className="py-2 font-bold font-varela">DATE</td>
              <td className="py-2 font-bold font-varela">TOTAL</td>
              <td className="py-2 font-bold font-varela">PAID</td>
              <td className="py-2 font-bold font-varela">DELIVERED</td>
              <td className="py-2 font-bold font-varela"></td>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <img
                  src={order.orderItems[0].image}
                  alt={order.user}
                  className="w-[6rem] mb-5"
                />

                <td className="py-2">{order._id}</td>
                <td className="py-2">{order.createdAt.substring(0, 10)}</td>
                <td className="py-2">$ {order.totalPrice}</td>

                <td className="py-2">
                  {order.isPaid ? (
                    <p className="p-1 text-white text-center bg-green-500 w-[6rem] rounded">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-white text-center bg-red-500 w-[6rem] rounded">
                      Pending
                    </p>
                  )}
                </td>

                <td className="px-2 py-2">
                  {order.isDelivered ? (
                    <p className="p-1 text-white text-center bg-green-500 w-[6rem] rounded">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-white text-center bg-red-500 w-[6rem] rounded">
                      Pending
                    </p>
                  )}
                </td>

                <td className="px-2 py-2">
                  <Link to={`/order/${order._id}`}>
                    <button className="bg-pink-700 text-back text-white py-2 px-3 rounded-full hover:brightness-125 hover:scale-105 transition-transform">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
};

export default UserOrder;