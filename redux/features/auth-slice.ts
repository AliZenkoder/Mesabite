import { AuthInitialState, AuthState } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { deleteCookie } from "cookies-next";
import { createAppSlice } from "@/redux/create-app-slice";
import { signIn } from "@/services/firestore-services";

export const getInitialState = () => {
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
    status: "idle",
  };
  return authInitialState;
};

export const authSlice = createAppSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: getInitialState(),
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    logOut: create.reducer((state) => {
      localStorage.removeItem("user");
      deleteCookie("isAuth");

      state.value = {
        name: "",
        userId: "",
        isAuth: false,
      };
    }),
    oldLogIn: create.reducer((state, action: PayloadAction<AuthState>) => {
      const user = {
        isAuth: action.payload.isAuth,
        name: action.payload.name,
        userId: action.payload.userId,
      };
      // set new user in local storage
      localStorage.setItem("user", JSON.stringify(user));
      state.value = user;
    }),
    logInAsync: create.asyncThunk(
      async ({ email, password }) => {
        const logInUser = await signIn(email, password);
        return logInUser;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.value = {
            isAuth: action.payload !== undefined ? true : false,
            name:
              action.payload?.user.displayName ||
              action.payload?.user.email?.split("@")[0] ||
              "Anonymous",
            userId: action.payload?.user?.uid || "",
          };
          localStorage.setItem("user", JSON.stringify(state.value));
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    getLoginUser: (user) => user.value,
    getLoginStatus: (user) => user.status,
  },
});

// Action creators are generated for each case reducer function.
export const { logInAsync, logOut } = authSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { getLoginUser, getLoginStatus } = authSlice.selectors;
