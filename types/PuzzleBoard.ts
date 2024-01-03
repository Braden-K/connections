export type Tile = string | null;

export type Category = {
  descriptor: string;
  tiles: [Tile, Tile, Tile, Tile];
};

export type PuzzleBoard = [Category, Category, Category, Category];
