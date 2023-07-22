import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import previewImage from "../../../assest/Background.png";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addPlace,
  placeReset,
} from "../../../Redux/features/addPlace/addPlaceSlice";

const AddPlace = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { placeIsLoading, placeError, placeIsSuccess, placeMessage } =
    useSelector((state) => state.places);

  const { register, handleSubmit, formState: { errors },} = useForm();

  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (placeError) {
      toast.error(placeMessage);
    }
    if (placeIsSuccess) {
      toast.success(placeMessage?.message);
      navigate("/admin/getPlace");
    }
    dispatch(placeReset());
  }, [placeError, placeMessage,navigate, placeIsSuccess, dispatch]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage((oldArray) => [...oldArray, reader.result]);
      };
    });
  };

  const onSubmit = (data) => {
    const { place, type, disname, details } = data;
    alert(data)

    const placeData = { place, type, disname, details, image };
    alert(image)


    dispatch(addPlace(placeData));
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center overflow-hidden">
      <h1 className="font-bold text-2xl text-blue-900 my-6">
        Add Tourist Places
      </h1>

      <div className="bg-[#111827] rounded-lg text-white px-20 pt-16 container mx-auto w-fit">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-center flex-col gap-2"
        >
          <div className="space-y-5 items-start flex flex-col">
            <div className="md:flex-row flex-col gap-6 justify-center items-center flex  ">
              <label className="whitespace-nowrap" htmlFor="">
                Place Name
              </label>
              <input
                name="place"
                className="rounded-md text-black bg-gray-50 p-2 w-fit md:w-[400px]"
                type="text"
                {...register("place", { required: "Please Enter Place Name" })}
              />
            </div>
            {errors.place && (
              <p className="text-[#ff0000]  errorMessage">
                {errors.place?.message}
              </p>
            )}

            <div className="md:flex-row flex-col flex gap-8 justify-center items-center">
              <label className="whitespace-nowrap" htmlFor="">
                Place Type
              </label>
              <input
                name="type"
                className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
                type="text"
                {...register("type", { required: "Please Enter Place Type" })}
              />
            </div>
            {errors.type && (
              <p className="text-[#ff0000]  errorMessage">
                {errors.type?.message}
              </p>
            )}

            <div className="md:flex-row flex-col flex gap-4 justify-center items-center">
              <label htmlFor="">District Name</label>
              <input
                name="disname"
                className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
                type="text"
                {...register("disname", {
                  required: "Please Enter District name",
                })}
              />
            </div>
            {errors.disname && (
              <p className="text-[#ff0000]  errorMessage">
                {errors.disname?.message}
              </p>
            )}

            <div className="md:flex-row flex-col flex gap-5 justify-center items-center">
              <label htmlFor="place details">Place Details</label>

              <textarea
                name="details"
                className="peer block min-h-[auto]  text-black w-full rounded border-0 md:w-[400px] px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Your message"
                {...register("details", {
                  required: "Please Enter Place details",
                })}
              ></textarea>
            </div>
            {errors.details && (
              <p className="text-[#ff0000]  errorMessage">
                {errors.details?.message}
              </p>
            )}
            <div className="add_car_input_wrapper">
              <img
                className="previewImage object-cover md:w-[515px] w-52 h-60"
                src={preview ? preview : previewImage}
                alt="preview"
              />

              <input
                className="w-52 md:w-fit"
                type="file"
                name="image"
                multiple
                required
                onChange={handleFileChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-700 mt-6 mb-4 text-white w-fit px-8 rounded-lg p-2"
          >
            {" "}
            {placeIsLoading ? "Uploading..." : "Submit"}
          </button>

        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default AddPlace;




// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import toast, { Toaster } from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import previewImage from "../../../assest/Background.png";
// import {
//   addPlace,
//   placeReset,
// } from "../../../Redux/features/addPlace/addPlaceSlice";

// const AddPlace = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { placeIsLoading, placeError, placeIsSuccess, placeMessage } =
//     useSelector((state) => state.places);

//   const schema = yup.object().shape({
//     place: yup.string().required("Please enter Place Name"),
//     type: yup.string().required("Please enter Place Type"),
//     disname: yup.string().required("Please enter District Name"),
//     details: yup.string().required("Please enter Place Details"),

//     image: yup
//       .mixed()
//       .required("Please select an image")
//       .test("fileSize", "Max allowed size is 5MB", (value) => {
//         if (!value) return true;
//         return value.every((file) => file.size <= 5000000);
//       })
//       .test("fileType", "Not a valid image type", (value) => {
//         if (!value) return false;
//         const validFileExtensions = [
//           "jpg",
//           "jpeg",
//           "png",
//           "gif",
//           "webp",
//           "svg+xml",
//         ];
//         return value.every((file) => {
//           const extension = file.name.split(".").pop().toLowerCase();
//           return validFileExtensions.includes(extension);
//         });
//       }),
//   });

//   const { register, handleSubmit, formState:{ errors } } = useForm({
//     resolver: yupResolver(schema)
//   });
//   const onSubmit = data => console.log(data);

//   const [image, setImage] = useState([]);
//   const [preview, setPreview] = useState();

//   useEffect(() => {
//     if (placeError) {
//       toast.error(placeMessage);
//     }
//     if (placeIsSuccess) {
//       toast.success(placeMessage?.message);
//       navigate("/admin/getPlace");
//     }
//     dispatch(placeReset());
//   }, [placeError, placeMessage, placeIsSuccess, dispatch]);

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setPreview(URL.createObjectURL(files[0]));
//     setImage(files);
//     console.log(files);
//   };

//   // const onSubmit = (data) => {
//   //   const { place, type, disname, details } = data;
//   //   const placeData = { place, type, disname, details, image };
//   //   dispatch(addPlace(placeData));
//   // };

//   return (
//     <div className="w-full h-full flex flex-col justify-center items-center overflow-hidden">
//       <h1 className="font-bold text-2xl text-blue-900 my-6">
//         Add Tourist Places
//       </h1>

//       <div className="bg-[#111827] rounded-lg text-white px-20 pt-16 container mx-auto w-fit">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="flex items-center justify-center flex-col gap-2"
//         >
//           <div className="space-y-5 items-start flex flex-col">
//             <div className="md:flex-row flex-col gap-6 justify-center items-center flex">
//               <label className="whitespace-nowrap" htmlFor="place">
//                 Place Name
//               </label>
//               <input
//                 name="place"
//                 className="rounded-md text-black bg-gray-50 p-2 w-fit md:w-[400px]"
//                 type="text"
//                 {...register("place")}
//               />
//             </div>
//             {errors.place && (
//               <p className="text-[#ff0000] errorMessage">
//                 {errors.place.message}
//               </p>
//             )}

//             <div className="md:flex-row flex-col flex gap-8 justify-center items-center">
//               <label className="whitespace-nowrap" htmlFor="type">
//                 Place Type
//               </label>
//               <input
//                 name="type"
//                 className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
//                 type="text"
//                 {...register("type")}
//               />
//             </div>
//             {errors.type && (
//               <p className="text-[#ff0000] errorMessage">
//                 {errors.type.message}
//               </p>
//             )}

//             <div className="md:flex-row flex-col flex gap-4 justify-center items-center">
//               <label htmlFor="disname">District Name</label>
//               <input
//                 name="disname"
//                 className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
//                 type="text"
//                 {...register("disname")}
//               />
//             </div>
//             {errors.disname && (
//               <p className="text-[#ff0000] errorMessage">
//                 {errors.disname.message}
//               </p>
//             )}

//             <div className="md:flex-row flex-col flex gap-5 justify-center items-center">
//               <label htmlFor="details">Place Details</label>
//               <textarea
//                 name="details"
//                 className="peer block min-h-[auto] text-black w-full rounded border-0 md:w-[400px] px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
//                 rows="3"
//                 placeholder="Your message"
//                 {...register("details")}
//               ></textarea>
//             </div>
//             {errors.details && (
//               <p className="text-[#ff0000] errorMessage">
//                 {errors.details.message}
//               </p>
//             )}

//             <div className="add_car_input_wrapper">
//               <img
//                 className="previewImage object-cover md:w-[515px] w-52 h-60"
//                 src={preview ? preview : previewImage}
//                 alt="preview"
//               />

//               <input
//                 className="w-52 md:w-fit"
//                 type="file"
//                 // accept='image/*'
//               accept=".jpg, .jpeg, .png, .gif, .webp, .svg"
//                 name="image"
//                 multiple
//                 required
//                 onChange={handleFileChange}
//               />
//               {errors.image && (
//                 <p className="text-[#ff0000] errorMessage">
//                   {errors.image.message}
//                 </p>
//               )}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-700 mt-6 mb-4 text-white w-fit px-8 rounded-lg p-2"
//           >
//             {placeIsLoading ? "Loading..." : "Add Place"}
//           </button>
//         </form>
//       </div>
//       <Toaster position="top-right" />
//     </div>
//   );
// };

// export default AddPlace;
