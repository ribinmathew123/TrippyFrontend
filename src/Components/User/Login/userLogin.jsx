
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast, Toaster } from "react-hot-toast";
import { userLogin, googleLogin, reset } from '../../../Redux/features/auth/authSlice'
import { useGoogleLogin } from '@react-oauth/google'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import { useEffect } from 'react'

export default function UserLogin() {

  const { register, handleSubmit, formState: { errors } } = useForm()


  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)


  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      toast.success("Logged IN Successfully")
      navigate('/')
    }
    dispatch(reset())
  }, [isError, user, message, isSuccess, navigate, dispatch])


  const onSubmit = (data) => {
    dispatch(userLogin(data))
  }

  const onGoogleLoginSuccess = (data) => {
    dispatch(googleLogin(data.access_token));

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
      <div className="w-sreen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2 ">
        <img
          src="https://res.cloudinary.com/dbpbx7tw4/image/upload/v1689164651/profile/unlock_lfp8fs.svg"
          className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto"
          style={{ zIndex: 1000 }}
        />
        <form className="flex flex-col justify-center items-center w-80  border-primary/80 md:py-10 md:px-8 px-5 py-5 rounded-3xl shadow-sm shadow-primary" id="form" onSubmit={handleSubmit(onSubmit)}>

          <div className="w-full h-32 relative">
            <img src="https://res.cloudinary.com/dbpbx7tw4/image/upload/v1689164649/profile/avatar_yolem7.svg" className="w-32 absolute top-1/2 -translate-y-20 right-1/2 translate-x-1/2" />
          </div>
          <h2 className="mb-8 font-display font-bold text3xl text-black text-center text-lg">
            Login to Trippy          </h2>
          <div className="relative">
            <i className="fa fa-user absolute text-primary text-xl "></i>

            <input
              type={'email'}
              placeholder="Email "
              name='email'

              {...register('email', { required: 'Please Enter Email', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid Email Address" } })}
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primary capitalize text-base"
            />
            {errors.email && <p className=' text-[#ff0000] errorMessage'>{errors.email?.message}</p>}

          </div>

          <div className="relative mt-8">
            <i className="fa fa-lock absolute text-primary text-xl "></i>
            <input
              type={'password'}
              placeholder="password" name='password'
              {...register("password", { required: "Please Enter Password", minLength: { value: 5, message: "Password must be 8 characters" } })}


              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primary  duration-50 capitalize text-base"
            />
            {errors.password && <p className='errorMessage text-[#ff0000]'>{errors.password?.message}</p>}

          </div>


          <div className='self-end mt-8  text-[#1e1e95] font-bold  text-sm'>
            <Link to={"/forgotPassword"}>
              Forgot password?
            </Link>
          </div>
          <button


            className="w-full  p-3        button-entrar py-2   px-20 bg-primary rounded-md text-white font-bold uppercase text-lg mt-8 transform hover:translate-y-1 transition-all duration-500"
            type="submit"
          >
            {isLoading ? 'Loading...' : 'LOGIN'}

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
            <p className="mt-6 mr-2">Don&apos;t have an account?</p>

            <Link to={"/signup"}>
              <button className=" mt-5 text-xl font-Poppins text-[#00008b]" type="submit">Signup</button>
            </Link>
          </div>
        </form>
      </div>
      <Toaster />
    </>

  );
}
