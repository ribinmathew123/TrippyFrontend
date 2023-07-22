import axios from "../../../Axios/axios";
import { message } from "antd";

const searchPackage = async (searchData) => {
  try {
    const response = await axios.post("/search-package", searchData);

    if (response.data) {
      console.log(response.data);
      localStorage.setItem("searchData", JSON.stringify(searchData));
      message.success(" Package found");
    }

    return response;
  } catch (error) {
    // Handle error cases
    // console.error("Error searching package:", error);
    message.error(" No matching Package found");
    throw error;
  }
};

const PackageSearchServices = {
  searchPackage,
};

export default PackageSearchServices;
