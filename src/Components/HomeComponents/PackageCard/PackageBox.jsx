import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import server from "../../../Axios/axios";
import Rating from "react-rating";

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

export default function PackageBox() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await server.get("vendor/packages");
        const data = response.data;
        console.log(response.data);
        setPackages(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleBookNow = (data) => {
    navigate("/bookpage", { state: data });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <>
      <h1 className="font-Poppins font-bold text-3xl ml-14">
        Trending Tour Package in Kerala
      </h1>
      <div className="flex-wrap flex  w-full items-center p-10 gap-[29px] gap-y-10 rounded-lg ">
        {packages?.slice(0, 8).map((pack) => (
          <div
            key={pack._id}
            className="w-[338px] shadow-lg bg-black/10 backdrop-blur-xl flex flex-col pb-5 justify-center rounded-md "
          >
            <div className="relative">
              <img
                src={pack?.image[0]?.url}
                alt="Place"
                className="w-[100%] h-52 object-cover transition-all duration-300 rounded-lg cursor-pointer filter "
              />
              <div className="absolute -bottom-5 right-[29%] rounded-xl  bg-blue-gray-700 px-4 p-2 text-white">
                <span>
                  {pack?.day} Days / {pack?.night} Nights
                </span>
              </div>
            </div>
            <div className="space-y-2 p-2 ">
              <div className="mb-2 mt-8">
                <h5 className="mb-2  text-center  text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {pack?.name}
                </h5>
              </div>
            </div>

            <div className=" text-start flex flex-col ml-12 space-y-4">
              <div className="flex">
                <CustomStarRating value={pack?.averageRating} />
                <span className="ml-2">Reviews</span>
                <span className="ml-2">({pack?.totalReviews})</span>
              </div>
              <div>
                <span>Seller:</span> {pack?.vendorName}
              </div>
              <div>
                <span>Price:</span> ₹ {pack?.price}
              </div>
              <div>
                <span>place:</span>{" "}
                {pack.place.map((place, index) => (
                  <span key={index}>
                    {place.place}
                    {index < pack.place.length - 1 ? " - " : ""}
                  </span>
                ))}
              </div>
              <div>
                <span>End Date:</span> {formatDate(pack?.endDate)}
              </div>
            </div>

            <div className="mb-10 px-10 flex justify-center">
              <button
                className="text-white bg-purple-700 hover:bg-black  mt-5 w-full  p-2 rounded-md transition-colors duration-300 transform hover:scale-105"
                onClick={() => handleBookNow(pack)}
              >
                BOOK NOW
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
