import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // adjust if path is different

export const saveUserToFirestore = async (uid: string, data: any) => {
  try {
    await setDoc(doc(db, "users", uid), data, { merge: true });
    console.log("User saved to Firestore");
  } catch (error) {
    console.error("Error saving user:", error);
  }
};
