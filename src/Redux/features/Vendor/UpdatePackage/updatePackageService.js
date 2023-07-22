import axiosInstance from "../../../../Axios/axios";
// update Place
const updatePackage = async (formData,  token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",

    },
  };
  const response = await axiosInstance.post(
    `/vendor/update-packages/`,
    formData,
    config
  );
  return response.data;
};


const packageService = {
  updatePackage
};
export default packageService;
