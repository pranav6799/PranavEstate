import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { signInSuccess } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate =useNavigate()

  const hanldeGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const { displayName, photoURL, email } = result.user;

      const {data} = await axios.post(
        "/api/user/google",
        {
          name: displayName,
          avatar: photoURL,
          email: email
      }
      );
      console.log(data)
      dispatch(signInSuccess(data.user));
      navigate('/')
    } catch (error) {
      console.log("Couldnt sigin with google", error);
    }
  };

  return (
    <button
      type="button"
      className="bg-red-700 rounded-lg p-3 hover:opacity-90 text-white uppercase"
      onClick={hanldeGoogleClick}
    >
      continue with google
    </button>
  );
};

export default OAuth;
