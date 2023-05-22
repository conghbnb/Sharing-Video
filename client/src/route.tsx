import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "./containers/layout";
import Home from "./pages/home";
import ShareVideo from "./pages/share-video";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return <Navigate to={"/"} replace />;
  }

  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/share",
    element: (
      <ProtectedRoute>
        <Layout>
          <ShareVideo />
        </Layout>
      </ProtectedRoute>
    ),
  },
  { path: "*", element: <p>There's nothing here: 404!</p> },
]);

export default router;
