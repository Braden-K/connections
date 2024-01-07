export type User = {
  id: string;
  username: string;
  email: string;
  friends: Array<string>;
  friendRequests: Array<string>;
};

export type UserInitialization = {
  username: string;
  email: string;
};
