import axiosClient from "./axiosClient";
import { ISignInPayload } from "../store/types/user";

const authApi = {
  signin(signinPayload: ISignInPayload) {
    const url = "auth/signin";
    return axiosClient.post(url, signinPayload);
  },

  // signup(signupPayload) {
  //   const url = "auth/signup";
  //   return axiosClient.post(url, signupPayload);
  // },
};

export default authApi;
