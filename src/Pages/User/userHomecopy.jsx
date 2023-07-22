// import { useState } from "react";
// import UserLogin from "./userLogin";
import Carousel from '../../Components/Common/Carousel'
import Navbar from "../../Components/Layout/Navbar";
import {items} from "../../Components/Common/data"
import Animation from '../../Components/Common/Animation';
import Footer from '../../Components/Layout/Footer';
import Box from '../../Components/Box';
import Box2 from '../../Components/Box2';
import Box3 from '../../Components/Box3';
import Newcard from '../../Components/Common/Newcard';
import SearchPackage from '../../Components/User/SearchPackage/SearchPackage';
import PackageCardnew from '../../Components/PackageCard';
// import Head from "../../Components/Layout/Header";

function UserHome() {
  
  return (
    <>
    <Navbar/>
    {/* <Head/> */}

<div>
    <Carousel images={items}/>
    <div className='-mt-[70px] z-50'>
    <SearchPackage/>
    </div>
</div>

    <h1 className=' text-primary mt-14 font-mono mb-2	text-3xl	font-semibold font-Imperial	 text-center italic'>Don't Miss</h1>

    {/* <h1 className='text-center   font-['Open_Sans'] > jjjjjj </h1> */}
    <h2 className=' text-center font-Poppins text-5xl  mb-10  text-cyan-900,' > Special Offers</h2>
<div className='container mx-auto '> 
<div className=' flex flex-wrap gap-4 grid-flow-row'> 


<Box/> <Box2/> <Box3/>
</div>
</div>




< div className='mt-24 mb-16 ml-5'>

 <Newcard/>

</div>



< div className=' '>
    <PackageCardnew/>
    </div>
    <Animation/>

    <Footer/>
    </>
  );
}

export default UserHome;
