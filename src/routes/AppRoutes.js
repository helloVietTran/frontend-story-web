import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/home";
import Hot from "../pages/hot";
import Following from "../pages/following";
import History from "../pages/history";
import FindStory from "../pages/find-story";
import FindAdvanced from "../pages/find-advanced";
import BoyStory from "../pages/boy-story";
import GirlStory from "../pages/girl-story";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import Story from "../pages/story";
import Chapter from "../pages/chapter";
import InformationPage from "../pages/information";
import ForgotPassword from "../pages/forgot-password";
import ResetPassword from "../pages/reset-password";
import NotFound from "../pages/not-found";
import UserPage from "../pages/user";

import UserProfile from "../components/Information/UserSide/UserProfile";
import ChangePassword from "../components/Information/UserSide/ChangePassword";
import UserPoint from "../components/Information/UserSide/UserPoint";
import Shop from "../components/Information/UserSide/Shop";
import Notifications from "../components/Information/UserSide/Notifications";
import Dashboard from "../components/Information/UserSide/Dashboard";
import Comment from "../components/Information/UserSide/Comment";
import ComicFollowed from "../components/Information/UserSide/ComicFollowed";

const AppRoutes = ({ isAuthenticated }) => {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/hot", element: <Hot /> },
    { path: "/following", element: <Following /> },
    { path: "/history", element: <History /> },
    { path: "/find-story", element: <FindStory /> },
    { path: "/find-story/:genre", element: <FindStory /> },
    { path: "/find-advanced", element: <FindAdvanced /> },
    { path: "/boy-story", element: <BoyStory /> },
    { path: "/girl-story", element: <GirlStory /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/reset-password", element: <ResetPassword /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/user/:userID", element: <UserPage /> },
    { path: "/story/:storyName/:storyID", element: <Story /> },
    { path: "/story/:storyName/:storyID/:chap", element: <Chapter /> },
    { path: "*", element: <NotFound /> },
    {
      path: "/secure",
      element: isAuthenticated ? <InformationPage /> : <Navigate to="/login" />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "userProfile", element: <UserProfile /> },
        { path: "changePassword", element: <ChangePassword /> },
        { path: "userPoint", element: <UserPoint /> },
        { path: "shop", element: <Shop /> },
        { path: "notifications", element: <Notifications /> },
        { path: "comment", element: <Comment /> },
        { path: "comicFollowed", element: <ComicFollowed /> },
      ],
    },
  ];

  return (
    <Routes>
      {routes.map((route, index) =>
        route.children ? (
          <Route key={index} path={route.path} element={route.element}>
            {route.children.map((child, idx) => (
              <Route key={idx} path={child.path} element={child.element} />
            ))}
          </Route>
        ) : (
          <Route key={index} path={route.path} element={route.element} />
        )
      )}
    </Routes>
  );
};

export default AppRoutes;