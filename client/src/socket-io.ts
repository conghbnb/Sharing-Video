import { io } from "socket.io-client";
import { getCookie } from "typescript-cookie";

export const socket = io("ws://localhost:8800", {
  autoConnect: false,
  auth: { token: getCookie("access_token") },
});
