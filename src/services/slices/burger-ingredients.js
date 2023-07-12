import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleResponse } from "../utils/api";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchData",
  async () => {
    try {
      const res = await fetch(
        "https://norma.nomoreparties.space/api/ingredients"
      );
      return await handleResponse(res);
    } catch (error) {
      throw error;
    }
  }
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ingredientsSlice.reducer;
