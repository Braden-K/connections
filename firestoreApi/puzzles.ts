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
import { PuzzleBoard } from "../types/PuzzleBoard";

const puzzlesCollection = collection(db, "puzzles");

const puzzleBoardToCollectionFormat = (pb: PuzzleBoard) => {
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

const collectionFormatToPuzzleBoard = (cf) => {
  //todo
};

export const postApiPuzzle = async (
  userId: string,
  puzzleBoard: PuzzleBoard
) => {
  const puzzleData = puzzleBoardToCollectionFormat(puzzleBoard);

  try {
    await addDoc(puzzlesCollection, { ...puzzleData, userId });
  } catch {
    (e: Error) => {
      console.log("error creating puzzle", e.message);
    };
  }
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
    let puzzleBoards = [];
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const puzzleBoard = convertPuzzleDataToBoard(doc.data());
        puzzleBoards.push(puzzleBoard);
      });
    }
    return puzzleBoards;
  } catch {
    (e: Error) => {
      console.log("error fetching puzzle data", e.message);
    };
  }
  return puzzleBoards;
};
