import { useState } from "react";
import avatar from "../../assest/login-animation.gif";
import styles from "../../style/username.module.css";
import { Link } from "react-router-dom";
import axios from "../../Axios/axios";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { storetoken } from "../../Redux/token/token";

function UserLogin() {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  console.log("token", token);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loginform, setloginform] = useState({
    email: "",
    password: "",
  });
  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setloginform({ ...loginform, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("/login", {
        email: loginform.email,
        password: loginform.password,
      })
      .then((response) => {
        const userData = response.data;
        dispatch(storetoken(userData));
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data);
        setErrors(error.response.data);
      });
  };

  return (
    <div
      className="container mx-auto w-full h-fit	 "
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1682903448503-39dd75ff2b01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)`,
        // backgroundImage: `url(https://images.unsplash.com/photo-1682685796186-1bb4a5655653?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)`,

        // backgroundImage: `url(https://www.stoneheadbikes.com/blog/wp-content/uploads/2020/04/north-india.jpg)`,
        //  backgroundImage: `url(https://www.pixelstalk.net/wp-content/uploads/images6/4K-Travel-Wallpaper-for-Desktop.jpg)`,

        // backgroundImage: `url(https://imgcld.yatra.com/ytimages/image/upload/v1554203593/AdvNation/ANN_TRP772/uttarakhand_motorcycle_tour_2zdPJv.jpg)`,

        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex  py-9 justify-center items-center h-screen  backdrop-blur-sm	 ">
        <div className=" 		 border-4 border-white rounded-3xl mt-6  min-w-[20%]">
          <div className="title flex flex-col items-center   ">
            <h4 className="text-4xl font-bold text-white ">Log In</h4>
          </div>

          <form className="py-1  " onSubmit={handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                className="p-2 rounded-lg outline-none text-black"
                type="text"
                placeholder="Email id"
                onChange={onChangeHandle}
                value={loginform.email}
                name="email"
              />
              {errors && <p style={{ color: "red" }}>{errors.email}</p>}
              <input
                className="p-2 rounded-lg outline-none text-black"
                type="password"
                placeholder="password"
                onChange={onChangeHandle}
                value={loginform.password}
                name="password"
              />{" "}
              {errors && <p style={{ color: "red" }}>{errors.password}</p>}
              <button
                className="p-2 bg-blue-600 w-2/3 rounded-xl hover:bg-blue-800"
                type="submit"
              >
                Login
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-black-800">
                Not a Member{" "}
                <Link className="text-blue-900" to="/signup">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
