import { io } from "socket.io-client";
// import { getCookie } from "typescript-cookie";

export const socket = io(process.env.REACT_APP_WS || '', {
  autoConnect: false,
  //uncomment with production
  // comment because of issue: https://github.com/carhartl/typescript-cookie/issues/1
  // auth: { token: getCookie("access_token") },
});
