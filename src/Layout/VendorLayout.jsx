import { Outlet } from "react-router-dom";
import VendorSideBar from "../Components/Layout/VendorSideBar";

function VendorLayout() {
  return (
    

<div className="flex relative">
      <div className=" bg-teal-800">
      <VendorSideBar />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  )
}

export default VendorLayout

