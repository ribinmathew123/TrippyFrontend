import axios from "../../../Axios/axios.js";


// Get Users
const getUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }  
    const response = await axios.get('admin/users', config)
    return response.data
}

const blockAndUnblockUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    "/admin/users",
    { id },
    config
  );
  return response.data;
};

const adminUsersService = {
    
    getUsers,
     blockAndUnblockUser
}
export default adminUsersService
