import App from "../App";
import MessageSection from "../components/MessageSection";
import CheckEmail from "../pages/CheckEmail";
import CheckPassword from "../pages/CheckPassword";
import Home from "../pages/Home";
import RegisterPage from "../pages/RegisterPage";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "email",
        element: <CheckEmail />,
      },
      {
        path: "password",
        element: <CheckPassword />,
      },
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: ":userId",
            element: <MessageSection />,
          },
        ],
      },
    ],
  },
]);

export default router;
