import "./App.css";
// To make API Requests:
//  1. Use 'fetch api (already comes with JavaScript)'
//  2. Install library 'axios'
import axios from "axios";
import { useEffect } from "react"; // To fetch all the lists of posts

function App() {
  useEffect(() => {
    // Promise: run an anonymous function after receiving the data
    //  asynchronously, wait for the request to be done
    //  run the 'then' function inside, data received should be stored over here
    axios.get("http://localhost:3001/posts").then((response) => {
      console.log(response);

    });
  }, []);

  return <div className="App"></div>;
}

export default App;
