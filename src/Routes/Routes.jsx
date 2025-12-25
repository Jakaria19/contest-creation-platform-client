import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Home/Login";
import SignUp from "../pages/Home/SignUp";
import DashBoard from "../pages/DashBoard/DashBoard";
import AddContest from "../pages/DashBoard/AddContest";
import CreateContest from "../pages/DashBoard/CreateContest";
import Update from "../pages/DashBoard/Update";
import PrivateRoute from "./PrivateRoute";
import AllContest from "../pages/AllContest/AllContest";
import ContestDetails from "../pages/ContestDetails/ContestDetails";
import ManegeUser from "../pages/DashBoard/ManegeUser";
import ManageContest from "../pages/DashBoard/ManageContest";
import ContestSubmitted from "../pages/DashBoard/ContestSubmitted";
import MyProfile from "../pages/DashBoard/MyProfile";
import Payment from "../pages/Payment/Payment";
import MyParticipation from "../pages/DashBoard/MyParticipation";
import SubmitContests from "../pages/AllContest/SubmitContests/SubmitContests";
import ShowSubmission from "../pages/ShowSubmission/ShowSubmission";
import WinningContest from "../pages/DashBoard/WinningContest";
import Sectors from "../pages/Sectors/Sectors";
import Service from "../pages/Service/Service";
import AdminRoute from "./AdminRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signUp", element: <SignUp /> },
      { path: "allContest", element: <AllContest /> },
      { path: "sectors", element: <Sectors /> },
      { path: "services", element: <Service /> },
      {
        path: "contestDetails/:id",
        element: (
          <PrivateRoute>
            <ContestDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/contest/${params.id}`),
      },
      {
        path: "payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/contest/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoard />
      </PrivateRoute>
    ),
    children: [
      { path: "myProfile", element: <MyProfile /> },
      { path: "addContest", element: <AddContest /> },
      { path: "createdContest", element: <CreateContest /> },
      {
        path: "createdContest/update/:id",
        element: <Update />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/contest/${params.id}`),
      },
      { path: "contestSubmitted", element: <ContestSubmitted /> },
      { path: "participatedContest", element: <MyParticipation /> },
      {
        path: "participatedContest/submit/:id",
        element: <SubmitContests />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/paymentSingle/${params.id}`),
      },
      {
        path: "contestSubmitted/showSubmission/:contestId",
        element: <ShowSubmission />,
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_API_URL}/paymentSubmit/${params.contestId}`
          ),
      },
      { path: "winningContest", element: <WinningContest /> },

      {
        path: "manageUser",
        element: (
          <AdminRoute>
            <ManegeUser />
          </AdminRoute>
        ),
      },
      {
        path: "manageContest",
        element: (
          <AdminRoute>
            <ManageContest />
          </AdminRoute>
        ),
      },
    ],
  },
]);
