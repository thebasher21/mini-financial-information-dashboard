"use client";
import { UserDetails } from "../components/login";

let userDetails: UserDetails = {
  username: "",
  password: "",
  isAuthenticated: false,
};

export const authenticate = (user: UserDetails) => {
  userDetails = structuredClone(user);
  const authenticatedUser: UserDetails = {
    username:
      process.env.NEXT_PUBLIC_USERNAME !== undefined
        ? process.env.NEXT_PUBLIC_USERNAME
        : "admin",
    password:
      process.env.NEXT_PUBLIC_PASSWORD !== undefined
        ? process.env.NEXT_PUBLIC_PASSWORD
        : "admin",
    isAuthenticated: true,
  };
  if (userDetails.username !== authenticatedUser.username) {
    userDetails.isAuthenticated = false;
    return { isAuthenticated: false, error: "Incorrect Username" };
  } else if (userDetails.password !== authenticatedUser.password) {
    userDetails.isAuthenticated = false;
    return { isAuthenticated: false, error: "Incorrect Password" };
  }
  sessionStorage.setItem(
    "userLoginToken",
    window.btoa(userDetails.username + "_" + userDetails.password)
  );
  userDetails.isAuthenticated = true;
  return { isAuthenticated: true, error: "" };
};

export const logout = () => {
  userDetails.isAuthenticated = false;
  sessionStorage.setItem("userLoginToken", "");
};

export const isAuthenticatedUser = () => userDetails.isAuthenticated;
