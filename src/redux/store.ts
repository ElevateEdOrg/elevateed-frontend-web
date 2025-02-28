import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import chatReducer from "./slices/chatSlice";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice"; // Import the cart slice
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
  cart: ReturnType<typeof cartReducer>; // Add cart to RootState
}

// Persist Configuration with Type
const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  whitelist: ["user", "cart"], // Persist user and cart, but not chat
};

// Combine all reducers
const rootReducer = combineReducers({
  chat: chatReducer,
  user: userReducer,
  cart: cartReducer, // Add cart to the root reducer
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
