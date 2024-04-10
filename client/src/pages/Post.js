/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
// A hook to get the params
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  let { id } = useParams(); // To get the params, which is the (id)
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // To fetch the data base on the ID
  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []); // "[]": pass this dependency array so that it wont make the same API request every second
  // Because "useEffect" will run when theres a change in the state of application or each state you put over here

  const addComment = () => {
    axios
      .post("http://localhost:3001/comments", {
        commentBody: newComment,
        PostId: id,
      })
      .then((response) => {
        // If need to assume the data has been automatically added to the database
        const commentToAdd = { commentBody: newComment }; // Since each comment is an "Object" containing "postId" & "commentBody", and we only care "commentBody"
        setComments([...comments, commentToAdd]); // Format: Array destructuring (Grab the content in the first index of the array and put into the second index)
        setNewComment("");  // To set the comment into an empty String after adding it, in order to clear the text bar
      });
  };

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
          {/* "event.target.value": A way in React to grab "values" directly from "inputs" and set them to a "state" and use later */}
          <input
            type="text"
            placeholder="Comment..."
            value={newComment}  // To set the comment into an empty String after adding it, in order to clear the text bar
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
