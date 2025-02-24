import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import chatReducer from "./slices/chatSlice";
import userReducer from "./slices/userSlice"; // Import the user slice
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Define the RootState type
export interface RootState {
  chat: ReturnType<typeof chatReducer>;
  user: ReturnType<typeof userReducer>;
}

// Persist Configuration with Type
const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
};

// Combine all reducers
const rootReducer = combineReducers({
  chat: chatReducer,
  user: userReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store with correct types
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

// Define RootState and AppDispatch types
export type AppDispatch = typeof store.dispatch;
