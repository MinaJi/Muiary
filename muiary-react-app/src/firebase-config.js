import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { async } from "@firebase/util";
import { UserAuth } from "./context/AuthContext";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage();
export const auth = getAuth(app);

// storage
export async function upload(file, user, setLoading) {
  const fileRef = ref(storage, user.uid + ".png");

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);
  const imageURL = await getDownloadURL(fileRef);

  updateProfile(user, { photoURL: imageURL });

  setLoading(false);
  alert("upload done!");
}

export default app;
