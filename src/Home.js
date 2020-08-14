import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import InstagramEmbed from "react-instagram-embed";
import { Fab, Button, Input } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import "./Home.css";
import { db, auth } from "./firebase";
import Post from "./Post";
import Header from "./Header";
import NewPost from "./NewPost";

function Home() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [openNewPostModal, setOpenNewPostModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User Logged in
        setUser(authUser);
      } else {
        // User Logged out
        setUser(null);
        history.push("/login");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, history]);

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
    return () => {
      unsubscribe();
    };
  }, []);

  const updateUsername = (event) => {
    event.preventDefault();
    auth.currentUser.updateProfile({ displayName: username });
    setOpenNewPostModal(false);
  };

  const body = (
    <div className="home__newPostModal">
      {user?.displayName ? (
        <NewPost username={user.displayName} closeModal={setOpenNewPostModal} />
      ) : (
        <div className="home__username">
          <h2>Add User Name</h2>
          <form className="home__usernameForm">
            <Input
              className="home__usernameFormInput"
              placeholder="username"
              variant="contained"
              type="text"
              name=""
              id=""
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <Button
              disabled={!username}
              variant="contained"
              onClick={updateUsername}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
      )}
    </div>
  );

  return (
    <div className="home">
      {user && <Header loggedUser={user?.displayName} />}

      <div className="home__posts">
        <div className="home__postsLeft">
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              postId={id}
              loggedUser={user?.displayName}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
        <div className="home__postsRight">
          <InstagramEmbed
            url="https://www.instagram.com/p/B0bntu9nBkf/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>

      <Fab
        className="home__addNew"
        aria-label="add"
        onClick={() => setOpenNewPostModal(true)}
      >
        <AddIcon />
      </Fab>

      <Modal open={openNewPostModal} onClose={() => setOpenNewPostModal(false)}>
        {body}
      </Modal>
    </div>
  );
}

export default Home;
