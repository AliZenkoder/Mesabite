"use client";
import { AuthInitialState, AuthState } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { deleteCookie } from "cookies-next";

const getInitialState = () => {
  let isUser: AuthState | null = null;
  if (typeof localStorage !== "undefined" && localStorage.length !== 0) {
    const storedUser =
      typeof localStorage !== undefined ? localStorage.getItem("user") : null;
    isUser = storedUser !== null ? JSON.parse(storedUser) : null;
  }

  const authInitialState: AuthInitialState = {
    value: {
      name: isUser ? isUser.name : "",
      userId: isUser ? isUser.userId : "",
      isAuth: isUser ? isUser.isAuth : false,
    },
  };
  return authInitialState;
};

export const auth = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    logOut: () => {
      localStorage.removeItem("user");
      deleteCookie("isAuth");

      return {
        value: {
          name: "",
          userId: "",
          isAuth: false,
        },
      };
    },
    logIn: (_state, action: PayloadAction<AuthState>) => {
      const user = {
        isAuth: action.payload.isAuth,
        name: action.payload.name,
        userId: action.payload.userId,
      };
      // set new user in local storage
      localStorage.setItem("user", JSON.stringify(user));
      return {
        value: user,
      };
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
