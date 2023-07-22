import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {adminLogin,reset,} from "../../../Redux/features/adminAuth/adminAuthSlice";
import { useEffect } from "react";

const AdminLoginComponent= () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin, isLoading, isSuccess,message, isError } = useSelector(
    (state) => state.adminAuth
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || admin) {
      console.log("adminlogdata");
      navigate("/admin");
    }
    dispatch(reset());
  }, [isError, isSuccess, admin,message, dispatch, navigate]);

  const onSubmit = (data) => {
    dispatch(adminLogin(data));
  };
  if (isLoading) {
    return <h1>loading.....</h1>;
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      <link rel="stylesheet" href="/src/style/tailwind.css" />

      <img
        src="/src/assest/wave.png"
        className="fixed hidden lg:block inset-0 h-full "
      />
      <div className="w-sreen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2 ">
        <img
          src="/src/assest/unlock.svg"
          className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto"
          style={{ zIndex: 1000 }}
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center w-80  border-primarycolor/80 md:py-10 md:px-8 px-5 py-5 rounded-3xl shadow-sm shadow-gray-700"
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
            <i className="fa fa-user absolute text-primarycolor text-xl "></i>
            <input
              name="userName"
              type={"text"}
              autoComplete="off"
              placeholder="User Name"
              {...register("userName", { required: "Please Enter User Name" })}
              className="pl-8 border-b-2 font-serif focus:outline-none focus:border-primary capitalize text-base"
            />
              {errors.userName && <p className=' text-deep-orange-900 errorMessage'>{errors.userName?.message}</p>}

          </div>

          <div className="relative mt-8">
            <i className="fa fa-lock absolute text-primarycolor text-xl "></i>
            <input
              type="password"
              name="password"
              placeholder="password"
              autoComplete="password"
              {...register("password", { required: "Please Enter Password" })}
              className="pl-8 border-b-2 font-display focus:outline-none focus:border-primary  duration-50 capitalize text-base"
            />
             {errors.password && <p className=' text-deep-orange-900 errorMessage'>{errors.password?.message}</p>}

          </div>
          {/* {errors.password && (
            <p className="error_mg">{errors.password?.message}</p>
          )} */}
          <button
            className="button-entrar py-3  px-20 bg-primary rounded-full text-white font-bold uppercase text-lg mt-14 transform hover:translate-y-1 transition-all duration-500"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default AdminLoginComponent;
