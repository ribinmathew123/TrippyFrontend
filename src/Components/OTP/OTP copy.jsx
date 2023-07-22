// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { reset, otp } from "../../Redux/features/auth/authSlice";
// import { ToastContainer, toast } from "react-toastify";
// import OTPInput, { ResendOTP } from "otp-input-react";


// const OtpVerification = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [OTP, setOTP] = useState("");

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     if (isError) {
//       toast.error(message);
//       navigate("/signup");
//     }
//     if (isSuccess || user) {
//       toast.success(message);
//       navigate("/");
//     }

//     dispatch(reset());
//   }, [user, isError, isSuccess, isLoading, message, navigate, dispatch]);

//   const onSubmit = (data) => {
//     const { otpCode } = data;
//     alert(data)
//     dispatch(otp(otpCode));
//   };

//   if (isLoading) {
//     return <h1>loading..........</h1>;
//   }


//   return (
//     <>
//       <img
//         src="/src/assest/wave.png"
//         className="fixed hidden lg:block inset-0 h-full "
//       />

//       <div className="w-sreen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2 ">
//         <img
//           src="/src/assest/unlock.svg"
//           className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto"
//           style={{ zIndex: 1000 }}
//         />

//         <div className="body1">

//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="flex flex-col justify-center items-center w-80  md:py-10 md:px-8 px-5 py-5 rounded-3xl "
//           >

//             <div className="flex flex-col justify-center items-center w-96 border-4 border-primary/80 md:py-10 md:px-8 px-5 py-5 rounded-3xl ">
//                       <h2 className="font-bold text3xl ">Enter OTP</h2>
//               <div className="w-full h-10 relative"></div>
//               <h2 className="mb-4 font-display font-bold  text3xl text-center text-lg">
//                 OTP VERIFICATION
//               </h2>

//               <div className="otp">
        
//               <OTPInput
//               {...register("otp", {
//                 required: "Please Enter OTP",
//               })}
//         value={OTP}
//         onChange={setOTP}
//         autoFocus={false}
//         OTPLength={6}
//         otpType="number"
//         // disabled={false}
//         inputRef={register}

//         inputStyles={{
//           width: "40px", 
//           height: "40px", 
//           margin: "5px", 

//           borderRadius: "4px", 
//           border: "3px solid #f9a826",
//           background: "#e9e9e9", 
//         }}
//       />  <div className="mt-3 text-center" >

//                 {errors.otp && <span className="text-[#ff0000] ">{errors.otp.message}</span>}
//       </div>

//               </div>
//               <button
//               className="button-entrar py-3 mb-2 px-20 bg-primary  text-white font-bold uppercase text-lg mt-14 transform hover:translate-y-1 transition-all duration-500"
//               type="submit"
//             >
//               VERIFY OTP
//             </button>
//             <ResendOTP onResendClick={() => console.log("Resend clicked")} />


//               {errors.otpCode && (
//                 <p className="error_msg">{errors.otpCode?.message}</p>
//               )}


//               <ToastContainer />
//             </div>

           

//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OtpVerification;





// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import OTPInput, { ResendOTP } from "otp-input-react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { reset, otp } from "../../Redux/features/auth/authSlice";
// import { ToastContainer, toast } from "react-toastify";

// const OtpVerification = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [OTP, setOTP] = useState("");

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.auth
//   );

//   const onSubmit = (data) => {
//     const { otp } = data;
//     dispatch(otp(otp));
//   };

//   if (isLoading) {
//     return <h1>Loading...</h1>;
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
//         <img
//           src="/src/assest/wave.png"
//           className="fixed hidden lg:block inset-0 h-full"
//         />

//         <div className="w-screen h-screen grid grid-cols-1 lg:grid-cols-2">
//           <img
//             src="/src/assest/unlock.svg"
//             className="hidden lg:block w-1/2 mt-64 hover:scale-150 transition-all duration-500 transform mx-auto"
//             style={{ zIndex: 1000 }}
//           />

//           <div className="body1 flex justify-center items-center">
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               className="w-full max-w-sm md:p-10 p-5 rounded-3xl bg-white shadow-lg"
//             >
//               <h2 className="text-3xl font-bold mb-4 text-center">
//                 Enter OTP
//               </h2>

//               <h2 className=" font-bold text-center text-lg">
//                 OTP VERIFICATION
//               </h2>

//               <div className="otp mt-4">
//                 <OTPInput
//                   {...register("otp", {
//                     required: "Please Enter OTP",
//                   })}
//                   value={OTP}
//                   onChange={setOTP}
//                   autoFocus={false}
//                   OTPLength={6}
//                   otpType="number"
//                   inputRef={register}
//                   inputStyles={{
//                     width: "40px",
//                     height: "40px",
//                     margin: "5px",
//                     borderRadius: "4px",
//                     border: "3px solid #f9a826",
//                     background: "#e9e9e9",
//                   }}
//                 />
//                 {errors.otp && (
//                   <span className="text-red-500 mt-3 block text-center">
//                     {errors.otp.message}
//                   </span>
//                 )}
//               </div>

//               <button
//                 className="button-entrar py-3 mb-2 px-20 bg-primary text-white font-bold uppercase text-lg mt-14 transform hover:translate-y-1 transition-all duration-500 w-full"
//                 type="submit"
//               >
//                 VERIFY OTP
//               </button>

//               <ResendOTP
//                 onResendClick={() => console.log("Resend clicked")}
//               />

//               <ToastContainer />
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OtpVerification;