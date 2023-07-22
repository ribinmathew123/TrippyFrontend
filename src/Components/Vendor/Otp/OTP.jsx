// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { reset, otp } from "../../../Redux/features/vendorAuth/VendorSlice";
// import { ToastContainer, toast } from "react-toastify";
// import  { ResendOTP } from "otp-input-react";


// const OtpVerification = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { vendor, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.VendorAuth
//   );

//   useEffect(() => {
//     if (isError) {
//       toast.error(message);
//       navigate("/vendor/signup");
//     }
//     if (isSuccess || vendor) {
//       toast.success(message);
//       navigate("/vendor");
//     }

//     dispatch(reset());
//   }, [vendor, isError, isSuccess, isLoading, message, navigate, dispatch]);

//   const onSubmit = (data) => {
//     const { otpCode } = data;
    
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

//             <div className="flex flex-col justify-center items-center w-96 border-4 border-primarycolor/80 md:py-10 md:px-8 px-5 py-5 rounded-3xl ">
//                       <h2 className="font-bold text3xl ">Enter OTP</h2>
//               <div className="w-full h-10 relative"></div>
//               <h2 className="mb-4 font-display font-bold  text3xl text-center text-lg">
//                 OTP VERIFICATION
//               </h2>

//               <div className="otp">
                
                
                
//                 <input
                 
//                  className=" border-4 border-primary"
//                  type="text"
               
//                  name="otpCode"
                
             
               



//                   {...register("otpCode", {
//                     required: "Please Enter OTP",
//                     minLength: { value: 6, message: "OTP must be  6 numbers" },
//                     maxLength: {
//                       value: 6,
//                       message: "OTP cannot exceed more than 6 numbers",
//                     },
//                   })}



//                 />
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



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset, otp } from "../../../Redux/features/vendorAuth/VendorSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OTPInput, { ResendOTP } from "otp-input-react";
import * as yup from "yup";
import server from "../../../Axios/axios";

const schema = yup.object().shape({
  otp: yup
    .string()
    .required("Please Enter OTP")
    .length(6, "OTP must be 6 numbers"),
});

const OtpVerification = () => {
  const [resendAttempts, setResendAttempts] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState(""); // Add state for phoneNumber

  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

    const { vendor, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.VendorAuth
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      navigate("/vendor");
    }

    dispatch(reset());
  }, [isSuccess, navigate, dispatch]);


const handleResendClick = async () => {
  console.log("handleResendClick.......");
  try {
    const vendor = JSON.parse(localStorage.getItem('vendorData'));
    const phoneNumber = vendor.phoneNumber;
    console.log("phone number", phoneNumber);

    const response = await server.post("/vendor/resend-otp", {
      phoneNumber: phoneNumber,
    });

    if (response.status === 200) {
      // Resend successful
      toast.success("OTP resent successfully");
    } else {
      // Resend failed
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to resend OTP");
  }
};


  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        otp: OTP,
      };
      await schema.validate(formData, { abortEarly: false });
      dispatch(otp(formData.otp));
    } catch (error) {
      if (error.inner) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <>
      <img
        src="/src/assest/wave.png"
        className="fixed hidden lg:block inset-0 h-full"
      />

      <div className="w-sreen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2 ">
        <img
          src="/src/assest/unlock.svg"
          className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto"
          style={{ zIndex: 1000 }}
        />

        <div className="body1">
          <form
            onSubmit={onSubmit}
            className="flex flex-col justify-center items-center w-80  md:py-10 md:px-8 px-5 py-5 rounded-3xl "
          >
            <div className="flex flex-col justify-center items-center w-96 border-4 border-primary/80 md:py-10 md:px-8 px-5 py-5 rounded-3xl ">
              <h2 className="font-bold text3xl">Enter OTP</h2>
              <div className="w-full h-10 relative"></div>
              <h2 className="mb-4 font-display font-bold  text3xl text-center text-lg">
                OTP VERIFICATION
              </h2>

              <div className="otp">
                <OTPInput
                  value={OTP}
                  onChange={setOTP}
                  autoFocus={false}
                  OTPLength={6}
                  otpType="number"
                  inputStyles={{
                    width: "40px",
                    height: "40px",
                    margin: "5px",
                    borderRadius: "4px",
                    border: "3px solid #f9a826",
                    background: "#e9e9e9",
                  }}
                />
                {errors?.otp && (
                  <span className="text-[#ff0000] ">{errors?.otp}</span>
                )}
              </div>
              <button
                className="button-entrar py-3 mb-2 px-20 bg-primary text-white font-bold uppercase text-lg mt-14 transform hover:translate-y-1 transition-all duration-500"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Wait..." : "VERIFY OTP"}
              </button>

              <ResendOTP onResendClick={handleResendClick} />

              {errors?.otpCode && (
                <p className="error_msg">{errors?.otpCode}</p>
              )}
              <ToastContainer />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OtpVerification;
