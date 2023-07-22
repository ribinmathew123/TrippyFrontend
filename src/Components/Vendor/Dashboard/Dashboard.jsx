import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import server from "../../../Axios/axios";
import Chart from 'chart.js/auto';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

import { Bar } from "react-chartjs-2";

function DashboardVendor() {
  const [dashboardData, setDashboardData] = useState(null);
  const [chartData, setChartData] = useState(null);

  const { vendor } = useSelector((state) => state.VendorAuth);
  const vendorId = vendor._id;

  const token = vendor?.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {

        const response = await server.get(`/vendor/dashboardDetails/${vendorId}`,config );
        const data = response.data;
        setDashboardData(data);
      }catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    };
    fetchDashboardData();
  }, [vendorId]);




  useEffect(() => {
    const fetchDashBoardGraphData = async () => {
      try {
      
        const response = await server.get(
          `/vendor/dashboard/${vendorId}`,config
        );

        const data = response.data;

        
        setChartData(data);
      }catch (error) {
        console.log("An error occurred. Please try again.");
      
          // toast.error("An error occurred. Please try again.");
        
      }
    };

    fetchDashBoardGraphData();
  }, [vendorId]);

  // if (!dashboardData) {
  //   return <div>Loading...</div>;
  // }
  // if (!chartData) {
  //   return <div>Loading...</div>;
  // }





  
  const { userChart, packageChart, orderChart } = chartData || {};

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
      },
    },
  };
  
  const chartDataConfig = {
    labels: userChart ? Object.keys(userChart[0]?.data ?? 0) : [],
    datasets: [
      {
        label: "Users",
        data: userChart ? Object.values(userChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(30,185,55)",
      },
      {
        label: "Packages",
        data: packageChart ? Object.values(packageChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(183,23,119)",
      },
      {
        label: "Total Currency",
        data: orderChart ? Object.values(orderChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(250, 104, 17)",
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
      <h1 className="font-bold mt-10 mb-6 text-2xl text-indigo-950">
        DASHBOARD
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#B71777] rounded-lg shadow-lg p-6 flex flex-col items-center">
          <div className="text-white text-4xl">
            <i className="fas fa-box"></i>
          </div>
          <h1 className="text-white text-center text-lg font-bold mt-4">
            Total Package
          </h1>
          <h1 className="text-white text-center text-lg font-bold">
            {dashboardData?.totalPackage || 0}
          </h1>
        </div>
        <div className="bg-[#1EB937] rounded-lg shadow-lg p-6 flex flex-col items-center">
          <div className="text-white text-4xl">
            <i className="fas fa-users"></i>
          </div>
          <h1 className="text-white text-center text-lg font-bold mt-4">
            Total Orders
          </h1>
          <h1 className="text-white text-center text-lg font-bold">
            {dashboardData?.totalOrders || 0}
          </h1>
        </div>
        <div className="bg-[#FA6811] rounded-lg shadow-lg p-6 flex flex-col items-center">
          <div className="text-white text-4xl">
            <i className="fas fa-money-bill-alt"></i>
          </div>
          <h1 className="text-white text-center text-lg font-bold mt-4">
            Total Currency
          </h1>
          <h1 className="text-white text-center text-lg font-bold">
            ₹ {dashboardData?.totalCurrency || 0}
          </h1>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
  <h1 className="font-bold mt-10 mb-6 text-2xl text-indigo-950">Monthly Data</h1>
  <div className="chart-container" style={{ height: "400px", width: "100%" }}>
  
      <Bar data={chartDataConfig} options={chartOptions} />
    
  </div>
</div>

      {/* <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
      <h1 className="font-bold mt-10 mb-6 text-2xl text-indigo-950">Monthly Data</h1>
      <div className="chart-container">
        {chartData ? (
          <Bar data={chartDataConfig} options={chartOptions} />
        ) : (
          <div>Loading chart data...</div>
        )}
      </div>
    </div> */}
          <ToastContainer />
    </div>

  );
}

export default DashboardVendor;
