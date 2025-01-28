import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
        background: '#ffe6f2',
        foreColor: '#333',
      },
      tooltip: {
        theme: "light",
      },
      colors: ["#ff69b4"],
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#333'],
        },
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      title: {
        text: "Sales Trend",
        align: "left",
        style: {
          color: '#ff69b4',
          fontSize: '18px',
        },
      },
      grid: {
        borderColor: "#f2b2d4",
      },
      markers: {
        size: 4,
        colors: ['#ff69b4'],
        hover: {
          size: 6,
        },
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
          style: {
            color: '#333',
          },
        },
      },
      yaxis: {
        title: {
          text: "Sales",
          style: {
            color: '#333',
          },
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
        labels: {
          colors: ['#333'],
        },
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales.toFixed(2),
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <>
      <AdminMenu />

      <section className="xl:ml-[20rem] md:ml-[0rem]">
      <h2 className="ml-[5rem] text-3xl font-bold font-varela my-10">Admin Dashboard</h2>
        <div className="w-[80%] flex justify-around flex-wrap">
          <div className="rounded-lg bg-pink-100 p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] text-2xl text-center text-white p-0">
              💵
            </div>

            <p className="mt-5">Sales</p>
            <h1 className="text-xl font-bold">
              $ {isLoading ? <Loader /> : sales.totalSales.toFixed(2)}
            </h1>
          </div>
          <div className="rounded-lg bg-pink-100 p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] text-2xl text-center text-white p-0">
              👤
            </div>

            <p className="mt-5">Customers</p>
            <h1 className="text-xl font-bold">
               {isLoading ? <Loader /> : customers?.length}
            </h1>
          </div>
          <div className="rounded-lg bg-pink-100 p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] text-2xl text-center text-white p-0">
              🛍️
            </div>

            <p className="mt-5">All Orders</p>
            <h1 className="text-xl font-bold">
               {isLoading ? <Loader /> : orders?.totalOrders}
            </h1>
          </div>
        </div>

        <div className="ml-[10rem] mt-[4rem]">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="70%"
          />
        </div>

        <div className="mt-[4rem] mr-[10rem] mb-6">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;