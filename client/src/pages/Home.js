import React from "react";
// To make API Requests:
//  1. Use 'fetch api (already comes with JavaScript)'
//  2. Install library 'axios'
import axios from "axios";
import { useEffect, useState } from "react";
// "useNavigate": A hook to allow to navigate & redirect current route to other routes throughout the application
import { useNavigate } from "react-router-dom";

function Home() {
  // "useState": A list containing all the posts that received from the API request
  const [listOfPosts, setListOfPosts] = useState([]); // Set an array because the API request returns a list

  // Use "useNavigate()" to navigate & redirect current route to other routes
  let navigate = useNavigate();

  // "useEffect": To fetch all the lists of posts
  useEffect(() => {
    // Promise: run an anonymous function after receiving the data
    //  asynchronously, wait for the request to be done
    //  run the 'then' function inside, data received should be stored over here
    axios.get("http://localhost:3001/posts").then((response) => {
      // Set the list of posts = the response data from the API request
      setListOfPosts(response.data); // To display data received into the application
    });
  }, []); // "[]": pass this dependency array so that it wont make the same API request every second
  // Because "useEffect" will run when theres a change in the state of application or each state you put over here

  return (
    <div>
      {listOfPosts.map((value, key) => {
        // "map": map all the data in every Post in the List
        return (
          <div
            key={key}
            className="post"
            onClick={() => {
              // "navigate()": Navigate & Redirect current route to other routes
              // "``": Backticks sign allows to add ID
              // "${}": Allows to add JavaScript Variables
              navigate(`/post/${value.id}`);
            }}
          >
            <div className="title">{value.title}</div>
            <div className="body">{value.postText}</div>
            <div className="footer">{value.username}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
