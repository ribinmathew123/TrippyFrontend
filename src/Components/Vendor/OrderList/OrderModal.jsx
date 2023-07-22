import React from "react";

const OrderModal = ({ closeModal, order }) => {
  return (
    <div className="modal">
      <div className="modal-content font-semibold shadow-xl bg-gray-400 rounded-md text-black/70 p-4 mx-auto my-16 max-w-md">
        <h2 className="text-2xl  mb-4">User Info</h2>

        <div className="mb-4  text-lg">
          <span className="font-semibold">USER NAME:</span> {order?.userData.name}
        </div>

        <div className="mb-4  text-lg">
          <span className="font-semibold">CONTACT NUMBER:</span> {order?.userData.phoneNumber}
        </div>
       
        <div className="mb-4  text-lg">
          <span className="font-semibold">EMAIL:</span> {order?.userData.email}
        </div>
        <div className="mb-4  text-lg">
          <span className="font-semibold">TOTAL MEMBER:</span> {order?.totalMember}
        </div>
        
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
