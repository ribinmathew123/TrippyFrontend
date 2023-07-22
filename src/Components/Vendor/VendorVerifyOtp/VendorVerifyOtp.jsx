import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset, otpverification } from "../../../Redux/features/vendorAuth/VendorSlice";
import { ToastContainer, toast } from "react-toastify";
import { ResendOTP } from "otp-input-react";
import { HiEye, HiEyeOff } from "react-icons/hi";

const VendorVerifyOtp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const { vendor, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.VendorAuth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      // navigate("/verifyOtp");
    }
    if (isSuccess || vendor) {
      toast.success("Password change succesfull");
      navigate("/vendor/login");
    }

    dispatch(reset());
  }, [vendor, isError, isSuccess, isLoading, message, navigate, dispatch]);

  const onSubmit = (data) => {
    const { otpCode ,newPassword} = data;
    dispatch(otpverification({otpCode,newPassword}));
  };

 
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <img
        src="https://res.cloudinary.com/dbpbx7tw4/image/upload/v1689164651/profile/wave_wtzvrs.png"
        className="fixed hidden lg:block inset-0 h-full"
      />

      <div className="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
        <img
          src="https://res.cloudinary.com/dbpbx7tw4/image/upload/v1689164651/profile/unlock_lfp8fs.svg"
          className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto"
          style={{ zIndex: 1000 }}
        />

        <div className="body1">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center w-80 md:py-10 md:px-8 px-5 py-5 rounded-3xl border-4 border-primary/80"
          >
            <h2 className="font-bold text-2xl text-black "> NEW PASSWORD
</h2>

            <div className="w-full h-10 relative">
              {/* <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-display font-bold text-3xl text-center text-lg">
                OTP VERIFICATION
              </h2> */}
            </div>

            <div className="  relative  mb-10  text-center">
              <label htmlFor="otpCode" className="font-medium  text-base">
                Enter OTP
              </label>
              <input
                className="border-4  border-primary w-full mt-4"
                type="text"
                id="otpCode"
                {...register("otpCode", {
                  required: "Please enter OTP",
                  minLength: { value: 6, message: "OTP must be 6 numbers" },
                  maxLength: {
                    value: 6,
                    message: "OTP cannot exceed 6 numbers",
                  },
                })}
              />
              {errors.otpCode && (
                <p className="error-message text-[#ff0000] font-medium">{errors.otpCode?.message}</p>
              )}
            </div>

            <div className="relative mb-4  text-center ">
            <label htmlFor="otpCode" className="font-medium  text-base">
                Enter New Password
              </label>
              <div className="flex items-center border-b-2">
                
                <input 
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  placeholder="Password"
                  className="pl-16 border-0 mt-3 flex-grow font-display focus:outline-none focus:border-primary duration-50 text-md"
                  {...register("newPassword", { required: "Password is required" })}
                />
                <div
                  className="absolute right-2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <HiEyeOff /> : <HiEye />}
                </div>
              </div>
              {errors.newPassword && (
                <p className="error-message text-[#ff0000] font-medium">{errors.newPassword?.message}</p>
              )}
            </div>

            <button
              className="button-entrar py-3  px-10 bg-black hover:bg-primary text-white font-bold uppercase text-base mt-10 transform hover:translate-y-1 transition-all duration-500"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "CHANGE PASSWORD"}
            </button>
<div className="mt-5 text-indigo-900 font-bold" >


            <ResendOTP onResendClick={() => console.log("Resend clicked")} />
</div>

            <ToastContainer />
          </form>
        </div>
      </div>
    </>
  );
};

export default VendorVerifyOtp;
