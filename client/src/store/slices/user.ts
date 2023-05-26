import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import signinOrSignup from "../thunks/user";
import { IUser } from "../types/user";

export interface IUserState {
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
        toast("Invalid email or password!", { type: "error" });
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
