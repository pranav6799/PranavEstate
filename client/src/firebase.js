// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "process.env.API_KEY",
  authDomain: "mern-estate-e089d.firebaseapp.com",
  projectId: "mern-estate-e089d",
  storageBucket: "mern-estate-e089d.appspot.com",
  messagingSenderId: "627619032135",
  appId: "1:627619032135:web:e7d2105b208552ad0b1562"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

















// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write: if 
//       request.resource.size <2 *1024*1024 && 
//       request.resource.contentType.matches('image/.*')
//     }
//   }
// }
