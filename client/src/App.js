import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registraion from "./pages/Registration";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/">Home Page</Link>
          <Link to="/createpost">Create A Post</Link>
          {!localStorage.getItem("accessToken") && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/registration">Registraion</Link>
            </>
          )}
        </div>
        <Routes>
          {/* "/": The route for the main entry point of the website */}
          {/* "exact": To make never renders more than one route at the same time */}
          {/* "component": The component to render in this route */}
          <Route path="/" exact element={<Home />} />
          <Route path="/createpost" exact element={<CreatePost />} />
          <Route path="/post/:id" exact element={<Post />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/registration" exact element={<Registraion />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
