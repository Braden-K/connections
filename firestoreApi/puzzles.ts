import { db } from "../firebaseConfig";
import {
  QueryDocumentSnapshot,
  addDoc,
  collection,
  doc,
  getDocs,
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

const puzzlesCollection = collection(db, "puzzles");

const puzzleBoardToCollectionFormat = (
  pb: PuzzleBoardPostQuery
): PuzzleCollectionFormat => {
  const categories: Array<string> = [];

  for (const category of pb) {
    categories.push(category.descriptor);
  }

  return {
    categories,
    tiles1: pb[0].tiles,
    tiles2: pb[1].tiles,
    tiles3: pb[2].tiles,
    tiles4: pb[3].tiles,
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

  return { puzzleId, puzzle: [c1, c2, c3, c4] };
};

export const postApiPuzzle = async (
  userId: string,
  puzzleBoard: PuzzleBoardPostQuery
): Promise<string> => {
  const puzzleData = puzzleBoardToCollectionFormat(puzzleBoard);

  try {
    const docRef = await addDoc(puzzlesCollection, { ...puzzleData, userId });
    const puzzleId = docRef.id;
    return puzzleId;
  } catch {
    (e: Error) => {
      console.log("error creating puzzle", e.message);
    };
  }
  return "";
};

export const getApiPuzzlesByUserId = async (
  userId: string
): Promise<Array<PuzzleBoard>> => {
  console.log("in getPuzzleApi with userId", userId);
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
        const { categories, tiles1, tiles2, tiles3, tiles4 } = doc.data();
        const puzzleBoard = collectionFormatToPuzzleBoard(doc.id, {
          categories,
          tiles1,
          tiles2,
          tiles3,
          tiles4,
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
  return [];
};
