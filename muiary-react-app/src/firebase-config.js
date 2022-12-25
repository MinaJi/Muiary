import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

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

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage();

// storage
// export async function upload(file, user, setLoading) {
//   const fileRef = ref(storage, user.uid + ".png");

//   setLoading(true);

//   const snapshot = await uploadBytes(fileRef, file);
//   const imageURL = await getDownloadURL(fileRef);

//   updateProfile(user, { photoURL: imageURL });
//   setLoading(false);

//   alert("upload done!");
// }

// export async function updateProfileImage(user) {
//   const storageRef = ref(storage, `images/profile/${user.uid}`);

//   getDownloadURL(storageRef)
//     .then((url) => {
//       console.log(url);
//     })
//     .catch((error) => {
//       // A full list of error codes is available at
//       // https://firebase.google.com/docs/storage/web/handle-errors
//       switch (error.code) {
//         case "storage/object-not-found":
//           // File doesn't exist
//           break;
//         case "storage/unauthorized":
//           // User doesn't have permission to access the object
//           break;
//         case "storage/canceled":
//           // User canceled the upload
//           break;

//         // ...

//         case "storage/unknown":
//           // Unknown error occurred, inspect the server response
//           break;
//       }
//     });

  // getDownloadURL(storageRef)
  //   .then((url) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.responseType = "blob";
  //     xhr.onload = (e) => {
  //       const blob = xhr.response;
  //     };
  //     xhr.open("GET", url);
  //     xhr.send();

  //     console.log(xhr);

  //     const img = document.getElementById("myimg");
  //     img.setAttribute("src", url);
  //   })
  //   .catch((e) => {
  //     console.log("이미지 가져오기 실패..");
  //   });
// }

export default app;
