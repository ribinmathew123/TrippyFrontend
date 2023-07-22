import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaSearch,

} from "react-icons/fa";
import Navbar from "../../../Components/Layout/Navbar";

function GetAllPlace() {
  const [search, setSearch] = useState('');
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/allActions",  {params: {
          search}
        });
        const data = response.data;
        console.log(data);
        setPlaces(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [search]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto items-center justify-center drop-shadow-2xl">
        <div className="">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="mt-10 mb-5 text-2xl font-Poppins">
                Tourist Place
              </h1>
            </div>
            <div className="relative mt-24 mb-10">
              <input
                type="text"
                placeholder="Search..."
                className="w-48 sm:w-64 px-4 py-2 text-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <div className="absolute top-0 right-0 p-2">
                <FaSearch className="text-gray-500" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {places?.map((place) => (
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
                        src={place.image[1]?.url}
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
                    <button className="text-white bg-purple-600 hover:bg-black px-3 py-1 rounded-md transition-colors duration-300 transform hover:scale-105">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default GetAllPlace;
