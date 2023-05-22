import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home";
import store from "./store";

const router = createBrowserRouter([{ path: "/", element: <Home /> }]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  );
}

export default App;
