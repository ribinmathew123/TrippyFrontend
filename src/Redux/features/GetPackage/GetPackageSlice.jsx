import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GetPackageService from "./GetPackageSrvices";

const initialState = {
  pack: [],
  selectedPackage:null,

  packageIsLoading: false,
  packageIsSuccess: false,
  packageIsError: false,
  packageMessage: "",
  packageError: "",
};


// Get Package
export const getPackage = createAsyncThunk("package/get", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().VendorAuth.vendor.token   
     const id = thunkAPI.getState().VendorAuth.vendor._id
console.log("vid".id);

    return await GetPackageService.getPackage(id,token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});



export const fetchPackage = createAsyncThunk(
  "packge/fetchPackage",
  async (id, thunkAPI) => {
    console.log("ddddsss",id);
    try {
      const token = thunkAPI.getState().VendorAuth.vendor.token
      return await GetPackageService.fetchPackage(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);




// Delete Place
export const deletePackage = createAsyncThunk(
  "package/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().VendorAuth.vendor.token
      return await GetPackageService.deletePackage(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Block and Unblock Place
export const blockAndUnblockPackage = createAsyncThunk(
  "package/blockAndUnblockPackage",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().VendorAuth.vendor.token
      return await GetPackageService.blockAndUnblockPackage(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const packageSlice = createSlice({
  name: "GetPackage",
  initialState,
  reducers: {
    packageReset: (state) => {
      state.pack = [];
      state.packageError = "";
      state.packageIsError = false;
      state.packageMessage = "";
      state.packageIsSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
     
    .addCase(fetchPackage.fulfilled, (state, action) => {
        
      state.packageIsLoading = false;
      state.packageIsSuccess = true;
      state.selectedPackage = action.payload.packages;
    })

      .addCase(getPackage.pending, (state) => {
        state.packageIsLoading = true;
      })
      .addCase(getPackage.fulfilled, (state, action) => {
        state.packageIsLoading = false;
        state.packageIsSuccess = true;
        state.pack = action.payload;
      })
      .addCase(getPackage.rejected, (state, action) => {
        state.packageIsLoading = false;
        state.packageIsError = true;
        state.packageMessage = action.payload;
      })

      .addCase(deletePackage.pending, (state) => {
        state.packageIsLoading = true;
      })
      .addCase(deletePackage.fulfilled, (state, action) => {
        let allPackage = state.pack.filter(
          (data) => data._id !== action.meta.arg
        );
        state.pack=[...allPackage]
        state.packageIsLoading = false;
        state.packageIsSuccess = false;
        state.packageMessage = action.payload.message;
      })
      .addCase(deletePackage.rejected, (state, action) => {
        state.packageIsLoading = false;
        state.packageIsError = true;
        state.packageMessage = action.payload;
        state.pack = state.pack.filter(
          (pack) => pack._id !== action.payload.deletedPackageId
        );
      })

      .addCase(blockAndUnblockPackage.pending, (state) => {
        state.packageIsLoading = true;
      })

      .addCase(blockAndUnblockPackage.fulfilled, (state, action) => {
        let allPackage = state.pack.map((data) =>
          data._id === action.meta.arg
            ? { ...data, isBlocked: !data.isBlocked }
            : { ...data }
        );
        return {
          pack: [...allPackage],
          packageIsLoading: false,
          packageIsSuccess: true,
          packageMessage: action.payload,
        };
      })

      .addCase(blockAndUnblockPackage.rejected, (state, action) => {
        state.packageIsLoading = false;
        state.packageIsError = true;
        state.packageMessage = action.payload;
      });
  },
});

export const { packageReset } = packageSlice.actions;
export default packageSlice.reducer;
