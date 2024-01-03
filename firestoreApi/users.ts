import { db } from "../firebaseConfig";
import {
  QueryDocumentSnapshot,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
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
    console.log("error logging in user");
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

    const user: UserInitialization = { email, username };

    await postApiUser(user);

    signupSuccess = true;
  } catch {
    console.log("error signing up user");
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
      console.log("error updating users collection");
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
    let userData = null;
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        userData = { ...doc.data(), id: doc.id };
      });
    }
    return userData;
  } catch {
    console.log("error fetching user with email", email);
  }
  return null;
};
