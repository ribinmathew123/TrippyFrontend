import { MdLogout } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FiLock, FiShoppingCart } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../Redux/features/auth/authSlice";


function ProfileLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const user = JSON.parse(localStorage.getItem("user"));

  // const { profile } = useSelector((state) => state.profilePic.profile);
  const profilePicture = useSelector((state) => state?.auth?.user?.image);

  const defaultProfilePicture = "https://res.cloudinary.com/dbpbx7tw4/image/upload/v1687104909/profile/60111_qidycx.jpg"

  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/");
  };

  const menus = [
    { name: "DASHBOARD", link: "/profile", icon: <AiOutlineHome /> },

    {
      name: "order",
      link: "/profile/order",
      icon: <FiShoppingCart />,
    },

    {
      name: "Change password",
      link: "/profile/password",
      icon: <FiLock />,
    },


    { name: "Logout", onClick: handleLogout, icon: <MdLogout /> },
  ];



  return (
    <>
      <div className=" bg-gradient-to-r from-[#48bcd6] to-[#09586a] mt-[64px] p-6 min-h-screen pb-16 text-lg flex flex-col shadow-xl  bg-red-200  w-28 sm:w-[18rem] border-r-2 border-blue-500 ">
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="md:w-28 md:h-28  w-20  h-20 rounded-full object-cover bg-black justify-center items-center ">
            <img
              className="md:w-28 md:h-28  w-20  h-20 rounded-full object-cover  hover:bg-primary"
              src={profilePicture || defaultProfilePicture}

              alt=""
            />
          </div>
          <h1 className="sm:text-xl text-black md:text-base  text-sm mt-1 font-semibold uppercase whitespace-nowrap ">{user.name}</h1>
          <button className="bg-white text-blue-600 px-6 rounded-xl">

          </button>
        </div>


        <div className="py-6 border-y mt-6 border-black/20">
          {menus.map((menu, i) => (
            <Link
              to={menu.link}
              key={i}
              className={`group flex items-center text-sm gap-3.5 font-medium p-2 rounded-md`}
              onClick={menu.onClick}
            >
              <div className="">{menu.icon}</div>
              <div className=" hidden sm:block">

                <h2 className="  text-base font-semibold uppercase">
                  {menu.name}
                </h2>
              </div>

              <h2 className="absolute left-48 uppercase bg-teal-800 font-semibold whitespace-pre text-white rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-600 group-hover:w-fit">
                {menu.name}
              </h2>

            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProfileLayout;
