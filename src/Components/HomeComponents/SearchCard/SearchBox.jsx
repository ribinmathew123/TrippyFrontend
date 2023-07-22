// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import server from "../../../Axios/axios";
// import { useNavigate } from "react-router-dom";

// function SearchBox() {
//   const [searchKey, setSearchKey] = useState("");
//   const [price, setPrice] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const navigate = useNavigate();
//   const currentDate = new Date().toISOString().split("T")[0];

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const packageData = { searchKey, price, startDate };
//       const response = await server.post("/search-package", packageData);

//       console.log("search data aaaaaaaaaa:", response.data);

//       navigate("/package", { state: response.data });
//       toast.success("Your search success");
//     } catch (error) {
//       console.log(error.response.data.error);
//       toast.error(error.response.data.error);
//     }
//   };

//   return (
//     <>
//       <link
//         rel="stylesheet"
//         href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
//       />

//       <form id="form" onSubmit={handleSubmit}>
//         <div className="flex flex-col items-center justify-center mt-10">
//           <div className="flex flex-col md:flex-row justify-center bg-white overflow-hidden z-40 shadow-xl rounded-3xl items-center">
//             <div className="relative">
//               <input
//                 name="searchkey"
//                 value={searchKey}
//                 onChange={(e) => setSearchKey(e.target.value)}
//                 placeholder="Enter the destination"
//                 className="rounded-l-3xl text-black outline-none bg-white p-4 pl-12 w-full md:w-64"
//                 type="text"
//               />
//               <div className="absolute inset-y-0 left-2 pl-4 flex items-center">
//                 <i className=" fa fa-thin fa-location-dot absolute text-primary text-xl  "></i>
//               </div>
//             </div>
//             <div className="relative">
//               <select
//                 id="price"
//                 name="price"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 className="outline-none p-4 rounded-sm pl-12 w-full md:w-64"
//               >
//                 <option value="">Select price</option>
//                 <option value="0-10000">Less than 10000</option>
//                 <option value="10000-20000">10000 to 20000</option>
//                 <option value="20000-40000">More than 20000</option>
//               </select>
//               <div className="absolute inset-y-0 left-0 pl-8 flex items-center">
//                 <i className=" fa fa-indian-rupee-sign text-primary"></i>
//               </div>
//             </div>
//             <div className="relative">
//               <input
//                 type="date"
//                 name="startDate"
//                 id="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className={`outline-none rounded-sm p-[14px] pl-12 w-full md:w-48 ${
//                   startDate < currentDate ? "border-red-500" : ""
//                 }`}
//               />
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
//                 <i className="fa-solid fa-calendar-days text-primary"></i>
//               </div>
//             </div>
//             <button
//               name="type"
//               type="submit"
//               className="rounded-r-3xl border text-black bg-orange-400 z-50 hover:bg-orange-600 p-4 w-full md:w-64"
//             >
//               Search
//             </button>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// }

// export default SearchBox;


import React, { useState } from "react";
import { toast } from "react-toastify";
import server from "../../../Axios/axios";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import moment from "moment";

function SearchBox() {
  const [searchKey, setSearchKey] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const navigate = useNavigate();
  const currentDate = moment().startOf("day");

  const handleDateChange = (date) => {
    setStartDate(date ? date.format("YYYY-MM-DD") : "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!searchKey || !price || !startDate) {
        throw new Error("Please fill in all fields.");
      }

      const packageData = { searchKey, price, startDate };
      const response = await server.post("/search-package", packageData);

      console.log("search data:", response.data);

      navigate("/package", { state: response.data });
      toast.success("Your search success");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const disabledDate = (date) => {
    return date.isBefore(currentDate) 
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      <form id="form" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="flex flex-col md:flex-row justify-center bg-white overflow-hidden z-40 shadow-xl rounded-3xl items-center">
            <div className="relative">
              <input
                name="searchkey"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                placeholder="Enter the destination"
                className="rounded-l-3xl text-black outline-none bg-white p-4 pl-12 w-full md:w-64"
                type="text"
              />
              <div className="absolute inset-y-0 left-2 pl-4 flex items-center">
                <i className=" fa fa-thin fa-location-dot absolute text-primary text-xl  "></i>
              </div>
            </div>
            <div className="relative">
              <select
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="outline-none p-4 rounded-sm pl-12 w-full md:w-64"
              >
                <option value="">Select price</option>
                <option value="0-10000">Less than 10000</option>
                <option value="10000-20000">10000 to 20000</option>
                <option value="20000-40000">More than 20000</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-8 flex items-center">
                <i className=" fa fa-indian-rupee-sign text-primary"></i>
              </div>
            </div>
            <div className="relative">
              <DatePicker
                name="startDate"
                value={startDate ? moment(startDate) : null}
                onChange={handleDateChange}
                disabledDate={disabledDate}
                className={`outline-none rounded-sm p-[14px] pl-12 w-full md:w-48 ${
                  startDate < currentDate ? "border-white" : ""
                }`}
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                <i className="fa-solid fa-calendar-days text-primary"></i>
              </div>
            </div>
            <button
              name="type"
              type="submit"
              className="rounded-r-3xl border text-black bg-orange-400 z-50 hover:bg-orange-600 p-4 w-full md:w-64"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default SearchBox;
