export type Category = {
  descriptor: string;
  tiles: [string, string, string, string];
};

export type PuzzleBoard = {
  puzzleId: string;
  label: string;
  puzzle: [Category, Category, Category, Category];
  permission: PermissionType;
};

export type PuzzleBoardPostQuery = {
  label: string;
  puzzle: [Category, Category, Category, Category];
  permission: PermissionType;
};

export type PuzzleCollectionFormat = {
  label: string;
  categories: Array<string>;
  tiles1: Array<string>;
  tiles2: Array<string>;
  tiles3: Array<string>;
  tiles4: Array<string>;
  permission: string;
};

export enum Permission {
  PRIVATE = "private",
  PUBLIC = "public",
  FRIENDS_ONLY = "friends_only",
}

export type PermissionType = Permission;
