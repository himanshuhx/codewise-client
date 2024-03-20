import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router";

const Form = () => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("New Room Created");
  };

  const joinRoom = () => {
    if (!userName || !roomId) {
      toast.error("RoomId or Username is missing");
      return;
    }

    // navigate to editor page
    navigate(`/editor/${roomId}`, {
      state: {
        userName,
      },
    });
  };

  return (
    <div className="formWrapper">
      <img
        className="homePageLogo"
        src="./code-wise-logo.png"
        alt="code-wise-logo"
      ></img>
      <h4 className="mainLabel">Enter Details To Join ROOM</h4>
      <input
        className="homeInput"
        placeholder="ROOM ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      ></input>
      <input
        className="homeInput"
        placeholder="USERNAME"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      ></input>
      <button className="btn joinBtn" onClick={joinRoom}>
        JOIN
      </button>
      <div className="createRoomSection">
        <span className="createRoomInfo">Want to create a new ROOM? </span>
        <a href="" className="createNewRoomBtn" onClick={createNewRoom}>
          Click Here
        </a>
      </div>
    </div>
  );
};

export default Form;
