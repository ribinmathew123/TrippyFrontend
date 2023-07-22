
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";

import {  useNavigate,NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { vendorRegister, reset } from "../../../Redux/features/vendorAuth/VendorSlice";
import { HiEye, HiEyeOff } from "react-icons/hi";

function VendorSignup() {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

  
  
    const { isError,isLoading, isSuccess, message, vendor } = useSelector(
      (state) => state.VendorAuth
    
   
    );
  
    useEffect(() => {
      if (isError) {
        toast.error(message);
      }
      if (isSuccess) {
        navigate("/vendor/otp");
      }
      // if (vendor) {
      //   navigate("/");
      // }
  
      dispatch(reset());
    }, [isError, isSuccess, message, vendor, navigate, dispatch]);
  
    const onSubmit = async (data) => {
      const { name, email, phoneNumber, password } = data;
  
      // console.log(data);
      // alert(JSON.stringify(data));
  
      const vendorData = { name, email, phoneNumber, password };
  
      dispatch(vendorRegister(vendorData));
      
    };
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
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
        src="https://res.cloudinary.com/dbpbx7tw4/image/upload/v1689164651/profile/undraw_travelers_re_y25a_jwvo5p.svg"
        className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto"
        style={{ zIndex: 1000 }}
      />
               <form  id="form"
        onSubmit={handleSubmit(onSubmit)}className="flex flex-col justify-center items-center md:w-[370px]  border-primary/80 md:py-10 md:px-8 px-5 py-5 rounded-3xl shadow-sm shadow-primary">

      {/* <form
        className="flex flex-col justify-center items-center w-1/2 form "
        id="form"
        onSubmit={handleSubmit(onSubmit)}
      > */}
        <img src="https://res.cloudinary.com/dbpbx7tw4/image/upload/v1689164649/profile/avatar_yolem7.svg" className="w-20" />
        <h2 className="my-8 font-display font-bold text3xl text-gray-700 text-center">
          Welcome to you
        </h2>
        <div className="relative ">
          <i className="fa fa-user absolute text-primary text-xl "></i>
          <input
            type="text"
            id="fName"
            name="name"
            placeholder="Full Name "
            className=" pl-16 border-b-2 font-display focus:outline-none focus:border-primary  text-md"
            {...register("name", { required: "Name is required" })}
          />
        </div>
        {errors.name && <p className='errorMessage  text-[#ff0000]'>{errors.name?.message}</p>}

        <div className="relative mt-8  ">
          <i className="fa-solid fa-envelope absolute text-primary text-xl "></i>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email  "
            className=" pl-16 border-b-3 font-display focus:outline-none border-b-2
            focus:border-primary   text-md"
            {...register("email", { required: "email is required" })}

          />
        </div>
        {errors.email && <p className=' text-[#ff0000] errorMessage'>{errors.email?.message}</p>}


        <div className="relative mt-8">
          <i className="fa fa-mobile  absolute text-primary text-xl "></i>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Mobile Number  "
            className="pl-16 border-b-2 font-display focus:outline-none focus:border-primary   text-md"
            {...register("phoneNumber", { required: "phoneNumber is required" })}

          />
        </div>
        {errors.phoneNumber && <p className=' text-[#ff0000] errorMessage'>{errors.phoneNumber?.message}</p>}


        <div className="relative mt-8">
          <i className="fa fa-lock absolute text-primary text-xl "></i>
          <input
                  type={showPassword ? "text" : "password"}
                  id="password"
            name="password"
            placeholder="password"
           
            className="pl-16 border-b-2 font-display focus:outline-none focus:border-primary  duration-50  text-md"
            {...register("password", { required: "password is required" })}

          />
          <div
                  className="absolute right-2  flex items-center inset-y-0  cursor-pointer  "
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <HiEyeOff /> : <HiEye />}
                </div>
        </div>
        {errors.password && <p className='errorMessage text-[#ff0000]'>{errors.password?.message}</p>}


        <button
className="button-entrar py-2 px-16 bg-primary rounded-full text-white font-bold uppercase text-lg mt-10 transform hover:translate-y-1 transition-all duration-500"
type="submit"
disabled={isLoading} 
>
{isLoading ? 'Loading...' : 'SIGN UP'}
</button>

<div className="flex items-center justify-center">
<p className="mt-6 mr-2">Already have an account?</p>
<NavLink to="/vendor/login" className=" mt-5 text-lg font-Poppins font-bold  text-[#00008b]">
  Login
</NavLink>
</div>
      </form>{" "}
      <Toaster />
    </div>
  </>
  )
}

export default VendorSignup









 




