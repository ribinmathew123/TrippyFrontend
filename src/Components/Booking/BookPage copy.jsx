// import axios from "axios";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import Navbar from "../Layout/Navbar";
// import { TfiAlarmClock } from "react-icons/tfi";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { select } from "@material-tailwind/react";
// import Footer from "../Layout/Footer";
// import { useState } from "react";

// // import { login, reset } from '../../../Redux/features/auth/authSlice'

// function BookPage() {
//   const navigate = useNavigate();

//   const { user } = useSelector((state) => state.auth);
//   const userId = user._id;

//   const location = useLocation();
//   const { places = [] } = location.state;

//   const startDate = new Date(location.state?.startDate);
//   const endDate = new Date(location.state?.endDate);

//   const startYear = startDate.getFullYear();
//   const startMonth = startDate.getMonth() + 1;
//   const startDay = startDate.getDate();

//   const endYear = endDate.getFullYear();
//   const endMonth = endDate.getMonth() + 1;
//   const endDay = endDate.getDate();

//   console.log("dataaaaaaaaa", location);


//   const [Total, setTotal] = useState(location.state?.price);
//   const [ticket, setTicket] = useState(1); // Initialize ticket with a default value of 1

//   // function handleTicket(e) {
//   //   setTicket(Number(e.target.value)); // Store the parsed value of the input field in the ticket state
//   // }

//   // function handleTicket(e) {
//   //   setTicket(location?.state?.price * e?.target?.value);
//   // }


//   useEffect(() => {
//     if (location.state?.price) {
//       setTotal(location.state.price * ticket);
//     }
//   }, [ticket, location.state?.price]);

//   function handleTicket(e) {
//     setTicket(Number(e.target.value)); // Store the parsed value of the input field in the ticket state
//   }


//   const loadScript = (src) => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.onload = () => {
//         resolve(true);
//       };
//       script.onerror = () => {
//         resolve(false);
//       };
//       document.body.appendChild(script);
//     });
//   };
//   useEffect(() => {
//     loadScript("https://checkout.razorpay.com/v1/checkout.js");
//   });

//   async function handleClick() {
//     if (!user) {
//       Swal.fire({
//         title: "Please Login",
//         icon: "warning",
//         confirmButtonText: "OK",
//       });
//       return;
//     }

//     let orderId =
//       "OD" + Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
//     // call integration function

//     const res = await loadScript(
//       "https://checkout.razorpay.com/v1/checkout.js"
//     );
//     if (!res) {
//       alert("razorpay SDK failed to load. Are you online?");
//     }
//     let paymetRes = {
//       order_id: orderId,

//       amount: Total,
//       currency: "INR",
//       payment_capture: 1,
//     };

//     const result = await axios.post("http://localhost:3000/orders", paymetRes);
//     console.log("Result", result);

//     //call card detail api from backend

//     if (!result.data.data) alert("Server error. Are you online?");
//     else {
//       const options = {
//         key: "rzp_test_7gAGPftwtY20XB",
//         currency: result.data.data.currency,
//         amount: result.data.data.amount,
//         name: "Trippy",
//         description: "Wallet Transaction",
//         image: "http://localhost:1337/logo.png",
//         order_id: result.data.data.id,
//         handler: async function (response) {
//           // alert(response.razorpay_payment_id);
//           // alert(response.razorpay_order_id);
//           // alert(response.razorpay_signature);

//           let packageDatas = {
//             packageId: location.state?._id,
//             vendorId: location.state?.vendorId,


//             packageName: location.state?.name,
//             packageDetails: location.state?.details,
//             startDate: location.state?.startDate,
//             endDate: location.state?.endDate,
//             price:location.state.price,
//             totalMember:ticket,
//           };

//           axios
//             .post("http://localhost:3000/order", {
//               orderId: response.razorpay_order_id,
//               userId,
//               packageDatas,
//             })
//             .then((response) => {
//               const { _id } = response.data.data;
//               console.log("responsedta", response);
//               navigate("/success/" + _id);
//             })
//             .catch(() => {
//               // handle error
//             });

//           // history.push("/success");
//         },
//         prefill: {
//           name: "Ribin Mathew",
//           email: "trippy@gmail.com",
//           contact: "9999999999",
//         },
//         theme: { color: "#1f5215" },
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     }
//   }

//   const [selectedDay, setSelectedDay] = useState(null);

//   const tourDays = [
//     {
//       day: 1,
//       details: "Day 1 details go here...",
//     },
//     {
//       day: 2,
//       details: "Day 2 details go here...",
//     },
//     {
//       day: 3,
//       details: "Day 3 details go here...",
//     },
//   ];

//   const handleDayClick = (day) => {
//     setSelectedDay(day === selectedDay ? null : day);
//   };


//   return (
//     <>
//       <Navbar />
//       <div>
//         <div className=" lg:pt-16 mt-3   mx-auto">
//           <div>
//             <div color="blue-gray  " className="relative">
//               <img
//                 src={location.state?.image[0]?.url}
//                 alt="Place"
//                 className="w-screen h-[550px] object-cover "
//               />
//               <div className=" text-white  font-semibold text-3xl  p-5 md:p-10 absolute top-[5%] left-[5%] font-Poppins">
//                 <h1 className="pb-2">{location.state?.name}</h1>
//               </div>

//               <div className="md:w-1/2 bg-gray-100 absolute top-[90%] left-4 md:left-[25%]  flex shadow-xl  rounded-lg w-11/12 ">
//                 <div className="w-1/3 px-8 p-4 flex  gap-5 justify-center items-center">
//                   <TfiAlarmClock className="text-4xl" />

//                   <div className=" flex flex-col ">
//                     <p className="font-semibold">4 </p>
//                     <p>Day </p>
//                   </div>
//                 </div>
//                 <div className="w-1/3 px-8 p-4 flex  gap-5 justify-center items-center border-x-2 border-black/10">
//                   <TfiAlarmClock className="text-4xl" />

//                   <div className=" flex flex-col ">
//                     <p className="font-semibold">4 </p>
//                     <p>Nights </p>
//                   </div>
//                 </div>

//                 <div className="w-1/3 px-8 p-4 flex  gap-5 justify-center items-center">
//                   <TfiAlarmClock className="text-4xl" />

//                   <div className=" flex flex-col ">
//                     <button
//                       className="text-white hover:text-red-100 bg-primary  py-1 px-3 rounded mr-3"
//                       onClick={handleClick}
//                     >
//                       Book now
//                     </button>

//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex pt-14 justify-around flex-wrap bg-gray-100 shadow-lg p-6">
//               <h1 className="pb-2">Price : {location.state?.price}</h1>

//               <h1 className="pb-2">details :{location.state?.details}</h1>

//               <h1 className="pb-2">
//                 Start Date: {`${startDay}-${startMonth}-${startYear}`}
//               </h1>
//               <h1 className="pb-2">
//                 End Date: {`${endDay}-${endMonth}-${endYear}`}
//               </h1>
            
//               {/* <h1 className="pb-2">Place Details: {location.state?.place}</h1>
//   <h1>Tourist Places</h1>
//   {places.map((place, index) => (
//     <div key={index}>
//       <h3>{places}</h3>
//     </div>
//   ))} */}
   
//             </div>
//           </div>
//         </div>
//       </div>

//       <div>
//         <div className="container mx-auto flex-col overflow-hidden  flex lg:flex-row my-10  gap-6">
//           <div className="md:w-3/4 overflow-hidden w-full p-5 text-lg">
//             <h1 className="text-3xl font-bold mb-4">Overview</h1>
//             Set off on this Epic 7 day trip through Costa Rica's must see
//             locations. From jungle to beach you will get to explore the amazing
//             wildlife rich park of Manuel Antonio National Park, before heading
//             off to the cloud forest of Monteverde, ending in the adventure
//             packed town of La Fortuna at the base of Arenal National Park.
//             ​*This package trip requires a minimum of 2 people. *Can be
//             customized upon request, to meet travelers needs *6 Nights
//             Hotel/Lodge 3 Star accommodation (upgrades on request) *Meals = (B)
//             Breakfast ‍ Trip Extensions available on request. Lorem ipsum dolor
//             sit amet, consectetur adipisicing elit. Consectetur accusamus
//             tenetur laborum facere molestias velit illum, aut neque veritatis,
//             laboriosam nulla. Similique aliquam hic veritatis ea eum, ipsam
//             corrupti unde!
//             <div className="mt-4">
//            <h1 className="text-xl font-bold mb-4"> package reviews:</h1> 
//            i want
//            react libry star sympol
//  thrn input area box to write user description
//  them submitbutton 
//           </div>
//           </div>
          
//           <div className="md:w-1/4 w-full  shadow-lg rounded-lg bg-gray-100 px-5 p-8">
//             <div className="flex flex-col gap-3">
//               <h1 className="text-xl font-semibold text-center border-b-4 rounded-lg border-[#DC834E] p-2">
//                 Book this tour
//               </h1>
//               <div className="flex border-b border-black/20 p-2 justify-between">
//                 <p>Date:</p>
//                 {`${startDay}-${startMonth}-${startYear}`}
//               </div>
//               <div className="flex border-b border-black/20 p-2 justify-between">
//                 <p>Time:</p> 10 AM
//                 {/* {`${startDay}-${startMonth}-${startYear}`} */}
//               </div>
//               <div className="flex border-b border-black/20 p-2 justify-between">
//                 <p>Ticket:</p>
//                 <input
//                   defaultValue={ticket}
//                   onChange={handleTicket}
//                   className="p-1 border-2 border-black w-24"
//                   type="select"
//                 />
//               </div>
//               <div className="flex border-b border-black/20 p-2 justify-between">
//                 <p>Total:</p>
//                 <p>{Total}</p>
//               </div>
//             </div>

//             <button
//               onClick={handleClick}
//               className="bg-[#DC834E] hover:bg-brown-500 w-full text-lg font-semibold  rounded-lg mt-8 text-white p-3"
//             >
//               Book now
//             </button>
//           </div>
//         </div>
//       </div>


//       {/* <div className="w-full max-w-md mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-4">Tour Plan</h1>
//         {tourDays.map((tourDay) => (
//           <div
//             key={tourDay.day}
//             className="flex items-start mb-4 cursor-pointer"
//             onClick={() => handleDayClick(tourDay.day)}
//           >
//             <div className="w-6 h-6 bg-gray-400 rounded-full mr-2 mt-1"></div>
//             <div className="flex-grow">
//               <h2 className="font-semibold">Day {tourDay.day}</h2>
//               {selectedDay === tourDay.day && (
//                 <p className="mt-2 text-gray-600">{tourDay.details}</p>
//               )}
//             </div>
//             <div className="flex items-center">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className={`h-6 w-6 ${
//                   selectedDay === tourDay.day ? "transform rotate-180" : ""
//                 }`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </div>
//           </div>
//         ))}
//       </div> */}

//       <Footer />
//     </>
//   );
// }

// export default BookPage;