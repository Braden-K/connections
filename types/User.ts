export type Stats = {
  puzzleId: string;
  solved: boolean;
  attemptedOn: any;
};

export type User = {
  id: string;
  username: string;
  email: string;
  friends: Array<string>;
  friendRequests: Array<string>;
  puzzlesSeen: Array<Stats>;
};

export type UserInitialization = {
  username: string;
  email: string;
  friends: Array<string>;
  friendRequests: Array<string>;
};
