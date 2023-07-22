// import { useState,useEffect } from "react";
// import { Toaster } from "react-hot-toast";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import defaultImage from "../../../assest/Background1.jpg";

// import { useSelector, useDispatch } from "react-redux";
// import { updatePlace } from "../../../Redux/features/updatePlace/updatePlaceSlice";

// const EditPlace = () => {
//   const dispatch = useDispatch();
//   const [showModal, setShowModal] = useState(false);
//   const { selectedPlace } = useSelector((state) => state.TouristPlace);
//   let formikInstance = null;
//   useEffect(() => {
//     if (selectedPlace && formikInstance) {
//       formikInstance.setValues({
//         file: null          
//         ,
//         place: selectedPlace.place,
//         type: selectedPlace.type,
//         disname: selectedPlace.district,
//         details: selectedPlace.description,
//       });
//     }
//   }, [selectedPlace]);


//   const initialValues = {
//     file: null,
//     place: "",
//     type: "",
//     disname: "",
//     details: "",
//   };

//   const validationSchema = Yup.object().shape({
//     place: Yup.string().required(" Name is required"),
//     type: Yup.string().required("type is required"),
//     file: Yup.mixed()
//       .required("Image is required")
//       .test("fileFormat", "Invalid image format", (value) => {
//         if (!value) return false;
//         const supportedFormats = ["image/jpeg", "image/jpg", "image/png"];
//         return supportedFormats.includes(value.type);
//       }),

//     disname: Yup.string().required("District name is required"),
//     // details: Yup.number().required("Details is required"),
//     details: Yup.string().required("Details is required"),
//   });




  

//   const handleSubmit = (values) => {
//     const data = new FormData();
//     data.append("place", values.place);

//     data.append("type", values.type);
//     data.append("disname", values.disname);
//     data.append("details", values.details);

//     // data.append("image", values.file);

//     dispatch(updatePlace(data));
//   };


  

//   return (
//     <div className="w-full h-full flex flex-col justify-center items-center overflow-hidden">
//       <h1 className="font-bold text-2xl text-blue-900 my-6">
//         Add Tourist Places
//       </h1>

//       <Formik
//    initialValues={initialValues}
//    validationSchema={validationSchema}
//    onSubmit={handleSubmit}
//    innerRef={(instance) => (formikInstance = instance)}>


//       <div className="bg-[#111827] rounded-lg text-white px-20 pt-16 container mx-auto w-fit">
        
//         <Form
//           className="flex items-center justify-center flex-col gap-2"
//         >
//           <div className="space-y-5 items-start flex flex-col">
//             <div className="md:flex-row flex-col gap-6 justify-center items-center flex  ">
//               <label className="whitespace-nowrap" htmlFor="">
//                 Place Name
//               </label>

//               <Field
//                 type="text"
//                 hidden
//                 value={selectedPlace._id}
//               />

//               <Field
//                 name="place"
                
//                 className="rounded-md text-black bg-gray-50 p-2 w-fit md:w-[400px]"
//                 type="text"
//               />
//                   <ErrorMessage
//                     name="place"
//                     component="div"
//                     className="text-red-500"
//                   />
//             </div>

//             <div className="md:flex-row flex-col flex gap-8 justify-center items-center">
//               <label className="whitespace-nowrap" htmlFor="">
//                 Place Type
//               </label>
//               <Field
//                 name="type"
//                 className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
//                 type="text"
//               />
//                   <ErrorMessage
//                     name="type"
//                     component="div"
//                     className="text-red-500"
//                   />
//             </div>
           

//             <div className="md:flex-row flex-col flex gap-4 justify-center items-center">
//               <label htmlFor="">District Name</label>
//               <Field
//                 name="disname"
//                 className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
//                 type="text"
               
//               />
              
//               <ErrorMessage
//                     name="disname"
//                     component="div"
//                     className="text-red-500"
//                   />
//             </div>
         

//             <div className="md:flex-row flex-col flex gap-5 justify-center items-center">
//               <label htmlFor="place details">Place Details</label>

//               <Field
//                 name="details"
//                 type="textarea"
                
//                 className="peer block min-h-[auto]  text-black w-full rounded border-0 md:w-[400px] px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
//                 id="exampleFormControlTextarea1"
//                 rows="3"
//                 placeholder="Your message"
                
//               />                  <ErrorMessage
//                     name="details"
//                     component="div"
//                     className="text-red-500"
//                   />
//             </div>
            
//           </div>

//           <button
//             className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//             type="button"
//             onClick={() => setShowModal(true)}
//           >
//             Update Image
//           </button>
//           <button
//             type="submit"
//             className="bg-blue-700 mt-6 mb-4 text-white w-fit px-8 rounded-lg p-2"
//           >
//             Submit
//           </button>

//           {showModal && (
//             <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
//               <div className="relative w-auto my-6 mx-auto max-w-3xl">
//                 {/*content*/}
//                 <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//                   {/*header*/}
//                   <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
//                     <h3 className="text-3xl  text-black font-medium ">
//                       Update Your Image
//                     </h3>
//                     <button
//                       className="p-1 ml-auto  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
//                       onClick={() => setShowModal(false)}
//                     >
//                       <span className=" text-md font-semibold text-red-600">
//                         x
//                       </span>
//                     </button>
//                   </div>

//                   {/*body*/}

//                   <div className="">
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

//                   {/*footer*/}
//                   <div className="flex items-center justify-end p-6  rounded-b">
//                     <button
//                       className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                       type="button"
//                       onClick={() => setShowModal(false)}
//                     >
//                       Close
//                     </button>

//                     <button
//                       className="bg-green-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                       type="button"
//                       onClick={() => setShowModal(false)}
//                     >
//                       Save Changes
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </Form>
//       </div>
//       </Formik>
//       <Toaster />
//     </div>
//   );
// };

// export default EditPlace;


















import { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { updatePlace } from "../../../Redux/features/updatePlace/updatePlaceSlice";

const EditPlace = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { selectedPlace } = useSelector((state) => state.TouristPlace);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [images, setImages] = useState([]);

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];

    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = file;
      return updatedImages;
    });
  };

  const onSubmit = (data) => {
    alert(data.details);
    const { place, type, district, description,city } = data;
  
    const placeData = { place, type, district, description,city };
    const payload = { placeData, id: place._id };
  
    dispatch(updatePlace(payload));
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
                defaultValue={selectedPlace.place}
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
                defaultValue={selectedPlace.type}
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
                defaultValue={selectedPlace.district}
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

<div className="md:flex-row flex-col flex gap-4 justify-center items-center">
              <label htmlFor="">Town Name</label>
              <input
                name="city"
                defaultValue={selectedPlace.district}
                className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
                type="text"
                {...register("city", {
                  required: "Please Enter Town name",
                })}
              />
            </div>
            {errors.disname && (
              <p className="text-[#ff0000]  errorMessage">
                {errors.city?.message}
              </p>
            )}
            <div className="md:flex-row flex-col flex gap-5 justify-center items-center">
              <label htmlFor="place details">Place Details</label>

              <textarea
                name="details"
                defaultValue={selectedPlace.description}
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
          </div>

          <button
            className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Update Image
          </button>
          <button
            type="submit"
            className="bg-blue-700 mt-6 mb-4 text-white w-fit px-8 rounded-lg p-2"
          >
            Submit
          </button>

          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl  text-black font-medium ">
                        Update Your Image
                      </h3>
                      <button
                        className="p-1 ml-auto  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className=" text-md font-semibold text-red-600">
                          x
                        </span>
                      </button>
                    </div>

                    {/*body*/}

                    <div className="relative p-6 flex-auto flex flex-row gap-4">
                      {selectedPlace?.image.map((image, index) => (
                        <div className="object-cover items-center" key={index}>
                          <img
                            className="previewImage object-cover md:w-[300px] w-52 h-60 rounded-lg"
                            src={
                              images[index]
                                ? URL.createObjectURL(images[index])
                                : image.url
                            }
                            alt="preview"
                          />
                          <input
                            className="w-52 md:w-fit"
                            type="file"
                            name="image"
                            required
                            onChange={(e) => handleFileChange(e, index)}
                          />
                        </div>
                      ))}
                    </div>

                    {/*footer*/}
                    <div className="flex items-center justify-end p-6  rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>

                      <button
                        className="bg-green-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </form>
      </div>

      <Toaster />
    </div>
  );
};

export default EditPlace;








// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Toaster } from "react-hot-toast";
// import { useSelector, useDispatch } from "react-redux";
// import { updatePlace } from "../../../Redux/features/updatePlace/updatePlaceSlice";

// const EditPlace = () => {
//   const dispatch = useDispatch();
//   const [showModal, setShowModal] = useState(false);
//   const { selectedPlace } = useSelector((state) => state.TouristPlace);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const [images, setImages] = useState([]);

//   const handleFileChange = (e, index) => {
//     console.log(e.target.files);
//     const file = e.target.files[0];
//     console.log(images);
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       setImages((prevImages) => {
//         const updatedImages = [...prevImages];
//         updatedImages[index] = e.target.files[0];
//         return updatedImages;
//       });
//     };
//   };

//   const onSubmit = (data) => {
//     const { place, type, disname, details, id } = data;
//     // alert(place);
//     // const form = new FormData();
//     // console.log(...images);
//     // form.append("image", images);
//     // form.append("id", id);
//     // form.append("type", type);
//     // form.append("disname", disname);
//     // form.append("details", details);
//     // form.append("place", place);
//     // console.log(form)
//     // form.forEach((data) => {
//     //   console.log(data);
//     // });
//     const placeData = { id, place, type, disname, details, images };
//     // dispatch(updatePlace(form));
//     dispatch(updatePlace(placeData));

//   };

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
//             <div className="md:flex-row flex-col gap-6 justify-center items-center flex  ">
//               <label className="whitespace-nowrap" htmlFor="">
//                 Place Name
//               </label>

//               <input
//                 type="text"
//                 hidden
//                 value={selectedPlace._id}
//                 {...register("id")}
//               />

//               <input
//                 name="place"
//                 value={selectedPlace.place}
//                 className="rounded-md text-black bg-gray-50 p-2 w-fit md:w-[400px]"
//                 type="text"
//                 {...register("place", { required: "Please Enter Place Name" })}
//               />
//             </div>

//             {errors.place && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.place?.message}
//               </p>
//             )}

//             <div className="md:flex-row flex-col flex gap-8 justify-center items-center">
//               <label className="whitespace-nowrap" htmlFor="">
//                 Place Type
//               </label>
//               <input
//                 name="type"
//                 defaultValue={selectedPlace.type}
//                 className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
//                 type="text"
//                 {...register("type", { required: "Please Enter Place Type" })}
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
//                 defaultValue={selectedPlace.district}
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
//               <label htmlFor="place details">Place Details</label>

//               <textarea
//                 name="details"
//                 defaultValue={selectedPlace.description}
//                 className="peer block min-h-[auto]  text-black w-full rounded border-0 md:w-[400px] px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
//                 id="exampleFormControlTextarea1"
//                 rows="3"
//                 placeholder="Your message"
//                 {...register("details", {
//                   required: "Please Enter Place details",
//                 })}
//               ></textarea>
//             </div>
//             {errors.details && (
//               <p className="text-[#ff0000]  errorMessage">
//                 {errors.details?.message}
//               </p>
//             )}
//           </div>

//           <button
//             className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//             type="button"
//             onClick={() => setShowModal(true)}
//           >
//             Update Image
//           </button>
//           <button
//             type="submit"
//             className="bg-blue-700 mt-6 mb-4 text-white w-fit px-8 rounded-lg p-2"
//           >
//             Submit
//           </button>

//           {showModal && (
//             <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
//               <div className="relative w-auto my-6 mx-auto max-w-3xl">
//                 {/*content*/}
//                 <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//                   {/*header*/}
//                   <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
//                     <h3 className="text-3xl  text-black font-medium ">
//                       Update Your Image
//                     </h3>
//                     <button
//                       className="p-1 ml-auto  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
//                       onClick={() => setShowModal(false)}
//                     >
//                       <span className=" text-md font-semibold text-red-600">
//                         x
//                       </span>
//                     </button>
//                   </div>

//                   {/*body*/}

//                   <div className="relative p-6 flex-auto flex flex-row gap-4">
//                     {selectedPlace?.image.map((image, index) => (
//                       <div className="object-cover items-center" key={index}>
//                         <img
//                           className="previewImage object-cover md:w-[300px] w-52 h-60 rounded-lg"
//                           src={
//                             images[index] instanceof File
//                               ? URL.createObjectURL(images[index])
//                               : image.url
//                           }
//                           alt="preview"
//                         />

//                         <input
//                           className="w-52 md:w-fit"
//                           type="file"
//                           name="image"
//                           required
//                           onChange={(e) => handleFileChange(e, index)}
//                         />
//                       </div>
//                     ))}
//                   </div>

//                   {/*footer*/}
//                   <div className="flex items-center justify-end p-6  rounded-b">
//                     <button
//                       className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                       type="button"
//                       onClick={() => setShowModal(false)}
//                     >
//                       Close
//                     </button>

//                     <button
//                       className="bg-green-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                       type="button"
//                       onClick={() => setShowModal(false)}
//                     >
//                       Save Changes
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </form>
//       </div>

//       <Toaster />
//     </div>
//   );
// };

// export default EditPlace;





