import { PuzzleBoard } from "./PuzzleBoard";
import type { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

export type CreateStackParamList = {
  MyPuzzles: undefined;
  CreatePuzzle: undefined;
};

export type PlayStackParamList = {
  PlayHome: undefined;
  PlayPuzzle: { puzzle: PuzzleBoard };
};

export type PlayPuzzleRouteProp = RouteProp<PlayStackParamList, "PlayPuzzle">;
