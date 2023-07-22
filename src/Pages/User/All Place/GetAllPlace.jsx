import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Navbar from "../../../Components/Layout/Navbar";
import Footer from "../../../Components/Layout/Footer";
import server from "../../../Axios/axios";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function GetAllPlace({place}) {
  GetAllPlace.propTypes = {
    place: PropTypes.string.isRequired
  };
  const [search, setSearch] = useState("");
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [placesPerPage] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await server.get("/allActions");
        const data = response.data.places;
        setPlaces(data);
        setFilteredPlaces(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    filterPlaces(event.target.value);
  };

  const filterPlaces = (searchQuery) => {
    const filtered = places.filter((places) =>
      places.place.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlaces(filtered);
  };

  const handleSortOrderChange = () => {
    const sortedPlaces = [...filteredPlaces];
    sortedPlaces.sort((a, b) =>
      sortOrder === "asc"
        ? a.place.localeCompare(b.place)
        : b.place.localeCompare(a.place)
    );
    setFilteredPlaces(sortedPlaces);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPlace = currentPage * placesPerPage;
  const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
  const currentPlaces = filteredPlaces.slice(
    indexOfFirstPlace,
    indexOfLastPlace
  );

  const totalPages = Math.ceil(filteredPlaces.length / placesPerPage);
  const handlePlaceDetails = (place) => {
    navigate(`/placeDetails/${place._id}/about`,{ state: place });
  }
  return (
    <>
      <Navbar />
      <div className="container mx-auto justify-center mt-28 drop-shadow-2xl">
        {/* <div className=""> */}

          <div className="bg-blue-gray-900 px-8 flex w-[100%] p-3 justify-between">
           
            <div className="">
              <h1 className="text-2xl font-Poppins text-primary">
                Tourist Place
              </h1>
            </div>
            <div className="relative md:ml-56">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 w-96 py-2 text-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={search}
              onChange={handleSearch}
            />
            <div className="absolute top-0 right-0 p-2">
              <FaSearch className="text-deep-orange-800" />
            </div>
            </div>
            <button
                className="ml-auto text-white bg-purple-600 hover:bg-black px-3 py-1 rounded-md transition-colors duration-300 transform hover:scale-105"
                onClick={handleSortOrderChange}
              >
                Sort by Name ({sortOrder === "asc" ? "A-Z" : "Z-A"})
              </button> 
          </div>
          
           

            {/* <div className=" flex justify-center items-center flex-row gap-2 relative mt-24 mb-10"> */}
            {/* <div className=" flex justify-center items-center mt-24 mb-11"> */}
           
           
            {/* </div> */}

          

          {/* </div> */}
          <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {currentPlaces.map((place) => (
              <div
                key={place._id}
                className="bg-white rounded-xl overflow-hidden"
              >
                {place.image && place.image[0]?.url ? (
                  <div className="relative group">
                    <img
                      className="w-full h-44 sm:h-52 p-2 object-cover rounded-t-xl opacity-100 transition-transform duration-500"
                      src={place.image[0]?.url}
                      alt="Munnar"
                    />
                    {place.image[1]?.url && (
                      <img
                        className="w-full h-44 sm:h-52 p-2 object-cover rounded-t-xl absolute top-0 left-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        src={place.image[0]?.url}
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
                      {place.place}
                    </h2>
                    <p className="text-center text-gray-600">
                      {place.type}, {place.district}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-center">


                    
                    <button onClick={() => handlePlaceDetails(place)} className="text-white bg-purple-600 hover:bg-black px-3 py-1 rounded-md transition-colors duration-300 transform hover:scale-105">
                      Details
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
        {/* </div> */}
      </div>
      <div className="mt-3">

      <Footer/>
      </div>
    </>
  );
}

export default GetAllPlace;
