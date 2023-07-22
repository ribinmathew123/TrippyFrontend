
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryActionService from "./CategoryActionsService";

const initialState = {
  CategoryActions: [],
  selectedCategory:[],
  // isLoading: false,
  IsSuccess: false,
  IsError: false,
  Message: "",
   Error: "",
};


// Get Place
export const getCategory = createAsyncThunk("category/get", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().VendorAuth.vendor.token;
    return await categoryActionService.getCategory(token);
   } catch (error) {
      if (error.response ) {
        const message = error.response.data.error;
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      } else {
        return thunkAPI.rejectWithValue("server problem");
      }
     
  }
});





// Delete Place
export const deleteCategory = createAsyncThunk(
  "catgory/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().VendorAuth.vendor.token;
      return await categoryActionService.deleteCategory(id, token);
    } 
    
   catch (error) {
    if (error.response ) {
      const message = error.response.data.error;
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    } else {
      return thunkAPI.rejectWithValue("server problem");
    }
  } });




// Block and Unblock Place
export const blockAndUnblockCat = createAsyncThunk(
  "category/blockAndUnblockCat",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().VendorAuth.vendor.token;
      return await categoryActionService.blockAndUnblockCat(id, token);
    }catch (error) {
    if (error.response ) {
      const message = error.response.data.error;
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    } else {
      return thunkAPI.rejectWithValue("server problem");
    }
  } });





export const catSlice = createSlice({
  name: "catSlice",
  initialState,
  reducers: {
    Reset: (state) => {
      state.CategoryActions = [];
      state.Error = "";
      state.IsError = false;
      state.IsLoading = false;

      state.Message = "";
      state.IsSuccess = false;
    },
    updateplace:(state,action)=>{
state.selectedCategory=action.payload
    }
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(getCategory.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.IsLoading = false;
        state.IsSuccess = true;
        state.CategoryActions = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsError = true;
        state.Message = action.payload;
      })

      .addCase(deleteCategory.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        let allcategory = state.CategoryActions.filter(
          (data) => data._id !== action.meta.arg
        );
        state.CategoryActions=[...allcategory]
        state.IsLoading = false;
        state.IsSuccess = false;
        state.Message = action.payload.message;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsError = true;
        state.Message = action.payload;
        state.CategoryActions = state.CategoryActions.filter(
          (cat) => cat._id !== action.payload.deletedCatId
        );
      })

      .addCase(blockAndUnblockCat.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(blockAndUnblockCat.fulfilled, (state, action) => {
        let allcategory = state.CategoryActions.map((data) =>
          data._id === action.meta.arg
            ? { ...data, isBlocked: !data.isBlocked }
            : { ...data }
        );
        return {
          CategoryActions: [...allcategory],
          IsLoading: false,
          IsSuccess: true,
          Message: action.payload,
        };
      })

      .addCase(blockAndUnblockCat.rejected, (state, action) => {
        state.IsLoading = false;
        state.IsError = true;
        state.Message = action.payload;
      });
  },
});

export const { Reset ,updateCategory} = catSlice.actions;
export default catSlice.reducer;









