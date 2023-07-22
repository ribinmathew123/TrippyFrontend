import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  allVendors,
blockAndUnblockVendor,
  reset,
} from "../../../Redux/features/admin/adminVendorSlice";

const VendorData = () => {
  const dispatch = useDispatch();
  const { vendors, isLoading, isSuccess, isError, message, error } = useSelector(
    (state) => state.adminVendors
  );

  useEffect(() => {
    dispatch(allVendors());
  }, [dispatch]);


  useEffect(() => {
    if (isError) {
      toast.error(error);
    }
  }, [dispatch,error,isError]);


  useEffect(() => {
    if (isSuccess && message) {
      toast.success(message?.message);
    }
  }, [message, isSuccess]);

  
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleBlockUnblockVendor = (id) => {
    dispatch(blockAndUnblockVendor(id));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container mx-auto">
      <Toaster />

      <h1 className="text-2xl font-bold mb-6 underline uppercase text-[#111827]">Vendor List</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr  className=" bg-[#111827] text-white hover:bg-[#162139] uppercase">
              <th className="p-4 ">
                Sl.No
              </th>
              <th >
                Id
              </th>
              <th  >
                Full Name
              </th>
              <th >
                Email
              </th>
              <th >
                PhoneNumber
              </th>
              <th >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
            console.log(vendors)
            }
            {vendors?.map((vendor, index) => (
              <tr key={index} className="hover:bg-[#c0c3c9]">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{vendor._id}</td>
                <td className="py-2 px-4 border-b uppercase">{vendor.name}</td>
                <td className="py-2 px-4 border-b">{vendor.email}</td>
                <td className="py-2 px-4 border-b">{vendor.phoneNumber}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleBlockUnblockVendor(vendor._id)}
                    className={`${
                      vendor.isBlocked ? "bg-red-500" : "bg-green-500"
                    } text-white py-1 px-3 rounded`}
                  >
                    {vendor.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default VendorData
