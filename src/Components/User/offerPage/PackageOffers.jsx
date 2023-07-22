// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../../Layout/Navbar";
// import server from "../../../Axios/axios";
// function PackageOffers() {
//   const { offerPercentage } = useParams();
//   console.log("uses params id", offerPercentage);

//   const [offerData, setOfferData] = useState([]);

//   useEffect(() => {
//     const fetchOfferData = async () => {
//       try {
//         const response = await server.get(`offerPackage/${offerPercentage}`);
//         setOfferData(response.data);
//         console.log("offerData", response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchOfferData();
//   }, [offerPercentage]);

//   return (
//     <>
//       <Navbar />

//       <div className="my-28">
//   <div className="container mx-auto p-2">
//     <div className="flex  p-1 md:p-3 bg-black items-center text-white rounded-lg justify-between">
//       <h1 className="md:text-2xl text-base font-medium md:font-semibold">
//         Tourist Places
//       </h1>
//       <div className="relative w-[100%]  md:w-[50%] rounded-xl">
//         <input
//           className="h-10 px-3 rounded-xl w-full"
//           type="text"
//           placeholder="Search..."
//         />
//         <i className="fa-solid absolute top-3 right-3 text-red-600 fa-magnifying-glass"></i>
//       </div>
//       <button className="rounded-md bg-purple-500 h-[36px] ml-2">
//         <span className="hidden md:block text-base px-2 p-1 ">
//           Sort by AtoZ
//         </span>
//         <span className="md:hidden p-4 h-16">Sort</span>
//       </button>
//     </div>

//     {offerData.length === 0 ? (
//       <p className="text-center text-red-600 mt-10">No Offer Packages found.</p>
//     ) : (
//       offerData.packages.map((offer, index) => (
//         <div
//           key={index}
//           className="w-full flex h-56 mt-10  md:gap-2 flex-col md:flex-row gap-4"
//         >
//           <div className="md:w-1/4 bg-red-300 w-full space-y-2">
//             {offer.image && offer.image[0]?.url && (
//               <img
//                 className="w-[100%] h-56 object-cover"
//                 src={offer.image[0]?.url}
//                 alt=""
//               />
//             )}
//           </div>
//           <div className="md:w-2/4 bg-green-200 w-full flex flex-col md:items-start items-center">
//             <h1 className="md:text-xl font-medium text-lg">
//               package name: {offer.name}
//             </h1>
//             <div className="flex gap-8 items-center">
//               <span>
//                 {offer.day} Day/{offer.night} Night
//               </span>
//               <span>seller: ribin</span>
//             </div>
//             <p>Details</p>
//             <p className="text-center text-red-600">
//               Discount: {offer.offer}% off
//               Saved price
//               {offerData.savedPrice}

              
//             </p>
//           </div>
//           <div className="w-full md:w-1/4 bg-yellow-200 flex flex-col justify-center items-center gap-4">
//             <span className="underline-offset-4">Price: ₹{offer.price}</span>
//             <span className="text-center text-decoration-line-through text-red-600 ">
//   Price: ₹{offer.price}
// </span>
// <span className="text-decoration-line-through text-color-red-500">
//   Price: <span className="text-decoration-line-through">₹</span>{offer.price}
// </span>

//             {offerData.roundedOfferPrice}

//             <button className="bg-blue-800 w-[70%] text-white px-6 p-3 rounded-xl">
//               Book Now
//             </button>
//           </div>
//         </div>
//       ))
//     )}
//   </div>
// </div>




//     </>
//   );
// }

// export default PackageOffers;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Layout/Navbar";
import server from "../../../Axios/axios";
import { FaSearch } from "react-icons/fa";
import Footer from "../../Layout/Footer";

function PackageOffers() {
  const { offerPercentage } = useParams();

  const [offerData, setOfferData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [packagesPerPage] = useState(2);
  const navigate = useNavigate();

  const handleBookNow = (data) => {

    navigate('/bookpage', { 
      state: { 
        ...data,
        savedPrice: offerData?.savedPrice,
        roundedOfferPrice: offerData?.roundedOfferPrice
      }
    });
  };  

  useEffect(() => {
    const fetchOfferData = async () => {
      try {
        const response = await server.get(`offerPackage/${offerPercentage}`);
        const data = response.data.packages;
           console.log("offerData", response.data);


        setOfferData(response.data);
        setFilteredPackages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOfferData();
  }, [offerPercentage]);

  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    setSearch(searchQuery);
    filterPackages(searchQuery);
  };

  const filterPackages = (searchQuery) => {
    const filtered = offerData.filter((pack) =>
      pack.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPackages(filtered);
  };

  const handleSortOrderChange = () => {
    const sortedPackages = [...filteredPackages];
    sortedPackages.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
    setFilteredPackages(sortedPackages);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPackage = currentPage * packagesPerPage;
  const indexOfFirstPackage = indexOfLastPackage - packagesPerPage;
  const currentPackages = filteredPackages.slice(
    indexOfFirstPackage,
    indexOfLastPackage
  );

  const totalPages = Math.ceil(filteredPackages.length / packagesPerPage);

  return (
    <>
      <Navbar />
      <div className="my-28">
        <div className="container mx-auto p-2">
          <div className="bg-blue-gray-900 p-2 md:px-8 flex w-full md:p-3 justify-between">
            <div className="w-fit">
              <span className="md:text-2xl text-base font-Poppins text-primary">
                Packages
              </span>
            </div>
            <div className="w-[50%]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 w-full py-2 text-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={search}
                onChange={handleSearch}
              />
              <div className="absolute top-1 right-0 p-2">
                <FaSearch className="text-deep-orange-800" />
              </div>
            </div>
            </div>
          <div>
          <button
              className="ml-auto text-white bg-purple-600 hover:bg-black px-3 py-1 rounded-md transition-colors duration-300 transform hover:scale-105"
              onClick={handleSortOrderChange}
            >
             <span className="md:block hidden"> Sort by Price </span>
             <span className="md:hidden flex"> A/Z </span>
              <span className="md:block hidden"> ({sortOrder === "asc" ? "Low to High" : "High to Low"}) </span>
                
            </button>
          </div>
         
          </div>
          {currentPackages.length === 0 ? (
            <p className="text-center text-red-600 mt-10">
              No Offer Packages found.
            </p>
          ) : (
            currentPackages.map((pack, index) => (
              <div
                key={index}
                className="w-full px-14 flex mt-10 md:gap-2 items-start flex-col md:flex-row gap-4 bg-white pb-10 shadow-xl"
              >
                <div className="md:w-1/4 w-full  space-y-2">
                  {pack.image && pack?.image[0]?.url && (
                    <img
                      className="w-[100%] h-56 object-cover"
                      src={pack.image[0]?.url}
                      alt=""
                    />
                  )}
                </div>
                <div className="md:w-2/4  w-full flex flex-col md:items-start items-center">
                  <h1 className="md:text-xl font-medium text-lg">
                    Package name: {pack?.name}
                  </h1>
                  <div className="flex gap-8 items-center">
                    <span>
                      {pack.day} Day/{pack?.night} Night
                    </span>
                    <span>seller: ribin</span>
                  </div>
                  <p>Details</p>
                  <p className="text-center text-red-600">
                    Discount: {pack.offer}% off
                    Saved price: ₹{offerData?.savedPrice}
                  </p>
                </div>
                <div className="w-full md:w-1/4 flex flex-col justify-center items-center gap-4">
                  <span className="underline-offset-4">
                    Price: ₹{pack.price}
                  </span>
                  <span className="text-center text-decoration-line-through text-red-600">
                  </span>
                  <span className="text-decoration-line-through text-color-red-500">
                  </span>
                  Offer Price:₹{offerData?.roundedOfferPrice}
                  <button
                    className="text-white bg-purple-600 hover:bg-primary px-3 py-1 rounded-md transition-colors duration-300 transform hover:scale-105"
                    onClick={() => handleBookNow( pack)}

            
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))
          )}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={`mx-1 px-3 py-1 rounded-md ${
                    pageNumber === currentPage
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-purple-600 hover:text-white"
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        </div>
      </div>
      <div className="mt-3">
        <Footer />
      </div>
    </>
  );
}

export default PackageOffers;


