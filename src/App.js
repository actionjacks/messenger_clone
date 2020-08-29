import React, { useState, useEffect } from "react";
// @material-ui/core
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import Message from "./components/Message";
import db from "./firebase";
import firebase from "firebase";
// flipmove for animation
import FlipMove from "react-flip-move";
//icon from mater-ui
import SendIcon from "@material-ui/icons/DirectionsRunOutlined";
import { IconButton } from "@material-ui/core";
import "./App.css";

function App() {
  //using hooks
  // state declaration , init state empty string
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    // example
    // { username: "user", message: "user text" },
  ]);
  const [username, setUsername] = useState("");

  //get data from database !!
  //snapshot dziala troche jak listner
  useEffect(() => {
    //run once when the app components loads
    //odwoluje sie do kolekcji messages w database
    //snap shot wykryje wszystkie zmiany i dopali kod
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  // useState=variable in react
  //useEffect =run code on a condition
  useEffect(() => {
    //const name=prompt('please enter your name')
    setUsername(prompt("Please enter your name"));
    //run code here...
    //if its blank inside[] this code runs once when the app loads
  }, []); //condition

  const sendMessage = (e) => {
    e.preventDefault();
    // send input value in to firebase snapshot take rest
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // to jest do zapisywania lokalnie
    // setMessages([...messages, { username: username, text: input }]);
    setInput("");
  };

  return (
    <div className="App">
      <img src="./logoBarb.png" alt="logo" />
      <h1>jackMessenger</h1>
      <h2>użytkownik {!username ? "anonymous" : username} zalogowany</h2>
      {/* aby enter wysylal buttonem inputa najprosciej umiescic w znaczniku form */}
      {/* {input field} */}
      {/* {button} */}
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="Napisz wiadomosc..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <IconButton
            className="app__iconButton"
            disabled={!input}
            type="submit"
            onClick={sendMessage}
            color="primary"
            variant="outlined"
            className="app__button"
          >
            <SendIcon />
          </IconButton>
          {/* <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!input}
            onClick={sendMessage}
          >
            send Message
          </Button> */}
        </FormControl>
      </form>
      {/* {messages themselves} */}
      <FlipMove>
        {messages.map(({ id, message }) => {
          // propsem przekazujemy message
          return <Message key={id} username={username} message={message} />;
        })}
      </FlipMove>
    </div>
  );
}

export default App;
