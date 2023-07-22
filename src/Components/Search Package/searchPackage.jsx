import React, { useState, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

function SearchPackageData() {
  const location = useLocation();
  const packageInfo = location?.state?.existsData;

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setTotalPages(location?.state?.totalPages);
    setCurrentPage(1);
  }, [location.state]);

  const handleBookNow = (data) => {
    navigate("/bookpage", { state: data });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;

  return (
    <>
      <Navbar />
      <h1 className="font-Poppins font-bold text-3xl ml-14 mt-28">
        Search result..
      </h1>
      <div className="flex-wrap flex  w-full items-center p-10 gap-[29px] gap-y-10 rounded-lg">
      {packageInfo?.slice(startIndex, endIndex).map((pack) => (
          <div
            key={pack._id}
            className="w-[338px] shadow-lg bg-black/10 backdrop-blur-xl flex flex-col pb-5 justify-center rounded-md"
          >
            <div className="relative">
              <img
                src={pack?.image[0]?.url}
                alt="Place"
                className="w-[100%] h-52 object-cover transition-all duration-300 rounded-lg cursor-pointer filter "
              />
              <div className="absolute -bottom-5 right-[29%] rounded-xl  bg-blue-gray-700 px-4 p-2 text-white">
                <span>
                  {pack?.day} Days / {pack?.night} Nights
                </span>
              </div>
            </div>
            <div className="space-y-2 p-2">
              <div className="mb-2 mt-8">
                <h5 className="mb-2  text-center  text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {pack?.name}
                </h5>
              </div>
              <div>
                <span>Seller:</span> {pack?.vendorName}
              </div>
              <div className="mb-2">
                <span>Price:</span> {pack?.price}
              </div>

              <div>
                <span>place:</span>{" "}
                {pack.place.map((place, index) => (
                  <span key={index}>
                    {place.place}
                    {index < pack.place.length - 1 ? " - " : ""}
                  </span>
                ))}
              </div>

              <div>
                <span>End Date:</span> {formatDate(pack?.endDate)}
              </div>
              <div className="mb-10 px-10 flex justify-center">
                <button
                  className="text-white bg-purple-700 hover:bg-black  mt-5 w-full  p-2 rounded-md transition-colors duration-300 transform hover:scale-105"
                  onClick={() => handleBookNow(pack)}
                >
                  BOOK NOW
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
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

      <Footer />
    </>
  );
}

export default SearchPackageData;
