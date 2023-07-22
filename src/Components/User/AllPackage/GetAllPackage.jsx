import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Navbar from "../../../Components/Layout/Navbar";
import { useNavigate } from 'react-router-dom';
import Footer from "../../Layout/Footer";
import server from "../../../Axios/axios";

function GetAllPackage() {
  const [search, setSearch] = useState("");
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [packagesPerPage] = useState(8);
  const navigate = useNavigate();

  const handleBookNow = (data) => {
    navigate('/bookpage', { state: data });
  };
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await server.get("/allPackage");
        const data = response.data.packages;
        setPackages(data);
        setFilteredPackages(data);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    setSearch(searchQuery);
    filterPackages(searchQuery);
  };

  const filterPackages = (searchQuery) => {
    const filtered = packages.filter((pack) =>
      pack.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPackages(filtered);
  };

  const handleSortOrderChange = () => {
    const sortedPackages = [...filteredPackages];
    sortedPackages.sort((a, b) =>
      sortOrder === "asc"
        ? a.price - b.price
        : b.price - a.price
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
      <div className="container mx-auto mt-28 drop-shadow-2xl">
        <div className="bg-blue-gray-900 gap-3 md:px-6  flex w-full items-center md:p-3  p-2 justify-between">
          <div>
            <span className="md:text-xl text-base text-white ">
              Tourist Packages
            </span>
          </div>

        <div className="w-[50%]">
        <div className="relative w-[100%]">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 w-full py-2 text-gray-700 rounded-md"
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
            className="ml-auto text-white  bg-purple-600 hover:bg-black px-3 py-1 rounded-md "
            onClick={handleSortOrderChange}
          >
            <span className="text-xs md:hidden">A/Z</span>
            <span className="text-xs hidden md:block">Sort by Price</span> <span className="hidden md:block"> 
            ({sortOrder === "asc" ? "Low to High" : "High to Low"})
              </span> 
          </button> 
        </div>
        
        </div>
        <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {currentPackages.length === 0 ? (
            <div className="text-center">No data found</div>
          ) : (
            currentPackages.map((pack) => (
              <div
                key={pack._id}
                className="bg-white rounded-xl overflow-hidden"
              >



{pack.image && pack.image[0]?.url ? (
                <div className="relative group">
                  <img
                    className="w-full h-44 sm:h-52 p-2 object-cover rounded-t-xl opacity-100 transition-transform duration-500"
                    src={pack.image[0]?.url}
                    alt="Munnar"
                  />
                  {pack.image[1]?.url && (
                    <img
                      className="w-full h-44 sm:h-52 p-2 object-cover rounded-t-xl absolute top-0 left-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      src={pack.image[0]?.url}
                      alt="Munnar"
                    />
                  )}
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-300"></div>
              )}

              <div className="p-4">
                <div>
                  <h2 className="font-bold text-lg text-center">
                    {pack.name}
                  </h2>
                  <p className="text-center text-gray-600">
                    Price: {pack.price}
                  </p>
                  <p className="text-center text-gray-600">
                    Vendor Name: {pack.vendorName}
                  </p>
                </div>
                <div className="mt-4 flex justify-center">
                  <button className="text-white bg-purple-600 hover:bg-primary px-3 py-1 rounded-md transition-colors duration-300 transform hover:scale-105" onClick={() => handleBookNow(pack)}>
                    Book Now
                  </button>
                </div>
              </div>
              </div>
            ))
          )}
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
      </div>
      <div className="mt-3">

      <Footer/>
      </div>

      </>
  );
}

export default GetAllPackage;
