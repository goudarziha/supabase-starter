import React from "react";
import {
  Main,
  Login,
  Register,
  ForgotPassword,
  Account,
  About,
  Profile,
  Settings,
} from "./containers";

export interface IRoute {
  path: string;
  name: string;
  exact: boolean;
  component: any;
  props?: any;
}

enum AuthRoutes {
  ACCOUNT = "/account",
  SETTINGS = "/settings",
  ANALYTICS = "/analytics",
}

enum GuestRoutes {
  PROFILE = "/profile/:uid",
  LOGIN = "/login",
  REGISTER = "/register",
  FORGOT = "/forgot",
  ABOUT = "/about",
  HOME = "/",
}

const createRoute = (
  path: string,
  name: string,
  component: any,
  exact: boolean
) => {
  return { path, name, component, exact };
};

const routes: Array<IRoute> = [
  // Auth
  createRoute(GuestRoutes.LOGIN, "Login", Login, true),
  createRoute(GuestRoutes.REGISTER, "Register", Register, true),
  createRoute(GuestRoutes.FORGOT, "Forgot Password", ForgotPassword, true),

  // Main
  createRoute(GuestRoutes.HOME, "Home Page", Main, true),
  createRoute(GuestRoutes.ABOUT, "About", About, true),
  createRoute(GuestRoutes.PROFILE, "Profile", Profile, true),

  // Authenticated
  createRoute(AuthRoutes.ACCOUNT, "Account", Account, true),
  createRoute(AuthRoutes.SETTINGS, "Settings", Settings, true),
];

export default routes;
