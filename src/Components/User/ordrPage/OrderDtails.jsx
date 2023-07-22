import React, { useState, useEffect} from "react";


import { Link, useNavigate } from "react-router-dom";
import server from "../../../Axios/axios";
import { useSelector } from "react-redux";
import Navbar from "../../Layout/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function OrderDetails() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);


  const [userData, setUserData] = useState(null);
  const userId = user._id;

  const users = JSON.parse(localStorage.getItem("user"));
  const token = users?.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await server.get(`/orderDetails/${userId}`, config);
        setUserData(response.data);
        console.log("datass", response.data);
      } catch (error) {
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

    fetchUserData();
  }, [userId]);

  const handleBookNow = (data) => {
    navigate("/profile/order-info", { state: data });
  };
  const handleReview = (data) => {
    navigate("/profile/order-review", { state: data });
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-10">
        <h1 className="text-center font-Poppins text-xl font-bold mb-6 sm:mb-10">
          Order Details
        </h1>

        <div className="overflow-x-auto">
     
          <table   className="min-w-full divide-y divide-gray-200 " >
            <thead className="bg-blue-gray-500 text-white">
              <tr>
                <th className="px-4 py-2 text-sm sm:text-md text-center font-medium text-black uppercase tracking-wider">
                  Sl.No
                </th>
                <th className="px-4 py-2 text-sm sm:text-md text-center font-medium text-black uppercase tracking-wider">
                  Package Name
                </th>
                <th className="px-4 py-2 text-sm sm:text-md text-center font-medium text-black uppercase tracking-wider">
                  Package Price
                </th>
                <th className="px-4 py-2 text-sm sm:text-md text-center font-medium text-black uppercase tracking-wider">
                  Total Member
                </th>
                <th className="px-4 py-2 text-sm sm:text-md text-center font-medium text-black uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-4 py-2 text-sm sm:text-md text-center font-medium text-black uppercase tracking-wider">
                  Date of Payment
                </th>
                <th className="px-4 py-2 text-sm sm:text-md text-center font-medium text-black uppercase tracking-wider">
                  Info
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-blue-gray-200">
              {userData?.map((order, index) => (
                <tr key={order._id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm sm:text-md font-medium text-black">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm sm:text-md font-medium text-black">
                    {order?.packageName}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm sm:text-md font-medium text-black">
                    {order?.price}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm sm:text-md font-medium text-black">
                    {order?.totalMember}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm sm:text-md font-medium text-black">
                    {order?.amount}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm sm:text-md font-medium text-black">
                    {new Date(order?.dateOfPayment).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm sm:text-md font-medium text-black">
                    <button
                      className="ml-auto m-4 text-white bg-purple-500 hover:bg-purple-600 px-3 py-1 rounded-md transition-colors duration-300 transform hover:scale-105"
                      onClick={() => handleBookNow(order)}
                    >
                      Details
                    </button>

                    <button
                      className="ml-auto  text-white bg-purple-500 hover:bg-purple-600 px-3 py-1 rounded-md transition-colors duration-300 transform hover:scale-105"
                      onClick={() => handleReview(order)}
                    >
                    Add Review
                    </button>
                    
                  </td>
                </tr>
              ))}
              {userData?.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-2 whitespace-nowrap text-sm sm:text-md font-medium text-black text-center"
                    colSpan={7}
                  >
                    <span>No data found</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default OrderDetails;


// import React from 'react';

// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
 
// class OrderDetails  {
 
   
 
//     render() {
 
//         return (
//             <div>
//                 <ReactHTMLTableToExcel
//                     id="test-table-xls-button"
//                     className="download-table-xls-button"
//                     table="table-to-xls"
//                     filename="tablexls"
//                     sheet="tablexls"
//                     buttonText="Download as XLS"/>
//                 <table id="table-to-xls">
//                     <tr>
//                         <th>Firstname</th>
//                         <th>Lastname</th>
//                         <th>Age</th>
//                     </tr>
//                     <tr>
//                         <td>Jill</td>
//                         <td>Smith</td>
//                         <td>50</td>
//                     </tr>
//                     <tr>
//                         <td>Eve</td>
//                         <td>Jackson</td>
//                         <td>94</td>
//                     </tr>
//                 </table>
 
//             </div>
//         );
//     }
// }
 
// export default OrderDetails
