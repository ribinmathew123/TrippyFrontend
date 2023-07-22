import React from 'react';
import Navbar from '../../Layout/Navbar';
import { useLocation } from 'react-router-dom';

function OrderInfo() {
  const location = useLocation();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto flex justify-center items-center">
        <div className='md:w-[450px] w-[350px] flex justify-center items-center rounded-lg flex-col mt-24 py-5 shadow-2xl mb-4 bg-white'>
        <h1 className="text-3xl font-bold my-8">Order Details</h1>

<div className="flex items-center justify-center mb-8">
  <img
    src={location.state?.packageId?.image[0]?.url}
    alt="Place"
    className="w-72 h-44 object-cover"
  />
</div>

<div className="space-y-4">
  <p className="text-lg">Amount: {location.state?.amount}</p>
  <p className="text-lg">Order ID: {location.state?.orderId}</p>
 <div className='flex gap-4'>
 <p className="text-lg">
    End Date: {formatDate(location?.state.endDate)}
  </p>
  <p className="text-lg">
    Start Date: {formatDate(location?.state.startDate)}
  </p>
 </div>
  <p className="text-lg">
    Date of Payment: {formatDate(location?.state.dateOfPayment)}
  </p>
  <p className="text-lg">Day: {location.state?.packageId.day}</p>
  {/* <p className="text-lg">
    Member: {location.state?.packageId.totalMember}
  </p> */}
  <p className="text-lg">Package: {location.state?.packageId.name}</p>
  <p className="text-lg">Vendor Name: {location.state?.vendorId.name}</p>
  <p className="text-lg">Vendor Email: {location.state?.vendorId.email}</p>
  <p className="text-lg">Vendor Phone: {location.state?.vendorId.phoneNumber}</p>
</div>
        </div>
      </div>
    </>
  );
}

export default OrderInfo;
