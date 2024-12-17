import { useEffect } from "react";
import { Routes, Route, Navigate, } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";

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

import UserProfile from "@/components/Information/UserOptionSide/UserProfile/UserProfile";
import ChangingPassword from "@/components/Information/UserOptionSide/ChangingPassword/ChangingPassword";
import UserPoint from "@/components/Information/UserOptionSide/UserPoint/UserPoint";
import Shop from "@/components/Information/UserOptionSide/Shop/Shop";
import Notifications from "@/components/Information/UserOptionSide/Notifications/Notifications";
import Dashboard from "@/components/Information/UserOptionSide/Dashboard/Dashboard";
import MyComment from "@/components/Information/UserOptionSide/MyComment/MyComment";

import { introspect } from "@/redux/authSlice";
import MyFollowedComic from "@/components/Information/UserOptionSide/MyFollowedComic/MyFollowedComic";


const AppRoutes = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(()=> {
    dispatch(introspect());// action check token
  }, [dispatch])


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
    { path: "/story/:storyName/:storyID/:chap/", element: <Chapter /> },
    { path: "*", element: <NotFound /> },
    {
      path: "/secure",
      element: isAuthenticated ? <InformationPage /> : <Navigate to='/login'/>,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "user-profile", element: <UserProfile /> },
        { path: "changing-password", element: <ChangingPassword /> },
        { path: "user-point", element: <UserPoint /> },
        { path: "shop", element: <Shop /> },
        { path: "notification", element: <Notifications /> },
        { path: "my-comment", element: <MyComment /> },
        { path: "my-followed-comic", element: <MyFollowedComic /> },
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
