import firebase from "firebase/app";
import "firebase/auth";
import { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import firebaseConfig from "./firebase.config";
firebase.initializeApp(firebaseConfig);

function Login() {
  //login from userContext api
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  //redirect in here
  const history = useHistory();
  const location = useLocation()
  const { from } = location.state || { from: { pathname: "/" } };
  //google authentication
  var googleAuth = new firebase.auth.GoogleAuthProvider();

  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    photo: "",
    password: "",
    error: "",
    success: false,
    newUser: false,
  });

  //toggle new user to old user
  const [newUser, setNewUser] = useState(false);

  //google sign in
  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleAuth)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const singInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(singInUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //google sign out
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const singOutUser = {
          isSignIn: false,
          name: "",
          email: "",
          photo: "",
          error: "",
          success: false,
          newUser: false,
        };
        setUser(singOutUser);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  //form
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    //old user go to the file with his/her email & password
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log("sign in user", res.user);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  };

  //form input
  const handleBlur = (e) => {
    var isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          e.target.value
        );
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 8;
      const passwordValid = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(
        e.target.value
      );
      isFieldValid = isPasswordValid && passwordValid;
    }

    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const updateUserName = () => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: user.name,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignIn ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
      {user.isSignIn && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}

      <h1>Form</h1>
      {/* <p>Name:{user.name}</p>
      <p>Email:{user.email} </p>
      <p>Password:{user.password} </p> */}
      <input
        type="checkbox"
        name="newUser"
        id=""
        onChange={() => setNewUser(!newUser)}
      />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            placeholder="your name"
            onBlur={handleBlur}
          />
        )}
        <br />
        <input
          type="text"
          name="email"
          placeholder="your email"
          required
          onBlur={handleBlur}
        />
        <br />
        <input
          type="text"
          name="password"
          placeholder="your password"
          required
          onBlur={handleBlur}
        />
        <br />
        <input type="submit" value="submit" />
      </form>

      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && <p style={{ color: "green" }}>Successful</p>}
    </div>
  );
}

export default Login;
