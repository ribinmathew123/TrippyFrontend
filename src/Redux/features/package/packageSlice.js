import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PackageServices from './packageService'

const initialState = {
    packages:[],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

// Add package
export const addPackage = createAsyncThunk('package/add', async (pack, thunkAPI) => {
    try {

        // const token=thunkAPI.getState().VendorAuth.vendor.token
        const token = thunkAPI.getState().VendorAuth.vendor.token



        return await PackageServices.addPackage({pack,token})
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


// Get package
export const getPackage = createAsyncThunk('package/get', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().VendorAuth.vendor.token
        return await PackageServices.getPackage(token)
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



// Get Place
export const getPlace = createAsyncThunk('place/get', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().VendorAuth.vendor.token
        return await PackageServices.getPlace(token)
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})





// Delete package
export const deletePackage = createAsyncThunk('package/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().VendorAuth.vendor.token
        return await PackageServices.deletePackage(id,token)
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


// Block and Unblock package
export const blockAndUnblockPackage = createAsyncThunk('package/blockAndUnblockCar', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().VendorAuth.vendor.token
        return await PackageServices.blockAndUnblockPackage(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const PackageSlice = createSlice({
    name: 'package',
    initialState,
    reducers: {
        reset: (state) => {
            state.packages = []
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }        
    },
    extraReducers:(builder) => {
        builder
        .addCase(addPackage.pending,(state) => {
            state.isLoading=true
        })
        .addCase(addPackage.fulfilled,(state,action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.message = (action.payload)
        })
        .addCase(addPackage.rejected,(state,action)=> {
            state.isLoading = false
            state.isError = true
            state.message  = action.payload
        })

        .addCase(getPackage.pending,(state) => {
            state.isLoading=true
        })
        .addCase(getPackage.fulfilled,(state,action)=> {
            state.isLoading = false
            state.packages = action.payload
        })
        .addCase(getPackage.rejected,(state,action)=> {
            state.isLoading = false
            state.isError = true
            state.message  = action.payload
        })
        .addCase(deletePackage.pending,(state) => {
            state.isLoading=true
        })
        .addCase(deletePackage.fulfilled,(state,action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload.message
        })
        .addCase(deletePackage.rejected,(state,action)=> {
            state.isLoading = false
            state.isError = true
            state.message  = action.payload
        })
        .addCase(blockAndUnblockPackage.pending,(state) => {
            state.isLoading=true
        })
        .addCase(blockAndUnblockPackage.fulfilled,(state,action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload
        })
        .addCase(blockAndUnblockPackage.rejected,(state,action)=> {
            state.isLoading = false
            state.isError = true
            state.message  = action.payload
        })
    }
})

export const { reset } = PackageSlice.actions
export default PackageSlice.reducer