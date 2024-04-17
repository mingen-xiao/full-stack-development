import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registraion from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // Keep track whether we are logged in or not
  // Get information including username & id, when validating status
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  // Only want to render ONCE when open the page
  // Set AUTH STATE to validate a real login & a fake login
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          // Grabbing the whole auth state, but just need to change one state called "status", into false
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  });

  const logout = () => {
    // "removeItem": to remove the item in the localStorage with the keyword "accessToken", which is the user acc
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
  };

  return (
    <div className="App">
      {/* "Provider": means context provider */}
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <Link to="/">Home Page</Link>
            <Link to="/createpost">Create A Post</Link>
            {/* Since the STATE has changed in Login.js setAuthState(true),  */}
            {/* it knows it's logged in & no need to display the Login & Registration buttons */}
            {!authState.status ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/registration">Registraion</Link>
              </>
            ) : (
              // Log out button appeared when logged IN
              <button onClick={logout}>Logout</button>
            )}

            <h1>{authState.username}</h1>
          </div>
          <Routes>
            {/* "/": The route for the main entry point of the website */}
            {/* "exact": To make never renders more than one route at the same time */}
            {/* "component": The component to render in this route */}
            <Route path="/createpost" exact element={<CreatePost />} />
            <Route path="/" exact element={<Home />} />
            <Route path="/post/:id" exact element={<Post />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/registration" exact element={<Registraion />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
