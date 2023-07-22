import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PackageSearchServices from "./PackageSearchServices";


const initialState = {
    searchData:[],

    isLoading: false,
    isSuccess: false,
    isError: false,
  };
  
  export const searchPackage = createAsyncThunk(
    "users/searchPackage",
    async (packageData, thunkAPI) => {
      try {
        const response = await PackageSearchServices.searchPackage(packageData);
        localStorage.setItem("searchData", JSON.stringify(packageData));
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  export const searchPackageSlice = createSlice({
    name: "PackageSearchData",
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(searchPackage.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
          state.isSuccess = false;
        })
        .addCase(searchPackage.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.searchData= (action.payload)
        })
        .addCase(searchPackage.rejected, (state) => {
          state.isLoading = false;
          state.isError = true;
        });
    },
  });
  
  export const { reset } = searchPackageSlice.actions;
  
  export default searchPackageSlice.reducer;
  