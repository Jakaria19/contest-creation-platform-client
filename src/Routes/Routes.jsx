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
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "allContest",
        element: <AllContest></AllContest>,
      },
      {
        path: "/contestDetails/:id",
        element: (
          <PrivateRoute>
            <ContestDetails></ContestDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://contest-lab-server.vercel.app/contest/${params.id}`),
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://contest-lab-server.vercel.app/contest/${params.id}`),
      },
      {
        path: "/sectors",
        element: <Sectors></Sectors>,
      },
      {
        path: "/services",
        element: <Service></Service>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoard></DashBoard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "addContest",
        element: (
          <PrivateRoute>
            <AddContest></AddContest>
          </PrivateRoute>
        ),
      },
      {
        path: "createdContest",
        element: <CreateContest></CreateContest>,
      },
      {
        path: "createdContest/update/:id",
        element: (
          <PrivateRoute>
            <Update></Update>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://contest-lab-server.vercel.app/contest/${params.id}`),
      },
      {
        path: "contestSubmitted",
        element: (
          <PrivateRoute>
            <ContestSubmitted></ContestSubmitted>
          </PrivateRoute>
        ),
      },
      //admin
      {
        path: "manageUser",
        element: (
          <AdminRoute>
            <ManegeUser></ManegeUser>
          </AdminRoute>
        ),
      },
      {
        path: "manageContest",
        element: (
          <AdminRoute>
            <ManageContest></ManageContest>
          </AdminRoute>
        ),
      },
      //user
      {
        path: "myProfile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "participatedContest",
        element: (
          <PrivateRoute>
            <MyParticipation></MyParticipation>
          </PrivateRoute>
        ),
      },
      {
        path: "participatedContest/submit/:id",
        element: (
          <PrivateRoute>
            <SubmitContests></SubmitContests>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://contest-lab-server.vercel.app/paymentSingle/${params.id}`
          ),
      },
      {
        path: "contestSubmitted/showSubmission/:contestId",
        element: (
          <PrivateRoute>
            <ShowSubmission></ShowSubmission>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://contest-lab-server.vercel.app/paymentSubmit/${params.contestId}`
          ),
      },
      {
        path: "winningContest",
        element: (
          <PrivateRoute>
            <WinningContest></WinningContest>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
