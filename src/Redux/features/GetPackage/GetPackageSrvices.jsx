
import axiosInstance from '../../../Axios/axios'




// Get Package
const getPackage = async (id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.get(`/vendor/getPackage/${id}`,config)
    return response.data
}

const fetchPackage = async (id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.get(
      `/vendor/fetchPackage/${id}`,
      config
    );    console.log("allllllllllllll",response.data);

    return response.data
  }




// Delete Place
const deletePackage = async (id,token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.delete(`/vendor/packages?id=${id}`,config)
    return response.data
}





// block & unblock Place

const blockAndUnblockPackage = async(id,token) => {
    const config = {
        headers: {
            Authorization:  `Bearer ${token}`
        }
    }
    const response = await axiosInstance.put('/vendor/packages',{id:id},config)
    return response.data
}


const packageService={
    blockAndUnblockPackage,deletePackage,getPackage,fetchPackage
   
}

export default packageService









