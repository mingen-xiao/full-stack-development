import React, { useEffect, useState } from "react";
// A hook to get the params
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  let { id } = useParams(); // To get the params, which is the (id)
  const [postObject, setPostObject] = useState({});

  // To fetch the data base on the ID
  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
  });

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject.title}</div>
          <div className="postText">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightside">
        <div className="title">{postObject.postText}</div>
      </div>
    </div>
  );
}

export default Post;