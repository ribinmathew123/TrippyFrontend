// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { updatePlace } from "../../../Redux/features/updatePlace/updatePlaceSlice";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchPackage,packageReset } from "../../../Redux/features/GetPackage/GetPackageSlice";
// import toast, { Toaster } from "react-hot-toast";

// function EditPackage() {
//   const { selectedPackage } = useSelector((state) => state.GetPackage,
//   );

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();

//   console.log("id is",id);

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [editedPackage, setEditedPackage] = useState();

//   useEffect(() => {
//     dispatch(fetchPackage(id));

//   }, [dispatch, id]);

//   useEffect(() => {
//     setEditedPackage({
//       name: selectedPackage?.name,
//       type: selectedPackage?.type,
//       district: selectedPackage?.district,
//       price: selectedPackage?.price,
//       day: selectedPackage?.day,

//       night: selectedPackage?.night,

//       details: selectedPackage?.details,
//       image: selectedPackage?.image?.url,
//     });
//   }, [dispatch, selectedPackage]);

//   const handleChange = (e) => {
//     setEditedPackage({ ...editedPackage, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (event,publicId) => {
//     setEditedPackage(prev=>{
//       return {...prev,publicId}})
//     setSelectedImage(event.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const { place, type, district, description ,publicId,} = editedPackage;

//     const packageData = { place, type, district, description,publicId};

//     const payload = { packageData, id: selectedPackage._id };

//     const formData = new FormData();
//   formData.append("placeData", JSON.stringify(packageData));
//   formData.append("id", selectedPackage._id);
//   formData.append("image", selectedImage);

//     dispatch(updatePlace(formData));
//     navigate("/vendor/getPackage");
//     dispatch(packageReset())
//   };

// return (
//   <div className="w-full h-full flex flex-col justify-center items-center overflow-hidden">
//     <h1 className="font-bold text-2xl text-blue-900 my-6">
//       Add Tourist Places
//     </h1>

//     <div className="bg-[#111827] rounded-lg text-white px-20 pt-16 container mx-auto w-fit">
//       <form onSubmit={handleSubmit}

//         className="flex items-center justify-center flex-col gap-2"
//       >
//         <div className="space-y-5 items-start flex flex-col">
//           <div className="md:flex-row flex-col gap-6 justify-center items-center flex  ">
//             <label className="whitespace-nowrap" htmlFor="">
//             Package Name

//             </label>
//             <input

//               name="name"
//               type="text"

//           value={editedPackage?.name}
//           onChange={handleChange}
//               className="rounded-md text-black bg-gray-50 p-2 w-fit md:w-[400px]"
//             />
//           </div>

//           <div className="md:flex-row flex-col gap-6 justify-center items-center flex  ">
//             <label className="whitespace-nowrap" htmlFor="">
//             Package price(per head)

//             </label>
//             <input

//               name="price"
//               type="text"

//           value={editedPackage?.price}
//           onChange={handleChange}
//               className="rounded-md text-black bg-gray-50 p-2 w-fit md:w-[400px]"
//             />
//           </div>

//           <div className="md:flex-row flex-col flex gap-8 justify-center items-center">
//             <label className="whitespace-nowrap" htmlFor="">
//               No.of.Day
//             </label>
//             <input
//               name="day"
//               className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
//               type="text"
//                 value={editedPackage?.day}
//                 onChange={handleChange}
//             />
//           </div>

//           <div className="md:flex-row flex-col flex gap-8 justify-center items-center">
//             <label className="whitespace-nowrap" htmlFor="">
//               No.of.Night
//             </label>
//             <input
//               name="night"
//               className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
//               type="text"
//                 value={editedPackage?.night}
//                 onChange={handleChange}
//             />
//           </div>

//           <div className="md:flex-row flex-col flex gap-4 justify-center items-center">
//             <label htmlFor="">District Name</label>
//             <input
//               className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
//               type="text"
//                     name="district"
//                     value={editedPackage?.district}
//                     onChange={handleChange}

//             />
//           </div>

//           <div className="md:flex-row flex-col flex gap-4 justify-center items-center">
//             <label htmlFor="">Package Ditails</label>
//             <input
//               className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
//               type="text"
//                     name="details"
//                     value={editedPackage?.details}
//                     onChange={handleChange}
//             />
//           </div>

//           <div className="flex flex-col justify-center">
//           {selectedImage ? (
//             <div className="m-4">
//               <img
//                 src={URL.createObjectURL(selectedImage)}
//                 alt="Preview"
//                 className="object-cover md:w-[100px] w-60 h-60 rounded-lg"
//                 />
//             </div>
//           ) : (
//             selectedPackage?.image?.length > 0 && (
//               <div className=" m-10 ">
//                 <img
//                   src={selectedPackage?.image[0]?.url}
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
//               selectedPackage?.image[0]?.public_id)}
//             className="w-52 md:w-fit"
//           />
//         </div>

// </div>
//           <div className="w-full flex justify-center">
//           <button
//             type="submit"
//             className="bg-blue-700 mt-6 mb-4 text-white w-fit px-8 rounded-lg p-2"
//           >
//             Update
//           </button>
//       </div>
//       </form>
//     </div>

//     <Toaster />
//   </div>
// )

// }
// export default EditPackage;

// import { MultiSelect } from "react-multi-select-component";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import toast, { Toaster } from "react-hot-toast";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import React, { useState, useEffect } from "react";
// import * as Yup from "yup";
// import { updatePlace } from "../../../Redux/features/updatePlace/updatePlaceSlice";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchPackage,packageReset } from "../../../Redux/features/GetPackage/GetPackageSlice";

// function EditPackage() {
//   const { selectedPackage } = useSelector((state) => state.GetPackage,
//   );

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();

//   console.log("id is",id);

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [editedPackage, setEditedPackage] = useState();

//   useEffect(() => {
//     dispatch(fetchPackage(id));

//   }, [dispatch, id]);

//   useEffect(() => {
//     setEditedPackage({
//       name: selectedPackage?.name,
//       type: selectedPackage?.type,
//       district: selectedPackage?.district,
//       price: selectedPackage?.price,
//       day: selectedPackage?.day,

//       night: selectedPackage?.night,

//       details: selectedPackage?.details,
//       image: selectedPackage?.image?.url,
//     });
//   }, [dispatch, selectedPackage]);

//   const handleChange = (e) => {
//     setEditedPackage({ ...editedPackage, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (event,publicId) => {
//     setEditedPackage(prev=>{
//       return {...prev,publicId}})
//     setSelectedImage(event.target.files[0]);
//   };

//   const { selectPlace, selectCategory } = useSelector(
//     (state) => state.PlaceAndCat
//   );

//   const { isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.package
//   );
//   const { selectedPackage } = useSelector((state) => state.GetPackage);

//   const [image, setImage] = useState([]);
//   const [preview, setPreview] = useState();
//   const [selected, setSelected] = useState([]);
//   const [options, setOptions] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const [plan, setPlan] = useState([
//     {
//       totalDay: "",
//       title: "",
//       description: "",
//       subtitle: "",
//       totalTime: ""
//     }
//   ]);

//   const handlePlanChange = (e, index, field) => {
//     const updatedPlan = [...plan];
//     updatedPlan[index][field] = e.target.value;
//     setPlan(updatedPlan);
//   };
//   const addPlan = () => {
//     setPlan([...plan, {
//       totalDay: "",
//       title: "",
//       description: "",
//       subtitle: "",
//       totalTime: ""
//     }]);
//   };

//   const removePlan = (index) => {
//     const updatedPlan = [...plan];
//     updatedPlan.splice(index, 1);
//     setPlan(updatedPlan);
//   };

//   useEffect(() => {
//     dispatch(getPlaceAndCategory());
//   }, [dispatch]);

//   useEffect(() => {
//     if (isError) {
//       toast.error(message);
//     }
//     if (isSuccess) {
//       toast.success(message.message);
//       navigate("/vendor/getPackage");
//     }
//     dispatch(reset());
//   }, [isError, message, isSuccess, dispatch, navigate]);

//   const initialValues = {
//     file: null,
//     name: "",
//     price: "",
//     disname: "",
//     startDate: "",
//     endDate: "",
//     details: "",
//     day: "",
//     night: "",
//     offer:"",
//     offerEndDate:"",
//   };

//   const validationSchema = Yup.object().shape({
//     name: Yup.string().required("Name is required"),
//     // price: Yup.number().required("Price is requied"),
//     // day: Yup.number().required("Day is requied"),
//     // night: Yup.number().required("Day is requied"),
//     // endDate: Yup.date().required("Date is requied"),
//     // startDate: Yup.date().required("Date is requied"),
//     // details: Yup.string().required("Details is required"),
//     // disname: Yup.string().required("District name is required"),
//     // selected: Yup.array().of(Yup.string()).required("required"),

//     // file: Yup.mixed()
//     //   .required("Image is required")
//     //   .test("fileFormat", "Invalid image format", (value) => {
//     //     if (!value) return false;
//     //     const supportedFormats = ["image/jpeg", "image/jpg", "image/png"];
//     //     return supportedFormats.includes(value.type);
//       // }),
//   });

//   const handleSubmit = (values) => {
//     const data = new FormData();
//     data.append("name", values.name);
//     data.append("price", values.price);

//     data.append("disname", values.disname);

//     data.append("startDate", values.startDate);
//     data.append("endDate", values.endDate);
//     data.append("details", values.details);

//     data.append("day", values.day);

//     data.append("night", values.night);
//     data.append("offer", values.offer);
//     data.append("offerEndDate", values.offerEndDate);

//     data.append("vendorId", vendorId);
//     data.append("vendorName", vendorName);

//     data.append("image", values.file);

//     data.append("category", selectedCategory.value);

//     data.append(
//       "place",
//       JSON.stringify(selected.map((TPlace) => TPlace.value))
//     );

//     plan.forEach((item, index) => {
//       data.append(`plan[${index}][totalDay]`, item.totalDay);
//       data.append(`plan[${index}][title]`, item.title);
//       data.append(`plan[${index}][description]`, item.description);
//       data.append(`plan[${index}][subtitle]`, item.subtitle);
//       data.append(`plan[${index}][totalTime]`, item.totalTime);
//     });

//     dispatch(addPackage(data));
//   };

//   useEffect(() => {
//     const options = selectPlace
//       ? selectPlace.map((place) => ({
//           label: place.place,
//           key: place.id,
//           value: place,
//         }))
//       : [];
//     setOptions(options);
//   }, [selectPlace]);

//   return (
//     <div className="flex flex-col items-center overflow-hidden bg-white p-5 md:p-10">
//       <h1 className="font-bold text-2xl text-blue-900 my-6"> Add Packages</h1>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         <div className=" container lg:px-32 p-5 py-10 bg-green-200 shadow-lg">
//           <div className="flex justify-center flex-col gap-2 mb-4">
//             <h1 className="text-black font-medium">Select Tourist Place</h1>
//             <MultiSelect
//               name="selected"
//               options={options}
//               value={selected}
//               onChange={setSelected}
//               labelledBy="Select Tourist Place "
//             />
//             <ErrorMessage
//               name="selected"
//               component="div"
//               className="text-red-500"
//             />
//           </div>

//           <h1 className="text-black font-medium">Select Category</h1>

//           <select
//             id="categories"
//             name="cat"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             onChange={(e) => {
//               const selectedValue = e.target.value;
//               const selectedLabel =
//                 e.target.options[e.target.selectedIndex].label;
//               setSelectedCategory({
//                 value: selectedValue,
//                 label: selectedLabel,
//               });
//             }}
//           >
//             <option defaultValue>Select Category</option>
//             {selectCategory?.map((category) => (
//               <option
//                 key={category._id}
//                 value={`${category._id},${category.name}`}
//               >
//                 {category.name}
//               </option>
//             ))}
//           </select>

//           <Form className="flex items-center justify-center flex-col gap-2">
//             <div className="md:space-y-5 w-full space-y-3 items-start flex flex-col">
//               <div className="flex justify-between flex-col md:flex-row w-full gap-2 md:gap-10">
//                 <div className=" w-full  flex-col gap-2 flex">
//                   <label
//                     className="whitespace-nowrap text-black font-medium"
//                     htmlFor="name"
//                   >
//                     Package Name
//                   </label>

//                   <Field
//                     name="name"
//                     placeholder="Package Name"
//                     className="rounded-md text-black border-2 border-teal-600 w-full p-2"
//                     type="text"
//                   />
//                   <ErrorMessage
//                     name="name"
//                     component="div"
//                     className="text-red-500"
//                   />
//                 </div>

//                 <div className=" w-full gap-2  flex-col flex">
//                   <label
//                     className="whitespace-nowrap text-black font-medium"
//                     htmlFor="name"
//                   >
//                     Package Price
//                   </label>
//                   <Field
//                     name="price"
//                     placeholder="Package price"
//                     className="rounded-md text-black border-2 border-teal-600 w-full p-2"
//                     type="number"
//                   />
//                   <ErrorMessage
//                     name="price"
//                     component="div"
//                     className="text-red-500"
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-col md:flex-row justify-between w-full gap-2 md:gap-10">
//                 <div className=" w-full gap-2  flex-col flex">
//                   <label
//                     className="whitespace-nowrap text-black font-medium"
//                     htmlFor=""
//                   >
//                     No.of Day
//                   </label>
//                   <Field
//                     name="day"
//                     placeholder="no.of Day"
//                     className="rounded-md text-black border-2 border-green-600 w-full p-2"
//                     type="number"
//                   />
//                   <ErrorMessage
//                     name="day"
//                     component="div"
//                     className="text-red-500"
//                   />
//                 </div>

//                 <div className=" w-full gap-2  flex-col flex">
//                   <label className="whitespace-nowrap" htmlFor="">
//                     no.of night
//                   </label>
//                   <Field
//                     name="night"
//                     className="rounded-md text-black border-2 border-teal-600 w-full p-2"
//                     type="number"
//                   />
//                   <ErrorMessage
//                     name="night"
//                     component="div"
//                     className="text-red-500"
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-between w-full gap-2 flex-col md:flex-row  md:gap-10">
//                 <div className=" w-full gap-2  flex-col flex">
//                   <label className="text-black font-semibold" htmlFor="">
//                     StartDate
//                   </label>

//                   <Field
//                     name="startDate"
//                     type="Date"
//                     className="rounded-md text-black border-2 border-green-600 w-full p-2"
//                     placeholder="Date"
//                   />
//                   <ErrorMessage
//                     name="startDate"
//                     component="div"
//                     className="text-red-500"
//                   />
//                 </div>

//                 <div
//                   className=" w-full gap-2  flex-col flex"
//                   placeholder="Date"
//                 >

//                   <label className="text-black font-semibold" htmlFor="">
//                     EndDate
//                   </label>

//                   <Field
//                     name="endDate"
//                     type="Date"
//                     className="rounded-md text-black border-2 border-green-600 w-full p-2"
//                     placeholder="EndDate"
//                   />
//                   <ErrorMessage
//                     name="endDate"
//                     component="div"
//                     className="text-red-500"
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-col md:flex-row justify-between w-full gap-2 md:gap-10">
//                 <div className=" w-full gap-2  flex-col flex">
//                   <label
//                     className="whitespace-nowrap text-black font-medium"
//                     htmlFor=""
//                   >
//                     Package Details
//                   </label>
//                   <Field
//                     name="details"
//                     placeholder="Enter about package"
//                     className="rounded-md text-black border-2 border-green-600 w-full p-2"
//                     type="text"
//                   />
//                   <ErrorMessage
//                     name="details"
//                     component="div"
//                     className="text-red-500"
//                   />
//                 </div>

//                 <div className=" w-full gap-2  flex-col flex">
//                   <label className="whitespace-nowrap" htmlFor="">
//                   District Name
//                   </label>
//                   <Field
//                     name="disname"
//                     className="rounded-md text-black border-2 border-teal-600 w-full p-2"
//                     type="text"
//                   />
//                   <ErrorMessage
//                     name="disname"
//                     component="div"
//                     className="text-red-500"
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-between w-full gap-2 flex-col md:flex-row  md:gap-10">

//               <div className=" w-full gap-2  flex-col flex">
//                   <label
//                     className="whitespace-nowrap text-black font-medium"
//                     htmlFor=""
//                   >
//                     Enter Offer %
//                   </label>
//                   <Field
//                     name="offer"
//                     placeholder="Enter Offer %"
//                     className="rounded-md text-black border-2 border-green-600 w-full p-2"
//                     type="number"
//                   />
//                   <ErrorMessage
//                     name="offer"
//                     component="div"
//                     className="text-red-500"
//                   />
//                 </div>
//                 <div
//                   className=" w-full gap-2  flex-col flex"
//                   placeholder="Date"
//                 >

//                   <label className="text-black font-semibold" htmlFor="">
//                     Offer EndDate
//                   </label>

//                   <Field
//                     name="offerEndDate"
//                     type="Date"
//                     className="rounded-md text-black border-2 border-green-600 w-full p-2"
//                     placeholder="offerEndDate"
//                   />
//                   <ErrorMessage
//                     name="offerEndDate"
//                     component="div"
//                     className="text-red-500"
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-col justify-center">
//                 <div className="">
//                   <Field name="file">
//                     {({ form, field }) => (
//                       <>
//                         {field.value ? (
//                           <img
//                             src={URL.createObjectURL(field.value)}
//                             alt="Preview"
//                             className="object-cover md:w-[515px] w-52 h-60 rounded-lg"
//                             style={{ width: "1425px", height: "300px" }}
//                           />
//                         ) : (
//                           <div className=" ">
//                             <img src={defaultImage} alt="" />
//                           </div>
//                         )}
//                         <br />
//                         <input
//                           type="file"
//                           id="image"
//                           accept="image/*"
//                           onChange={(event) => {
//                             form.setFieldValue(
//                               field.name,
//                               event.currentTarget.files[0]
//                             );
//                           }}
//                           className="w-52 md:w-fit"
//                         />
//                       </>
//                     )}
//                   </Field>

//                   <ErrorMessage
//                     name="file"
//                     component="div"
//                     className="text-red-500"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
//   <label htmlFor="plan" className="text-lg mb-2 col-span-1 md:col-span-2">
//     Plan:
//   </label>
//   {plan.map((item, index) => (
//     <div key={index} className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 col-span-1 md:col-span-4">
//       <div className="flex-grow">
//         <label htmlFor={`day-${index}`} className="block mb-1">
//           Day {index + 1}
//         </label>
//         <Field
//           type="text"
//           id={`day-${index}`}
//           value={`Day ${index + 1}`}
//           onChange={(e) => handlePlanChange(e, index, "totalDay")}
//           className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500 w-full"
//         />
//       </div>
//       <div className="flex-grow">
//         <label htmlFor={`title-${index}`} className="block mb-1">
//           Title
//         </label>
//         <Field
//           type="text"
//           id={`title-${index}`}
//           value={item.title}
//           onChange={(e) => handlePlanChange(e, index, "title")}
//           className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500 w-full"
//         />
//       </div>
//       <div className="flex-grow">
//         <label htmlFor={`description-${index}`} className="block mb-1">
//           Description
//         </label>
//         <Field
//           type="text"
//           id={`description-${index}`}
//           value={item.description}
//           onChange={(e) => handlePlanChange(e, index, "description")}
//           className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500 w-full"
//         />
//       </div>
//       <div className="flex-grow">
//         <label htmlFor={`subtitle-${index}`} className="block mb-1">
//           Subtitle
//         </label>
//         <Field
//           type="text"
//           id={`subtitle-${index}`}
//           value={item.subtitle}
//           onChange={(e) => handlePlanChange(e, index, "subtitle")}
//           className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500 w-full"
//         />
//       </div>
//       <div className="flex-grow">
//         <label htmlFor={`time-${index}`} className="block mb-1">
//           Total Time
//         </label>
//         <Field
//           type="text"
//           id={`time-${index}`}
//           value={item.totalTime}
//           onChange={(e) => handlePlanChange(e, index, "totalTime")}
//           className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500 w-full"
//         />
//       </div>
//       <div className="flex-grow">
//         <button
//           type="button"
//           onClick={() => removePlan(index)}
//           className="bg-red-500 text-white px-4 py-2 rounded-lg"
//         >
//           Remove
//         </button>
//       </div>
//     </div>
//   ))}
//   <button
//     type="button"
//     onClick={addPlan}
//     className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 col-span-1 md:col-span-6"
//   >
//     Add Plan
//   </button>
// </div>

//             </div>

//             <button
//               type="submit"
//               className="bg-blue-700 mt-6 mb-4 text-white w-fit px-8 rounded-lg p-2"
//             >
//               {isLoading ? "Uploading..." : "Submit"}
//             </button>
//           </Form>
//         </div>
//       </Formik>

//       <Toaster />
//     </div>
//   );
// };

// export default AddPackage;



import { useParams, useNavigate } from "react-router-dom";
import {
  fetchPackage,
  packageReset,
} from "../../../Redux/features/GetPackage/GetPackageSlice";
import { getPlaceAndCategory } from "../../../Redux/features/SelectPlace/SelectPlaceSlice";
import { updatePackage } from "../../../Redux/features/Vendor/UpdatePackage/updatePackageSlice";

import { MultiSelect } from "react-multi-select-component";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditPackage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedPackage } = useSelector((state) => state.GetPackage);

  const { selectPlace, selectCategory } = useSelector(
    (state) => state.PlaceAndCat
  );

  const { id } = useParams();

  console.log("id is", id);

  const [selectedImage, setSelectedImage] = useState(null);
  const [editedPackage, setEditedPackage] = useState();
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchPackage(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getPlaceAndCategory());
  }, [dispatch]);
  
  useEffect(() => {
    setEditedPackage({
      name: selectedPackage?.name,
      type: selectedPackage?.type,
      district: selectedPackage?.district,
      price: selectedPackage?.price,
      day: selectedPackage?.day,
      night: selectedPackage?.night,
      details: selectedPackage?.details,
      image: selectedPackage?.image?.url,
      offer: selectedPackage?.offer,
      offerEndDate: selectedPackage?.endDate,
      categoryName: selectedPackage?.categoryName,
      place:selectedPackage?.place.map((item) => item.place)
    });
  }, [dispatch, selectedPackage]);

  const [plan, setPlan] = useState([
    {
      totalDay: "",
      title: "",
      description: "",
      subtitle: "",
      totalTime: "",
    },
  ]);
  const handlePlanChange = (e, index, field) => {
    const updatedPlan = [...plan];
    updatedPlan[index][field] = e.target.value;
    setPlan(updatedPlan);
  };
  const addPlan = () => {
    setPlan([
      ...plan,
      {
        totalDay: "",
        title: "",
        description: "",
        subtitle: "",
        totalTime: "",
      },
    ]);
  };

  useEffect(() => {
    const options = selectPlace
      ? selectPlace.map((place) => ({
          label: place.place,
          key: place.id,
          value: place,
        }))
      : [];
    setOptions(options);
  }, [selectPlace]);

  const handleChange = (e) => {
    setEditedPackage({ ...editedPackage, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event, publicId) => {
    setEditedPackage((prev) => {
      return { ...prev, publicId };
    });
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = (values) => {
    const { place, type, district, description, publicId } = editedPackage;
    const packageData = {
      place,
      type,
      district,
      description,
      publicId,
    };
    const payload = { packageData, id: selectedPackage._id };

    const formData = new FormData();
    formData.append("placeData", JSON.stringify(packageData));
    formData.append("id", selectedPackage._id);
    formData.append("image", selectedImage);
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("disname", values.disname);
    formData.append("startDate", values.startDate);
    formData.append("endDate", values.endDate);
    formData.append("details", values.details);
    formData.append("day", values.day);
    formData.append("night", values.night);
    formData.append("offer", values.offer);
    formData.append("offerEndDate", values.offerEndDate);

    formData.append("image", values.file);
    // formData.append("category", selectedCategory.value);
    // formData.append(
    //   "place",
    //   JSON.stringify(selected.map((TPlace) => TPlace.value))
    // );

    plan.forEach((item, index) => {
      formData.append(`plan[${index}][totalDay]`, item.totalDay);
      formData.append(`plan[${index}][title]`, item.title);
      formData.append(`plan[${index}][description]`, item.description);
      formData.append(`plan[${index}][subtitle]`, item.subtitle);
      formData.append(`plan[${index}][totalTime]`, item.totalTime);
      formData.append(`plan[${index}][type]`, item.type);
    });

    dispatch(updatePackage(formData));
    toast.success("Package updated successfully!");

    navigate(`/admin/dashboard/place/${id}`);
    dispatch(packageReset());
  };
  const initialValues = {
    file: null,
    name: "",
    price: "",
    disname: "",
    startDate: "",
    endDate: "",
    details: "",
    day: "",
    night: "",
    offer: "",
    offerEndDate: "",
  };
  const validationSchema = Yup.object().shape({
    // name: Yup.string().required("Name is required"),
    // price: Yup.number().required("Price is required"),
    // disname: Yup.string().required("District is required"),
    // startDate: Yup.date().required("Start date is required"),
    // endDate: Yup.date().required("End date is required"),
    // details: Yup.string().required("Details is required"),
    // day: Yup.number().required("Day is required"),
    // night: Yup.number().required("Night is required"),
    // offer: Yup.string().required("Offer is required"),
    // offerEndDate: Yup.date().required("Offer end date is required"),
  });

  return (
    <div className="flex flex-col items-center overflow-hidden bg-white p-5 md:p-10">
      <h1 className="font-bold text-2xl text-blue-900 my-6"> Update Packages</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <div className=" container lg:px-32 p-5 py-10 bg-[#19776c] shadow-lg">
          <div className="flex justify-center flex-col gap-2 mb-4">
            <h1 className="text-black font-medium">Select Tourist Place</h1>
            <MultiSelect
              name="selected"
              options={options}
              value={selected}
              //  value={editedPackage?.place}
              //         onChange={handleChange}
              onChange={setSelected}
              labelledBy="Select Tourist Place "
            />
            <ErrorMessage
              name="selected"
              component="div"
              className="text-red-500"
            />
          </div>

          <h1 className="text-black font-medium">Select Category</h1>

          <select
            id="categories"
            name="cat"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {
              const selectedValue = e.target.value;
              const selectedLabel =
                e.target.options[e.target.selectedIndex].label;
              setSelectedCategory({
                value: selectedValue,
                label: selectedLabel,
              });
            }}
          >
            <option value>{editedPackage?.categoryName}</option>
            {selectCategory?.map((category) => (
              <option
                key={category._id}
                value={`${category._id},${category.name}`}
              >
                {category.name}
              </option>
            ))}
          </select>

          <Form className="flex items-center justify-center flex-col gap-2">
            <div className="md:space-y-5 w-full space-y-3 items-start flex flex-col">
              <div className="flex justify-between flex-col md:flex-row w-full gap-2 md:gap-10">
                <div className=" w-full  flex-col gap-2 flex">
                  <label
                    className="whitespace-nowrap text-black font-medium"
                    htmlFor="name"
                  >
                    Package Name
                  </label>

                  <Field
                    name="name"
                    value={editedPackage?.name}
                    onChange={handleChange}
                    className="rounded-md text-black border-2 border-teal-600 w-full p-2"
                    type="text"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className=" w-full gap-2  flex-col flex">
                  <label
                    className="whitespace-nowrap text-black font-medium"
                    htmlFor="name"
                  >
                    Package Price
                  </label>
                  <Field
                    name="price"
                    value={editedPackage?.price}
                    onChange={handleChange}
                    className="rounded-md text-black border-2 border-teal-600 w-full p-2"
                    type="number"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between w-full gap-2 md:gap-10">
                <div className=" w-full gap-2  flex-col flex">
                  <label
                    className="whitespace-nowrap text-black font-medium"
                    htmlFor=""
                  >
                    No.of Day
                  </label>
                  <Field
                    name="day"
                    value={editedPackage?.day}
                    onChange={handleChange}
                    className="rounded-md text-black border-2 border-green-600 w-full p-2"
                    type="number"
                  />
                  <ErrorMessage
                    name="day"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className=" w-full gap-2  flex-col flex">
                  <label className="whitespace-nowrap" htmlFor="">
                    no.of night
                  </label>
                  <Field
                    name="night"
                    value={editedPackage?.night}
                    onChange={handleChange}
                    className="rounded-md text-black border-2 border-teal-600 w-full p-2"
                    type="number"
                  />
                  <ErrorMessage
                    name="night"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <div className="flex justify-between w-full gap-2 flex-col md:flex-row  md:gap-10">
                <div className=" w-full gap-2  flex-col flex">
                  <label className="text-black font-semibold" htmlFor="">
                    StartDate
                  </label>

                  <Field
                    name="startDate"
                    type="Date"
                    value={editedPackage?.startDate}
                    onChange={handleChange}
                    className="rounded-md text-black border-2 border-green-600 w-full p-2"
                    placeholder="Date"
                  />
                  <ErrorMessage
                    name="startDate"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div
                  className=" w-full gap-2  flex-col flex"
                  placeholder="Date"
                >
                  <label className="text-black font-semibold" htmlFor="">
                    EndDate
                  </label>

                  <Field
                    name="endDate"
                    type="Date"
                    className="rounded-md text-black border-2 border-green-600 w-full p-2"
                    placeholder="EndDate"
                  />
                  <ErrorMessage
                    name="endDate"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between w-full gap-2 md:gap-10">
                <div className=" w-full gap-2  flex-col flex">
                  <label
                    className="whitespace-nowrap text-black font-medium"
                    htmlFor=""
                  >
                    Package Details
                  </label>

                    <Field
                      
                      name="details"
                      
                      value={editedPackage?.details}
                      onChange={handleChange}
                      className="rounded-md text-black border-2 border-green-600 w-full p-2"
                      type="text"
                    />
                  

                  <ErrorMessage
                    name="details"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className=" w-full gap-2  flex-col flex">
                  <label className="whitespace-nowrap" htmlFor="">
                    District Name
                  </label>
                  <Field
                    name="disname"
                    value={editedPackage?.district}
                    onChange={handleChange}
                    className="rounded-md text-black border-2 border-teal-600 w-full p-2"
                    type="text"
                  />
                  <ErrorMessage
                    name="disname"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <div className="flex justify-between w-full gap-2 flex-col md:flex-row  md:gap-10">
                <div className=" w-full gap-2  flex-col flex">
                  <label
                    className="whitespace-nowrap text-black font-medium"
                    htmlFor=""
                  >
                    Enter Offer %
                  </label>
                  <Field
                    name="offer"
                    value={editedPackage?.offer}
                    onChange={handleChange}
                    className="rounded-md text-black border-2 border-green-600 w-full p-2"
                    type="number"
                  />
                  <ErrorMessage
                    name="offer"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div
                  className=" w-full gap-2  flex-col flex"
                  placeholder="Date"
                >
                  <label className="text-black font-semibold" htmlFor="">
                    Offer EndDate
                  </label>

                  <Field
                    name="offerEndDate"
                    type="Date"
                    className="rounded-md text-black border-2 border-green-600 w-full p-2"
                    placeholder="offerEndDate"
                  />
                  <ErrorMessage
                    name="offerEndDate"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              {/* <div className="flex flex-col justify-center">
                <div className="">
                  <Field name="file">
                    {({ form, field }) => (
                      <>
                        {field.value ? (
                          <img
                            src={URL.createObjectURL(field.value)}
                            alt="Preview"
                            className="object-cover md:w-[515px] w-52 h-60 rounded-lg"
                            style={{ width: "1425px", height: "300px" }}
                          />
                        ) : (
                          <div className=" ">
                            <img src={defaultImage} alt="" />
                          </div>
                        )}
                        <br />
                        <input
                          type="file"
                          id="image"
                          accept="image/*"
                          onChange={(event) => {
                            form.setFieldValue(
                              field.name,
                              event.currentTarget.files[0]
                            );
                          }}
                          className="w-52 md:w-fit"
                        />
                      </>
                    )}
                  </Field>

                  <ErrorMessage
                    name="file"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div> */}

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
                  selectedPackage?.image?.length > 0 && (
                    <div className=" m-10 ">
                      <img
                        src={selectedPackage?.image[0]?.url}
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
                  onChange={(e) =>
                    handleImageChange(e, selectedPackage?.image[0]?.public_id)
                  }
                  className="w-52 md:w-fit"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <label
                  htmlFor="plan"
                  className="text-lg mb-2 col-span-1 md:col-span-2"
                >
                  Plan:
                </label>
                {plan.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 col-span-1 md:col-span-4"
                  >
                    <div className="flex-grow">
                      <label htmlFor={`day-${index}`} className="block mb-1">
                        Day {index + 1}
                      </label>
                      <Field
                        type="text"
                        id={`day-${index}`}
                        value={`Day ${index + 1}`}
                        onChange={(e) => handlePlanChange(e, index, "totalDay")}
                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500 w-full"
                      />
                    </div>
                    <div className="flex-grow">
                      <label htmlFor={`title-${index}`} className="block mb-1">
                        Title
                      </label>
                      <Field
                        type="text"
                        id={`title-${index}`}
                        value={item.title}
                        onChange={(e) => handlePlanChange(e, index, "title")}
                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500 w-full"
                      />
                    </div>
                    <div className="flex-grow">
                      <label
                        htmlFor={`description-${index}`}
                        className="block mb-1"
                      >
                        Description
                      </label>
                      <Field
                        type="text"
                        id={`description-${index}`}
                        value={item.description}
                        onChange={(e) =>
                          handlePlanChange(e, index, "description")
                        }
                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500 w-full"
                      />
                    </div>
                    <div className="flex-grow">
                      <label
                        htmlFor={`subtitle-${index}`}
                        className="block mb-1"
                      >
                        Subtitle
                      </label>
                      <Field
                        type="text"
                        id={`subtitle-${index}`}
                        value={item.subtitle}
                        onChange={(e) => handlePlanChange(e, index, "subtitle")}
                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500 w-full"
                      />
                    </div>
                    <div className="flex-grow">
                      <label htmlFor={`time-${index}`} className="block mb-1">
                        Total Time
                      </label>
                      <Field
                        type="text"
                        id={`time-${index}`}
                        value={item.totalTime}
                        onChange={(e) =>
                          handlePlanChange(e, index, "totalTime")
                        }
                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500 w-full"
                      />
                    </div>
                    <div className="flex-grow">
                      <button
                        type="button"
                        onClick={() => removePlan(index)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addPlan}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 col-span-1 md:col-span-6"
                >
                  Add Plan
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-700 mt-6 mb-4 text-white w-fit px-8 rounded-lg p-2"
            >
              upload
            </button>
          </Form>
        </div>
      </Formik>

      <Toaster />
    </div>
  );
};

export default EditPackage;
