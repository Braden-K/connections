export type Stats = {
  puzzleId: string;
  solved: boolean;
  attemptedOn: any;
  mistakesMade: number;
};

export type User = {
  id: string;
  username: string;
  email: string;
  friends: Array<string>;
  friendRequests: Array<string>;
  puzzlesSeen: Array<Stats>;
  performanceMetrics: PerformanceMetrics;
};

export type UserInitialization = {
  username: string;
  email: string;
  friends: Array<string>;
  friendRequests: Array<string>;
  puzzlesSeen: Array<Stats>;
  performanceMetrics: PerformanceMetrics;
};

export type PerformanceMetrics = {
  levelsSeen: number;
  levelsSolved: number;
  nonLevelsSeen: number;
  nonLevelsSolved: number;
};

export type PerformanceReport = {
  levelsSeen: number;
  levelsSolved: number;
  nonLevelsSeen: number;
  nonLevelsSolved: number;
  totalPuzzlesSeen: number;
  totalPuzzlesSolved: number;
  totalWinRate: number;
  levelWinRate: number;
  nonLevelWinRate: number;
  totalAvgMistakes: number;
};
