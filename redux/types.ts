import { PuzzleBoard } from "../types/PuzzleBoard";
import { User } from "../types/User";

export type UserState = { user: User };

export type PuzzleState = {
  userPuzzles: Array<PuzzleBoard>;
  puzzles: Array<PuzzleBoard>;
};
