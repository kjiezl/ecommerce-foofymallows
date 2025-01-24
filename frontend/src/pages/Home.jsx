import { Link, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Message from "../components/Message";
import Product from "./Products/Product";

const Home = () => {
    const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <div className="mt-4 ml-[7rem]">
        <a href="/" className="text-3xl font-semibold text-pink-600 font-varela ">Foofy<span className="text-pink-400">mallows</span></a><br />
        {/* <div className="w-[10rem] ml-[0.6rem] border-b-2 border-gray-700 mb-2"></div> */}
      </div>
      <h2 className="text-3xl mt-10 ml-[20rem] my-[2rem] text-[3rem] font-varela">
            {userInfo ? (<p>Welcome, <span className="font-bold">{userInfo.username}!</span></p>) : ("Welcome!")}
        </h2>

      {!keyword ? <Header /> : null}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem] font-varela">
              Special Foofies
            </h1>

            <Link
              to="/shop"
              className="text-white bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem] hover:brightness-125 hover:scale-110 transition-transform"
            >
              Shop
            </Link>
          </div>
          <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
    </>
      )}
    </>
  );
};

export default Home;
