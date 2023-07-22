import React from "react";

const OrderModal = ({ closeModal, order }) => {
  return (
    <div className="modal">
      <div className="modal-content shadow-lg  font-semibold text-black/70 bg-gray-100 rounded-md p-4 mx-auto my-16 max-w-md">

        <div className="mb-4 text-2xl text-blue-gray-900 ">
          <span className="font-bold text-xl  "></span> {order?.packageData.vendorName}
        </div>

        <div className="mb-4  text-lg">
          <span className="font-semibold">PACKAGE ID:</span> {order?.packageId}
        </div>
      
        <div className="mb-4  text-lg">
          <span className="">PACKAGE NAME:</span> {order?.packageName}
        </div>
        <div className="mb-4 text-xl">
          <span className=" text-xl"> CATEGORYNAME:
</span> {order?.packageData.categoryName
}
        </div>
        <div className="mb-4  text-lg">
          <span className="">PACKAGE PRICE:</span> {order?.price}
        </div>
        <p className="text-black mb-4  text-lg">START DATE:
              {new Date(order.startDate).toLocaleDateString()}
            </p>

            <p className="text-black mb-4  text-lg">END DATE:
              {new Date(order.endDate).toLocaleDateString()}
            </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderModal;
