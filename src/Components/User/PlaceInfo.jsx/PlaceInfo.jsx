import { useState, useEffect } from "react";
import server from "../../../Axios/axios";
import { useParams } from "react-router-dom";
import Navbar from "../../Layout/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../../Layout/Footer";

function PlaceInfo() {
  const { placeId } = useParams();
  const [placeData, setPlaceData] = useState(null);
  const [packages, setPackages] = useState([]);

  console.log("uses params id", placeId);

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const response = await server.get(`placeDetails/about/${placeId}`);
        setPlaceData(response.data);
        console.log("aboutPlace", response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlaceData();
  }, [placeId]);

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

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/placeDetails/${placeId}/contact`);
  };
  const handleClickAbout = () => {
    navigate(`/placeDetails/${placeId}/about`);
  };
  const handleClickWeather = (data) => {
    navigate(`/placeDetails/${placeId}/weather`,{ state: data });
  };

 

  

  return (
    <>
      <Navbar />
      <div>
        <div className=" lg:pt-16 md:mt-0 mt-14   mx-auto">
          <div>
            {placeData?.map((place, index) => (
              <div key={index} color="blue-gray  " className="relative">
                {place.image && place.image[0]?.url ? (
                  <img
                    src={place.image[0]?.url}
                    alt="Place"
                    className="w-screen h-[550px] object-cover "
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-300"></div>
                )}
                <div className=" text-white  font-semibold text-3xl  p-5 md:p-10 absolute top-[5%] left-[5%] font-Poppins">
                  <h1 className="pb-2">{place.place}</h1>

                </div>

                <div className="md:w-1/2 bg-gray-100 absolute top-[90%] left-4 md:left-[25%]  flex shadow-xl  rounded-lg w-11/12 ">
                  <div className="w-1/3 px-8 p-4 flex  gap-5 justify-center items-center">
                    {/* <TfiAlarmClock className="text-4xl" /> */}

                    <div className=" flex flex-col ">
                      <button
                        onClick={handleClickAbout}
                        className="text-white hover:text-red-100 bg-primary  py-1 px-3 rounded mr-3"
                      >
                        About
                      </button>
                    </div>
                  </div>
                  <div className="w-1/3 px-8 p-4 flex  gap-5 justify-center items-center border-x-2 border-black/10">
                    {/* <TfiAlarmClock className="text-4xl" /> */}

                    <div className=" flex flex-col ">
                      <button
                         onClick={() => handleClickWeather(place)}
                        className="text-white hover:text-red-100 bg-primary  py-1 px-3 rounded mr-3"
                      >
                        WeatherInfo
                      </button>
                    </div>
                  </div>

                  <div className="w-1/3 px-8 p-4 flex  gap-5 justify-center items-center">
                    {/* <TfiAlarmClock className="text-4xl" /> */}
                    <div className=" flex flex-col ">
                      <button
                        onClick={handleClick}
                        className="text-white hover:text-red-100 bg-primary  py-1 px-3 rounded mr-3"
                      >
                        contact info
                      </button>
                    </div>

                    

                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div></div>
      

      
    </>
  );
}

export default PlaceInfo;
