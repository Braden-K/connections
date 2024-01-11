import { db } from "../firebaseConfig";
import {
  QueryDocumentSnapshot,
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { QuerySnapshot, DocumentData, Query } from "firebase/firestore";
import {
  Category,
  PuzzleBoard,
  PuzzleBoardPostQuery,
  PuzzleCollectionFormat,
} from "../types/PuzzleBoard";
import { Permission } from "../types/PuzzleBoard";

const puzzlesCollection = collection(db, "puzzles");

const puzzleBoardToCollectionFormat = (
  pb: PuzzleBoardPostQuery
): PuzzleCollectionFormat => {
  const categories: Array<string> = [];

  for (const category of pb.puzzle) {
    categories.push(category.descriptor);
  }

  return {
    categories,
    tiles1: pb.puzzle[0].tiles,
    tiles2: pb.puzzle[1].tiles,
    tiles3: pb.puzzle[2].tiles,
    tiles4: pb.puzzle[3].tiles,
    permission: pb.permission,
  };
};

const collectionFormatToPuzzleBoard = (
  puzzleId: string,
  cf: PuzzleCollectionFormat
): PuzzleBoard => {
  const c1: Category = {
    descriptor: cf.categories[0],
    tiles: [cf.tiles1[0], cf.tiles1[1], cf.tiles1[2], cf.tiles1[3]],
  };
  const c2: Category = {
    descriptor: cf.categories[0],
    tiles: [cf.tiles2[0], cf.tiles2[1], cf.tiles2[2], cf.tiles2[3]],
  };
  const c3: Category = {
    descriptor: cf.categories[0],
    tiles: [cf.tiles3[0], cf.tiles3[1], cf.tiles3[2], cf.tiles3[3]],
  };
  const c4: Category = {
    descriptor: cf.categories[0],
    tiles: [cf.tiles4[0], cf.tiles4[1], cf.tiles4[2], cf.tiles4[3]],
  };

  return {
    puzzleId,
    puzzle: [c1, c2, c3, c4],
    permission:
      Permission[cf.permission.toUpperCase() as keyof typeof Permission],
  };
};

export const postApiPuzzle = async (
  userId: string,
  puzzleBoard: PuzzleBoardPostQuery
): Promise<string> => {
  console.log("in postApiPuzzle");
  const puzzleData = puzzleBoardToCollectionFormat(puzzleBoard);

  console.log(puzzleData);

  const randomId = Math.floor(Math.random() * 10000);

  try {
    console.log("in try");
    const docRef = await addDoc(collection(db, "puzzles"), {
      ...puzzleData,
      userId,
      randomId,
    });
    console.log("after save to db");
    const puzzleId = docRef.id;
    return puzzleId;
  } catch {
    (e: Error) => {
      console.log("error creating puzzle", e.message);
    };
  }
  console.log("after try");
  return "";
};

export const getApiPuzzlesByUserId = async (
  userId: string
): Promise<Array<PuzzleBoard>> => {
  const getPuzzlesQuery: Query<DocumentData, DocumentData> = query(
    puzzlesCollection,
    where("userId", "==", userId)
  );

  try {
    const querySnapshot: QuerySnapshot<DocumentData, DocumentData> =
      await getDocs(getPuzzlesQuery);
    let puzzleBoards: Array<PuzzleBoard> = [];
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc: DocumentData) => {
        const { categories, tiles1, tiles2, tiles3, tiles4, permission } =
          doc.data();
        const puzzleBoard = collectionFormatToPuzzleBoard(doc.id, {
          categories,
          tiles1,
          tiles2,
          tiles3,
          tiles4,
          permission,
        });
        puzzleBoards.push(puzzleBoard);
      });
      return puzzleBoards;
    }
    return [];
  } catch {
    (e: Error) => {
      console.log("error fetching puzzle data", e.message);
    };
  }
  console.log("in getPuzzles, failed");
  return [];
};

const publicPuzzlesExist = async (
  loggedInUserId: string
): Promise<boolean | null> => {
  try {
    const publicsExistQuery: Query<DocumentData, DocumentData> = query(
      puzzlesCollection,
      where(loggedInUserId, "!=", "userId"),
      limit(1)
    );

    const querySnapshot: QuerySnapshot<DocumentData, DocumentData> =
      await getDocs(publicsExistQuery);

    return querySnapshot.empty;
  } catch {
    (e: Error) => {
      console.log("error in isCollectionEmpty", e.message);
    };
  }
  return null;
};

const fetchPublicPuzzleFromQuery = async (
  query: Query<DocumentData, DocumentData>,
  userId: string
) => {
  try {
    const querySnapshot: QuerySnapshot<DocumentData, DocumentData> =
      await getDocs(query);
    let puzzleBoard: PuzzleBoard | null = null;
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const { categories, tiles1, tiles2, tiles3, tiles4, permission } =
          doc.data();
        if (doc.data().userId !== userId) {
          puzzleBoard = collectionFormatToPuzzleBoard(doc.id, {
            categories,
            tiles1,
            tiles2,
            tiles3,
            tiles4,
            permission,
          });
        }
      });
      return puzzleBoard;
    }
    return null;
  } catch {
    (e: Error) => {
      console.log("error fetching puzzle data", e.message);
    };
  }
  return null;
};

export const getApiRandomPublicPuzzle = async (
  userId: string
): Promise<PuzzleBoard | null> => {
  if (!(await publicPuzzlesExist(userId))) {
    return null;
  }

  const getHigherRandomPuzzleQuery: Query<DocumentData, DocumentData> = query(
    puzzlesCollection,
    where("randomId", ">=", Math.floor(Math.random() * 10000)),
    orderBy("randomId"),
    limit(1)
  );

  const getLowerRandomPuzzleQuery: Query<DocumentData, DocumentData> = query(
    puzzlesCollection,
    where("randomId", "<", Math.floor(Math.random() * 10000)),
    orderBy("randomId", "desc"),
    limit(1)
  );

  let randomPuzzle: PuzzleBoard | null = null;

  while (!randomPuzzle) {
    try {
      const puzzleBoard = await fetchPublicPuzzleFromQuery(
        getHigherRandomPuzzleQuery,
        userId
      );
      if (puzzleBoard) {
        randomPuzzle = puzzleBoard;
      } else {
        randomPuzzle = await fetchPublicPuzzleFromQuery(
          getLowerRandomPuzzleQuery,
          userId
        );
      }
    } catch {
      (e: Error) => {
        console.log("error fetching puzzle data", e.message);
      };
    }
  }
  return randomPuzzle;
};
