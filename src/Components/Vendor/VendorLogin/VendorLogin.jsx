// import {  useNavigate,NavLink } from "react-router-dom";
// import {useDispatch, useSelector} from 'react-redux'
// import { useForm } from 'react-hook-form'
// import { toast, Toaster } from "react-hot-toast";
// import { login, reset } from '../../../Redux/features/vendorAuth/VendorSlice'
// import { useEffect } from 'react'

// export default function Login() {

//   const { register, handleSubmit, formState: { errors } } = useForm()

//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const { vendor, isError, isSuccess, isLoading, message } = useSelector((state) => state.VendorAuth)

//   useEffect(() => {
//     if (isError) {
//       toast.error(message)
//     }

//     if(isSuccess || vendor) {
//       toast.success("Logged IN Successfully")
//       navigate('/vendor')
//     }
//     dispatch(reset())
//   }, [isError, vendor, message, isSuccess, navigate, dispatch])

//   const onSubmit =  (data) =>{
//     dispatch(login(data))
//   }

//   return (
//     <>
//       <link
//         rel="stylesheet"
//         href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
//       />
//       <link rel="stylesheet" href="/src/style/tailwind.css" />

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
//          <form className="flex flex-col justify-center items-center w-80  border-primary/80 md:py-10 md:px-8 px-5 py-5 rounded-3xl shadow-sm shadow-gray-700" id="form"  onSubmit={handleSubmit(onSubmit)}>

//           <div className="w-full h-32 relative">
//             <img src="/src/assest/avatar.svg" className="w-32 absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2" />
//           </div>
//           <h2 className="my-8 font-display font-bold text3xl text-gray-700 text-center text-lg">
//             Welcome to you
//           </h2>
//           <div className="relative">
//             <i className="fa fa-user absolute text-primary text-xl "></i>

//             <input
//               type={'email'}
//               placeholder="Email "
//               name='email'

//               {...register('email', {required: 'Please Enter Email', pattern:{value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid Email Address"}})}
//               className="pl-9 border-b-2 font-display focus:outline-none focus:border-primary  text-base"
//             />
//                          {errors.email && <p className=' text-[#ff0000] errorMessage'>{errors.email?.message}</p>}

//           </div>

//           <div className="relative mt-8">
//             <i className="fa fa-lock absolute text-primary text-xl "></i>
//             <input
//               type={'password'}
//               placeholder="password"    name='password'
//               {...register("password", { required: "Please Enter Password", minLength: { value: 5, message: "Password must be 8 characters"}})}

//               className="pl-8 border-b-2 font-display focus:outline-none focus:border-primary  duration-50  text-base"
//             />
//                         {errors.password && <p className='errorMessage text-[#ff0000]'>{errors.password?.message}</p>}
//           </div>
//           <a href="#" className="self-end mt-4  text-gray-600 font-bold  text-sm">
//             Forgot password?
//           </a>

//           <button
//             className="button-entrar py-2   px-20 bg-primary rounded-full text-white font-bold uppercase text-lg mt-10 transform hover:translate-y-1 transition-all duration-500"
//             type="submit"
//           >
//               {isLoading ? "wait..." : "Login"}

//           </button>

//           <div className="flex items-center justify-center">
//           <p className="mt-6 mr-2">Don&apos;t have an account?</p>

//   <NavLink to="/vendor/signup" className=" mt-5 text-xl font-Poppins text-[#00008b]">
//     Signup
//   </NavLink>
// </div>

//         </form>
//       </div>
//       <Toaster/>
//     </>

//   );
// }

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { login, reset } from "../../../Redux/features/vendorAuth/VendorSlice";

import { useEffect } from "react";

export default function UserLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { vendor, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.VendorAuth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess ) {
      toast.success("Logged IN Successfully");
      navigate("/vendor");
    }
    return () => {
      dispatch(reset());
    };
  }, [isError, vendor, isSuccess, dispatch]);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  if (isLoading) {
    return (
      <>
        <h1>loading...</h1>
      </>
    );
  }

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
      <div className="w-sreen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2 ">
        <img
          src="https://res.cloudinary.com/dbpbx7tw4/image/upload/v1689164651/profile/unlock_lfp8fs.svg"
          className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto"
          style={{ zIndex: 1000 }}
        />
        <form
          className="flex flex-col justify-center items-center w-80  border-primary/80 md:py-10 md:px-8 px-5 py-5 rounded-3xl shadow-sm shadow-primary"
          id="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full h-32 relative">
            <img
              src="/src/assest/avatar.svg"
              className="w-32 absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2"
            />
          </div>
          <h2 className="my-8 font-display font-bold text3xl text-gray-700 text-center text-lg">
            Welcome to you
          </h2>
          <div className="relative">
            <i className="fa fa-user absolute text-primary text-xl "></i>

            <input
              type={"email"}
              placeholder="Email "
              name="email"
              {...register("email", {
                required: "Please Enter Email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid Email Address",
                },
              })}
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primary capitalize text-base"
            />
            {errors.email && (
              <p className=" text-[#ff0000] errorMessage">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div className="relative mt-8">
            <i className="fa fa-lock absolute text-primary text-xl "></i>
            <input
              type={"password"}
              placeholder="password"
              name="password"
              {...register("password", {
                required: "Please Enter Password",
                minLength: {
                  value: 5,
                  message: "Password must be 8 characters",
                },
              })}
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primary  duration-50 capitalize text-base"
            />
            {errors.password && (
              <p className="errorMessage text-[#ff0000]">
                {errors.password?.message}
              </p>
            )}
          </div>

          <div className="self-end mt-8  text-[#1e1e95] font-bold  text-sm">
            <Link to={"/vendor/forgot-password"}>Forgot password?</Link>
          </div>

          <button
            className="button-entrar py-2   px-20 bg-primary rounded-full text-white font-bold uppercase text-lg mt-10 transform hover:translate-y-1 transition-all duration-500"
            type="submit"
          >
            Login
          </button>

          <div className="flex items-center justify-center">
            <p className="mt-6 mr-2">Don&apos;t have an account?</p>

            <Link to={"/vendor/signup"}>
              <button
                className=" mt-5 text-xl font-Poppins text-[#00008b]"
                type="submit"
              >
                Signup
              </button>
            </Link>
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
}
