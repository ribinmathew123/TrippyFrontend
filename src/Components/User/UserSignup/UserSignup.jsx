import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { userRegister, reset, googleRegister } from "../../../Redux/features/auth/authSlice";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function UserSignup() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const { isError, isSuccess, isLoading, message, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/otp");
    }
    if (user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, user, navigate, dispatch]);

  const onSubmit = async (data) => {
    const { name, email, phoneNumber, password } = data;


    const userData = { name, email, phoneNumber, password };
    dispatch(userRegister(userData));

  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const onGoogleLoginSuccess = (data) => {
    dispatch(googleRegister(data.access_token));

  };

  const onGoogleLoginError = () => {
    toast.error("Error occurred during login");
  };

  const login = useGoogleLogin({
    onSuccess: onGoogleLoginSuccess,
    onError: onGoogleLoginError,
  });



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
        <form id="form"
          onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center md:w-[370px]  border-primary/80 md:py-10 md:px-8 px-5 py-5 rounded-3xl shadow-sm shadow-gray-700">


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
              className="pl-16 border-b-2 font-display outline-none focus:border-primary  text-md"
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

              className="pl-16 border-b-2 flex-grow font-display focus:outline-none focus:border-primary  duration-50  text-md  "
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


            className="w-full  p-3        button-entrar py-2   px-20 bg-primary rounded-md text-white font-bold uppercase text-lg mt-8 transform hover:translate-y-1 transition-all duration-500"
            type="submit"
          >
            {isLoading ? 'Loading...' : 'SIGN UP'}

          </button>


          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-28 h-px my-8 bg-primary border-0 dark:bg-gray-700" />

            <span className='pl-2 pr-2'>or</span>
            <hr className="w-28 h-px my-8 bg-primary border-0 dark:bg-gray-700" />

          </div>

          <button type="button"
            onClick={() => login()}


            className="w-full    button-entrar  p-3 py-2  bg-blue-400  hover:bg-blue-700 rounded-md text-white focus:outline-none font-bold   "

          >
            <FontAwesomeIcon icon={faGoogle} className="text-white mr-2" />

            Sign in with Google

          </button>
          <div className="flex items-center justify-center">
            <p className="mt-6 mr-2">Already have an account?</p>
            <NavLink to="/login" className=" mt-5 text-lg font-Poppins font-bold  text-[#00008b]">
              Login
            </NavLink>
          </div>
        </form>
        <Toaster />
      </div>
    </>
  );
}

export default UserSignup
