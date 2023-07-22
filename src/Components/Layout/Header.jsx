import { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { FiUsers, FiMenu, FiX } from 'react-icons/fi';
import { BsPersonFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/features/auth/authSlice';

const Head = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const userLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const links = [
    { name: 'HOME', link: '/' },
    { name: 'AllPlace', link: '/place' },
    { name: 'ABOUT', link: '/' },
    { name: 'CONTACT', link: '/' },
  ];

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-50">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
          {/* <span className="text-3xl text-indigo-600 mr-1 pt-2">
            <FiMenu onClick={toggleMenu} />
          </span> */}
          Trippy
        </div>

        <div onClick={toggleMenu} className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
          {open ? (
            <FiX onClick={toggleMenu} />
          ) : (
            <FiMenu onClick={toggleMenu} />
          )}
        </div>

        <ul
          className={`font-Lexend md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? 'top-20' : '-top-full'
          } md:top-0`}
        >
          {links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <NavLink
                to={link.link}
                className="text-gray-800 hover:text-gray-400 duration-500"
                activeClassName="text-indigo-600"
                exact
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="header_top_right flex items-center justify-end gap-3">
          {user?.name ? (
            <>
              <Link to="/profile" className="flex items-center gap-1 ms-3">
                {user.name}
              </Link>
              <span onClick={userLogout} className="flex items-center gap-1  ms-3 cursor-pointer">
                <FiUsers /> Logout
              </span>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-2">
                <BsPersonFill /> Login
              </Link>
              <Link to="/signup" className="flex items-center gap-2">
                <FiUsers /> Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Head;