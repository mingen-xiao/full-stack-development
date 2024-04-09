import "./App.css";
// To make API Requests:
//  1. Use 'fetch api (already comes with JavaScript)'
//  2. Install library 'axios'
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  // "useState": A list containing all the posts that received from the API request
  const [listOfPosts, setListOfPosts] = useState([]); // Set an array because the API request returns a list

  // "useEffect": To fetch all the lists of posts
  useEffect(() => {
    // Promise: run an anonymous function after receiving the data
    //  asynchronously, wait for the request to be done
    //  run the 'then' function inside, data received should be stored over here
    axios.get("http://localhost:3001/posts").then((response) => {
      // Set the list of posts = the response data from the API request
      setListOfPosts(response.data); // To display data received into the application
    });
  }, []);

  return (
    <div className="App">
      {listOfPosts.map((value, key) => {
        // "map": map all the data in the lists
        return (
          <div className="post">
            <div className="title">{value.title}</div>{" "}
            <div className="body">{value.postText}</div>{" "}
            <div className="footer">{value.username}</div>{" "}
          </div>
        );
      })}
    </div>
  );
}

export default App;