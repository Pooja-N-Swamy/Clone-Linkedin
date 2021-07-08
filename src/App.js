import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser, login } from "./features/userSlice";
import { auth } from "./context/firebase";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes";
import Main from "./pages/Main";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <div className="app">
      <Router>
        <Switch>
          <ProtectedRoute user={user} path="/" exact></ProtectedRoute>
          <ProtectedRoute user={user} path="/feed" exact>
            <Main />
          </ProtectedRoute>
          <IsUserRedirect user={user} loggedInPath="/feed" path="/login" exact>
            <Login />
          </IsUserRedirect>
          <IsUserRedirect
            user={user}
            loggedInPath="/feed"
            path="/register"
            exact
          >
            <Login />
          </IsUserRedirect>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
