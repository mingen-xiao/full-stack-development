import React, { useEffect } from "react";
// A hook to get the params
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  let { id } = useParams(); // To get the params, which is the (id)

  // To fetch the data base on the ID
  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {});
  });

  return <div>{id}</div>;
}

export default Post;
