import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  bun: null,
  stuffings: [],
};

const constructorSlice = createSlice({
  name: "constructor",
  initialState,
  reducers: {
    addItem(state, action) {
      if (action.payload.type === "bun") {
        state.bun = { ...action.payload, uuid: uuidv4() };
      } else {
        state.stuffings.push({ ...action.payload, uuid: uuidv4() });
      }
    },
    removeItem(state, action) {
      state.stuffings.splice(action.payload, 1);
    },

    ingredientMoved(state, action) {
      const { fromIndex, toIndex } = action.payload;
      const updatedStuffings = [...state.stuffings];
      const [movedItem] = updatedStuffings.splice(fromIndex, 1);
      updatedStuffings.splice(toIndex, 0, movedItem);

      state.stuffings = updatedStuffings;
    },
  },
});

export default constructorSlice.reducer;
export const { addItem, removeItem, ingredientMoved } =
  constructorSlice.actions;
