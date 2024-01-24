import { PerformanceReport, User } from "../types/User";

export const totalPuzzlesSeen = (user: User) => {
  if (!user.performanceMetrics) {
    return 0;
  }

  return (
    user.performanceMetrics.levelsSeen + user.performanceMetrics.nonLevelsSeen
  );
};

export const totalPuzzlesSolved = (user: User) => {
  if (!user.performanceMetrics) {
    return 0;
  }

  return (
    user.performanceMetrics.levelsSolved +
    user.performanceMetrics.nonLevelsSolved
  );
};

export const createPerformanceReport = (user: User): PerformanceReport => {
  const totalSeen = totalPuzzlesSeen(user);
  const totalSolved = totalPuzzlesSolved(user);

  return {
    levelsSeen: user.performanceMetrics
      ? user.performanceMetrics.levelsSeen
      : 0,
    levelsSolved: user.performanceMetrics
      ? user.performanceMetrics.levelsSolved
      : 0,
    nonLevelsSeen: user.performanceMetrics
      ? user.performanceMetrics.nonLevelsSeen
      : 0,
    nonLevelsSolved: user.performanceMetrics
      ? user.performanceMetrics.nonLevelsSolved
      : 0,
    totalPuzzlesSeen: user.performanceMetrics ? totalSeen : 0,
    totalPuzzlesSolved: user.performanceMetrics ? totalSolved : 0,
    totalWinRate:
      Math.round((totalSeen > 0 ? totalSolved / totalSeen : 0) * 100) / 100,
    levelWinRate:
      Math.round(
        (user.performanceMetrics && user.performanceMetrics.levelsSeen > 0
          ? user.performanceMetrics.levelsSolved /
            user.performanceMetrics.levelsSeen
          : 0) * 100
      ) / 100,
    nonLevelWinRate:
      Math.round(
        (user.performanceMetrics && user.performanceMetrics.nonLevelsSeen > 0
          ? user.performanceMetrics.nonLevelsSolved /
            user.performanceMetrics.nonLevelsSeen
          : 0) * 100
      ) / 100,
    totalAvgMistakes:
      Math.round(
        (totalSeen > 0
          ? user.puzzlesSeen.reduce((acc, curr) => {
              return acc + curr.mistakesMade;
            }, 0) / totalSeen
          : 0) * 100
      ) / 100,
  };
};
