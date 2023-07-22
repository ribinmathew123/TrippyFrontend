import Navbar from '../../Layout/Navbar'
import { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { BsFillGeoAltFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUsers, FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";
// import { logout } from "../../Redux/features/vendorAuth/VendorSlice";





function Profile() {

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);



  const menus = [
    { name: "DASHBOARD", link: "/vendor/dashboard", icon: <AiOutlineHome /> },
    
    {
      name: "Package MANAGEMENT",
      link: "/vendor/addPackage",
      icon: <BsFillGeoAltFill />,
    },
    {
      name: "Get Package",
      link: "/vendor/getPackage",
      icon: <FiShoppingCart />,
    },
    {
      name: "Trip Plan",
      link: "/vendor/plan",
      icon: <BsFillGeoAltFill />,
    },
    
    {
      name: "Category",
      link: "/vendor/category",
      icon: <BsFillGeoAltFill />,
    },
    // { name: "Logout", onClick: logoutAdmin, icon:  <MdLogout /> },
  ];

  
    const [userData, setUserData] = useState(null);
    const userId = user._id
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`/api/users/${userId}`); 
          setUserData(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchUserData();
    }, [userId]);
  

  return (
    


<>
<Navbar/> 

<div className='bg-gray-200 mt-[69px] shadow-xl bg-black/10 overflow-hidden w-[300px] h-[640px] pr-5 rounded-r-3xl border-r-4 border-blue-500'> 

<div className=' bg-gradient-to-r from-[#48bcd6] to-[#09586a] p-6 h-[640px] pb-16 text-lg flex flex-col shadow-xl  bg-red-200 w-[263px] rounded-r-3xl border-r-2 border-blue-500 '>
  
<div className='flex flex-col gap-2 justify-center items-center'>
  <div className='w-14 h-14 rounded-full bg-white flex justify-center items-center'>
<i className="fa-regular text-2xl fa-user"></i>
  </div>
{/* <div className=''> */}
  <h1 className='text-xl'>Ribin Mathew</h1>
  <button className='bg-white text-blue-600 px-6 rounded-xl'>Edit</button>
{/* </div> */}
</div>


<div className='py-6 border-y mt-6 border-black/20'>


{menus.map((menu, i) => (
            <Link
              to={menu.link}
              key={i}
              className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-teal-400 rounded-md`}
              onClick={menu.onClick}
            >
              <div>{menu.icon}</div>
              <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  
                className={`whitespace-pre duration-500 ${
                  !open
                    ? "opacity-0 translate-x-[-1.75rem] overflow-hidden"
                    : ""
                }`}
              >
                {menu.name}
                </h2>
               {open ? null : (
                  <h2
                  className="absolute left-48 bg-teal-800 font-semibold whitespace-pre text-white rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit"
                  >
                  {menu.name}
                </h2>
              )}
            </Link>
          ))}



  {/* <div className='flex gap-3 items-center'>
<i className="fa-regular fa-user"></i>
<p>albin joseph</p>
</div>
<div className='flex gap-3 items-center'>
<i className="fa-regular fa-user"></i>
<p>albin joseph</p>
</div>
<div className='flex gap-3 items-center'>
<i className="fa-regular fa-user"></i>
<p>albin joseph</p>
</div>
<div className='flex gap-3 items-center'>
<i className="fa-regular fa-user"></i>
<p>albin joseph</p>
</div> */}

  </div>

  <h1 className='mt-6'>Others</h1>



  <div className='py-6 border-y mt-6 border-black/20'>

  <div className='flex gap-3 items-center'>
<i className="fa-regular fa-user"></i>
<p className='text-white font-extrabold'>chat</p>
</div>
<div className='flex gap-3 items-center'>
<i className="fa-regular fa-user"></i>
<p>Setting</p>
</div>
<div className='flex gap-3 items-center'>

<i className="fa-regular fa-user"></i>
<p>albin joseph</p>
</div>
<div className='flex gap-3 items-center'>
<i className="fa-regular fa-user"></i>
<p>albin joseph</p>
</div>

  </div>



</div>

</div>
 






</>



  )
}

export default Profile


