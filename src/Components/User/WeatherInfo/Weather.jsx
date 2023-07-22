import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import server from "../../../Axios/axios";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
// const city = "kalpetta";

function Weather() {
  const location = useLocation();
  console.log("stateData", location);
  const town = location.state?.city;
  const district = location.state?.district;

  let queryParam =  town || district;

  const { placeId } = useParams();
  const [placeData, setPlaceData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const response = await server.get(
          // `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}
          // https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}
          `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${queryParam}`
        );
        setPlaceData(response.data);
        console.log("weather info", response.data);
      } catch (error) {
        console.error(error);
        setError(true); 
      }
    };

    fetchPlaceData();
  }, [placeId]);

  return (
    <>
      <div className="container text-white font-semibold mx-auto  justify-center items-center flex-col overflow-hidden flex lg:flex-row my-10 gap-6">
        {placeData ? (
          <div className="md:w-3/4  flex flex-col justify-center items-center overflow-hidden w-full p-5 text-lg">
            <h1 className="text-3xl font-bold mb-4">Overview</h1>
            <img src={placeData.current.condition.icon} alt="" />

            {/* Rest of your content */}
            <div className="flex flex-col justify-start  shadow-2xl p-10  bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
              <div className="flex gap-3">
                <span>City:</span>
                <h1 className="pb-2">{placeData.location.name}</h1>
              </div>
              <div className="flex gap-3">
                <span>State:</span>
                <h1 className="pb-2">{placeData.location.region}</h1>
              </div>
              <div className="flex gap-3">
                <span>Weather Condition:</span>
                <h1 className="pb-2">{placeData.current.condition.text}</h1>
              </div>
              <div className="flex gap-3">
                <span>Current Temperature:</span>
                <h1 className="pb-2">{placeData.current.temp_c} °C</h1>
              </div>
              <div className="flex gap-3">
                <span>Current Humidity:</span>
                <h1 className="pb-2">{placeData.current.humidity} %</h1>
              </div>
              <div className="flex gap-3">
                <span>Wind Speed:</span>
                <h1 className="pb-2">{placeData.current.wind_kph} kmph</h1>
              </div>
              <div className="flex gap-3">
                <span>Pressure:</span>
                <h1 className="pb-2">{placeData.current.pressure_mb} mb</h1>
              </div>
              <div className="flex gap-3">
                <span>Weather Descriptions:</span>
                <h1 className="pb-2">
                  {placeData.current.weather_descriptions}
                </h1>
              </div>
            </div>
          </div>


) : (
  <div className="md:w-3/4 flex justify-center items-center">
    {error ? ( 
      <div className="text-center mt-5">
        <h1 className="text-3xl text-[#ff0000] mb-4">Error</h1>
        <p className="text-[#ff0000]">Failed to fetch weather data for the location.</p>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
)}
</div>
</>
);
}

export default Weather;
