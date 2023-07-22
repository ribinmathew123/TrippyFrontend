import  { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updatePlace } from "../../../Redux/features/updatePlace/updatePlaceSlice";
import { fetchPlace,placeReset } from "../../../Redux/features/admin/GetPlace/GetPlaceSlice";
import toast, { Toaster } from "react-hot-toast";


function UpdatePlaces() {
  const { selectedPlace } = useSelector((state) => state.TouristPlace);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [editedPlace, setEditedPlace] = useState();

  useEffect(() => {
    dispatch(fetchPlace(id));


  }, [dispatch, id]);

  useEffect(() => {
    setEditedPlace({
      place: selectedPlace?.place,
      type: selectedPlace?.type,
      district: selectedPlace?.district,
      description: selectedPlace?.description,
      image: selectedPlace?.image?.url,
    });
  }, [dispatch, selectedPlace]);

  const handleChange = (e) => {
    setEditedPlace({ ...editedPlace, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event,publicId) => {
    setEditedPlace(prev=>{
      return {...prev,publicId}})
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { place, type, district, description ,publicId,} = editedPlace;

    const placeData = { place, type, district, description,publicId};

    const payload = { placeData, id: selectedPlace._id };
   

    
    const formData = new FormData();
  formData.append("placeData", JSON.stringify(placeData));
  formData.append("id", selectedPlace._id);
  formData.append("image", selectedImage);


    dispatch(updatePlace(formData));
    navigate("/admin/places");
    dispatch(placeReset())
  };

  // return (
  //   <div>
  //     <form onSubmit={handleSubmit}>
  //       <input
  //         type="text"
  //         name="place"
  //         value={editedPlace?.place}
  //         onChange={handleChange}
  //       />
  //       <input
  //         type="text"
  //         name="type"
  //         value={editedPlace?.type}
  //         onChange={handleChange}
  //       />
  //       <input
  //         type="text"
  //         name="district"
  //         value={editedPlace?.district}
  //         onChange={handleChange}
  //       />
  //       <input
  //         type="text"
  //         name="description"
  //         value={editedPlace?.description}
  //         onChange={handleChange}
  //       />

  //       <div className="flex flex-col justify-center">
  //         {selectedImage ? (
  //           <div className="m-20">
  //             <img
  //               src={URL.createObjectURL(selectedImage)}
  //               alt="Preview"
  //               className="object-cover md:w-[200px] w-60 h-60 rounded-lg"
  //               />
  //           </div>
  //         ) : (
  //           selectedPlace?.image?.length > 0 && (
  //             <div className=" m-20">
  //               <img
  //                 src={selectedPlace?.image[0]?.url}
  //                 alt="Preview"
  //                 className="object-cover md:w-[200px] w-60 h-60 rounded-lg"
  //               />
  //             </div>
  //           )
  //         )}
  //         <br />
  //         <input
  //           type="file"
  //           id="image"

  //           accept="image/*"
  //           onChange={(e)=>handleImageChange(e,
  //             selectedPlace?.image[0]?.public_id)}
  //           className="w-52 md:w-fit"
  //         />
  //       </div>

  //       <button type="submit">Update</button>
  //     </form>
  //   </div>
  // );



//   return (
//     <div className="flex w-full flex-col justify-center items-center overflow-hidden">
//       <h1 className="font-bold text-center text-2xl text-blue-900 my-6">
//         Update Tourist Places
//       </h1>
     
//         <form  onSubmit={handleSubmit} className="flex w-full lg:w-1/2 mx-auto justify-center py-8  flex-col gap-3 px-4 bg-gray-500">
//           <div className="md:flex-row flex-col flex gap-2 justify-around items-center">
//             <label className="whitespace-nowrap" htmlFor="">
//               Place Name:
//             </label>

//             <input
//               type="text"
//               id="place"
//               name="place"
//           value={editedPlace?.place}
//           onChange={handleChange}
//               placeholder="placeName"
//               className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px]"
//             />
            
//           </div>
        
//           <div className="md:flex-row flex-col flex gap-2 justify-around">
//             <label className="whitespace-nowrap" htmlFor="">
//               Place Type
//             </label>
//             <input
//                 type="text"
//                 name="type"
//                 value={editedPlace?.type}
//                 onChange={handleChange}
//             />

            
//           </div>
         

//           <div className="md:flex-row flex-col flex gap-2 justify-around">
//                   <label htmlFor="">District Name</label>
//                   <input
//                     type="text"
//                     name="district"
//                     value={editedPlace?.district}
//                     onChange={handleChange}
//                   />

                 
//                 </div> 
               
           
          

//           <div className="md:flex-row flex-col flex gap-2 justify-around">
//             <label htmlFor="place details">Place Details</label>

//             <input
//               type="text"
//               name="description"
//               value={editedPlace?.description}
//               onChange={handleChange}
//             />
            
//           </div>

        

//           <div className="flex flex-col justify-center">
//           {selectedImage ? (
//             <div className="m-20">
//               <img
//                 src={URL.createObjectURL(selectedImage)}
//                 alt="Preview"
//                 className="object-cover md:w-[200px] w-60 h-60 rounded-lg"
//                 />
//             </div>
//           ) : (
//             selectedPlace?.image?.length > 0 && (
//               <div className=" m-20">
//                 <img
//                   src={selectedPlace?.image[0]?.url}
//                   alt="Preview"
//                   className="object-cover md:w-[200px] w-60 h-60 rounded-lg"
//                 />
//               </div>
//             )
//           )}
//           <br />
//           <input
//             type="file"
//             id="image"

//             accept="image/*"
//             onChange={(e)=>handleImageChange(e,
//               selectedPlace?.image[0]?.public_id)}
//             className="w-52 md:w-fit"
//           />
//         </div>
         

//           <div className="w-full flex justify-center">
//           <button
//             type="submit"
//             className="bg-blue-700 mt-6 mb-4 text-white w-fit px-8 rounded-lg p-2"
//           >
//             Update
//           </button>
//           </div>

          
//           {/* </div> */}
//         </form>
//         {/* </div> */}

//       <Toaster />
//     </div>
//   );
// }


return (
  <div className="w-full h-full flex flex-col justify-center items-center overflow-hidden">
    <h1 className="font-bold text-2xl text-blue-900 my-6">
      Add Tourist Places
    </h1>

    <div className="bg-[#111827] rounded-lg text-white px-20 pt-16 container mx-auto w-fit">
      <form onSubmit={handleSubmit}
      
        className="flex items-center justify-center flex-col gap-2"
      >
        <div className="space-y-5 items-start flex flex-col">
          <div className="md:flex-row flex-col gap-6 justify-center items-center flex  ">
            <label className="whitespace-nowrap" htmlFor="">
              Place Name
            </label>
            <input
              name="place"
              type="text"
              id="place"
          value={editedPlace?.place}
          onChange={handleChange}
              className="rounded-md text-black bg-gray-50 p-2 w-fit md:w-[400px]"
            />
          </div>
        

          <div className="md:flex-row flex-col flex gap-8 justify-center items-center">
            <label className="whitespace-nowrap" htmlFor="">
              Place Type
            </label>
            <input
              name="type"
              className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
              type="text"
                value={editedPlace?.type}
                onChange={handleChange}
            />
          </div>
         

          <div className="md:flex-row flex-col flex gap-4 justify-center items-center">
            <label htmlFor="">District Name</label>
            <input
              className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
              type="text"
                    name="district"
                    value={editedPlace?.district}
                    onChange={handleChange}
             
            />
          </div>
          <div className="md:flex-row flex-col flex gap-4 justify-center items-center">
            <label htmlFor="">Place Ditails</label>
            <input
              className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
              type="text"
                    name="description"
                    value={editedPlace?.description}
                    onChange={handleChange}
             
            />
          </div>
         
         
         
          <div className="flex flex-col justify-center">
          {selectedImage ? (
            <div className="m-4">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="object-cover md:w-[100px] w-60 h-60 rounded-lg"
                />
            </div>
          ) : (
            selectedPlace?.image?.length > 0 && (
              <div className=" m-10 ">
                <img
                  src={selectedPlace?.image[0]?.url}
                  alt="Preview"
                  className="object-cover md:w-[200px] w-60 h-60 rounded-lg"
                />
              </div>
            )
          )}
          <br />
          <input
            type="file"
            id="image"

            accept="image/*"
            onChange={(e)=>handleImageChange(e,
              selectedPlace?.image[0]?.public_id)}
            className="w-52 md:w-fit"
          />
        </div>
         
</div>
          <div className="w-full flex justify-center">
          <button
            type="submit"
            className="bg-blue-700 mt-6 mb-4 text-white w-fit px-8 rounded-lg p-2"
          >
            Update
          </button>
      </div>
      </form>
    </div>
    
    <Toaster />
  </div>
)

}
export default UpdatePlaces;













