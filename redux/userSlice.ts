import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UserState } from "./types";

const initialState: UserState = {
  user: {
    id: "",
    username: "",
    email: "",
    friends: [],
    friendRequests: [],
    puzzlesSeen: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action: PayloadAction<UserState>) => {
      console.log("init user login", action.payload);
      return { ...action.payload };
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

export const { loadUser, pushFriend, pushFriendRequest } = userSlice.actions;
export default userSlice.reducer;
