import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Layout/Navbar";
// import { TfiAlarmClock } from "react-icons/tfi";
import { BsTag } from 'react-icons/bs';

import { FaSun, FaMoon } from "react-icons/fa";


import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import server from "../../Axios/axios";
import Swal from "sweetalert2";
import Footer from "../Layout/Footer";
import { useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { message } from "antd";
import Rating from "react-rating";


// import { login, reset } from '../../../Redux/features/auth/authSlice'

function BookPage() {
  const navigate = useNavigate();
  // toast.configure();
  const CustomStarRating = ({ value }) => {
    return (
      <Rating
        initialRating={value}
        emptySymbol={<i className="far fa-star text-primary" />}
        fullSymbol={<i className="fas fa-star text-primary" />}
        readonly
      />
    );
  };
  const { user } = useSelector((state) => state?.auth);
  const userId = user?._id;

  const location = useLocation();

  const packageId = location?.state?._id || ""; // Set a default value for packageId

  const places = location.state?.places || [];

  // const packageId= location.state._id

  const startDate = new Date(location.state?.startDate);
  const endDate = new Date(location.state?.endDate);

  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth() + 1;
  const startDay = startDate.getDate();

  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth() + 1;
  const endDay = endDate.getDate();

  console.log("locationData", location);
  const [paymentError, setPaymentError] = useState("");


  const [Total, setTotal] = useState(location.state?.price);
  const [ticket, setTicket] = useState(1);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingReviewDescription, setEditingReviewDescription] = useState("");

  // function handleTicket(e) {
  //   setTicket(Number(e.target.value)); // Store the parsed value of the input field in the ticket state
  // }

  // function handleTicket(e) {
  //   setTicket(location?.state?.price * e?.target?.value);
  // }

  useEffect(() => {
    if (packageId) {
      fetchReviews(packageId);
    }
  }, [packageId]);

  useEffect(() => {
    if (location.state?.roundedOfferPrice) {
      setTotal(location.state?.roundedOfferPrice * ticket);
    } else {
      setTotal(location.state?.price * ticket);
    }
  }, [ticket, location.state?.price, location.state?.roundedOfferPrice]);

  function handleTicket(e) {
    setTicket(Number(e.target.value));
  }



  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });





  async function handleClick() {
    if (!user) {
      Swal.fire({
        title: "Please Login",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    let orderId =
      "OD" + Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("razorpay SDK failed to load. Are you online?");
    }
    let paymetRes = {
      order_id: orderId,

      amount: Total,
      currency: "INR",
      payment_capture: 1,
    };



    const users = JSON.parse(localStorage.getItem("user"));
    const token = users?.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const result = await server.post("/orders", paymetRes, config);

      console.log("Result", result);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        currency: result.data.data.currency,
        amount: result.data.data.amount,
        name: "Trippy",
        description: "Wallet Transaction",
        image: "https://res.cloudinary.com/dbpbx7tw4/image/upload/v1689164650/profile/travel_zrmyox.png",
        order_id: result.data.data.id,
        handler: async function (response) {
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);

          let packageDatas = {
            packageId: location.state?._id,
            vendorId: location.state?.vendorId,
            packageName: location.state?.name,
            packageDetails: location.state?.details,
            startDate: location.state?.startDate,
            endDate: location.state?.endDate,
            price: location.state?.price,
            totalMember: ticket,
          };

          server
            .post("/order", {
              orderId: response.razorpay_order_id,
              userId,
              packageDatas,
            })
            .then((response) => {
              const { _id } = response.data.data;
              console.log("responsedta", response);
              navigate("/success/" + _id);
            })
            .catch(() => {
              toast.error("An error occurred. Please try again.");
            });
        },
        prefill: {
          name: "Ribin Mathew",
          email: "trippy@gmail.com",
          contact: "9999999999",
        },
        theme: { color: "#1f5215" },
        modal: {
          ondismiss: function () {
            setPaymentError("Payment cancelled.");
            toast.error("Payment cancelled.");
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    }
    catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);

      } else {
        toast.error("An error occurred. Please try again.");
      }
      toast.error("An error occurred. Please try again.");

      navigate("/payment-failed");

    }
  }






  // const [selectedDay, setSelectedDay] = useState(null);

  // const tourDays = [
  //   {
  //     day: 1,
  //     details: "Day 1 details go here...",
  //   },
  //   {
  //     day: 2,
  //     details: "Day 2 details go here...",
  //   },
  //   {
  //     day: 3,
  //     details: "Day 3 details go here...",
  //   },
  // ];

  // const handleDayClick = (day) => {
  //   setSelectedDay(day === selectedDay ? null : day);
  // };

  // const [reviewRating, setReviewRating] = useState(0);
  // const [reviewDescription, setReviewDescription] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch existing reviews from the server
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await server.get(`/reviews/${packageId}`);
      setReviews(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const createReview = async () => {
  //   try {
  //     const user = JSON.parse(localStorage.getItem("user"));
  //     const token = user.token;

  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };

  //     const response = await server.post( "/reviews",
  //       {
  //         userId,
  //         packageId: location.state?._id,
  //         rating: reviewRating,
  //         description: reviewDescription,
  //       },
  //       config
  //     );
  //     console.log("Review created:", response.data);

  //     toast.success(" Your review added");
  //     setReviewRating(0);
  //     setReviewDescription("");
  //     // Fetch the updated list of reviews
  //     fetchReviews();
  //   } catch (error) {
  //     console.log(error.response.data.error);
  //     toast.error(error.response.data.error);

  //     // Swal.fire({
  //     //   title: "Error",
  //     //   text: error.response.data.error,
  //     //   icon: "error",
  //     //   confirmButtonText: "OK",
  //     // });
  //   }
  // };

  const deleteReview = async (reviewId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await server.delete(`/reviews/${reviewId}`, config);

      console.log("Review deleted:", response.data);
      toast.success("Review deleted successfully");

      fetchReviews();
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  const handleEditReview = (reviewId) => {
    const review = reviews.find((r) => r._id === reviewId);
    if (review) {
      setEditingReviewId(reviewId);
      setEditingReviewDescription(review?.description);
    }
  };

  const handleUpdateReview = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await server.put(
        `/reviews/${editingReviewId}`,
        {
          description: editingReviewDescription,
        },
        config
      );
      console.log("Review updated:", response.data);
      toast.success("Review updation successfully");

      setEditingReviewId(null);
      setEditingReviewDescription("");
      // Fetch the updated list of reviews
      fetchReviews();
    } catch (error) {
      toast.error("Review updation Failed");
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="lg:pt-12 mt-3 mx-auto">
          <div>
            <div color="blue-gray  " className="relative">
              <img
                src={location.state?.image[0]?.url}
                alt="Place"
                className="w-screen h-[550px] object-cover "
              />
              <div className="text-white font-semibold text-3xl p-5 md:p-10 absolute top-[10%] left-[5%] font-Poppins">
                <h1 className="pb-2">{location.state?.name}</h1>
              </div>

              <div className="md:w-1/2 bg-gray-100 absolute top-[90%] left-4 md:left-[25%]  flex shadow-xl  rounded-lg w-11/12 ">
                <div className="w-1/3 px-8 p-4 flex  gap-5 justify-center items-center">
                  {/* <FaSun className="text-4xl" /> */}
                  <FaSun className="text-yellow-900 text-4xl" />


                  <div className=" flex flex-col font-bold text-[#040010] items-center">
                    <p className="">{location.state?.day} </p>
                    <p>Day </p>
                  </div>
                </div>
                <div className="w-1/3 px-8 p-4 flex  gap-5 justify-center items-center border-x-2 border-black/10">
                  <FaMoon className=" text-yellow-900 text-4xl" />

                  <div className=" flex flex-col  font-bold text-[#040010] items-center ">
                    <p className="">{location.state?.night} </p>
                    <p>Nights </p>
                  </div>
                </div>

                <div className="w-1/3 px-8 p-4 flex  gap-5 justify-center items-center">
                  <BsTag className=" text-primary text-4xl" />

                  <div className=" flex flex-col font-bold  items-center  ">
                    <h1 className="pb-2 text-xl font-bold text-[#ef0404]">Price : ₹{location.state?.price}</h1>
                    <h1 className=" text-[#040010]">(per head)</h1>



                  </div>
                </div>
              </div>
            </div>
            <div className="flex pt-14 justify-around flex-wrap bg-gray-100 shadow-lg p-6">

              <h1 className="pb-2 text-[#040010] font-bold text-xl">
                Start Date: {`${startDay}-${startMonth}-${startYear}`}
              </h1>
              <h1 className="pb-2 text-[#040010] font-bold text-xl">
                End Date: {`${endDay}-${endMonth}-${endYear}`}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="container mx-auto flex-col overflow-hidden  flex lg:flex-row my-10  gap-6">
          <div className="md:w-3/4 overflow-hidden w-full p-5 text-lg">
            <h1 className="text-3xl font-bold mb-4">Overview</h1>

            {location.state?.details}
            <div className="mt-4 p-5  flex flex-col justify-center">
              <h1 className="text-xl font-bold mb-4">Package Reviews:</h1>
              <div className="flex">
                <CustomStarRating value={location.state?.averageRating} />{location.state?.averageRating} Star
                <span className="ml-2">Reviews</span>
                <span className="ml-2">({location.state?.totalReviews})</span>
              </div>
              {reviews.length === 0 ? (
                <p>No reviews yet.</p>
              ) : (
                <ul>
                  {reviews.map((review) => (

                    <li key={review._id} className="mb-4">
                      <div className="flex mb2 gap-2 flex-col w-fit bg-white shadow-lg p-5 px-10">
                        <div>
                          <StarRatingComponent
                            name={`rating-${review?._id}`}
                            value={review.rating}
                            starCount={5}
                            starColor="#FFA500"
                            emptyStarColor="#D3D3D3"
                            editing={false}
                          />
                        </div>

                        {editingReviewId === review?._id ? (
                          <>
                            <input
                              className="border p-2 mb-2"
                              placeholder="Edit your review..."
                              value={editingReviewDescription}
                              onChange={(e) =>
                                setEditingReviewDescription(e.target.value)
                              }
                            />
                            <div className="items-center space-x-5">
                              <button
                                className="text-base text-blue-900"
                                onClick={handleUpdateReview}
                              >
                                Update
                              </button>
                              <button
                                className="text-base text-deep-orange-900"
                                onClick={() => setEditingReviewId(null)}
                              >
                                Cancel
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="uppercase"> {review.description}</p>
                            <p className="uppercase">
                              Posted by: {review?.userId?.name}
                            </p>{" "}
                            {/* Display user name */}
                            {userId === review?.userId?._id && (
                              <>
                                <div className="space-x-5">
                                  <button
                                    className="text-base text-blue-900"
                                    onClick={() =>
                                      handleEditReview(review?._id)
                                    }
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="text-red-500 ml-2"
                                    onClick={() => deleteReview(review?._id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* <div className="mt-8">
                <h1 className="text-xl font-bold mb-4">Write a Review:</h1>
                <div className="flex items-center mb-4 ">
                  <StarRatingComponent
                    name="review-rating"
                    value={reviewRating}
                    onStarClick={(value) => setReviewRating(value)}
                    starCount={5}
                    starColor="#FFA500"
                    emptyStarColor="#D3D3D3"
                  />
                </div>
                <div className=" flex items-center gap-5 ">
                  <textarea
                    className="border border-black p-2 mb-2  "
                    placeholder="Write your review..."
                    value={reviewDescription}
                    onChange={(e) => setReviewDescription(e.target.value)}
                  ></textarea>
                  <button
                    className="bg-[#DC834E] hover:bg-brown-500 text-white text-sm rounded-lg px-5 p-2 "
                    onClick={createReview}
                  >
                    Submit
                  </button>
                </div>
              </div> */}
            </div>
          </div>

          <div className="md:w-1/4 w-full shadow-lg rounded-lg bg-gray-100 px-5 p-8">
            <div className="flex flex-col gap-3">
              <h1 className="text-xl font-semibold text-center border-b-4 rounded-lg border-[#DC834E] p-2">
                Book this tour
              </h1>
              <div className="flex border-b border-black/20 p-2 justify-between">
                <p>Date:</p>
                {`${startDay}-${startMonth}-${startYear}`}
              </div>
              <div className="flex border-b border-black/20 p-2 justify-between">
                <p>Time:</p> 10 AM
                {/* {`${startDay}-${startMonth}-${startYear}`} */}
              </div>
              <div className="flex border-b border-black/20 p-2 justify-between">
                <p>Price :</p>₹{location.state?.price}
              </div>
              <div className="flex border-b border-black/20 p-2 justify-between">
                <p>SavedPrice :</p> ₹{location.state?.savedPrice || "0"}
              </div>

              <div className="flex border-b border-black/20 p-2 justify-between">
                <p>OfferPrice :</p>
                {/* {location.state?.roundedOfferPrice || "no offer"} */}
                {location.state?.roundedOfferPrice ? (
                  <span>&#8377;{location.state.roundedOfferPrice}</span>
                ) : (
                  <span>no offer</span>
                )}

              </div>

              <div className="flex border-b border-black/20 p-2 justify-between">
                <p>Ticket:</p>
                <input
                  defaultValue={ticket}
                  onChange={handleTicket}
                  className="p-1 border-2 border-black w-24"
                  type="select"
                />
              </div>
              <div className="flex border-b border-black/20 p-2 justify-between">
                <p>Total:</p>
                <p>₹{Total}</p>
              </div>
            </div>

            <button
              onClick={handleClick}
              className="bg-[#DC834E] hover:bg-brown-500 w-full text-lg font-semibold  rounded-lg mt-8 text-white p-3"
            >
              Book now
            </button>
          </div>
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </>
  );
}

export default BookPage;
