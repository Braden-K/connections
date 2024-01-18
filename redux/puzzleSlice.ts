import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { PuzzleState, UserState } from "./types";
import { PuzzleBoard } from "../types/PuzzleBoard";

const initialState: PuzzleState = {
  userPuzzles: [],
  levels: [],
};

export const puzzleSlice = createSlice({
  name: "puzzle",
  initialState,
  reducers: {
    pushUserPuzzle: (state, action: PayloadAction<PuzzleBoard>) => {
      return {
        userPuzzles: [...state.userPuzzles, action.payload],
        levels: [...state.levels],
      };
    },
    pushAllUserPuzzles: (state, action: PayloadAction<Array<PuzzleBoard>>) => {
      return {
        userPuzzles: action.payload,
        levels: state.levels,
      };
    },
    pushLevels: (state, action: PayloadAction<Array<PuzzleBoard>>) => {
      return {
        userPuzzles: state.userPuzzles,
        levels: action.payload,
      };
    },
  },
});

export const { pushUserPuzzle, pushAllUserPuzzles, pushLevels } =
  puzzleSlice.actions;
export default puzzleSlice.reducer;
