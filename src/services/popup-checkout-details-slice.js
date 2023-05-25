import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  opened: false,
  name: null,
  orderNum: null,
};

const checkoutSlice = createSlice({
  name: "checkoutPopup",
  initialState,
  reducers: {
    checkoutPopupOpened(state) {
      state.opened = true;
    },
    checkoutPopupClosed(state) {
      state.opened = false;
    },
  },
});

export default checkoutSlice.reducer;

export const { checkoutPopupOpened, checkoutPopupClosed } = checkoutSlice.actions;
