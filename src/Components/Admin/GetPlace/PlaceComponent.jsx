import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import {
  getPlace,
  deletePlace,
  blockAndUnblockPlace,
} from "../../../Redux/features/admin/GetPlace/GetPlaceSlice";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const PlaceComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tplaces, placeIsError, placeMessage } = useSelector(
    (state) => state.TouristPlace
  );

  useEffect(() => {
    dispatch(getPlace());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (placeIsError) {
      toast.error(placeMessage);
    }
  }, [placeIsError, placeMessage]);

  const handleDelete = (place) => {
    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded ml-10",
        cancelButton:
          "bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded",
      },
      buttonsStyling: false,
    });

    swalWithTailwindButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithTailwindButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
          dispatch(deletePlace(place._id));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwindButtons.fire(
            "Cancelled",
            "Your file is safe :)",
            "info"
          );
        }
      });
  };

  const handleBlockUnblockPlace = (id) => {
    dispatch(blockAndUnblockPlace(id));
  };

  const handleUpdatePlace = (id) => {
    console.log("place Details id", id);
    navigate("/admin/places/update/" + id);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredPlaces = tplaces.filter(
    (place) =>
      place.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPlaces = sortBy
    ? [...filteredPlaces].sort((a, b) => {
        if (sortBy === "asc") {
          return a.place.localeCompare(b.place);
        } else if (sortBy === "desc") {
          return b.place.localeCompare(a.place);
        } else {
          return 0;
        }
      })
    : filteredPlaces;

  const totalPages = Math.ceil(sortedPlaces.length / itemsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const paginatedPlaces = sortedPlaces.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <section className="ml-18vw p-8">
        <div className="grid gap-4 mt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <label htmlFor="search">Search:</label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={handleSearch}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="sort">Sort by Name:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
              </select>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-4 uppercase">Place List</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y border-collapse border border-light-green-50">
              <thead className="bg-[#111827] text-white text-md text-center font-medium tracking-wider">
                <tr className="uppercase ">
                  <th className="p-5" scope="col">
                    Sl.No
                  </th>
                  <th scope="col">Type</th>
                  <th scope="col">Name</th>
                  <th scope="col">District</th>
                  {/* <th scope="col">Town</th> */}
                  <th scope="col">Image</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-blue-gray-400">
                {paginatedPlaces.length === 0 ? (
                  <tr>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black text-center"
                      colSpan={8}
                    >
                      <span>No data found</span>
                    </td>
                  </tr>
                ) : (
                  paginatedPlaces.map((place, index) => (
                    <tr key={place._id} className="uppercase ">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                        {place.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                        {place.place}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                        {place.district}
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                        {place.city}
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium text-black">
                        {place.image.length > 0 ? (
                          <img
                            src={place.image[0].url}
                            alt="Place"
                            className="h-20 w-20 object-cover rounded-md"
                          />
                        ) : (
                          "No image available"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                        {place.isBlocked ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Blocked
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                        <button
                          onClick={() => handleBlockUnblockPlace(place._id)}
                          className={`${
                            place.isBlocked ? "bg-red-500" : "bg-green-500"
                          } text-white py-1 px-3 rounded mr-3`}
                        >
                          {place.isBlocked ? "Unblock" : "Block"}
                        </button>
                        <button
                          onClick={() => handleUpdatePlace(place._id)}
                          className="mr-6 ml-5"
                        >
                          <FontAwesomeIcon
                            icon={faPen}
                            size="xl"
                            style={{ color: "#134bcd" }}
                          />
                        </button>
                        <button
                          onClick={() => handleDelete(place)}
                          className="py-1 px-3  mr-3"
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            size="xl"
                            style={{ color: "#ec091f" }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-l-md bg-blue-500 text-white font-bold hover:bg-blue-700"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index + 1)}
                className={`${
                  currentPage === index + 1
                    ? "bg-blue-900 text-white font-bold"
                    : "bg-white text-blue-300 font-medium hover:bg-blue-200"
                } px-3 py-1`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-r-md bg-blue-500 text-white font-bold hover:bg-blue-700"
            >
              Next
            </button>
          </nav>
        </div>
      </section>
      <Toaster />
    </div>
  );
};

export default PlaceComponent;
