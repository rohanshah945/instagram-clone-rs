import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import firebase from "firebase";
import "./Post.css";
import { db } from "./firebase";

function Post({ postId, loggedUser, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const addComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: loggedUser,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username.toUpperCase()}
          src="/static/image/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>

      <img className="post__image" src={imageUrl} alt="" />

      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>

      {comments.map((comment) => {
        return (
          <h4 className="post__text">
            <strong>{comment.username}</strong> {comment.text}
          </h4>
        );
      })}

      <form className="post__commentForm">
        <input
          className="post__commentFormInput"
          type="text"
          placeholder="Add Comment..."
          value="contained"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />

        <button
          className="post__commentFormSubmit"
          value="contained"
          type="submit"
          disabled={!comment}
          onClick={addComment}
        >
          <strong>Post</strong>
        </button>
      </form>
    </div>
  );
}

export default Post;
