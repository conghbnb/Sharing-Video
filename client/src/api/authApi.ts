import axiosClient from "./axiosClient";
import { ISignInPayload, IUser } from "../store/types/user";

const authApi = {
  async signinOrSignup(signinPayload: ISignInPayload) {
    const url = "auth/signinOrSignup";
    const res = await axiosClient.post<IUser>(url, signinPayload, {
      withCredentials: true,
    });
    return res.data;
  },
};

export default authApi;
