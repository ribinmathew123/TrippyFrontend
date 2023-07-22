import Navbar from "../Layout/Navbar";
import React, { useState, useEffect } from "react";
import server from "../../Axios/axios";
import { useParams,Link } from "react-router-dom";


function SuccessPage() {

  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);

  console.log("uses params id", orderId);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await server.get(`successData/${orderId}`);
        setOrderData(response.data);
        console.log("sucesss", response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [orderId]);


  
  function formatDate(dateString) {
    if (!dateString) return '';
  
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
  <div className="flex justify-center items-center h-screen">
  <div className="max-w-2xl bg-white rounded-xl shadow-lg p-10 space-y-6">
    <h1 className="font-bold text-4xl text-orange-900">
      Order Success.........
    </h1>

    <div className="space-y-6">
      <h1 className="text-xl font-semibold">
        packageName: {orderData?.packageName}
      </h1>
      <h1 className="text-xl font-semibold">
        package id: {orderData?._id}
      </h1>
      <h1 className="text-xl font-semibold">
        Amount: {orderData?.amount}
      </h1>
      <h1 className="text-xl font-semibold">
        orderId: {orderData?.orderId}
      </h1>
      <h1 className="text-xl font-semibold">
        dateOfPayment: {formatDate(orderData?.dateOfPayment)}
      </h1>
    </div>
    <div className=" flex flex-col ">
    <Link to="/">
                    <button
                      className="text-white hover:text-red-100 bg-primary  py-1 px-3 rounded mr-3"
                      
                    >
                      Home
                    </button>
    
          </Link>
</div>
  </div>
</div>

</div>

    </div>
  );
}

export default SuccessPage;
