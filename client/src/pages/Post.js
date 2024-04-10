/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
// A hook to get the params
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  let { id } = useParams(); // To get the params, which is the (id)
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);

  // To fetch the data base on the ID
  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject.title}</div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input type="text" placeholder="Comment..." />
          <button>Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return <div key={key} className="comment">{comment.commentBody}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
