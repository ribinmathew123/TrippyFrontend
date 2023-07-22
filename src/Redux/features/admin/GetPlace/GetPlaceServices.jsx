
import axiosInstance from '../../../../Axios/axios.js'
// Get Place
const getPlace = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.get('/admin/places',config)
    return response.data
}



// Delete Place
const deletePlace = async (id,token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.delete(`/admin/places?id=${id}`,config)
    return response.data
}

// block & unblock Place

const blockAndUnblockPlace = async(id,token) => {
    const config = {
        headers: {
            Authorization:  `Bearer ${token}`
        }
    }
    const response = await axiosInstance.put('/admin/places',{id:id},config)
    return response.data
}


const fetchPlace = async (id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.get(
      `/admin/places/${id}`,
      config
    );    console.log("all",response.data);

    return response.data
  }
  




const TourPlaceService={
    blockAndUnblockPlace,deletePlace,getPlace,fetchPlace
   
}

export default TourPlaceService









