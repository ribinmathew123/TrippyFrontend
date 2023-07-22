// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import previewImage from "../../assest/Background.png";
// import toast, { Toaster } from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { addPackage, reset } from "../../Redux/features/package/packageSlice";

// const AddPackage = () => {
//   // const {places} = useSelector((state) => state.places)
//   // const {brands} = useSelector((state) => state.brands)

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.package
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [image, setImage] = useState();
//   const [preview, setPreview] = useState();

//   useEffect(() => {
//     if (isError) {
//       toast.error(message);
//     }
//     if (isSuccess) {
//       toast.success(message.message);
//       navigate("/admin/package");
//     }
//     dispatch(reset());
//   }, [isError, message, isSuccess, dispatch]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setPreview(URL.createObjectURL(e.target.files[0]));
//     setFileToBase(file);
//   };

//   const setFileToBase = (file) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       setImage(reader.result);
//     };
//   };

//   const onSubmit = (data) => {
//     const { place, type, disname, details } = data;

//     const packageData = { place, type, disname, description: details, image };

//     dispatch(addPackage(packageData));
//   };

//   if (isLoading) {
//     return (
//       <>
//         <h1>loading....</h1>
//       </>
//     );
//   }

//   return (
//     <div className="w-full h-full flex flex-col justify-center items-center overflow-hidden">
//       <h1 className="font-bold text-2xl text-blue-900 my-6"> Add Packages</h1>

//       <div className="bg-[#111827] rounded-lg text-white px-20 pt-16 container mx-auto w-fit">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="flex items-center justify-center flex-col gap-2"
//         >
//           <div className="space-y-5 items-start flex flex-col">
//             <div className="md:flex-row flex-col gap-6 justify-center items-center flex  ">
//               <label className="whitespace-nowrap" htmlFor="">
//                 Package Name
//               </label>
//               <input
//                 name="place"
//                 className="rounded-md text-black bg-gray-50 p-2 w-fit md:w-[400px]"
//                 type="text"
//                 {...register("place", {
//                   required: "Please Enter Package Name",
//                 })}
//               />
//             </div>
//             {errors.place && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.place?.message}
//               </p>
//             )}

//             <div className="md:flex-row flex-col flex gap-8 justify-center items-center">
//               <label className="whitespace-nowrap" htmlFor="">
//                 Package Type
//               </label>
//               <input
//                 name="type"
//                 className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
//                 type="text"
//                 {...register("type", { required: "Please Enter Package Type" })}
//               />
//             </div>
//             {errors.type && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.type?.message}
//               </p>
//             )}

//             <div className="md:flex-row flex-col flex gap-4 justify-center items-center">
//               <label htmlFor="">District Name</label>
//               <input
//                 name="disname"
//                 className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
//                 type="text"
//                 {...register("disname", {
//                   required: "Please Enter District name",
//                 })}
//               />
//             </div>
//             {errors.disname && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.disname?.message}
//               </p>
//             )}

//             <div className="md:flex-row flex-col flex gap-5 justify-center items-center">
//               <label htmlFor="place details">Package Details</label>

//               <textarea
//                 name="details"
//                 className="peer block min-h-[auto]  text-black w-full rounded border-0 md:w-[400px] px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
//                 id="exampleFormControlTextarea1"
//                 rows="3"
//                 placeholder="Your message"
//                 {...register("details", {
//                   required: "Please Enter Package details",
//                 })}
//               ></textarea>
//             </div>
//             {errors.details && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.details?.message}
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
//                 name="image"
//                 accept="image/*"
//                 required
//                 onChange={handleFileChange}
//               />
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-700 mt-10 mb-4 text-white w-fit px-8 rounded-lg p-2"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//       <Toaster />
//     </div>
//   );
// };

// export default AddPackage;










// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import toast, { Toaster } from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { addPackage, reset } from "../../Redux/features/package/packageSlice";

// const AddPackage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.package
//   );
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [images, setImages] = useState([]);
//   const [previews, setPreviews] = useState([]);

//   useEffect(() => {
//     if (isError) {
//       toast.error(message);
//     }
//     if (isSuccess) {
//       toast.success(message.message);
//       navigate("/admin");
//     }
//     dispatch(reset());
//   }, [isError, message, isSuccess, dispatch, navigate]);

//   const handleFileChange = (e) => {
//     const files = e.target.files;
//     const fileArray = Array.from(files);

//     // Set previews
//     const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
//     setPreviews(previewUrls);

//     // Store images
//     setImages(fileArray);
//   };

//   const onSubmit = (data) => {
//     const { place, type, disname, details } = data;
//     const packageData = { place, type, disname, description: details, images };
//     dispatch(addPackage(packageData));
//   };

//   if (isLoading) {
//     return (
//       <>
//         <h1>loading....</h1>
//       </>
//     );
//   }

//   return (
//     <div className="w-full h-full flex flex-col justify-center items-center overflow-hidden">
//       <h1 className="font-bold text-2xl text-blue-900 my-6"> Add Packages</h1>

//       <div className="bg-[#111827] rounded-lg text-white px-20 pt-16 container mx-auto w-fit">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="flex items-center justify-center flex-col gap-2"
//         >
//          <div className="space-y-5 items-start flex flex-col">
//             <div className="md:flex-row flex-col gap-6 justify-center items-center flex  ">
//               <label className="whitespace-nowrap" htmlFor="">
//                 Package Name
//               </label>
//               <input
//                 name="place"
//                 className="rounded-md text-black bg-gray-50 p-2 w-fit md:w-[400px]"
//                 type="text"
//                 {...register("place", {
//                   required: "Please Enter Package Name",
//                 })}
//               />
//             </div>
//             {errors.place && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.place?.message}
//               </p>
//             )}

//             <div className="md:flex-row flex-col flex gap-8 justify-center items-center">
//               <label className="whitespace-nowrap" htmlFor="">
//                 Package Type
//               </label>
//               <input
//                 name="type"
//                 className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
//                 type="text"
//                 {...register("type", { required: "Please Enter Package Type" })}
//               />
//             </div>
//             {errors.type && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.type?.message}
//               </p>
//             )}

//             <div className="md:flex-row flex-col flex gap-4 justify-center items-center">
//               <label htmlFor="">District Name</label>
//               <input
//                 name="disname"
//                 className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
//                 type="text"
//                 {...register("disname", {
//                   required: "Please Enter District name",
//                 })}
//               />
//             </div>
//             {errors.disname && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.disname?.message}
//               </p>
//             )}

//             <div className="md:flex-row flex-col flex gap-5 justify-center items-center">
//               <label htmlFor="place details">Package Details</label>

//               <textarea
//                 name="details"
//                 className="peer block min-h-[auto]  text-black w-full rounded border-0 md:w-[400px] px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
//                 id="exampleFormControlTextarea1"
//                 rows="3"
//                 placeholder="Your message"
//                 {...register("details", {
//                   required: "Please Enter Package details",
//                 })}
//               ></textarea>
//             </div>
//             {errors.details && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.details?.message}
//               </p>
//             )}
//              <div className="add_car_input_wrapper">
//             {previews.map((previewUrl, index) => (
//               <img key={index} src={previewUrl} alt={`Preview ${index}`} className="previewImage object-cover md:w-[515px] w-52 h-60" />
//             ))}
//             <input
//               className="w-52 md:w-fit"
//               type="file"
//               name="image"
//               accept="image/*"
//               multiple
//               required
//               onChange={handleFileChange}
//             />
//           </div>          </div>

//           <button
//             type="submit"
//             className="bg-blue-700 mt-10 mb-4 text-white w-fit px-8 rounded-lg p-2"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//       <Toaster />
//     </div>
//   );
// };

// export default AddPackage;








// import { MultiSelect } from "react-multi-select-component";

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import previewImage from "../../assest/Background.png";
// import toast, { Toaster } from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { addPackage, reset } from "../../Redux/features/package/packageSlice";


// const options = [
//   { label: "karapuzha", value: "karapuzha" },
//   { label: "Meenmutty", value: "Meenmutty" },
//   { label: "chembra", value: "chembra" },
//   { label: "athirappally", value: "athirappally" },

// ];



// const AddPackage = () => {
//   const [selected, setSelected] = useState([]);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.package
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [image, setImage] = useState([]);
//   const [preview, setPreview] = useState();

//   useEffect(() => {
//     if (isError) {
//       toast.error(message);
//     }
//     if (isSuccess) {
//       toast.success(message.message);
//       navigate("/vendor/getPackage");
//     }
//     dispatch(reset());
//   }, [isError, message, isSuccess, dispatch]);

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setPreview(URL.createObjectURL(e.target.files[0]));
//     files.forEach((file) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onloadend = () => {
//         setImage((oldArray) => [...oldArray, reader.result]);
//       };
//     });
//   };

//   const onSubmit = (data) => {
//     const { name, type, disname, startDate, endDate,details, price } = data;
//     alert("datas",data)

//     const packageData = {
//       name,
//       type,
//       disname,
//       startDate,
//       endDate,
//       details,
//       price,
//       image,
//     };

//     dispatch(addPackage(packageData));
//   };

 

//   return (
//     <div className="w-full   flex flex-col  items-center overflow-hidden">
//       <h1 className="font-bold text-2xl text-blue-900 my-6"> Add Packages</h1>

//       <div className="bg-[#111827] p-5  ">
        
        





//       <h1>Select Fruits</h1>
//       <pre>{JSON.stringify(selected)}</pre>
//       <MultiSelect
//         options={options}
//         value={selected}
//         onChange={setSelected}
//         labelledBy="Select"
//       />

      
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="flex items-center text-white justify-center flex-col gap-2"
//         >
//           <div className="md:space-y-5 w-full space-y-3 items-start flex flex-col">
//             <div className="md:flex-row w-full  flex-col justify-between items-center flex">
//               <label className="whitespace-nowrap" htmlFor="">
//                 Package Name
//               </label>
//               <input
//                 name="name"
//                 className="rounded-md text-black bg-gray-50 w-full p-2 md:w-[400px]"
//                 type="text"
//                 {...register("name", {
//                   required: "Please Enter Package Name",
//                 })}
//               />
//             </div>
//             {errors.name && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.name?.message}
//               </p>
//             )}




    








//             <div className="md:flex-row w-full  flex-col justify-between items-center flex">
//               <label className="whitespace-nowrap" htmlFor="">
//                 Package Type
//               </label>
//               <input
//                 name="type"
//                 className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
//                 type="text"
//                 {...register("type", { required: "Please Enter Package Type" })}
//               />
//             </div>
//             {errors.type && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.type?.message}
//               </p>
//             )}

//             <div className="md:flex-row w-full  flex-col justify-between items-center flex">
//               <label className="whitespace-nowrap" htmlFor="">
//                 Package price
//               </label>
//               <input
//                 name="price"
//                 className="rounded-md text-black bg-gray-50 w-full p-2 md:w-[400px]"
//                 type="number"
//                 {...register("price", {
//                   required: "Please Enter Price",
//                 })}
//               />
//             </div>
//             {errors.price && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.price?.message}
//               </p>
//             )}

//             <div className="md:flex-row w-full  flex-col justify-between items-center flex">
//               <label htmlFor="">District Name</label>
//               <input
//                 name="disname"
//                 className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
//                 type="text"
//                 {...register("disname", {
//                   required: "Please Enter District name",
//                 })}
//               />
//             </div>
//             {errors.disname && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.disname?.message}
//               </p>
//             )}

//             <div
//               className="flex justify-between flex-col md:flex-row items-center w-full  text-blue-gray-900 rounded-md"
//               placeholder="Date"
//             >
//               <label className="text-white" htmlFor="">
//                 StartDate
//               </label>

//               <input
//                 type="Date"
//                 name="startDate"
//                 className=" p-[6px] border-2 md:w-[400px] rounded-md"
//                 placeholder="Date"
//                 {...register("startDate", { required: "Please Enter Date" })}
//               />
//             </div>
//             {errors.startDate && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.startDate?.message}
//               </p>
//             )}


// <div
//               className="flex justify-between flex-col md:flex-row items-center w-full  text-blue-gray-900 rounded-md"
//               placeholder="Date"
//             >
//               <label className="text-white" htmlFor="">
//                 EndDate
//               </label>

//               <input
//                 type="Date"
//                 name="endDate"
//                 className=" p-[6px] border-2 md:w-[400px] rounded-md"
//                 placeholder="EndDate"
//                 {...register("endDate", { required: "Please choose Date" })}
//               />
//             </div>
//             {errors.endDate && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.endDate?.message}
//               </p>
//             )}




//             <div className="md:flex-row w-full   flex-col justify-between items-center flex">
//               <label
//                 htmlFor="place details"
//                 className="flex md:gap-0 gap-2 md:flex-col"
//               >
//                 {" "}
//                 <span>Package</span> <span>Details</span>{" "}
//               </label>

//               <textarea
//                 name="details"
//                 className="peer block min-h-[auto]  text-black w-full rounded border-0 md:w-[400px] px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
//                 id="exampleFormControlTextarea1"
//                 rows="3"
//                 placeholder="Your message"
//                 {...register("details", {
//                   required: "Please Enter Package details",
//                 })}
//               ></textarea>
//             </div>
//             {errors.details && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.details?.message}
//               </p>
//             )}

//             <div className="flex flex-col justify-center">
//               <img
//                 className="previewImage object-cover md:w-[515px] min-w-52 md:h-60"
//                 src={preview ? preview : previewImage}
//                 alt="preview"
//               />
//               <input
//                 className="md:w-fit text-white"
//                 type="file"
//                 name="image"
//                 multiple
//                 required
//                 onChange={handleFileChange}
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-700 mt-6 mb-4 text-white w-fit px-8 rounded-lg p-2"
//           >
//             {" "}
//             {isLoading ? "Uploading..." : "Submit"}
//           </button>
//         </form>
//       </div>
//       <Toaster />
//     </div>
//   );
// };

// export default AddPackage;











        
          {/* Your form inputs for package details here */}

//           <div className="md:space-y-5 w-full space-y-3 items-start flex flex-col">
//             <div className="md:flex-row w-full  flex-col justify-between items-center flex">
//               <label className="whitespace-nowrap" htmlFor="">
//                Package Name
//                </label>
//                <input
//                 name="name"
//                 className="rounded-md text-black bg-gray-50 w-full p-2 md:w-[400px]"
//                 type="text"
//                 {...register("name", {
//                   required: "Please Enter Package Name",
//                 })}
//               />
//             </div>
//             {errors.name && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.name?.message}
//               </p>
//             )}

//             <div className="md:flex-row w-full  flex-col justify-between items-center flex">
//               <label className="whitespace-nowrap" htmlFor="">
//                 Package Type
//               </label>
//               <input
//                 name="type"
//                 className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
//                 type="text"
//                 {...register("type", { required: "Please Enter Package Type" })}
//               />
//             </div>
//             {errors.type && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.type?.message}
//               </p>
//             )}

//             <div className="md:flex-row w-full  flex-col justify-between items-center flex">
//               <label className="whitespace-nowrap" htmlFor="">
//                 Package price
//               </label>
//               <input
//                 name="price"
//                 className="rounded-md text-black bg-gray-50 w-full p-2 md:w-[400px]"
//                 type="number"
//                 {...register("price", {
//                   required: "Please Enter Price",
//                 })}
//               />
//             </div>
//             {errors.price && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.price?.message}
//               </p>
//             )}

//             <div className="md:flex-row w-full  flex-col justify-between items-center flex">
//               <label htmlFor="">District Name</label>
//               <input
//                 name="disname"
//                 className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
//                 type="text"
//                 {...register("disname", {
//                   required: "Please Enter District name",
//                 })}
//               />
//             </div>
//             {errors.disname && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.disname?.message}
//               </p>
//             )}

//             <div
//               className="flex justify-between flex-col md:flex-row items-center w-full  text-blue-gray-900 rounded-md"
//               placeholder="Date"
//             >
//               <label className="text-white" htmlFor="">
//                 StartDate
//               </label>

//               <input
//                 type="Date"
//                 name="startDate"
//                 className=" p-[6px] border-2 md:w-[400px] rounded-md"
//                 placeholder="Date"
//                 {...register("startDate", { required: "Please Enter Date" })}
//               />
//             </div>
//             {errors.startDate && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.startDate?.message}
//               </p>
//             )}


// <div
//               className="flex justify-between flex-col md:flex-row items-center w-full  text-blue-gray-900 rounded-md"
//               placeholder="Date"
//             >
//               <label className="text-white" htmlFor="">
//                 EndDate
//               </label>

//               <input
//                 type="Date"
//                 name="endDate"
//                 className=" p-[6px] border-2 md:w-[400px] rounded-md"
//                 placeholder="EndDate"
//                 {...register("endDate", { required: "Please choose Date" })}
//               />
//             </div>
//             {errors.endDate && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.endDate?.message}
//               </p>
//             )}




//             <div className="md:flex-row w-full   flex-col justify-between items-center flex">
//               <label
//                 htmlFor="place details"
//                 className="flex md:gap-0 gap-2 md:flex-col"
//               >
//                 {" "}
//                 <span>Package</span> <span>Details</span>{" "}
//               </label>

//               <textarea
//                 name="details"
//                 className="peer block min-h-[auto]  text-black w-full rounded border-0 md:w-[400px] px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
//                 id="exampleFormControlTextarea1"
//                 rows="3"
//                 placeholder="Your message"
//                 {...register("details", {
//                   required: "Please Enter Package details",
//                 })}
//               ></textarea>
//             </div>
//             {errors.details && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.details?.message}
//               </p>
//             )}

//             <div className="flex flex-col justify-center">
//               <img
//                 className="previewImage object-cover md:w-[515px] min-w-52 md:h-60"
//                 src={preview ? preview : previewImage}
//                 alt="preview"
//               />
//               <input
//                 className="md:w-fit text-white"
//                 type="file"
//                 name="image"
//                 multiple
//                 required
//                 onChange={handleFileChange}
//               />
//             </div>
//           </div>



// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import previewImage from "../../assest/Background.png";
// import toast, { Toaster } from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { addPackage, reset } from "../../Redux/features/package/packageSlice";

// const AddPackage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.package
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
  
//   const [image, setImage] = useState([]);
//   const [preview, setPreview] = useState();
//   const [selectedTouristPlaces, setSelectedTouristPlaces] = useState([]);

//   useEffect(() => {
//     if (isError) {
//       toast.error(message);
//     }
//     if (isSuccess) {
//       toast.success(message.message);
//       navigate("/vendor/addPackage");
//     }
//     dispatch(reset());
//   }, [isError, message, isSuccess, dispatch]);

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     files.forEach((file) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onloadend = () => {
//         setImage((oldArray) => [...oldArray, reader.result]);
//       };
//     });
//   };

//   const handleAddTouristPlace = (touristPlaceId) => {
//     setSelectedTouristPlaces((prevSelectedTouristPlaces) => [
//       ...prevSelectedTouristPlaces,
//       touristPlaceId,
//     ]);
//   };

//   const handleRemoveTouristPlace = (touristPlaceId) => {
//     setSelectedTouristPlaces((prevSelectedTouristPlaces) =>
//       prevSelectedTouristPlaces.filter((id) => id !== touristPlaceId)
//     );
//   };

//   const onSubmit = (data) => {
//     const { name, type, disname, startDate, endDate, details, price } = data;

//     const packageData = {
//       name,
//       type,
//       disname,
//       startDate,
//       endDate,
//       details,
//       price,
//       image,
//       touristPlaces: selectedTouristPlaces,
//     };

//     dispatch(addPackage(packageData));
//   };

//   return (
//     <div className="w-full flex flex-col items-center overflow-hidden">
//       <h1 className="font-bold text-2xl text-blue-900 my-6">Add Packages</h1>

//       <div className="bg-[#111827] p-5">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="flex items-center text-white justify-center flex-col gap-2"
//         >
//           {/* Your form inputs for package details here */}

//           {/* ... */}
          
//           <div>
//             {/* Selected tourist places */}
//             {selectedTouristPlaces.map((placeId) => (
//               <div key={placeId}>
//                 <span>{placeId}</span>
//                 <button onClick={() => handleRemoveTouristPlace(placeId)}>
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Display the tourist places options */}
//           <div>
//             {/* Your code to display the tourist places options */}
//           </div>

//           {/* Button to add a tourist place */}
//           <button
//             type="button"
//             onClick={() => handleAddTouristPlace(selectedTouristPlaces)}
//           >
//             Add Tourist Place
//           </button>

//           <button
//             type="submit"
//             className="bg-blue-700 mt-6 mb-4 text-white w-fit px-8 rounded-lg p-2"
//           >
//             {isLoading ? "Uploading..." : "Submit"}
//           </button>
//         </form>
//       </div>
//       <Toaster />
//     </div>
//   );
// };

// export default AddPackage;




// orginal


// import { MultiSelect } from "react-multi-select-component";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";


// import { useDispatch, useSelector } from "react-redux";
// import toast, { Toaster } from "react-hot-toast";
// import { reset, addPackage } from "../../Redux/features/package/packageSlice";
// import { getPlace } from "../../Redux/features/SelectPlace/SelectPlaceSlice";

// import previewImage from "../../assest/Background.png";

// const AddPackage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { placeLoading, placeError, placeSuccess, placeMessage, selectPlace } = useSelector(
//     (state) => state.selectPlace
//   );
//   const { IsLoading, IsError, IsSuccess, Message } =
//   useSelector((state) => state.package);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [image, setImage] = useState([]);
//   const [preview, setPreview] = useState();
//   const [selected, setSelected] = useState([]);
//   const [options, setOptions] = useState([]);

//   useEffect(() => {
//     dispatch(getPlace());
//   }, [dispatch]);

//   useEffect(() => {
//     if (IsError) {
//       toast.error(Message);
//     }
//     if (IsSuccess) {
//       toast.success(Message.message);
//       navigate("/vendor/getPackage");
//     }
//     dispatch(reset());
//   }, [IsError, Message, IsSuccess, dispatch, navigate]);

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setPreview(URL.createObjectURL(e.target.files[0]));
//     files.forEach((file) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onloadend = () => {
//         setImage((oldArray) => [...oldArray, reader.result]);
//       };
//     });
//   };

//   const onSubmit = (data) => {
//     const { name, type, disname, startDate, endDate, details, price } = data;

//     const packageData = {
//       name,
//       type,
//       disname,
//       startDate,
//       endDate,
//       details,
//       price,
//       image,
//       place: selected.map((TPlace) => TPlace.value),
//     };

//     dispatch(addPackage(packageData));
//   };

//   useEffect(() => {
//     const options = selectPlace
//       ? selectPlace.map((place) => ({
//           label: place.place,
//           value: [place._id,place.place]
//         }))
//       : [];
//     setOptions(options);
//   }, [selectPlace]);

//   return (
//     <div className="w-full flex flex-col items-center overflow-hidden">
//       <h1 className="font-bold text-2xl text-blue-900 my-6"> Add Packages</h1>

//       <div className="bg-[#111827] p-5">
//         <h1>Select Tourist Place</h1>
//         <MultiSelect
//           options={options}
//           value={selected}
//           onChange={setSelected}
//           labelledBy="Select"
//         />
// <form onSubmit={handleSubmit(onSubmit)} className="flex items-center text-white justify-center flex-col gap-2">

     
//           <div className="md:space-y-5 w-full space-y-3 items-start flex flex-col">
//             <div className="md:flex-row w-full  flex-col justify-between items-center flex">
//               <label className="whitespace-nowrap" htmlFor="name">
//                 Package Name
//               </label>
//               <input
//                 name="name"
//                 className="rounded-md text-black bg-gray-50 w-full p-2 md:w-[400px]"
//                 type="text"
//                 {...register("name", {
//                   required: "Please Enter Package Name",
//                 })}
//               />
//             </div>
//             {errors.name && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.name?.message}
//               </p>
//             )}
// <div className="md:flex-row w-full  flex-col justify-between items-center flex">
//               <label className="whitespace-nowrap" htmlFor="">
//                 Package Type
//               </label>
//               <input
//                 name="type"
//                 className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
//                 type="text"
//                 {...register("type", { required: "Please Enter Package Type" })}
//               />
//             </div>
//             {errors.type && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.type?.message}
//               </p>
//             )}

//             <div className="md:flex-row w-full  flex-col justify-between items-center flex">
//               <label className="whitespace-nowrap" htmlFor="">
//                 Package price
//               </label>
//               <input
//                 name="price"
//                 className="rounded-md text-black bg-gray-50 w-full p-2 md:w-[400px]"
//                 type="number"
//                 {...register("price", {
//                   required: "Please Enter Price",
//                 })}
//               />
//             </div>
//             {errors.price && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.price?.message}
//               </p>
//             )}

//             <div className="md:flex-row w-full  flex-col justify-between items-center flex">
//               <label htmlFor="">District Name</label>
//               <input
//                 name="disname"
//                 className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
//                 type="text"
//                 {...register("disname", {
//                   required: "Please Enter District name",
//                 })}
//               />
//             </div>
//             {errors.disname && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.disname?.message}
//               </p>
//             )}

//             <div
//               className="flex justify-between flex-col md:flex-row items-center w-full  text-blue-gray-900 rounded-md"
//               placeholder="Date"
//             >
//               <label className="text-white" htmlFor="">
//                 StartDate
//               </label>

//               <input
//                 type="Date"
//                 name="startDate"
//                 className=" p-[6px] border-2 md:w-[400px] rounded-md"
//                 placeholder="Date"
//                 {...register("startDate", { required: "Please Enter Date" })}
//               />
//             </div>
//             {errors.startDate && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.startDate?.message}
//               </p>
//             )}

//             <div
//               className="flex justify-between flex-col md:flex-row items-center w-full  text-blue-gray-900 rounded-md"
//               placeholder="Date"
//             >
//               <label className="text-white" htmlFor="">
//                 EndDate
//               </label>

//               <input
//                 type="Date"
//                 name="endDate"
//                 className=" p-[6px] border-2 md:w-[400px] rounded-md"
//                 placeholder="EndDate"
//                 {...register("endDate", { required: "Please choose Date" })}
//               />
//             </div>
//             {errors.endDate && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.endDate?.message}
//               </p>
//             )}

//             <div className="md:flex-row w-full   flex-col justify-between items-center flex">
//               <label
//                 htmlFor="place details"
//                 className="flex md:gap-0 gap-2 md:flex-col"
//               >
//                 {" "}
//                 <span>Package</span> <span>Details</span>{" "}
//               </label>

//               <textarea
//                 name="details"
//                 className="peer block min-h-[auto]  text-black w-full rounded border-0 md:w-[400px] px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
//                 id="exampleFormControlTextarea1"
//                 rows="3"
//                 placeholder="Your message"
//                 {...register("details", {
//                   required: "Please Enter Package details",
//                 })}
//               ></textarea>
//             </div>
//             {errors.details && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.details?.message}
//               </p>
//             )}

//             <div className="flex flex-col justify-center">
//               <img
//                 className="previewImage object-cover md:w-[515px] min-w-52 md:h-60"
//                 src={preview ? preview : previewImage}
//                 alt="preview"
//               />
//               <input
//                 className="md:w-fit text-white"
//                 type="file"
//                 name="image"
//                 multiple
//                 required
//                 onChange={handleFileChange}
//               />
//             </div>

//           </div>

//           <button
//             type="submit"
//             className="bg-blue-700 mt-6 mb-4 text-white w-fit px-8 rounded-lg p-2"
//           >
//             {IsLoading ? "Uploading..." : "Submit"}
//           </button>
//         </form>
//       </div>
//       <Toaster />
//     </div>
//   );
// };

// export default AddPackage;













// import { MultiSelect } from "react-multi-select-component";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import previewImage from "../../assest/Background.png";
// import toast, { Toaster } from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { reset,addPackage } from "../../Redux/features/package/packageSlice";



// import {getPlace} from "../../Redux/features/SelectPlace/SelectPlaceSlice"

// const AddPackage = () => {

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const {IsLoading, IsError, IsSuccess, Message,selectPlace } =
//   useSelector((state) => state.selectPlace);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [image, setImage] = useState([]);
//   const [preview, setPreview] = useState();
//   const [selected, setSelected] = useState([]);
//   const [options, setOptions] = useState([]);



//   useEffect(() => {
//     dispatch(getPlace());
//   }, [dispatch, getPlace]);
  




//   useEffect(() => {
//     if (IsError) {
//       toast.error(Message);
//     }
//     if (IsSuccess) {
//       toast.success(Message.message);
//       navigate("/vendor/getPackage");
//     }
//     dispatch(reset());
//   }, [IsError, Message, IsSuccess, dispatch, navigate]);




//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setPreview(URL.createObjectURL(e.target.files[0]));
//     files.forEach((file) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onloadend = () => {
//         setImage((oldArray) => [...oldArray, reader.result]);
//       };
//     });
//   };

//   const onSubmit = (data) => {
//     const { name, type, disname, startDate, endDate, details, price } = data;

//     const packageData = {
//       name,
//       type,
//       disname,
//       startDate,
//       endDate,
//       details,
//       price,
//       image,
//       place: selected.map((TPlace) => TPlace.value),
//     };

//     dispatch(addPackage(packageData));
//   };
//   useEffect(() => {
//     const options = selectPlace
//       ? selectPlace?.map((place) => ({
//           label: place.place,
//           value: place._id,
//         }))
//       : [];
//       setOptions(options)
//   }, [selectPlace]);

//   return (
//     <div className="w-full flex flex-col items-center overflow-hidden">
//       <h1 className="font-bold text-2xl text-blue-900 my-6"> Add Packages</h1>

//       <div className="bg-[#111827] p-5">
//         <h1>Select Tourist Place</h1>
//         <MultiSelect
//           options={options}
//           value={selected}
//           onChange={setSelected}
//           labelledBy="Select"
//         />

//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="flex items-center text-white justify-center flex-col gap-2"
//         ></form>

//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="flex items-center text-white justify-center flex-col gap-2"
//         >
//           <div className="md:space-y-5 w-full space-y-3 items-start flex flex-col">
//             <div className="md:flex-row w-full  flex-col justify-between items-center flex">
//               <label className="whitespace-nowrap" htmlFor="">
//                 Package Name
//               </label>
//               <input
//                 name="name"
//                 className="rounded-md text-black bg-gray-50 w-full p-2 md:w-[400px]"
//                 type="text"
//                 {...register("name", {
//                   required: "Please Enter Package Name",
//                 })}
//               />
//             </div>
//             {errors.name && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.name?.message}
//               </p>
//             )}
//             <div className="md:flex-row w-full  flex-col justify-between items-center flex">
//               <label className="whitespace-nowrap" htmlFor="">
//                 Package Type
//               </label>
//               <input
//                 name="type"
//                 className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
//                 type="text"
//                 {...register("type", { required: "Please Enter Package Type" })}
//               />
//             </div>
//             {errors.type && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.type?.message}
//               </p>
//             )}

//             <div className="md:flex-row w-full  flex-col justify-between items-center flex">
//               <label className="whitespace-nowrap" htmlFor="">
//                 Package price
//               </label>
//               <input
//                 name="price"
//                 className="rounded-md text-black bg-gray-50 w-full p-2 md:w-[400px]"
//                 type="number"
//                 {...register("price", {
//                   required: "Please Enter Price",
//                 })}
//               />
//             </div>
//             {errors.price && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.price?.message}
//               </p>
//             )}

//             <div className="md:flex-row w-full  flex-col justify-between items-center flex">
//               <label htmlFor="">District Name</label>
//               <input
//                 name="disname"
//                 className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
//                 type="text"
//                 {...register("disname", {
//                   required: "Please Enter District name",
//                 })}
//               />
//             </div>
//             {errors.disname && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.disname?.message}
//               </p>
//             )}

//             <div
//               className="flex justify-between flex-col md:flex-row items-center w-full  text-blue-gray-900 rounded-md"
//               placeholder="Date"
//             >
//               <label className="text-white" htmlFor="">
//                 StartDate
//               </label>

//               <input
//                 type="Date"
//                 name="startDate"
//                 className=" p-[6px] border-2 md:w-[400px] rounded-md"
//                 placeholder="Date"
//                 {...register("startDate", { required: "Please Enter Date" })}
//               />
//             </div>
//             {errors.startDate && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.startDate?.message}
//               </p>
//             )}

//             <div
//               className="flex justify-between flex-col md:flex-row items-center w-full  text-blue-gray-900 rounded-md"
//               placeholder="Date"
//             >
//               <label className="text-white" htmlFor="">
//                 EndDate
//               </label>

//               <input
//                 type="Date"
//                 name="endDate"
//                 className=" p-[6px] border-2 md:w-[400px] rounded-md"
//                 placeholder="EndDate"
//                 {...register("endDate", { required: "Please choose Date" })}
//               />
//             </div>
//             {errors.endDate && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.endDate?.message}
//               </p>
//             )}

//             <div className="md:flex-row w-full   flex-col justify-between items-center flex">
//               <label
//                 htmlFor="place details"
//                 className="flex md:gap-0 gap-2 md:flex-col"
//               >
//                 {" "}
//                 <span>Package</span> <span>Details</span>{" "}
//               </label>

//               <textarea
//                 name="details"
//                 className="peer block min-h-[auto]  text-black w-full rounded border-0 md:w-[400px] px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
//                 id="exampleFormControlTextarea1"
//                 rows="3"
//                 placeholder="Your message"
//                 {...register("details", {
//                   required: "Please Enter Package details",
//                 })}
//               ></textarea>
//             </div>
//             {errors.details && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.details?.message}
//               </p>
//             )}

//             <div className="flex flex-col justify-center">
//               <img
//                 className="previewImage object-cover md:w-[515px] min-w-52 md:h-60"
//                 src={preview ? preview : previewImage}
//                 alt="preview"
//               />
//               <input
//                 className="md:w-fit text-white"
//                 type="file"
//                 name="image"
//                 multiple
//                 required
//                 onChange={handleFileChange}
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-700 mt-6 mb-4 text-white w-fit px-8 rounded-lg p-2"
//           >
//             {" "}
//             {IsLoading ? "Uploading..." : "Submit"}
//           </button>
//         </form>
//       </div>
//       <Toaster />
//     </div>
//   );
// };

// export default AddPackage;












          
        



