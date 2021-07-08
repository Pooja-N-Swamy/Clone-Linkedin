import React, { useState, useEffect } from "react";
import "./Feed.css";
import InputOption from "./InputOption";
import PhotoIcon from "@material-ui/icons/Photo";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import WorkIcon from "@material-ui/icons/Work";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import { Post } from "./Post";
import { db } from "../context/firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import FlipMove from "react-flip-move";

export default function Feed() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const [post, setPost] = useState([]);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPost(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  const postSubmitHandler = (e) => {
    e.preventDefault();
    db.collection("posts").add({
      name: user.displayName,
      description: user.email,
      message: input,
      photoURL: user.photoURL || "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <form onSubmit={postSubmitHandler}>
            <img src={user?.photoURL} />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Start a post"
              type="text"
            />
            <button type="submit">Send</button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption Icon={PhotoIcon} title="Photo" color="#70b5f9" />
          <InputOption Icon={VideoLibraryIcon} title="Video" color="#7fc15e" />
          <InputOption Icon={WorkIcon} title="Job" color="#70b5f9" />
          <InputOption
            Icon={CalendarViewDayIcon}
            title="Write article"
            color="#fc9295"
          />
        </div>
      </div>
      <FlipMove>
        {post.map(({ id, data: { name, description, message, photoURL } }) => (
          <Post
            key={id}
            name={name}
            description={description}
            message={message}
            photoURL={photoURL}
          />
        ))}
      </FlipMove>
    </div>
  );
}
