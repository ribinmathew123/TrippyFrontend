import { Outlet } from "react-router-dom";
import PlaceInfo from "../Components/User/PlaceInfo.jsx/PlaceInfo";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import server from "../Axios/axios";
import Footer from "../Components/Layout/Footer";
import { useNavigate } from 'react-router-dom';

function PlaceLayout() {
  const { placeId } = useParams();
  const [packages, setPackages] = useState([]);

  const navigate = useNavigate();

  const handleBookNow = (data) => {
    navigate('/bookpage', { state: data });
  };
  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const response = await server.get(
          `placeDetails/relatePackage/${placeId}`
        );
        setPackages(response.data);
        console.log("seachPlace", response.data);
      } catch (error) {
        console.error(error);
      }
    };

   

    fetchSearchData();
  }, [placeId]);

  return (
    <>
    <div>
      <PlaceInfo />
      <div className="mt-5">
        <Outlet />
      </div>
      <div className="container mx-auto">
        <h1 className="text-xl font-bold font-serif ml-5 mb-6"> Related Packages</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {packages.map((pack) => (
            <div key={pack._id} className="bg-white rounded-xl overflow-hidden">
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
                      src={pack.image[1]?.url}
                      alt="Munnar"
                    />
                  )}
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-300"></div>
              )}

              <div className="p-4">
                <div className=" flex justify-center items-center flex-col">
                  <h2 className="font-bold text-lg text-center">{pack.name}</h2>

                  <div>
                    <span>place:</span>
                    {pack.place.map((place, index) => (
                      <span key={index}>
                        {place.place}
                        {index < pack.place.length - 1 ? " - " : ""}
                      </span>
                    ))}
                  </div>

                  <p className="text-center text-gray-600">
                    Seller: {pack.vendorName}, {pack.district}
                  </p>
                </div>
                <div className="mt-4 flex justify-center">
                  <button
                    className="text-white  bg-purple-600  hover:bg-primary px-3 py-1 rounded-md transition-colors duration-300 transform hover:scale-105"
                    onClick={() => handleBookNow(pack)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
    <Footer/>

  </>
  );
}

export default PlaceLayout;
