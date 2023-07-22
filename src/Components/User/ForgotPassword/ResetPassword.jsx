import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import {  reset,forgotPass } from "../../../Redux/features/auth/authSlice";

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/verifyOtp");
    }
    if (user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, user, navigate, dispatch]);

  const onSubmit = async (data) => {
    const {  phoneNumber, } = data;

    // console.log(data);
    alert(JSON.stringify(data));

    const userData = {  phoneNumber };
    dispatch(forgotPass(userData));
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      <link rel="stylesheet" href="/src/style/tailwind.css" />

      <img
        src="https://res.cloudinary.com/dbpbx7tw4/image/upload/v1689164651/profile/wave_wtzvrs.png"
        className="fixed hidden lg:block inset-0 h-full "
      />
      <div className="w-sreen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
        <img
          src="https://res.cloudinary.com/dbpbx7tw4/image/upload/v1689164651/profile/unlock_lfp8fs.svg"
          className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto"
          style={{ zIndex: 1000 }}
        />
        <form
          id="form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center w-80  border-primary/80 md:py-10 md:px-8 px-5 py-5 rounded-3xl shadow-sm shadow-primary"
        >
          {/* <form
          className="flex flex-col justify-center items-center w-1/2 form "
          id="form"
          onSubmit={handleSubmit(onSubmit)}
        > */}
          <img src="/src/assest/avatar.svg" className="w-20" />
          <h2 className="my-8 font-display font-bold text3xl text-gray-700 text-center">
            Forgot Password
          </h2>
         

         
         
          <div className="relative mt-8">
            <i className="fa fa-mobile  absolute text-primary text-xl "></i>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Mobile Number  "
              className="pl-16 border-b-2 font-display focus:outline-none focus:border-primary   text-md"
              {...register("phoneNumber", {
                required: "phoneNumber is required",
              })}
            />
          </div>
          {errors.phoneNumber && (
            <p className=" text-[#ff0000] errorMessage">
              {errors.phoneNumber?.message}
            </p>
          )}



        

          <button
            className="button-entrar py-2  px-16 bg-primary rounded-full text-white font-bold uppercase text-lg mt-10 transform hover:translate-y-1 transition-all duration-500"
            type="submit"
          >
            Submit
          </button>
        </form>
        <Toaster />
      </div>
    </>
  );
}

export default ResetPassword;
