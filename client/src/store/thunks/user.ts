import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISignInPayload } from "../types/user";
import authApi from "../../api/authApi";

const signinOrSignup = createAsyncThunk(
  "user/signinOrSignup",
  async (signinPayload: ISignInPayload) => {
    const data = await authApi.signinOrSignup(signinPayload);
    return data;
  }
);

export default signinOrSignup;
