import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faPen } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";

import {
  categoryReset,
  addCategory,
} from "../../../Redux/features/Vendor/PackageCategory/PackageCategorySlice";

import {
  getCategory,
  updateCategory,
  deleteCategory,
  blockAndUnblockCat,
  Reset,
} from "../../../Redux/features/Vendor/CategoryActions/CategoryActionsSlice";

import Swal from "sweetalert2";

function Category() {
  const dispatch = useDispatch();

  const { CategoryActions, IsError, Message } = useSelector(
    (state) => state.CategoryActions
  );

  const { isLoading, isError, isSuccess, message, error } = useSelector(
    (state) => state.PackageCategory
  );


  useEffect(() => {
    dispatch(getCategory());
    return () => {
      dispatch(Reset());
    };
  }, [dispatch]);






  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { cname } = data;

    const catData = {
      cname,
    };

    dispatch(addCategory(catData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(error);
    }
    if (isSuccess) {
      toast.success(message);
    }
    dispatch(categoryReset());
  }, [isError, message, error, isSuccess, dispatch]);

  const handleDelete = (cat) => {
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
          dispatch(deleteCategory(cat._id));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwindButtons.fire(
            "Cancelled",
            "Your file is safe :)",
             "info"
          );
        }
      });
  };

  const handleBlockUnblockCat = (id) => {
    dispatch(blockAndUnblockCat(id));
  };


  const handleUpdateCategory = (catId) => {
    console.log("place Details",catId);
    dispatch(updateCategory(catId));
  };






  return (
    <div className="flex flex-col items-center overflow-hidden bg-white p-5 md:p-10">
      <h1 className="font-bold text-2xl text-blue-900 my-6"> Add Category</h1>

      <div className=" container lg:px-32 p-5 py-10 bg-green-200 shadow-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-center flex-col gap-2"
        >
          <div className="md:space-y-5 w-full space-y-3 items-start flex flex-col">
            <div className="flex justify-between flex-col md:flex-row w-full gap-2 md:gap-10">
              <div className=" w-full  flex-col gap-2 flex">
                <div className="md:flex-row flex-col flex gap-8 justify-center items-center">
                  <label className="whitespace-nowrap" htmlFor="">
                    Category Name:
                  </label>
                  <input
                    name="cname"
                    className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
                    type="text"
                    {...register("cname", {
                      required: "Please Enter Category Name",
                    })}
                  />
                </div>
                {errors.cname && (
                  <p className="text-[#ff0000]  errorMessage">
                    {errors.cname?.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-700 mt-6 mb-4 text-white w-fit px-8 rounded-lg p-2"
          >
            {isLoading ? "Uploading..." : "Submit"}
          </button>
        </form>

        <h1 className="text-2xl font-bold mb-4">Category List</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y border-collapse border border-slate-500">
            <thead className="bg-blue-gray-500">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-md text-center font-medium text-black uppercase tracking-wider"
                >
                  Sl.No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-md text-center font-medium text-black uppercase tracking-wider"
                >
                  Category Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-md text-center font-medium text-black uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3  text-md text-center font-medium text-black uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-blue-gray-200">
              {CategoryActions.map((cat, index) => (
                <tr key={cat._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    {cat.name}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    {cat.isBlocked ? (
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
                      onClick={() => handleBlockUnblockCat(cat._id)}
                      className={`${
                        cat.isBlocked ? "bg-red-500" : "bg-green-500"
                      } text-white py-1 px-3 rounded mr-3`}
                    >
                      {cat.isBlocked ? "Unblock" : "Block"}
                    </button>

                    <button
                      onClick={() => handleUpdateCategory(cat)}
                      className=" mr-6 ml-5"
                    >
                      <FontAwesomeIcon
                        icon={faPen}
                        size="xl"
                        style={{ color: "#134bcd" }}
                      />
                    </button>
                    <button
                      onClick={() => handleDelete(cat)}
                      className=" py-1 px-3  mr-3"
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="xl"
                        style={{ color: "#ec091f" }}
                      />
                    </button>
                  </td>
                </tr>
              ))}
              {CategoryActions.length === 0 && (
                <tr>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black text-center"
                    colSpan={7}
                  >
                    <span>No data found</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Category;
