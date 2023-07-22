import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./PackageCategoryService";

const initialState = {
  category: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message:"",
  error:""
};



export const addCategory = createAsyncThunk(
  "category/add",
  async (catData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().VendorAuth.vendor.token;
      const response = await categoryService.addCategory(catData, token);
      return response.message;

     } 
    catch (error) {
      if (error.response ) {
        const message = error.response.data.error;
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      } else {
        return thunkAPI.rejectWithValue("server problem");
      }
     }
  }
);




export const categorySlice = createSlice({
  name: "packageCategory",
  initialState,
  reducers: {
    categoryReset: (state) => {
      state.category = [];
      state.isError = false;
      state.isLoading = false;
      state.message ="";
      state.error ="";

      state.isSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        console.log(action);
      
        state.isLoading = false;
        state.isSuccess = true;

        state.message = action.payload;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  }
});

export const { categoryReset } = categorySlice.actions;
export default categorySlice.reducer;
