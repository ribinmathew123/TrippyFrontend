// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import defaultImage from "../../assest/Background1.jpg";
// import { message } from "antd";
// import { addApi } from "./Vendor Management/apii";

// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { addPlace } from "../../Redux/features/addPlace/addPlaceSlice";

// const NewPlace1 = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const initialValues = {
//     file: null,
//     title: "",
//     hostelType: "",
//     admissionFees: "",
//   };

//   const validationSchema = Yup.object().shape({
//     title: Yup.string().required("Hostel Name is required"),
//     location: Yup.string().test(
//       "location",
//       "Location is required",
//       function (value) {
//         const { selectedPlace } = this.parent;
//         if (selectedPlace && selectedPlace.length > 0) {
//           return !!value;
//         }
//         return true;
//       }
//     ),

//     file: Yup.mixed()
//       .required("Image is required")
//       .test("fileFormat", "Invalid image format", (value) => {
//         if (!value) return false;
//         const supportedFormats = ["image/jpeg", "image/jpg", "image/png"];
//         return supportedFormats.includes(value.type);
//       }),
//     Type: Yup.string().required("Hostel Type is required"),
//     admissionFees: Yup.number().required("Admission Fees is required"),
//   });

//   const handleSubmit = (values) => {
//     const data = new FormData();
//     data.append("title", values.title);

//     data.append("Type", values.Type);
//     data.append("admissionFees", values.admissionFees);
//     data.append("image", values.file);

//     dispatch(addPlace(data));
//   };

//   return (
//     <div className="bg-[#ffff] py-4 pb-16">
//       <div className="max-w-3xl mx-auto p-4 bg-[#93b8f9] rounded-lg shadow-2xl mt-14  pb-10 px-10 py-10">
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           <Form>
//             <div className="flex">
//               <div className="w-1/2 pr-4">
//                 <div className="mb-4 aspect-w-1 aspect-h-1">
//                   <Field name="file">
//                     {({ form, field }) => (
//                       <>
//                         {field.value ? (
//                           <img
//                             src={URL.createObjectURL(field.value)}
//                             alt="Preview"
//                             className="object-cover rounded-lg "
//                             style={{ width: "1425px", height: "300px" }}
//                           />
//                         ) : (
//                           <div className="mb-4 aspect-w-1 aspect-h-1 mt-4 rounded-sm ">
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
//                           className="py-2 px-4 border border-gray-700 rounded bg-white w-full"
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
//                 <div className="mb-4">
//                   <label className="block text-gray-700 font-semibold mb-2">
//                     Hostel Fee
//                   </label>
//                   <Field
//                     type="text"
//                     id="hosteadmissionFeeslFee"
//                     name="admissionFees"
//                     placeholder="Enter Admission fee"
//                     className="py-2 px-4 border border-gray-600 text-gray-700 rounded w-full bg-white"
//                   />
//                   <ErrorMessage
//                     name="admissionFees"
//                     component="div"
//                     className="text-red-500"
//                   />
//                 </div>
//               </div>

//               <div className="w-1/2">
//                 <div className="mb-4">
//                   <label
//                     htmlFor="input1"
//                     className="block text-gray-700 font-semibold mb-2"
//                   >
//                     Hostel Name
//                   </label>
//                   <Field
//                     type="text"
//                     id="input1"
//                     name="title"
//                     placeholder="Enter your hostel name"
//                     className="py-2 px-4 border border-gray-600 text-gray-700 rounded w-full bg-white"
//                   />
//                   <ErrorMessage
//                     name="title"
//                     component="div"
//                     className="text-red-500"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label
//                     htmlFor="hostelType"
//                     className="block text-gray-700 font-semibold mb-2"
//                   >
//                     Hostel Type
//                   </label>
//                   <Field
//                     as="select"
//                     id="Type"
//                     name="Type"
//                     className="py-2 px-4 border border-gray-700 rounded text-gray-700 w-full bg-white"
//                   >
//                     <option value="">Select Hostel Type</option>
//                     <option value="boys">Boys</option>
//                     <option value="girls">Girls</option>
//                     <option value="all">Other</option>
//                   </Field>
//                   <ErrorMessage
//                     name="hostelType"
//                     component="div"
//                     className="text-red-500"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-center mt-5">
//               <button
//                 type="submit"
//                 className="bg-[#002D7A] hover:bg-[#4873d8] py-4 px-11 rounded-full
//                  text-white font-bold active:bg-[#D0DFFF] focus:outline-none focus:ring
//                   focus:ring-[#10244e]"
//               >
//                 Submit
//               </button>
//             </div>
//           </Form>
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default NewPlace1;
