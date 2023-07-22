
import axiosInstance from '../../../Axios/axios'

// Add Place
const addPlace = async(place,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.post('/admin/places',place,config)
    return response.data
}

const placeService={
    addPlace
}
export default placeService









