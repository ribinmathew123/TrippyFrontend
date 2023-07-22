// import { useState } from "react";
// import UserLogin from "./userLogin";
import Carousel from "../../Components/Common/Carousel";
import Navbar from "../../Components/Layout/Navbar";
import { items } from "../../Components/Common/data";
import Footer from "../../Components/Layout/Footer";

import SearchCard from "../HomeComponents/SearchCard/SearchCard";
import PackageCard from "../HomeComponents/PackageCard/PackageCard";
import OfferCard from "../HomeComponents/OfferCard/OfferCard";
import PlaceCard from "../HomeComponents/PlaceCard/PlaceCard";


function UserHome() {
  return (
    <>
    <div>
    <Navbar />

      <div className="">
        <Carousel images={items} />

         <div className="-mt-[70px] z-50">
          <SearchCard/>
        </div> 
      </div>
    </div>
  

      <h1 className=" text-primary mt-14 font-mono mb-2	text-3xl	font-semibold font-Imperial	 text-center italic">
        Don't Miss
      </h1>

      <h2 className=" text-center font-Poppins text-5xl  mb-10  text-cyan-900,">
        {" "}
        Special Offers
      </h2>
      <div className="container mx-auto ">
        <div className=" flex flex-wrap gap-4 grid-flow-row">
          <OfferCard />

        </div>
      </div>

      <div className="mt-24 mb-16 ml-5">
        <PlaceCard />
      </div>

      <div className=" ">

       <PackageCard/> 


      </div>
   
      <Footer />
    </>
  );
}

export default UserHome;
