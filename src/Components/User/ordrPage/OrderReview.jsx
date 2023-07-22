import React, { useEffect, useState } from "react";
import Navbar from "../../Layout/Navbar";
import { useLocation } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import { useSelector } from "react-redux";
import server from "../../../Axios/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function OrderReview() {
  const location = useLocation();
  const { user } = useSelector((state) => state?.auth);
  const userId = user?._id;
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingReviewDescription, setEditingReviewDescription] = useState("");
  const packageId = location.state?.packageId._id 


  useEffect(() => {
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

  const createReview = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await server.post( "/reviews",
        {
          userId,
          packageId: location.state?.packageId?._id ,
          rating: reviewRating,
          description: reviewDescription,
        },
        config
      );
      console.log("Review created:", response.data);

      toast.success(" Your review added");
      setReviewRating(0);
      setReviewDescription("");
      fetchReviews();
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);

      
    }
  };

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
      fetchReviews();
    } catch (error) {
      toast.error("Review updation Failed");
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="container mx-auto border flex items-center justify-center rounded-lg  ">
        <div className="shadow-2xl md:mt-20 rounded-lg md:w-[450px] w-[350px] flex justify-center items-center md:px-8
         flex-col">
        <h1 className="text-3xl font-bold mb-4 mt-10 text-center">
          Package Details
        </h1>

        <div className="flex items-center  justify-center mb-8">
          <div className="w-32 h-20 flex items-center justify-center border border-gray-300 rounded-lg shadow-lg">
            <img
              src={location.state?.packageId?.image[0]?.url}
              alt="Place"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex items-center justify-center flex-col font-serif font-bold">
          <p className="text-lg mb-2 uppercase">
            {location.state?.packageId.name}


          </p>
          <p className="text-lg mb-2 uppercase">
            {location.state?.vendorId.name}
          </p>
          {/* <p className="text-lg mb-2 uppercase">
            {location.state?.vendorId.email}
          </p> */}
        </div>

        <div className="mt-4  flex flex-col items-center justify-center">
              <h1 className="text-xl font-bold mb-4">Package Reviews:</h1>
              {reviews.length === 0 ? (
                <p>No reviews yet.</p>
              ) : (
                <ul>
                  {reviews.map((review) => (
                    <li key={review._id} className="mb-4">
                      <div className="flex mb-2 gap-2 flex-col w-fit bg-white shadow-lg p-5">
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

               <div className="mt-8">
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
              </div> 
            </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default OrderReview;
