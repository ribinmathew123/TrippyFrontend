import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TourPlaceService from "./GetPlaceServices";


const initialState = {
  tplaces: [],
  selectedPlace:null,
  placeIsLoading: false,
  placeIsSuccess: false,
  placeIsError: false,
  placeMessage: "",
  placeError: "",
};


// Get Place
export const getPlace = createAsyncThunk("place/get", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().adminAuth.admin.token;
    return await TourPlaceService.getPlace(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});







// Delete Place
export const deletePlace = createAsyncThunk(
  "place/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.admin.token;
      return await TourPlaceService.deletePlace(id, token);
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
export const blockAndUnblockPlace = createAsyncThunk(
  "place/blockAndUnblockPlace",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.admin.token;
      return await TourPlaceService.blockAndUnblockPlace(id, token);
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










export const fetchPlace = createAsyncThunk(
  "place/fetchPlace",
  async (id, thunkAPI) => {
    console.log("ddddsss",id);
    try {
      const token = thunkAPI.getState().adminAuth.admin.token;
      return await TourPlaceService.fetchPlace(id, token);
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







export const placeSlice = createSlice({
  name: "TouristPlace",
  initialState,
  reducers: {
    placeReset: (state) => {
      state.tplaces = [];
      state.placeError = "";
      state.placeIsError = false;
      state.placeMessage = "";
      state.placeIsSuccess = false;
    },
//     fetchPlace:(state,action)=>{
// state.selectedPlace=action.payload
//     }
  },
  extraReducers: (builder) => {
    builder
       .addCase(fetchPlace.fulfilled, (state, action) => {
        
        state.placeIsLoading = false;
        state.placeIsSuccess = true;
        state.selectedPlace = action.payload.place;
      })


      .addCase(getPlace.pending, (state) => {
        state.placeIsLoading = true;
      })
      .addCase(getPlace.fulfilled, (state, action) => {
        state.placeIsLoading = false;
        state.placeIsSuccess = true;
        state.tplaces = action.payload;
      })
      .addCase(getPlace.rejected, (state, action) => {
        state.placeIsLoading = false;
        state.placeIsError = true;
        state.placeMessage = action.payload;
      })

      .addCase(deletePlace.pending, (state) => {
        state.placeIsLoading = true;
      })
      .addCase(deletePlace.fulfilled, (state, action) => {
        let allPlace = state.tplaces.filter(
          (data) => data._id !== action.meta.arg
        );
        state.tplaces=[...allPlace]
        state.placeIsLoading = false;
        state.placeIsSuccess = false;
        state.placeMessage = action.payload.message;
      })
      .addCase(deletePlace.rejected, (state, action) => {
        state.placeIsLoading = false;
        state.placeIsError = true;
        state.placeMessage = action.payload;
        state.tplaces = state.tplaces.filter(
          (place) => place._id !== action.payload.deletedPlaceId
        );
      })

      .addCase(blockAndUnblockPlace.pending, (state) => {
        state.placeIsLoading = true;
      })

      .addCase(blockAndUnblockPlace.fulfilled, (state, action) => {
        let allPlace = state.tplaces.map((data) =>
          data._id === action.meta.arg
            ? { ...data, isBlocked: !data.isBlocked }
            : { ...data }
        );
        return {
          tplaces: [...allPlace],
          placeIsLoading: false,
          placeIsSuccess: true,
          placeMessage: action.payload,
        };
      })

      .addCase(blockAndUnblockPlace.rejected, (state, action) => {
        state.placeIsLoading = false;
        state.placeIsError = true;
        state.placeMessage = action.payload;
      });
      
  },


  
});

export const { placeReset ,updateplace} = placeSlice.actions;
export default placeSlice.reducer;









// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import TourPlaceService from "./GetPlaceServices";

// const initialState = {
//   tplaces: [],
//   // selectPlace:{},
//   placeIsLoading: false,
//   placeIsSuccess: false,
//   placeIsError: false,
//   placeMessage: "",
//   placeError: "",
// };

// // Get Place
// export const getPlace = createAsyncThunk("place/get", async (_, thunkAPI) => {
//   try {
//     const token = thunkAPI.getState().adminAuth.admin.token;
//     return await TourPlaceService.getPlace(token);
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();
//     return thunkAPI.rejectWithValue(message);
//   }
// });

// // Delete Place
// export const deletePlace = createAsyncThunk(
//   "place/delete",
//   async (id, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().adminAuth.admin.token;
//       return await TourPlaceService.deletePlace(id, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// // Block and Unblock Place
// export const blockAndUnblockPlace = createAsyncThunk(
//   "place/blockAndUnblockPlace",
//   async (id, thunkAPI) => {
//     console.log(id);
//     try {
//       const token = thunkAPI.getState().adminAuth.admin.token;
//       return await TourPlaceService.blockAndUnblockPlace(id, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// // Edit Place
// export const editPlace = createAsyncThunk(
//   "place/edit",
//   async (place, thunkAPI) => {
//     console.log("iddddddd",place);
//     // console.log("placeData",placeData);

//     try {
//       const token = thunkAPI.getState().adminAuth.admin.token;
//       return await TourPlaceService.editPlace(place, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );








// export const placeSlice = createSlice({
//   name: "TouristPlace",
//   initialState,
//   reducers: {
//     placeReset: (state) => {
//       state.tplaces = [];
//       state.placeError = "";
//       state.placeIsError = false;
//       state.placeMessage = "";
//       state.placeIsSuccess = false;
//     },

//   //   updatePlace:(state,action)=>
//   //   {
//   //   state.selectPlace=action.payload;
//   // },

//   extraReducers: (builder) => {
//     builder
//       .addCase(getPlace.pending, (state) => {
//         state.placeIsLoading = true;
//       })
//       .addCase(getPlace.fulfilled, (state, action) => {
//         state.placeIsLoading = false;
//         state.placeIsSuccess = true;
//         state.tplaces = action.payload;
//       })
//       .addCase(getPlace.rejected, (state, action) => {
//         state.placeIsLoading = false;
//         state.placeIsError = true;
//         state.placeMessage = action.payload;
//       })
//       .addCase(deletePlace.pending, (state) => {
//         state.placeIsLoading = true;
//       })
//       .addCase(deletePlace.fulfilled, (state, action) => {
//         let allPlace = state.tplaces.filter(
//           (data) => data._id !== action.meta.arg
//         );
//         state.tplaces = [...allPlace];
//         state.placeIsLoading = false;
//         state.placeIsSuccess = false;
//         state.placeMessage = action.payload.message;
//       })
//       .addCase(deletePlace.rejected, (state, action) => {
//         state.placeIsLoading = false;
//         state.placeIsError = true;
//         state.placeMessage = action.payload;
//         state.tplaces = state.tplaces.filter(
//           (place) => place._id !== action.payload.deletedPlaceId
//         );
//       })
//       .addCase(blockAndUnblockPlace.pending, (state) => {
//         state.placeIsLoading = true;
//       })
//       .addCase(blockAndUnblockPlace.fulfilled, (state, action) => {
//         let allPlace = state.tplaces.map((data) =>
//           data._id === action.meta.arg
//             ? { ...data, isBlocked: !data.isBlocked }
//             : { ...data }
//         );
//         state.tplaces = [...allPlace];
//         state.placeIsLoading = false;
//         state.placeIsSuccess = true;
//         state.placeMessage = action.payload;
//       })
//       .addCase(blockAndUnblockPlace.rejected, (state, action) => {
//         state.placeIsLoading = false;
//         state.placeIsError = true;
//         state.placeMessage = action.payload;
//       })
//       .addCase(editPlace.pending, (state) => {
//         state.placeIsLoading = true;
//       })
//       .addCase(editPlace.fulfilled, (state, action) => {
//         const editedPlace = action.payload;
//         state.tplaces = state.tplaces.map((place) =>
//           place._id === editedPlace._id ? editedPlace : place
//         );
//         state.placeIsLoading = false;
//         state.placeIsSuccess = true;
//         state.placeMessage = "Place updated successfully.";
//       })
//       .addCase(editPlace.rejected, (state, action) => {
//         state.placeIsLoading = false;
//         state.placeIsError = true;
//         state.placeMessage = action.payload;
//       })

//       // .addCase(seletedPlace.fullfille, (state) => {
//       //   state.placeIsLoading = true;
//       // })
    


//     }}
// });

// export const { placeReset } = placeSlice.actions;
// export default placeSlice.reducer;
