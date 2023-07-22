import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function PlaceCard({ place }) {
  PlaceCard.propTypes = {
    place: PropTypes.string.isRequired,
  };

  const navigate = useNavigate();

  const handlePlaceDetails = (data) => {
    navigate(`/placeDetails/${place._id}/about`, { state: data });
  };
  return (
    <div
      key={place._id}
      style={{ width: "300px" }}
      className=" bg-white rounded-xl overflow-hidden shadow-lg pt-12"
    >
      {place?.image && place?.image[0]?.url ? (
        <div className="relative group">
          <img
            className="w-full h-44 sm:h-52 p-2 object-cover rounded-t-xl opacity-100 transition-transform duration-500"
            src={place.image[0]?.url}
            alt="Munnar"
          />
          {place.image[1]?.url && (
            <img
              className="w-full h-44 sm:h-52 p-2 object-cover rounded-t-xl absolute top-0 left-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              src={place.image[1]?.url}
              alt="Munnar"
            />
          )}
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-300"></div>
      )}

      <div className="p-4">
        <div>
          <h2 className="font-bold text-lg text-center">{place?.place}</h2>
          <p className="text-center text-gray-600">
            {place?.type}, {place?.district}
          </p>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => handlePlaceDetails(place)}
            className="text-white bg-purple-600 hover:bg-primary px-3 py-1 rounded-md transition-colors duration-300 transform hover:scale-105"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceCard;
