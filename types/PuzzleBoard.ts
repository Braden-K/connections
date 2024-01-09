export type Category = {
  descriptor: string;
  tiles: [string, string, string, string];
};

export type PuzzleBoard = {
  puzzleId: string;
  puzzle: [Category, Category, Category, Category];
};

export type PuzzleBoardPostQuery = [Category, Category, Category, Category];

export type PuzzleCollectionFormat = {
  categories: Array<string>;
  tiles1: Array<string>;
  tiles2: Array<string>;
  tiles3: Array<string>;
  tiles4: Array<string>;
};

enum Permission {
  PRIVATE,
  PUBLIC,
  FRIENDS_ONLY,
}

export type PermissionType = Permission;
