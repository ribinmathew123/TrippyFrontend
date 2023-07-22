import axios from "../../../Axios/axios.js";
// Get Users
const getVendors = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }  
    const response = await axios.get('admin/vendors', config)
    return response.data
}

const blockAndUnblockVendor = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    "/admin/vendors",
    { id },
    config
  );
  return response.data;
};

const adminVendorsService = {
    
    getVendors,
     blockAndUnblockVendor
}
export default adminVendorsService