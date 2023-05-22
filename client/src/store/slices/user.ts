import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";
import { ISignInPayload, IUser } from "../types/user";

export const signinOrSignup = createAsyncThunk(
  "user/signinOrSignup",
  async (signinPayload: ISignInPayload) => {
    const res = await authApi.signinOrSignup(signinPayload);
    return res.data;
  }
);

interface IUserState {
  loading: boolean;
  error: boolean;
  user: IUser | null;
}

const initialState: IUserState = {
  loading: false,
  error: false,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinOrSignup.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        signinOrSignup.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(signinOrSignup.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
