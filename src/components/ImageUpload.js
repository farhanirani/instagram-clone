import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import { storage, db } from ".././firebase";
import firebase from "firebase";
import "./ImageUpload.css";

function ImageUpload({ username, userid }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();

    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //   progress bar ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // error
        console.log(error.message);
        alert(error.message);
      },
      () => {
        //   complete function
        // to get the downloaded link fo the image
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image in the database
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageurl: url,
              username: username,
              userid: userid,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <form onSubmit={handleUpload}>
      <div className="image__upload">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
        <progress style={{ width: "100%" }} value={progress} max="100" />
        <Input
          required
          multiline
          type="text"
          label="Caption"
          placeholder="Caption"
          rows={2}
          style={{ width: "100%" }}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Input required type="file" onChange={handleChange} />
        <Button
          style={{ marginTop: 20 }}
          variant="contained"
          color="primary"
          className="upload__button"
          type="submit"
        >
          Upload
        </Button>
      </div>
    </form>
  );
}

export default ImageUpload;
