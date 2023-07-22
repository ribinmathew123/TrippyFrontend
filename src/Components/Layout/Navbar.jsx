import { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { FiUsers, FiMenu, FiX } from "react-icons/fi";
import { BsPersonFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/features/auth/authSlice";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon,  XMarkIcon } from "@heroicons/react/24/outline";

// const Navbar = () => {

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const profilePicture = useSelector((state) => state?.auth?.user?.image);

  const defaultProfilePicture="https://res.cloudinary.com/dbpbx7tw4/image/upload/v1687104909/profile/60111_qidycx.jpg"
  
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const userLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const links = [
    { name: "HOME", link: "/" },
    { name: "PLACE", link: "/place" },
    { name: " PACKAGE", link: "/allPackage" },
    { name: "ABOUT", link: "/" },
  ];

  return (
    <Disclosure
      as="nav"
      className="shadow-md w-full fixed top-0 left-0 z-50 bg-white  text-black "
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {/* <h1 className="text-2xl">TRIPPY</h1> */}
                  <span className="font-bold text-4xl text-primary font-Poppins">
                    {" "}
                    T
                  </span>{" "}
                  <span className="text-2xl font-medium">rippy...</span>
                  <img className="block h-8 w-auto lg:hidden" />
                  <img
                    className="h-10 w-auto"

                    
                    src="https://res.cloudinary.com/dbpbx7tw4/image/upload/v1689164330/travel_ag16wn.png"
                    alt=""
                  />
                </div>

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <div className="flex space-x-8 md:ml-64">
                      {links.map((link) => (
                        <NavLink
                          key={link.name}
                          to={link.link}
                          className="text-gray-800 hover:text-primary duration-500 text-xl font-Lexend font-bold"
                          activeClassName="text-indigo-600"
                          exact
                        >
                          {link.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="header_top_right flex items-center justify-end gap-3">
                  {user?(
                    <>
                      <Link
                        to="/profile"
                        className="md:flex items-center gap-1 ms-3 uppercase hidden"
                      >
                        {user.name || user?.user?.name }

                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="flex items-center gap-2">
                        Login
                      </Link>
                    </>
                  )}
                </div>

                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full hover:bg-primary"
                        
                        src={profilePicture || defaultProfilePicture}
                        alt=""
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-black hover:bg-primary"
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <>
                            {user ? (
                              <span
                                onClick={userLogout}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm  text-black hover:bg-primary"
                                )}
                              >
                                Sign out
                              </span>
                            ) : (
                              <Link
                                to="/signup"
                                className="block px-4 py-2 text-sm text-black hover:bg-primary"
                              >
                                Signup
                              </Link>
                            )}
                          </>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {links.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
