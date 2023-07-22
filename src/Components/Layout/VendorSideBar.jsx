// import { useEffect, useState } from "react";
// import { HiMenuAlt3 } from "react-icons/hi";
// import { MdLogout } from "react-icons/md";
// import { AiOutlineHome } from "react-icons/ai";
// import { BsPlus, BsList, BsClipboard, BsCollectionFill } from 'react-icons/bs';
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logout } from "../../Redux/features/vendorAuth/VendorSlice";

// const Sidebar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const admin = JSON.parse(localStorage.getItem("vendor"));
//   useEffect(() => {
//     if (!admin) {
//       navigate("/vendor/login");
//     }
//   }, [admin, navigate]);

//   const logoutAdmin = () => {
//     dispatch(logout());
//   };

//   const menus = [
//     { name: "DASHBOARD", link: "/vendor", icon: <AiOutlineHome /> },

//     {
//       name: "List Package",
//       link: "/vendor/packages",

//       icon: <BsList />,
//     },
//     {
//       name: "Add Package",
//       link: "/vendor/packages/add",

//       icon: <BsPlus />,
//     },
//     {
//       name: "Orders",
//       link: "/vendor/orders",
//       icon: <BsClipboard />,
//     },
    
//     {
//       name: "Category",
//       link: "/vendor/categorys",
//       icon: <BsCollectionFill />,
//     },
//     {
//       name: "Vendor Info",
//       link: "/vendor/vendor-info",
//       icon: <BsCollectionFill />,
//     },

//     { name: "Logout", onClick: logoutAdmin, icon:  <MdLogout /> },
//   ];

//   const [open, setOpen] = useState(true);
//   const toggleSidebar = () => {
//      setOpen(!open);

//   };




//   return (
//     <section className="flex">
//       <div
//         className={` bg-teal-800 min-h-screen ${
//           open ? "w-72" : "w-16"
//         } duration-500 text-gray-100  px-4`}
//       >
//         <div className="py-3 flex justify-end">
//           <HiMenuAlt3
//             size={26}
//             className="cursor-pointer"
//             onClick={toggleSidebar}
//           />
//         </div>
//         <div className="mt-4 flex flex-col gap-4 relative">
//           {menus.map((menu, i) => (
//             <Link
//               to={menu.link}
//               key={i}
//               className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-teal-400 rounded-md`}
//               onClick={menu.onClick}
//             >
//               <div>{menu.icon}</div>
//               <h2
//                   style={{
//                     transitionDelay: `${i + 3}00ms`,
//                   }}
                  
//                 className={`whitespace-pre duration-500 ${
//                   !open
//                     ? "opacity-0 translate-x-[-1.75rem] overflow-hidden"
//                     : ""
//                 }`}
//               >
//                 {menu.name}
//                 </h2>
//                {open ? null : (
//                   <h2
//                   className="absolute left-48 bg-teal-800 font-semibold whitespace-pre text-white rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit"
//                   >
//                   {menu.name}
//                 </h2>
//               )}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Sidebar;
import { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { BsPlus, BsList, BsClipboard, BsCollectionFill } from 'react-icons/bs';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/features/vendorAuth/VendorSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("vendor"));
  useEffect(() => {
    if (!admin) {
      navigate("/vendor/login");
    }
  }, [admin, navigate]);

  const logoutAdmin = () => {
    dispatch(logout());
  };

  const menus = [
    { name: "DASHBOARD", link: "/vendor", icon: <AiOutlineHome /> },
    { name: "List Package", link: "/vendor/packages", icon: <BsList /> },
    { name: "Add Package", link: "/vendor/packages/add", icon: <BsPlus /> },
    { name: "Orders", link: "/vendor/orders", icon: <BsClipboard /> },
    { name: "Category", link: "/vendor/categorys", icon: <BsCollectionFill /> },
    { name: "Vendor Info", link: "/vendor/vendor-info", icon: <BsCollectionFill /> },
    { name: "Logout", onClick: logoutAdmin, icon: <MdLogout /> },
  ];

  const [open, setOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    setIsSmallScreen(mediaQuery.matches);
    const handleScreenResize = (e) => {
      setIsSmallScreen(e.matches);
    };
    mediaQuery.addEventListener("change", handleScreenResize);
    return () => {
      mediaQuery.removeEventListener("change", handleScreenResize);
    };
  }, []);

  return (
    <section className="flex">
      <div
        className={`bg-teal-800 min-h-screen ${
          open && !isSmallScreen ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
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
                  (!open || isSmallScreen) ? "opacity-0 translate-x-[-1.75rem] overflow-hidden" : ""
                }`}
              >
                {menu.name}
              </h2>
              {!open && isSmallScreen ? (
                <h2 className="absolute left-48 bg-teal-800 font-semibold whitespace-pre text-white rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit">
                  {menu.name}
                </h2>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;


