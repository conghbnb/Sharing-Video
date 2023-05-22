import axiosClient from "./axiosClient";
import { ISignInPayload } from "../store/types/user";

const authApi = {
  signinOrSignup(signinPayload: ISignInPayload) {
    const url = "auth/signinOrSignup";
    return axiosClient.post(url, signinPayload, { withCredentials: true });
  },
};

export default authApi;
