import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { PuzzleState, UserState } from "./types";
import { PuzzleBoard } from "../types/PuzzleBoard";

const initialState: PuzzleState = {
  userPuzzles: [],
  puzzles: [],
};

export const puzzleSlice = createSlice({
  name: "puzzle",
  initialState,
  reducers: {
    pushUserPuzzle: (state, action: PayloadAction<PuzzleBoard>) => {
      return {
        userPuzzles: [...state.userPuzzles, action.payload],
        puzzles: [...state.puzzles, action.payload],
      };
    },
    pushAllUserPuzzles: (state, action: PayloadAction<Array<PuzzleBoard>>) => {
      return {
        userPuzzles: action.payload,
        puzzles: action.payload,
      };
    },
  },
});

export const { pushUserPuzzle, pushAllUserPuzzles } = puzzleSlice.actions;
export default puzzleSlice.reducer;
