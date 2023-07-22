import { useState, useEffect } from "react";
import server from "../../../Axios/axios";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";

function PlaceAbout() {
  const { placeId } = useParams();
  const [placeData, setPlaceData] = useState(null);
  const location = useLocation();
  console.log("Statedata", location);

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

  return (
    <>
      <div className="container mx-auto flex-col overflow-hidden  justify-center items-center  flex lg:flex-row my-10  gap-6">

        {placeData?.map((place, index) => (
          <div
            key={index}
            className="leading-relaxed overflow-hidden w-full p-5 text-lg"
          >
            <div className="w-full h-full shadow-2xl p-10 items-center ">
              <h1 className="pb-2 capitalize underline text-center text-3xl font-bold mb-5">
                {place.place}
              </h1>

              <h1 className="pb-2">{place.description}</h1>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PlaceAbout;
