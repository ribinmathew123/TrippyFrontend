import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from '../features/auth/authSlice'
import adminAuthReducer from '../features/adminAuth/adminAuthSlice'
import adminUsersReducer from '../features/admin/adminUsersSlice'
import adminVendorsReducer from '../features/admin/adminVendorSlice'
import vendorReducer from '../features/vendorAuth/VendorSlice'
import addPackageReducer from '../features/package/packageSlice'
import addPlaceReducer from '../features/addPlace/addPlaceSlice'
import packageSliceReducer from '../features/user/PackageSearchSlice'
import selectPlaceSliceReducer from '../features/SelectPlace/SelectPlaceSlice'
import touristPlaceSliceReducer from '../features/admin/GetPlace/GetPlaceSlice'
import getPackageSliceReducer from '../features/GetPackage/GetPackageSlice'
import packageCategorySliceReducer from '../features/Vendor/PackageCategory/PackageCategorySlice'
import CategoryActionsSliceReducer from '../features/Vendor/CategoryActions/CategoryActionsSlice'










const authPersistConfig = {
  key: 'auth',
  storage,
};


const adminAuthPersistConfig = {
  key: 'adminAuth',
  storage,
};


const adminUsersPersistConfig = {
  key: 'adminUsers',
  storage,
};



const adminVendorsPersistConfig = {
  key: 'adminVendors',
  storage,
};


const vendorPersistConfig = {
  key: 'VendorAuth',
  storage,
};


const addPackagePersistConfig = {
  key: 'package',
  storage
}

const addPlacePersistConfig = {
  key: 'places',
  storage
}

const serchPackagePersistConfig = {
  key: 'PackageSearchData',
  storage
}





const selectPlacePersistConfig = {
  key: 'PlaceAndCat',
  storage
}

const tPlacePersistConfig = {
  key: 'TouristPlace',
  storage
}
const getPackagePersistConfig = {
  key: 'GetPackage',
  storage
}



const packageCategoryPersistConfig = {
  key: 'PackageCategory',
  storage
}


const categoryActionsPersistConfig = {
  key: 'CategoryActions',
  storage
}






const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const persistedAdminAuthReducer = persistReducer(adminAuthPersistConfig, adminAuthReducer);
const persistedAdminUsersReducer = persistReducer(adminUsersPersistConfig, adminUsersReducer);
const persistedAdminAllVendorsReducer = persistReducer(adminVendorsPersistConfig, adminVendorsReducer);

const persistedVendorReducer = persistReducer(vendorPersistConfig, vendorReducer);
const persistedPackageReducer = persistReducer(addPackagePersistConfig, addPackageReducer);

const persistedPlaceReducer = persistReducer(addPlacePersistConfig, addPlaceReducer);
const persistedSearchPackageReducer = persistReducer(serchPackagePersistConfig, packageSliceReducer);
const persistedSelectPlaceReducer = persistReducer(selectPlacePersistConfig, selectPlaceSliceReducer);
const persistedtPlaceReducer = persistReducer(tPlacePersistConfig, touristPlaceSliceReducer);
const persistedGetPackageReducer = persistReducer(getPackagePersistConfig, getPackageSliceReducer);
const persistedPackageCategoryReducer = persistReducer(packageCategoryPersistConfig, packageCategorySliceReducer);
const persistedCategoryActionReducer = persistReducer(categoryActionsPersistConfig,CategoryActionsSliceReducer);








const rootReducer = {
  auth: persistedAuthReducer,
  adminAuth: persistedAdminAuthReducer,
  adminUsers: persistedAdminUsersReducer,
  adminVendors:persistedAdminAllVendorsReducer,
  VendorAuth:persistedVendorReducer,
  package:persistedPackageReducer,
  places:persistedPlaceReducer,
  PackageSearchData:persistedSearchPackageReducer,
  PlaceAndCat:persistedSelectPlaceReducer,
  TouristPlace:persistedtPlaceReducer,
  GetPackage:persistedGetPackageReducer,
  PackageCategory: persistedPackageCategoryReducer,
  CategoryActions:persistedCategoryActionReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
