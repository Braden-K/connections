import { db } from "../firebaseConfig";
import {
  QueryDocumentSnapshot,
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
import { User, UserInitialization } from "../types/User";
import { auth } from "../firebaseConfig";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const usersRef = collection(db, "users");

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
): Promise<boolean> => {
  let signupSuccess = false;
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user: UserInitialization = {
      email,
      username,
      friends: [],
      friendRequests: ["null"],
    };

    await postApiUser(user);

    signupSuccess = true;
  } catch {
    console.error("error signing up user");
  }
  return signupSuccess;
};

const postApiUser = async (user: UserInitialization) => {
  const userExistsQuery: Query<DocumentData, DocumentData> = query(
    usersRef,
    where("email", "==", user.email)
  );

  const querySnapshot: QuerySnapshot<DocumentData, DocumentData> =
    await getDocs(userExistsQuery);

  if (querySnapshot.empty) {
    try {
      setDoc(doc(usersRef), user).then(() => {
        console.log("users collection updated with new entry");
      });
    } catch (err) {
      console.error("error updating users collection", err);
    }
  } else {
    console.log("existing user logged in");
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
  const getUserQuery: Query<DocumentData, DocumentData> = query(
    usersRef,
    where("id", "==", id)
  );

  try {
    const querySnapshot: QuerySnapshot<DocumentData, DocumentData> =
      await getDocs(getUserQuery);
    let userData = null;
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        userData = { ...doc.data(), id: doc.id };
      });
    }
    return userData;
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
    where(userId, "in", "friendRequests")
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

export const putApiUserPuzzleSeenById = async (
  userId: string,
  puzzleId: string,
  solved: boolean
): Promise<void> => {
  try {
    const userDocRef = doc(usersRef, userId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      await updateDoc(userDocRef, {
        puzzlesSeen: {
          puzzleId: puzzleId,
          solved: solved,
        },
      });
    } else {
      console.error("user does not exist");
      return;
    }
  } catch {
    (e: Error) => console.error("error updating user stats", e);
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
