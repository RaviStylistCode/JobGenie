import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./Actions/Useraction";

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import storage from "redux-persist/lib/storage";
  
  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };

  const rootReducer=combineReducers({
    auth:userReducer,
  
  })


  const persistedReducer = persistReducer(persistConfig, rootReducer);

const store=configureStore({
    reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;