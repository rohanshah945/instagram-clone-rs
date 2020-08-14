import React from "react";
import firebase from "firebase";
import { Button, LinearProgress } from "@material-ui/core";
import "./NewPost.css";
import { useState } from "react";
import { db, storage } from "./firebase";

function NewPost({ username, closeModal }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => alert(error.mesage),
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setImage(null);
            setCaption("");
            closeModal(false);
          });
      }
    );
  };

  return (
    <div className="newPost">
      <h2>Upload New Post</h2>
      <hr className="newPost__break" />

      <form className="newPost__form">
        <input
          disabled={progress > 0}
          className="newPost__fileUpload"
          onChange={handleFileUpload}
          type="file"
          name=""
          id=""
        />

        <div className="newPost__caption">
          <label htmlFor="caption__textArea">
            <strong>Add Caption</strong>
          </label>
          <textarea
            disabled={progress > 0}
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            className="newPost__captionText"
            id="caption__textArea"
            cols="60"
            rows="5"
          />
        </div>

        <Button
          disabled={!caption || !image || progress > 0}
          type="submit"
          variant="contained"
          className="newPost__submit"
          onClick={handleSubmit}
        >
          <strong>Upload Post</strong>
        </Button>
      </form>

      {progress > 0 && (
        <LinearProgress
          className="newPost__progress"
          variant="determinate"
          value={progress}
          max="100"
        />
      )}
    </div>
  );
}

export default NewPost;
