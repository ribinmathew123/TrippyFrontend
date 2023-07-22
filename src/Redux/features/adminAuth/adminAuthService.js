import axios from "../../../Axios/axios";
import { message } from "antd";

// Login Admin
const login = async (adminData) => {
  const response = await axios.post("/admin/login", adminData);

  if (response.data) {
    localStorage.setItem("admin", JSON.stringify(response.data));
    message.success("Login Success");
  }
  return response.data;
};

//Logout Admin

const logout = () => {
  localStorage.removeItem("admin");
   message.success("Admin Logout Success");
};

const adminAuthService = {
  login,
  logout,
};
export default adminAuthService;
