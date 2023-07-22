// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash,faPen } from "@fortawesome/free-solid-svg-icons";


// import {
//   getPackage,
//   deletePackage,
//   blockAndUnblockPackage,
//   packageReset,
// } from "../../../Redux/features/GetPackage/GetPackageSlice";
// import toast, { Toaster } from "react-hot-toast";
// import Swal from "sweetalert2";

// const GetPackage = () => {
//   const navigate=useNavigate()
//   const dispatch = useDispatch();
//   const {
//     pack,
//     packageIsSuccess,
//     packageIsError,
//     packageMessage,
//   } = useSelector((state) => state.GetPackage);

//   useEffect(() => {
//     dispatch(getPackage());
//     return () => {
//       dispatch(packageReset());
//     };
//   }, [dispatch]);

//   useEffect(() => {
//     if (packageIsError) {
//       toast.error(packageMessage);
//     }
//   }, [packageIsError, packageMessage]);

//   const handleDelete = (pack) => {
//     const swalWithTailwindButtons = Swal.mixin({
//       customClass: {
//         confirmButton:
//           "bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded ml-10",
//         cancelButton:
//           "bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded",
//       },
//       buttonsStyling: false,
//     });

//     swalWithTailwindButtons
//       .fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete it!",
//         cancelButtonText: " Cancel!",
//         reverseButtons: true,
//       })
//       .then((result) => {
//         if (result.isConfirmed) {
//           swalWithTailwindButtons.fire(
//             "Deleted!",
//             "Your file has been deleted.",
//             "success"
//           );
//           dispatch(deletePackage(pack._id));
//         } else if (result.dismiss === Swal.DismissReason.cancel) {
//           swalWithTailwindButtons.fire(
//             "Cancelled",
//             "Your file is safe :)",
//             "error"
//           );
//         }
//       });
//   };

//   const handleBlockUnblockPackage = (id) => {
//     dispatch(blockAndUnblockPackage(id));
//   };
//   const handleUpdatePlace = (id) => {
//     console.log("place Details id",id);
//     navigate("/vendor/updatePackage/"+id);
//     // dispatch(fetchPlace(id));

//   };

//   // if (packageIsLoading) {
//   //   return <h1>Loading...</h1>;
//   // }

//   return (
//     <div>
//       <section className="ml-18vw p-8">
//         <div className="grid gap-4 mt-8">
//           <h1 className="text-2xl font-bold mb-4">Package Details</h1>

//           {pack.length === 0 ? (
//             <p>No data found.</p>
//           ) : (

//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y border-collapse border border-slate-500">
//               <thead className="bg-blue-gray-500">
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
//                   >
//                     Sl.No
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
//                   >
//                     Package Category
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
//                   >
//                     Package Name
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
//                   >
//                     Package Details
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
//                   >
//                     Image
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
//                   >
//                     Status
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
//                   >
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className=" divide-y  divide-gray-200 bg-blue-gray-200">
//                 {pack.map((packages, index) => (
//                   <tr key={packages._id}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
//                       {index + 1}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
//                       {packages.categoryName}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
//                       {packages.name}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
//                       {packages.details}
//                     </td>

//                     <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium text-black">
//                       {/* <td className="py-2 px-4 border-b"> */}
//                       {packages.image.length > 0 ? (
//                         <img
//                           src={packages.image[0].url}
//                           alt="packages"
//                           // className="w-20 h-16"
//                           className="h-20 w-20 object-cover rounded-md"
//                         />
//                       ) : (
//                         "No image available"
//                       )}
//                     </td>

//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
//                       {packages.isBlocked ? (
//                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
//                           Blocked
//                         </span>
//                       ) : (
//                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                           Active
//                         </span>
//                       )}
//                     </td>

//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
//                     <button
//             onClick={() => handleUpdatePlace(packages._id)}
//             className=" mr-6 ml-5"
//           >
//           <FontAwesomeIcon icon={faPen} size="xl" style={{color: "#134bcd",}} />
//           </button>
//                       <button
//                         onClick={() => handleDelete(packages)}
//                         className="text-white hover:text-red-100 bg-red-900  py-1 px-3 rounded mr-3"
//                       >
//                         Delete
//                       </button>

//                       <button
//                         onClick={() => handleBlockUnblockPackage(packages._id)}
//                         className={`${
//                           packages.isBlocked ? "bg-red-500" : "bg-green-500"
//                         } text-white py-1 px-3 rounded`}
//                       >
//                         {packages.isBlocked ? "Unblock" : "Block"}
//                       </button>

//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//            )}
//         </div>
       
//       </section>
//       <Toaster />
//     </div>
//   );
// };

// export default GetPackage;







import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

import {
  getPackage,
  deletePackage,
  blockAndUnblockPackage,
  packageReset,
} from "../../../Redux/features/GetPackage/GetPackageSlice";

const GetPackage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    pack,
    packageIsSuccess,
    packageIsError,
    packageMessage,
  } = useSelector((state) => state.GetPackage);

  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    dispatch(getPackage());
    return () => {
      dispatch(packageReset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (packageIsError) {
      toast.error(packageMessage);
    }
  }, [packageIsError, packageMessage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleDelete = (pack) => {
    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded ml-10",
        cancelButton:
          "bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded",
      },
      buttonsStyling: false,
    });

    swalWithTailwindButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: " Cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithTailwindButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
          dispatch(deletePackage(pack._id));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwindButtons.fire(
            "Cancelled",
            "Your file is safe :)",
            "error"
          );
        }
      });
  };

  const handleBlockUnblockPackage = (id) => {
    dispatch(blockAndUnblockPackage(id));
  };

  const handleUpdatePlace = (id) => {
    navigate("/vendor/updatePackage/" + id);
  };

  const totalPages = Math.ceil(pack.length / itemsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const sortedPack = pack.slice().sort((a, b) => {
    if (sortBy === "asc") {
      return a.price - b.price;
    } else if (sortBy === "desc") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <section className="ml-18vw p-8">
        <div className="grid gap-4 mt-8">
          <h1 className="text-2xl font-bold mb-4">Package Details</h1>

          {pack.length === 0 ? (
            <p>No data found.</p>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <div>
                  <label htmlFor="sort">Sort by Price:</label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select</option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y border-collapse border border-slate-500">
                  <thead className="bg-blue-gray-500">
                    <tr>
                      <th>Sl.No</th>
                      <th>Package Category</th>
                      <th>Package Name</th>
                      <th>Package Details</th>
                      <th>Package Price</th>
                      <th>Image</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-blue-gray-200">
                    {sortedPack
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )
                      .filter(
                        (packages) =>
                          packages.categoryName &&
                          packages.categoryName
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                      )
                      .map((packages, index) => (
                        <tr key={packages._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {packages.categoryName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {packages.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {packages.details}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {packages.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {packages.image.length > 0 ? (
                              <img
                                src={packages.image[0].url}
                                alt="packages"
                                className="h-20 w-20 object-cover rounded-md"
                              />
                            ) : (
                              "No image available"
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {packages.isBlocked ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Blocked
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex">
                              <button
                                className="text-indigo-600 hover:text-indigo-900"
                                onClick={() =>
                                  handleUpdatePackage(packages._id)
                                }
                              >
                                <FontAwesomeIcon icon={faPen} />
                              </button>
                              <button
                                className="text-red-600 hover:text-red-900 ml-4"
                                onClick={() => handleDeletePackage(packages)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                              <button
                                className="text-red-600 hover:text-red-900 ml-4"
                                onClick={() =>
                                  handleBlockUnblockPackage(packages._id)
                                }
                              >
                                {packages.isBlocked ? "Unblock" : "Block"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-end mt-4">
                <div className="flex items-center">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-l-md bg-blue-500 text-white"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToPage(index + 1)}
                      className={`px-4 py-2 border-t border-b border-gray-300 bg-blue-500 text-white ${
                        currentPage === index + 1 ? "font-bold" : ""
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-r-md bg-blue-500 text-white"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      <Toaster />
    </div>
  );
};

export default GetPackage;

















// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
// import Swal from "sweetalert2";
// import toast, { Toaster } from "react-hot-toast";

// import {
//   getPackage,
//   deletePackage,
//   blockAndUnblockPackage,
//   packageReset,
// } from "../../../Redux/features/GetPackage/GetPackageSlice";

// const GetPackage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const {
//     pack,
//     packageIsSuccess,
//     packageIsError,
//     packageMessage,
//   } = useSelector((state) => state.GetPackage);

//   const [searchQuery, setSearchQuery] = useState("");
//   const itemsPerPage = 3; // Number of items to display per page
//   const [currentPage, setCurrentPage] = useState(1); // Current page number

//   useEffect(() => {
//     dispatch(getPackage());
//     return () => {
//       dispatch(packageReset());
//     };
//   }, [dispatch]);

//   useEffect(() => {
//     if (packageIsError) {
//       toast.error(packageMessage);
//     }
//   }, [packageIsError, packageMessage]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery]);

//   const handleDelete = (pack) => {
//     const swalWithTailwindButtons = Swal.mixin({
//       customClass: {
//         confirmButton:
//           "bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded ml-10",
//         cancelButton:
//           "bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded",
//       },
//       buttonsStyling: false,
//     });

//     swalWithTailwindButtons
//       .fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete it!",
//         cancelButtonText: " Cancel!",
//         reverseButtons: true,
//       })
//       .then((result) => {
//         if (result.isConfirmed) {
//           swalWithTailwindButtons.fire(
//             "Deleted!",
//             "Your file has been deleted.",
//             "success"
//           );
//           dispatch(deletePackage(pack._id));
//         } else if (result.dismiss === Swal.DismissReason.cancel) {
//           swalWithTailwindButtons.fire(
//             "Cancelled",
//             "Your file is safe :)",
//             "error"
//           );
//         }
//       });
//   };

//   const handleBlockUnblockPackage = (id) => {
//     dispatch(blockAndUnblockPackage(id));
//   };

//   const handleUpdatePlace = (id) => {
//     navigate("/vendor/updatePackage/" + id);
//   };

//   const totalPages = Math.ceil(pack.length / itemsPerPage);

//   const goToPage = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const goToPreviousPage = () => {
//     setCurrentPage((prevPage) => prevPage - 1);
//   };

//   const goToNextPage = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
//   };

//   return (
//     <div>
//       <section className="ml-18vw p-8">
//         <div className="grid gap-4 mt-8">
//           <h1 className="text-2xl font-bold mb-4">Package Details</h1>

//           {pack.length === 0 ? (
//             <p>No data found.</p>
//           ) : (
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="px-3 py-2 border border-gray-300 rounded-md"
//                 />
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y border-collapse border border-slate-500">
//                   <thead className="bg-blue-gray-500">
//                     <tr>
//                       <th>Sl.No</th>
//                       <th>Package Category</th>
//                       <th>Package Name</th>
//                       <th>Package Details</th>
//                       <th>Package Price</th>
//                       <th>Image</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200 bg-blue-gray-200">
//                     {pack
//                       .slice(
//                         (currentPage - 1) * itemsPerPage,
//                         currentPage * itemsPerPage
//                       )
//                       .filter(
//                         (packages) =>
//                           packages.categoryName &&
//                           packages.categoryName
//                             .toLowerCase()
//                             .includes(searchQuery.toLowerCase())
//                       )
//                       .map((packages, index) => (
//                         <tr key={packages._id}>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {(currentPage - 1) * itemsPerPage + index + 1}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {packages.categoryName}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {packages.name}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {packages.details}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {packages.price}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {packages.image.length > 0 ? (
//                               <img
//                                 src={packages.image[0].url}
//                                 alt="packages"
//                                 className="h-20 w-20 object-cover rounded-md"
//                               />
//                             ) : (
//                               "No image available"
//                             )}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {packages.isBlocked ? (
//                               <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
//                                 Blocked
//                               </span>
//                             ) : (
//                               <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                                 Active
//                               </span>
//                             )}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <button
//                               onClick={() => handleUpdatePlace(packages._id)}
//                               className="mr-6 ml-5"
//                             >
//                               <FontAwesomeIcon
//                                 icon={faPen}
//                                 size="xl"
//                                 style={{ color: "#134bcd" }}
//                               />
//                             </button>
//                             <button
//                               onClick={() => handleDelete(packages)}
//                               className="text-red-900 hover:text-red-400 cursor-pointer  py-1 px-3 rounded mr-3"
//                             >
//                               <FontAwesomeIcon 
//                                 icon={faTrash}
//                                 size="lg"
//                               />
//                             </button>
//                             <button
//                               onClick={() =>
//                                 handleBlockUnblockPackage(packages._id)
//                               }
//                               className={`${
//                                 packages.isBlocked
//                                   ? "bg-red-500"
//                                   : "bg-green-500"
//                               } text-white py-1 px-3 rounded`}
//                             >
//                               {packages.isBlocked ? "Unblock" : "Block"}
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="flex justify-end mt-4">
//                 <button
//                   onClick={goToPreviousPage}
//                   disabled={currentPage === 1}
//                   className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={goToNextPage}
//                   disabled={currentPage === totalPages}
//                   className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </section>
//       <Toaster />
//     </div>
//   );
// };

// export default GetPackage;



// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
// import Swal from "sweetalert2";
// import toast, { Toaster } from "react-hot-toast";

// import {
//   getPackage,
//   deletePackage,
//   blockAndUnblockPackage,
//   packageReset,
// } from "../../../Redux/features/GetPackage/GetPackageSlice";

// const GetPackage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const {
//     pack,
//     packageIsSuccess,
//     packageIsError,
//     packageMessage,
//   } = useSelector((state) => state.GetPackage);

//   const [searchQuery, setSearchQuery] = useState("");
//   const itemsPerPage = 1; // Number of items to display per page
//   const [currentPage, setCurrentPage] = useState(1); // Current page number

//   useEffect(() => {
//     dispatch(getPackage());
//     return () => {
//       dispatch(packageReset());
//     };
//   }, [dispatch]);

//   useEffect(() => {
//     if (packageIsError) {
//       toast.error(packageMessage);
//     }
//   }, [packageIsError, packageMessage]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery]);

//   const handleDelete = (pack) => {
//     const swalWithTailwindButtons = Swal.mixin({
//       customClass: {
//         confirmButton:
//           "bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded ml-10",
//         cancelButton:
//           "bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded",
//       },
//       buttonsStyling: false,
//     });

//     swalWithTailwindButtons
//       .fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete it!",
//         cancelButtonText: " Cancel!",
//         reverseButtons: true,
//       })
//       .then((result) => {
//         if (result.isConfirmed) {
//           swalWithTailwindButtons.fire(
//             "Deleted!",
//             "Your file has been deleted.",
//             "success"
//           );
//           dispatch(deletePackage(pack._id));
//         } else if (result.dismiss === Swal.DismissReason.cancel) {
//           swalWithTailwindButtons.fire(
//             "Cancelled",
//             "Your file is safe :)",
//             "error"
//           );
//         }
//       });
//   };

//   const handleBlockUnblockPackage = (id) => {
//     dispatch(blockAndUnblockPackage(id));
//   };

//   const handleUpdatePlace = (id) => {
//     navigate("/vendor/updatePackage/" + id);
//   };

//   const totalPages = Math.ceil(pack.length / itemsPerPage);

//   const goToPage = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const goToPreviousPage = () => {
//     setCurrentPage((prevPage) => prevPage - 1);
//   };

//   const goToNextPage = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
//   };

//   return (
//     <div>
//       <section className="ml-18vw p-8">
//         <div className="grid gap-4 mt-8">
//           <h1 className="text-2xl font-bold mb-4">Package Details</h1>

//           {pack.length === 0 ? (
//             <p>No data found.</p>
//           ) : (
//             <>
//               <div className="flex items-center justify-between mb-4">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="px-3 py-2 border border-gray-300 rounded-md"
//                 />
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y border-collapse border border-slate-500">
//                   <thead className="bg-blue-gray-500">
//                     <tr>
//                       <th>Sl.No</th>
//                       <th>Package Category</th>
//                       <th>Package Name</th>
//                       <th>Package Details</th>
//                       <th>Package Price</th>
//                       <th>Image</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200 bg-blue-gray-200">
//                     {pack
//                       .slice(
//                         (currentPage - 1) * itemsPerPage,
//                         currentPage * itemsPerPage
//                       )
//                       .filter(
//                         (packages) =>
//                           packages.categoryName &&
//                           packages.categoryName
//                             .toLowerCase()
//                             .includes(searchQuery.toLowerCase())
//                       )
//                       .map((packages, index) => (
//                         <tr key={packages._id}>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {(currentPage - 1) * itemsPerPage + index + 1}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {packages.categoryName}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {packages.name}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {packages.details}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {packages.price}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {packages.image.length > 0 ? (
//                               <img
//                                 src={packages.image[0].url}
//                                 alt="packages"
//                                 className="h-20 w-20 object-cover rounded-md"
//                               />
//                             ) : (
//                               "No image available"
//                             )}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {packages.isBlocked ? (
//                               <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
//                                 Blocked
//                               </span>
//                             ) : (
//                               <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                                 Active
//                               </span>
//                             )}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <button
//                               onClick={() => handleUpdatePlace(packages._id)}
//                               className="mr-6 ml-5"
//                             >
//                               <FontAwesomeIcon
//                                 icon={faPen}
//                                 size="xl"
//                                 style={{ color: "#134bcd" }}
//                               />
//                             </button>
//                             <button
//                               onClick={() => handleDelete(packages)}
//                               className="text-red-900 hover:text-red-400 cursor-pointer  py-1 px-3 rounded mr-3"
//                             >
//                               <FontAwesomeIcon 
//                                 icon={faTrash}
//                                 size="lg"
//                               />
//                             </button>
//                             <button
//                               onClick={() =>
//                                 handleBlockUnblockPackage(packages._id)
//                               }
//                               className={`${
//                                 packages.isBlocked
//                                   ? "bg-red-600 hover:bg-red-900"
//                                   : "bg-green-600 hover:bg-green-900"
//                               } text-white font-bold py-1 px-3 rounded`}
//                             >
//                               {packages.isBlocked ? "Unblock" : "Block"}
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="flex justify-center mt-4">
//                 <nav className="inline-flex rounded-md shadow">
//                   <button
//                     onClick={goToPreviousPage}
//                     disabled={currentPage === 1}
//                     className="px-3 py-1 rounded-l-md bg-blue-500 text-white font-bold hover:bg-blue-700"
//                   >
//                     Previous
//                   </button>
//                   {[...Array(totalPages)].map((_, index) => (
//                     <button
//                       key={index}
//                       onClick={() => goToPage(index + 1)}
//                       className={`${
//                         currentPage === index + 1
//                           ? "bg-blue-500 text-white font-bold"
//                           : "bg-white text-blue-500 font-medium hover:bg-blue-200"
//                       } px-3 py-1`}
//                     >
//                       {index + 1}
//                     </button>
//                   ))}
//                   <button
//                     onClick={goToNextPage}
//                     disabled={currentPage === totalPages}
//                     className="px-3 py-1 rounded-r-md bg-blue-500 text-white font-bold hover:bg-blue-700"
//                   >
//                     Next
//                   </button>
//                 </nav>
//               </div>
//             </>
//           )}
//         </div>
//       </section>
//       <Toaster />
//     </div>
//   );
// };

// export default GetPackage;











