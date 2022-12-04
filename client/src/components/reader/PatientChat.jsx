import React from "react";
import "../poet/chatStyle.css";
import { useState, useEffect } from "react";
import ChatView from "./PatientChatView";
import { useLocation } from "react-router-dom";
import authServices from "../Services/AuthServices";

import socket from "../../sockets";

function Chat() {
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [doctor, setDoctor] = useState(location.state.doctor);
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const createRoom = () => {
    console.log("patientId" + authServices.getLoggedInUser()._id);
    console.log("DoctorID:" + doctor._id);
    var roomStr = authServices.getLoggedInUser()._id + "$" + doctor._id;
    console.log("Room:" + roomStr);
    setRoom(roomStr);
    setUsername(authServices.getLoggedInUser().username);
  };

  useEffect(createRoom, []);

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <button onClick={joinRoom}>Join Chat</button>
        </div>
      ) : (
        <ChatView socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default Chat;