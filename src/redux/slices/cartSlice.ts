import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "@/types";

interface CartState {
  courses: Course[];
}

const initialState: CartState = {
  courses: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Course>) => {
      const courseExists = state.courses.some(
        (course) => course.id === action.payload.id
      );
      if (!courseExists) {
        state.courses.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.courses = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
