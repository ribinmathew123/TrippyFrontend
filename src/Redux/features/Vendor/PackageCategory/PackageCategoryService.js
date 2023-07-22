
import axiosInstance from '../../../../Axios/axios'

// Add Place
const addCategory = async(catData,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.post('/vendor/addCategory',catData,config)
    return response.data
}

const CategoryService={
    addCategory
}
export default CategoryService









