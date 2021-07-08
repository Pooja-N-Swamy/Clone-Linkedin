import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../context/firebase";
import { login, selectUser } from "../features/userSlice";
import "./Login.css";
import Main from "./Main";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const registerHandler = () => {
    if (!name) {
      return alert("please enter full name!");
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
            photoURL: profilePic,
          })
          .then(() => {
            console.log(userAuth);
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                photoURL: userAuth.user.photoURL,
              })
            );
          });
      })
      .catch((error) => alert(error.message));
  };

  const loginHandler = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter Email");
    } else {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          dispatch(
            login({
              email: userCredential.user.email,
              uid: userCredential.user.uid,
              displayName: userCredential.user.name,
              photoURL: userCredential.user.photoURL,
            })
          );
        })
        .catch((error) => alert(error.message));
    }
  };
  return (
    <>
      {!user ? (
        <div className="login">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/800px-LinkedIn_Logo.svg.png"
            alt=""
          />
          <div className="login__container">
            <form onSubmit={loginHandler}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                type="text"
              />
              <input
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
                placeholder="Profile picture URL(optional)"
                type="text"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <button type="submit">Sign In</button>
            </form>
          </div>
          <p>
            Not a member?
            <span className="login__register" onClick={registerHandler}>
              Register Now
            </span>
          </p>
        </div>
      ) : (
        <Main />
      )}
    </>
  );
}
