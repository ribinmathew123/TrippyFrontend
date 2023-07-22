import { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { GiWoodFrame } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { FiUsers, FiShoppingCart, FiList, FiPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../Redux/features/adminAuth/adminAuthSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("admin"));
  useEffect(() => {
    if (!admin) {
      navigate("/admin/login");
    }
  }, [admin, navigate]);

  const logoutAdmin = () => {
    dispatch(adminLogout());
  };

  const menus = [
    { name: "DASHBOARD", link: "/admin", icon: <AiOutlineHome /> },
    { name: "USER MANAGEMENT", link: "/admin/users", icon: <FiUsers /> },
    { name: "VENDOR MANAGEMENT", link: "/admin/vendors", icon: <FiShoppingCart /> },
    { name: "Get Place", link: "/admin/places", icon: <FiList /> },
    { name: "ADD Place", link: "/admin/places/add", icon: <FiPlus /> },
    { name: "Logout", onClick: logoutAdmin, icon: <GiWoodFrame /> },
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
        className={`bg-[#111827] min-h-screen ${
          open && !isSmallScreen ? "w-72" : "w-16"
        } duration-500 text-gray-100 hover:text-[#cdb7be] px-4`}
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
              className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
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
                <h2 className="absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit">
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
