import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";
import router from "./route";
import { socket } from "./socket-io";
import { RootState } from "./store";

const App = () => {
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user) {
      socket.connect();
    }
    return () => {
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    socket.on("notify", (message) => {
      toast(message);
    });
    return () => {
      socket.removeAllListeners();
    };
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
