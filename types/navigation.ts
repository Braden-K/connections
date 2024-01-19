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
  PlayPuzzle: { puzzle: PuzzleBoard };
};

export type PlayStackParamList = {
  PlayHome: undefined;
  PlayPuzzle: { puzzle: PuzzleBoard };
  Archive: undefined;
};

export type PlayPuzzleRouteProp = RouteProp<PlayStackParamList, "PlayPuzzle">;
export type FriendsPuzzleRouteProp = RouteProp<
  FriendsStackParamList,
  "FriendsPuzzles"
>;

export type FriendsStackParamList = {
  FriendsHome: undefined;
  AddFriend: undefined;
  FriendRequests: undefined;
  PlayPuzzle: { puzzle: PuzzleBoard };
  FriendsPuzzles: { userId: string };
};

export type ProfileStackParamList = {
  Profile: undefined;
  Welcome: undefined;
};

export const TabIconNames = ["play", "appstore1", "contacts", "profile"];
