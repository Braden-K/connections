import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UserState } from "./types";

const initialState: UserState = {
  user: { id: "", username: "", email: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
  },
});

export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
