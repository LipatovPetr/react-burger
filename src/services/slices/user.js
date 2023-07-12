import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  postRequest,
  patchRequest,
  fetchWithRefresh,
  handleResponse,
} from "../utils/api";

const initialState = {
  user: null,
  loginStatus: "idle",
  registerStatus: "idle",
  editStatus: "idle",
  logoutStatus: "idle",
  authorizeStatus: "idle",
  error: null,
  isAuthChecked: false,
};

export const register = createAsyncThunk("user/register", async (data) => {
  try {
    const res = await postRequest("/auth/register", data);
    const jsonData = await handleResponse(res);
    localStorage.setItem("accessToken", jsonData.accessToken);
    localStorage.setItem("refreshToken", jsonData.refreshToken);
    return jsonData;
  } catch (error) {
    throw error;
  }
});

export const login = createAsyncThunk("user/login", async (data) => {
  try {
    const res = await postRequest("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const jsonData = await handleResponse(res);
    localStorage.setItem("accessToken", jsonData.accessToken);
    localStorage.setItem("refreshToken", jsonData.refreshToken);
    return jsonData;
  } catch (error) {
    throw error;
  }
});

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    const res = await postRequest("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    });
    const jsonData = await handleResponse(res);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return jsonData;
  } catch (error) {
    throw error;
  }
});

export const editUser = createAsyncThunk("user/edit", async (data) => {
  try {
    const res = await patchRequest(
      "/auth/user",
      data,
      localStorage.getItem("accessToken")
    );
    return await handleResponse(res);
  } catch (error) {
    throw error;
  }
});

export const authorizeUser = createAsyncThunk("user/auth", async (token) => {
  try {
    const res = await fetchWithRefresh("/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    return res;
  } catch (error) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    throw error;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    authChecked(state) {
      state.isAuthChecked = true;
    },
  },
  extraReducers(builder) {
    builder
      // Login action handlers
      .addCase(login.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.user = { ...action.payload.user };
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = "failed";
        console.log(action);
        state.error = action.error.message;
      })
      // Register action handlers
      .addCase(register.pending, (state) => {
        state.registerStatus = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registerStatus = "succeeded";
        state.user = { ...action.payload.user };
      })
      .addCase(register.rejected, (state, action) => {
        state.registerStatus = "failed";
        state.error = action.error.message;
      })
      // Edit User action handlers
      .addCase(editUser.pending, (state) => {
        state.editStatus = "loading";
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.editStatus = "succeeded";
        state.user = { ...action.payload.user };
      })
      .addCase(editUser.rejected, (state, action) => {
        state.editStatus = "failed";
        state.error = action.error.message;
      })
      // checkAuth action handlers
      .addCase(authorizeUser.pending, (state) => {
        state.authorizeStatus = "loading";
      })
      .addCase(authorizeUser.fulfilled, (state, action) => {
        state.authorizeStatus = "succeeded";
        state.user = { ...action.payload.user };
        state.isAuthChecked = true;
      })
      .addCase(authorizeUser.rejected, (state, action) => {
        state.authorizeStatus = "failed";
        state.error = action.error.message;
      })
      // logout action handlers
      .addCase(logout.pending, (state) => {
        state.logoutStatus = "loading";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.logoutStatus = "succeeded";
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
export const { clearError, authChecked } = userSlice.actions;
