import { PerformanceReport, User } from "../types/User";

export const totalPuzzlesSeen = (user: User) => {
  return (
    user.performanceMetrics.levelsSeen + user.performanceMetrics.nonLevelsSeen
  );
};

export const totalPuzzlesSolved = (user: User) => {
  return (
    user.performanceMetrics.levelsSolved +
    user.performanceMetrics.nonLevelsSolved
  );
};

export const createPerformanceReport = (user: User): PerformanceReport => {
  const totalSeen = totalPuzzlesSeen(user);
  const totalSolved = totalPuzzlesSolved(user);

  return {
    levelsSeen: user.performanceMetrics.levelsSeen,
    levelsSolved: user.performanceMetrics.levelsSolved,
    nonLevelsSeen: user.performanceMetrics.nonLevelsSeen,
    nonLevelsSolved: user.performanceMetrics.nonLevelsSolved,
    totalPuzzlesSeen: totalSeen,
    totalPuzzlesSolved: totalSolved,
    totalWinRate:
      Math.round((totalSeen > 0 ? totalSolved / totalSeen : 0) * 100) / 100,
    levelWinRate:
      Math.round(
        (user.performanceMetrics.levelsSeen > 0
          ? user.performanceMetrics.levelsSolved /
            user.performanceMetrics.levelsSeen
          : 0) * 100
      ) / 100,
    nonLevelWinRate:
      Math.round(
        (user.performanceMetrics.nonLevelsSeen > 0
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
