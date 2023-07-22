import { useState, useEffect } from "react";
import server from "../../../Axios/axios";
import { useParams} from "react-router-dom";
import Footer from "../../Layout/Footer";
function PlaceContact() {

    const { placeId } = useParams();
    const [placeData, setPlaceData] = useState(null);
  
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
    <div>
           
<div className='flex flex-col justify-center items-center p-10'>
{placeData?.map((place,index) => (

    <div key={index} className=' p-10 bg-gray-200 shadow-xl font-medium text-purple-700 text-2xl  flex flex-col justify-center items-center'>

        <div className='justify-center items-center text-center font-body '>
            <h1>Name&nbsp;:&nbsp;&nbsp;Ribin Mathew</h1>
        </div>
        <div className='justify-center items-center text-center  font-body '>
            <h1>mobile&nbsp;:&nbsp;&nbsp;989522222</h1>
            <h1 className="pb-2">{place.place}</h1>

        </div>
        <div className='justify-center items-center text-center '>
            <h1>email&nbsp;:&nbsp;&nbsp;Ribin@gmial.com</h1>
        </div>


    </div>



))}
</div>
    </div>
  )
}

export default PlaceContact
