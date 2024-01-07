import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UserState } from "./types";

const initialState: UserState = {
  user: { id: "", username: "", email: "", friends: [], friendRequests: [] },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    pushFriend: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        user: {
          ...state.user,
          friends: [...state.user.friends, action.payload],
        },
      };
    },
    pushFriendRequest: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        user: {
          ...state.user,
          friendRequests: [...state.user.friendRequests, action.payload],
        },
      };
    },
  },
});

export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
