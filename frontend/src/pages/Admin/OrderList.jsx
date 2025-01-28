import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
        <h2 className="ml-[10rem] text-3xl font-bold font-varela my-10">User Orders</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <table className="container mx-auto">
          <AdminMenu />

          <thead className="bg-pink-100">
            <tr>
              <td className="py-2 px-4 font-bold font-varela">IMAGE</td>
              <td className="py-2 font-bold font-varela">ID</td>
              <td className="py-2 font-bold font-varela">USER</td>
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
                <td>
                  <img
                    src={order.orderItems[0].image}
                    alt={order._id}
                    className="w-[5rem] pt-4"
                  />
                </td>
                <td>{order._id}</td>

                <td>{order.user ? order.user.username : "N/A"}</td>

                <td>
                  {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                </td>

                <td>$ {order.totalPrice}</td>

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
    </>
  );
};

export default OrderList;