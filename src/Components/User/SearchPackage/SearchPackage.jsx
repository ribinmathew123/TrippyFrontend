import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, searchPackage } from "../../../Redux/features/user/PackageSearchSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SearchPackage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { packages,isError, isSuccess } = useSelector((state) => state.PackageSearchData);

  useEffect(() => {
    if (isSuccess) {
      navigate("/package");
    } else if (packages) {
      navigate("/");
    }

    dispatch(reset());
  }, [packages, isSuccess, navigate, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const searchkey = form.elements.searchkey.value;
    const price = form.elements.price.value;
    const startDate = form.elements.startDate.value;

    const packageData = { searchkey, price, startDate };
    dispatch(searchPackage(packageData));
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
        <input  name="searchkey"
        
          placeholder="Enter the destination"
          className="rounded-l-3xl  text-black outline-none bg-white p-4 pl-12 w-full md:w-64 "
          type="text"
        />
        <div className="absolute inset-y-0 left-2 pl-4 flex items-center ">
          <i className=" fa fa-thin fa-location-dot absolute text-primary text-xl  "></i>
      </div>
      </div>
      <div className="relative">
        <select
          id="price"
          name="price"         

          className=" outline-none  p-4 rounded-sm pl-12 w-full md:w-64 "
        >
         <option value="10000-20000">Select price</option>

          <option value="0-10000">Less than 10000</option>
          <option value="10000-20000">10000 to 20000</option>
          <option value="20000-40000">More than 20000</option>
        </select>
        <div className="absolute inset-y-0 left-0 pl-8 flex items-center">
        <i className=" fa fa-indian-rupee-sign text-primary"></i>
        </div>
      </div>

      <div className="relative">
        <input
          type="date"
          name="startDate"
          id="date"
          className=" outline-none rounded-sm p-[14px] pl-12 w-full md:w-48  "
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
          <i className="fa-solid fa-calendar-days text-primary"></i>
        </div>
      </div>

      <button
        name="type" type="submit"
        className="rounded-r-3xl border text-black bg-orange-400 z-50  hover:bg-orange-600 p-4 w-full md:w-64 "
      
      >
        Search
      </button>
    </div>

  </div>
</form>


</>
  );
}

export default SearchPackage;
