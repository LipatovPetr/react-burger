import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  orderList: [],
  totalPrice: 0,
  status: "idle",
  orderNum: null,
  orderName: null,
};

export const postData = createAsyncThunk(
  "order/postData",
  async (data) => {
    const response = await fetch("https://norma.nomoreparties.space/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: data,
      }),
    });

    const jsonData = await response.json();
    return jsonData; 
  }
);

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
      const bunsIds = [action.payload.bun._id, action.payload.bun._id];
      const stuffingsIds = action.payload.stuff.map(
        (ingredient) => ingredient._id
      );
      state.orderList = stuffingsIds.concat(bunsIds);
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
        console.log(action)
        
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
