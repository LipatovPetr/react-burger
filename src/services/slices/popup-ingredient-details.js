import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clickedIngredient: null,
  opened: false,
};

const modalSlice = createSlice({
  name: "ingredientsPopup",
  initialState,
  reducers: {
    ingredientClicked(state, action) {
      const data = action.payload.availableIngredients;
      const ingredientId = action.payload.ingredientId;

      const chosenIngredient = data.find((item) => item._id === ingredientId);
      if (chosenIngredient) {
        state.clickedIngredient = chosenIngredient;
      }
    },
    ingredientsPopupOpened(state) {
      state.opened = true;
    },
    ingredientsPopupClosed(state) {
      state.opened = false;
      state.clickedIngredient = null;
    },
  },
});

export default modalSlice.reducer;

export const {
  ingredientsPopupOpened,
  ingredientsPopupClosed,
  ingredientClicked,
} = modalSlice.actions;
