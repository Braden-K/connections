import { db } from "../firebaseConfig";
import {
  Firestore,
  QueryDocumentSnapshot,
  Timestamp,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { QuerySnapshot, DocumentData, Query } from "firebase/firestore";
import { Stats, User, UserInitialization } from "../types/User";
import { auth } from "../firebaseConfig";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { sign } from "crypto";

const usersRef = collection(db, "users");

// const serializeUserData = (data: User) => {
//   const serializedPuzzlesSeen: Stats[] = [];
//   data.puzzlesSeen.map((info: any) => {
//     serializedPuzzlesSeen.push({
//       ...info,
//       attemptedOn: info.attemptedOn.toDate().toDateString(),
//     });
//   });
//   return { ...data, puzzlesSeen: serializedPuzzlesSeen };
// };

export const postApiLoginUser = async (
  email: string,
  password: string
): Promise<boolean> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch {
    console.error("error logging in user");
  }
  return false;
};

export const postApiSignUpUser = async (
  email: string,
  password: string,
  username: string
): Promise<number> => {
  const user: UserInitialization = {
    email,
    username,
    friends: [],
    friendRequests: [],
    puzzlesSeen: [],
    performanceMetrics: {
      levelsSeen: 0,
      levelsSolved: 0,
      nonLevelsSeen: 0,
      nonLevelsSolved: 0,
    },
  };
  let code = await postApiUser(user);
  if (code === 1) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return 1;
    } catch {
      return 0;
    }
  } else {
    return code;
  }
};

const postApiUser = async (user: UserInitialization) => {
  const userExistsQuery: Query<DocumentData, DocumentData> = query(
    usersRef,
    where("email", "==", user.email)
  );

  const usernameTakenQuery: Query<DocumentData, DocumentData> = query(
    usersRef,
    where("username", "==", user.username)
  );

  const userExistsQuerySnapshot: QuerySnapshot<DocumentData, DocumentData> =
    await getDocs(userExistsQuery);

  const usernameTakenQuerySnapshot: QuerySnapshot<DocumentData, DocumentData> =
    await getDocs(usernameTakenQuery);

  if (userExistsQuerySnapshot.empty) {
    if (usernameTakenQuerySnapshot.empty) {
      try {
        setDoc(doc(usersRef), user).then(() => {
          console.log("users collection updated with new entry");
        });
        return 1;
      } catch (err) {
        console.error("error updating users collection", err);
        return 0;
      }
    } else {
      return 2;
    }
  } else {
    return 3;
  }
};

export const getApiUserByEmail = async (
  email: string
): Promise<User | null> => {
  const getUserQuery: Query<DocumentData, DocumentData> = query(
    usersRef,
    where("email", "==", email)
  );

  try {
    const querySnapshot: QuerySnapshot<DocumentData, DocumentData> =
      await getDocs(getUserQuery);
    let userData: User | null = null;
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        console.log("USERDATA", doc.data());
        userData = { ...doc.data(), id: doc.id } as User;
      });
    }
    return userData;
  } catch {
    console.error("error fetching user with email", email);
  }
  return null;
};

export const getApiUserById = async (id: string): Promise<User | null> => {
  try {
    const userSnap = await getDoc(doc(usersRef, id));
    if (userSnap.exists()) {
      return { ...userSnap.data(), id: userSnap.id } as User;
    }
    return null;
  } catch {
    console.error("error fetching user with id", id);
  }
  return null;
};

export const getApiPendingUserFriendRequests = async (
  userId: string
): Promise<Array<User>> => {
  const getUserQuery: Query<DocumentData, DocumentData> = query(
    usersRef,
    where("friendRequests", "array-contains", userId)
  );

  try {
    const querySnapshot: QuerySnapshot<DocumentData, DocumentData> =
      await getDocs(getUserQuery);
    let users: User[] = [];
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id } as User);
      });
    }
    return users;
  } catch {
    console.error("error fetching user's pending requests");
  }
  return [];
};

export const getApiUserFriends = async (userId: string): Promise<User[]> => {
  const getUserQuery: Query<DocumentData, DocumentData> = query(
    usersRef,
    where("friends", "array-contains", userId)
  );

  try {
    const querySnapshot: QuerySnapshot<DocumentData, DocumentData> =
      await getDocs(getUserQuery);
    let users: User[] = [];
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        console.log("DOC", doc);
        users.push({ ...doc.data(), id: doc.id } as User);
      });
    } else {
      console.log("SNAPSHOT EMPTY");
    }
    return users;
  } catch {
    (e: Error) => {
      console.error("error fetching user's friends list", e);
    };
  }
  return [];
};

export const putApiUserFriendById = async (
  userId: string,
  friendId: string
) => {
  try {
    const userDocRef = doc(usersRef, userId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      await updateDoc(userDocRef, {
        friends: [...userDocSnap.data().friends, friendId],
      });
    } else {
      console.error("user does not exist");
      return;
    }

    const friendDocRef = doc(usersRef, friendId);
    const friendDocSnap = await getDoc(friendDocRef);
    if (friendDocSnap.exists()) {
      await updateDoc(friendDocRef, {
        friends: arrayUnion(userId),
      });
    } else {
      console.error("friend does not exist");
      return;
    }
  } catch {
    (e: Error) => console.error("error adding user friend", e);
  }
};

export const putApiUserFriendRequestById = async (
  userId: string,
  friendRequestId: string
) => {
  try {
    const userDocRef = doc(usersRef, userId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      await updateDoc(userDocRef, {
        friendRequests: arrayUnion(friendRequestId),
      });
    } else {
      console.error("user does not exist");
      return;
    }
  } catch {
    (e: Error) => console.error("error creating user friend request", e);
  }
};

export const getApiUserByUsernameFragment = async (
  searchPhrase: string
): Promise<Array<User>> => {
  const getUsersQuery: Query<DocumentData, DocumentData> = query(
    usersRef,
    where("username", ">=", searchPhrase),
    where("username", "<=", searchPhrase + "\uf8ff")
  );

  try {
    const querySnapshot: QuerySnapshot<DocumentData, DocumentData> =
      await getDocs(getUsersQuery);
    let userDataArr: Array<User> = [];
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        userDataArr.push({ ...doc.data(), id: doc.id } as User);
      });
    }
    return userDataArr;
  } catch {
    console.error("error fetching users based on username phrase");
  }
  return [];
};

export const deleteApiUserFriendRequest = async (
  userId: string,
  friendId: string
) => {
  try {
    const userDocRef = doc(usersRef, userId);

    await updateDoc(userDocRef, {
      friendRequests: arrayRemove(friendId),
    });
  } catch {
    console.log("error deleting friendId from user's requests");
  }
};

export const putApiUserPuzzleAttemptById = async (
  userId: string,
  puzzleId: string,
  solved: boolean,
  mistakesMade: number,
  isLevel: boolean
) => {
  try {
    const userDocRef = doc(usersRef, userId);
    const userDocSnap = await getDoc(userDocRef);
    const userDocData = userDocSnap.data();
    if (userDocSnap.exists() && userDocData) {
      await updateDoc(userDocRef, {
        puzzlesSeen: arrayUnion({
          puzzleId: puzzleId,
          solved: solved,
          attemptedOn: Date.now(),
          mistakesMade: mistakesMade,
        }),
        performanceMetrics: {
          levelsSeen:
            userDocData.performanceMetrics.levelsSeen + (isLevel ? 1 : 0),
          levelsSolved:
            userDocData.performanceMetrics.levelsSolved +
            (isLevel && solved ? 1 : 0),
          nonLevelsSeen:
            userDocData.performanceMetrics.nonLevelsSeen + (!isLevel ? 1 : 0),
          nonLevelsSolved:
            userDocData.performanceMetrics.nonLevelsSolved +
            (!isLevel && solved ? 1 : 0),
        },
      });
    } else {
      console.error("user does not exist or error getting data");
      return;
    }
  } catch {
    (e: Error) => console.error("error logging puzzle completion data", e);
  }
};
