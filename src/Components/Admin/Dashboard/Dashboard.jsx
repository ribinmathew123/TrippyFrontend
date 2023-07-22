import { useEffect, useState } from "react";
import server from "../../../Axios/axios";
import Chart from 'chart.js/auto';

import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

import { Bar } from "react-chartjs-2";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [chartData, setChartData] = useState(null);

  

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await server.get(
        '/admin/dashboard'
        );
        const data = response.data;
        setDashboardData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboardData();
  }, []);




  useEffect(() => {
    const fetchDashBoardGraphData = async () => {
      try {
        const response = await server.get('/admin/charts/');

        const data = response.data;

       
        setChartData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashBoardGraphData();
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }
  // if (!chartData) {
  //   return <div>Loading...</div>;
  // }





  
  const { userChart,vendorChart, packageChart, orderChart } = chartData || {};

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
        backgroundColor: "rgba(250, 104, 17)",
      },
      {
        label: "Vendors",
        data: vendorChart ? Object.values(vendorChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(54, 162, 235)",
      

      },
      {
        label: "Packages",
        data: packageChart ? Object.values(packageChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(183, 23, 119)", 
      },
      {
        label: "Orders",
        data: orderChart ? Object.values(orderChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(30, 185, 55)",
      
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
      <h1 className="font-bold mt-10 mb-6 text-2xl text-indigo-950">
        DASHBOARD
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:grid-cols-1 ">

        <div className="bg-[#B71777] rounded-lg shadow-lg p-6 flex flex-col items-center max-w-xs  ">
          <div className="text-white text-4xl">
            <i className="fas fa-box"></i>
          </div>
          <h1 className="text-white text-center text-lg font-bold mt-4">
            Total Package
          </h1>
          <h1 className="text-white text-center text-lg font-bold">
            {dashboardData.totalPackage || 0}
          </h1>
        </div>
        <div className="bg-[#1EB937] rounded-lg shadow-lg p-6 flex flex-col items-center max-w-xs">
          <div className="text-white text-4xl">
          <i className="fas fa-money-bill-alt"></i>

          </div>
          <h1 className="text-white text-center text-lg font-bold mt-4">
            Total Orders
          </h1>
          <h1 className="text-white text-center text-lg font-bold">
            {dashboardData.totalOrders || 0}
          </h1>
        </div>

        <div className="bg-[#FA6811] rounded-lg shadow-lg p-6 flex flex-col items-center max-w-xs">
          <div className="text-white text-4xl">
          
            <i className="fas fa-users"></i>

          </div>
          <h1 className="text-white text-center text-lg font-bold mt-4">
            Total Users
          </h1>
          <h1 className="text-white text-center text-lg font-bold">
          {dashboardData.totalUsers || 0}

          </h1>
        </div>

        <div className="bg-[#0FCBC9] rounded-lg shadow-lg p-6 flex flex-col items-center max-w-xs">
          <div className="text-white text-4xl">
            <i className="fas fa-store"></i>


          </div>
          <h1 className="text-white text-center text-lg font-bold mt-4">
            Total Vendors
          </h1>
          <h1 className="text-white text-center text-lg font-bold">
          {dashboardData.totalVendors || 0}

          </h1>
        </div>
      </div>



      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20 ">
  <h1 className="font-bold mt-10 mb-6 text-2xl text-indigo-950 ">Monthly Data</h1>
  <div className="chart-container h-[400px] w-[100%] " >
    {chartData ? (
      <Bar data={chartDataConfig} options={chartOptions} />
    ) : (
      <div>Loading chart data...</div>
    )}
  </div>
</div>


    </div>
  );
}

export default Dashboard;
