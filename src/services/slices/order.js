import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest, handleResponse } from "../utils/api";

const initialState = {
  orderList: [],
  totalPrice: 0,
  status: "idle",
  orderNum: null,
  orderName: null,
};

export const postData = createAsyncThunk("order/postData", async (data) => {
  try {
    const res = await postRequest("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ ingredients: data }),
    });
    return await handleResponse(res);
  } catch (err) {
    throw err;
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    totalPriceUpdated(state, action) {
      const bun = action.payload.bun;
      const stuffings = action.payload.stuff;
      if (bun !== null) {
        const bunPrice = bun.price * 2;
        state.totalPrice =
          bunPrice +
          (stuffings.length > 0
            ? stuffings.reduce((sum, component) => sum + component.price, 0)
            : 0);
      } else {
        state.totalPrice =
          stuffings.length > 0
            ? stuffings.reduce((sum, component) => sum + component.price, 0)
            : 0;
      }
    },
    orderListUpdated(state, action) {
      const bunsId = action.payload.bun._id;
      const stuffingsIds = action.payload.stuff.map(
        (ingredient) => ingredient._id
      );
      state.orderList = [bunsId, ...stuffingsIds, bunsId];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderNum = action.payload.order.number;
        state.orderName = action.payload.name;
      })
      .addCase(postData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;

export const { totalPriceUpdated, orderListUpdated, checkoutUpdated } =
  orderSlice.actions;
