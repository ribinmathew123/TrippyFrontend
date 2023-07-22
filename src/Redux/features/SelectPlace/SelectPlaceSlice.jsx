// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import SelectPlaceService from "./SelectPlaceService";

// const initialState = {
//   selectPlace: [],
//   selectCategory:[],
//   placeLoading: false,
//   placeError: false,
//   placeSuccess: false,
//   placeMessage: "",
// };

// export const getPlace = createAsyncThunk("place/get", async (_, thunkAPI) => {
//   console.log("ttttttttttrrrrrrrrrr");

//   try {
//     const token = thunkAPI.getState().VendorAuth.vendor.token;
//     return await SelectPlaceService.selectPlace(token);
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();
//     return thunkAPI.rejectWithValue(message);
//   }
// });


// // Get Place
// export const getCategory = createAsyncThunk("category/get", async (_, thunkAPI) => {
//   try {
//     console.log("gggggggggg");
//     const token = thunkAPI.getState().VendorAuth.vendor.token;
//     return await SelectPlaceService.getCategory(token);
//    } catch (error) {
//       if (error.response ) {
//         const message = error.response.data.error;
//         console.log(message);
//         return thunkAPI.rejectWithValue(message);
//       } else {
//         return thunkAPI.rejectWithValue("server problem");
//       }
     
//   }
// });




// export const selectPlaceSlice = createSlice({
//   name: "selectPlace",
//   initialState,

//   reducers: {

//     selectCat: (state,action) => {
     
//       state.selectCategory=action.payload;
//     },


//     placeReset: (state) => {
//       state.selectPlace = [];
//       state.placeError = false;
//       state.placeMessage = "";
//       state.placeSuccess = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getPlace.pending, (state) => {
//         state.placeLoading = true;
//       })
//       .addCase(getPlace.fulfilled, (state, action) => {
//         state.placeLoading = false;
//         state.placeSuccess = true;
//         state.selectPlace = action.payload;
//       })
//       .addCase(getPlace.rejected.type, (state, action) => {
//         state.placeLoading = false;
//         state.placeError = true;
//         state.placeMessage = action.payload;
//       });
//   },
// });

// export const { placeReset,selectCat } = selectPlaceSlice.actions;
// export default selectPlaceSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SelectPlaceService from "./SelectPlaceService";

const initialState = {
  selectPlace: [],
  selectCategory: [],
  placeLoading: false,
  placeError: false,
  placeSuccess: false,
  placeMessage: "",
};

export const getPlaceAndCategory = createAsyncThunk(
  "place/getPlaceAndCategory",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().VendorAuth.vendor.token;
      const { placeResponse, categoryResponse } = await SelectPlaceService.getPlaceAndCategory(token);
      
      console.log("placeResponse:", placeResponse);
      console.log("categoryResponse:", categoryResponse);
      
      return {
        placeResponse,
        categoryResponse,
      };
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const selectPlaceSlice = createSlice({
  name: "selectPlace",
  initialState,
  reducers: {
    placeReset: (state) => {
      state.selectPlace = [];
      state.placeError = false;
      state.placeMessage = "";
      state.placeSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlaceAndCategory.pending, (state) => {
        state.placeLoading = true;
      })
      .addCase(getPlaceAndCategory.fulfilled, (state, action) => {
        state.placeLoading = false;
        state.placeSuccess = true;
        state.selectPlace = action.payload.placeResponse;
        state.selectCategory = action.payload.categoryResponse;
        
        console.log("selectPlace:", state.selectPlace);
        console.log("selectCategory:", state.selectCategory);
      })
      .addCase(getPlaceAndCategory.rejected, (state, action) => {
        state.placeLoading = false;
        state.placeError = true;
        state.placeMessage = action.payload;
      });
  }
});

export const { placeReset } = selectPlaceSlice.actions;
export default selectPlaceSlice.reducer;
