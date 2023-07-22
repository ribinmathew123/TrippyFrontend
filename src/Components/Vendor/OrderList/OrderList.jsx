import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import OrderModal from "./OrderModal";
import PackageInfoModal from "./PackageInfoModel";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import server from "../../../Axios/axios";
import { toast } from "react-toastify";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


export default function OrderList() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const { vendor } = useSelector((state) => state.VendorAuth);
  const vendorId = vendor._id;
  const token = vendor?.token;
 const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },} 

  useEffect(() => {
    fetchOrderData();
  }, [vendorId, startDate, endDate]);

  const fetchOrderData = async () => {
    
      try {

        const response = await server.get(`/vendor/bookDetails/${vendorId}`, {
          params: {
            startDate: startDate || "",
            endDate: endDate || "",
          },
          ...config,
        });
      
        setOrderData(response.data);

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

  const handleDownload = () => {
    const doc = new jsPDF();

    const table = document.querySelector("#salesTable");
   
    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      doc.setProperties({
        title: 'Sales Report',
        author: 'Your Company',
      });
      doc.addImage(imgData, "PNG", 10, 10, 190, 0);
      doc.save("sales_report.pdf");
    });
  };

  const handleOrderModalToggle = () => {
    setShowOrderModal(!showOrderModal);
  };

  const handlePackageModalToggle = () => {
    setShowPackageModal(!showPackageModal);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={fetchOrderData}
        >
          Filter
        </button>
      </div>

      <button
        className="px-4 py-2 bg-green-500 text-white rounded"
        onClick={handleDownload}
      >
        Download
      </button>

      <div className="overflow-x-auto w-[920px] mx-auto m-2">
        <h1 className="font-Poppins text-xl font-bold mb-10">Order Details</h1>
<ReactHTMLTableToExcel
id="test-table-xls-button"
className="download-table-xls-button"
table="salesTable"
filename="tablexls"
sheet="tablexls"
buttonText="Download as XLS"/>

        <table id="salesTable" className="min-w-full divide-y border-collapse border border-slate-500">
          <thead className="bg-blue-gray-500 text-white">
            <tr>
              <th scope="col" className="px-6 py-3 text-md text-center font-medium uppercase tracking-wider">
                Sl.No
              </th>
              <th scope="col" className="px-6 py-3 text-md text-center font-medium uppercase tracking-wider">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3 text-md text-center font-medium uppercasetracking-wider">
                User Name
              </th>
              <th scope="col" className="px-6 py-3 text-md text-center font-medium uppercase tracking-wider">
                Package Name
              </th>
              <th scope="col" className="px-6 py-3 text-md text-center font-medium uppercase tracking-wider">
                Package Price
              </th>
              <th scope="col" className="px-6 py-3 text-md text-center font-medium uppercase tracking-wider">
                Total Member
              </th>
              <th scope="col" className="px-6 py-3 text-md text-center font-medium uppercase tracking-wider">
                Total Amount
              </th>
              <th scope="col" className="px-6 py-3 text-md text-center font-medium uppercase tracking-wider">
                Payment Date
              </th>
              <th scope="col" className="px-6 py-3 text-md text-center font-medium uppercase tracking-wider">
                Package Info
              </th>
              <th scope="col" className="px-6 py-3 text-md text-center font-medium uppercase tracking-wider">
                User Info
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-blue-gray-200">
            {orderData.map((order, index) => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-black">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-black">
                  {order.orderId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-black">
                  {order.userData.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-black">
                  {order.packageName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-black">
                  {order.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-black">
                  {order.totalMember}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-black">
                  {order.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-black">
                  {new Date(order.dateOfPayment).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                  <div className="flex justify-center items-center">
                    <FaEye
                      onClick={handlePackageModalToggle}
                      className="cursor-pointer text-[#167905] text-2xl"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                  <div className="flex justify-center items-center">
                    <FaEye
                      onClick={handleOrderModalToggle}
                      className="cursor-pointer text-[#2C0BE6] text-2xl"
                    />
                    {showOrderModal && (
                      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 flex justify-center items-center z-50">
                        <OrderModal closeModal={handleOrderModalToggle} order={order} />
                      </div>
                    )}
                  </div>
                  {showPackageModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 flex justify-center items-center z-50">
          <PackageInfoModal closeModal={handlePackageModalToggle} order={order} />
        </div>
      )}
                </td>
              </tr>
            ))}
            {orderData.length === 0 && (
              <tr>
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black text-center"
                  colSpan={10}
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    
    </>
  );
}
