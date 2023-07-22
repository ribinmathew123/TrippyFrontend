// import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
// import axios from "axios";

function OfferBox() {
  const navigate = useNavigate();


  const offers = [
    {
      backgroundImageUrl:
        "https://res.cloudinary.com/dbpbx7tw4/image/upload/v1685562839/h1_banner-1_ftk3ts.jpg",
        name: "Weekly Flash Deals",
      offerPercentage: 20,
    },

    {
      backgroundImageUrl:
        "https://res.cloudinary.com/dbpbx7tw4/image/upload/v1685562825/h1_banner-2_iugkhd.jpg",
        name:"Summer <br /> Deals",
      offerPercentage: 30,
    },

    {
      backgroundImageUrl:
        "https://res.cloudinary.com/dbpbx7tw4/image/upload/v1685562826/h1_banner-3_kjxg0d.jpg",
        name:"Exclusive <br /> Deals",
      offerPercentage: 60,
    },
  ];

  // useEffect(() => {
  //   fetchPackages();
  // }, [offer]);



  const handleClick = (selectedOffer) => {

    navigate("/offerPackage/"+selectedOffer);
  };

  return (
    <div className="grid grid-flow-row gap-16 mx-auto grid-cols-1 md:grid-cols-3  lg:grid-cols-3">
      {offers.map((offer, index) => (
        <div
          key={index}
          className="w-[350px] h-full  p-6 bg-white border border-gray-200 bg-cover bg-center bg-no-repeat rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700 mt-5 hover:scale-105 transition-all duration-500 transform"
          style={{
            backgroundImage: `url('${offer.backgroundImageUrl}')`,
          }}
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
           <div dangerouslySetInnerHTML={{__html:offer.name}}></div>
          </h5>
          <p className="mb-3 font-medium text-black">Up to {(offer.offerPercentage)}% off</p>
          <button
            className="inline-flex items-center px-3 py-2 text-sm font-medium  text-center text-black bg-white rounded-lg hover:bg-[#DC834E] focus:ring-4 focus:outline-none focus:ring-[#8f6608] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => handleClick(offer.offerPercentage)}
          >
            View Deals
            <svg
              aria-hidden="true"
              className="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
            </svg>
          </button>
        </div>
      ))}

      
    </div>
  );
}

export default OfferBox;
