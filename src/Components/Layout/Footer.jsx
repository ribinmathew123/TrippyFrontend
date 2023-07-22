
// function Footer() {
//   return (
//     <div>
      


// <footer className="bg-white rounded-lg  m-4 dark:bg-gray-800  shadow">
//     <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
//       <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https:trippy.com/" className="hover:underline">Trippy™</a>. All Rights Reserved.
//     </span>
//     <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
//         <li>
//             <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
//         </li>
//         <li>
//             <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
//         </li>
//         <li>
//             <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
//         </li>
//         <li>
//             <a href="#" className="hover:underline">Contact</a>
//         </li>
//     </ul>
//     </div>
// </footer>




//     </div>
//   )
// }

// export default Footer




import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center text-white bg-primary">
      <div className="container py-6">
        <div className="flex items-center justify-center">
          <p className="flex items-center">
            <span className="mr-4">Register for free</span>
            <button
              type="button"
              className="inline-block rounded-full border-2 border-gray-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-gray-50 transition duration-150 ease-in-out hover:border-gray-100 hover:bg-gray-500 hover:bg-opacity-10 hover:text-gray-100 focus:border-gray-100 focus:text-gray-100 focus:outline-none focus:ring-0 active:border-gray-200 active:text-gray-200 dark:hover:bg-gray-100 dark:hover:bg-opacity-10"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Sign up!
            </button>
          </p>
        </div>
      </div>

      <div className="p-4 text-center bg-opacity-20 bg-black">
        © 2023 Copyright:
          Trippy
    
      </div>
    </footer>
  );
};

export default Footer;
