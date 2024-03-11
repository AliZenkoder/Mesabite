import { IUser } from "@/interfaces";
import { createAppSlice } from "@/redux/create-app-slice";
import { UsersInitialState } from "@/types";
import { PayloadAction } from "@reduxjs/toolkit";

export const initialState: UsersInitialState = {
  value: [],
};

export const userSlice = createAppSlice({
  name: "users",
  initialState,
  reducers: (create) => ({
    setAllUsers: create.reducer((state, action: PayloadAction<IUser[]>) => {
      state.value = action.payload;
    }),
  }),
  selectors: {
    getAllUsers: (users) => users.value,
  },
});

export const { setAllUsers } = userSlice.actions;
export const { getAllUsers } = userSlice.selectors;
