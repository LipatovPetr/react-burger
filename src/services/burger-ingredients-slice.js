import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchData = createAsyncThunk("ingredients/fetchData", async () => {
  try {
    const response = await fetch("https://norma.nomoreparties.space/api/ingredients");
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
});

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ingredientsSlice.reducer;


