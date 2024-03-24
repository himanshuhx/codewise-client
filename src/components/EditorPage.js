import React, { useEffect, useRef, useState } from "react";
import Client from "./Client";
import CodeEditor from "./Editor";
import { initSocket } from "../utillity/socket";
import { ACTIONS } from "../utillity/constants";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const EditorPage = () => {
  const socketRef = useRef(null);
  const { roomId } = useParams();
  const location = useLocation();
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("RoomId Copied to Clipboard");
    } catch (err) {
      console.log(err);
    }
  };

  const leaveRoom = async () => {
    navigate("/");
    socketRef.current.removeAllListeners();
    socketRef.current.disconnect();
  };

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state.userName,
      });

      // listen for joined users
      socketRef.current.on(ACTIONS.JOINED, (data) => {
        const { connectedClients, username } = data;
        const isSameUser = clients?.some(
          (client) => client.username === username
        );

        if (username !== location.state.userName) {
          toast.success(`${username} joined the room`);
        } else {
          toast.success(`You joined the room`);
        }
        if (!isSameUser) {
          setClients(connectedClients);
        }
      });

      // listen for disconnected users
      socketRef.current.on(ACTIONS.DISCONNECTED, (data) => {
        const { socketId, username } = data;
        toast.success(`${username} left the room`);
        setClients((clients) => {
          return clients.filter((client) => client.socketId !== socketId);
        });
      });
    };

    init();
  }, []);

  return (
    <div className="editorPage">
      <div className="editorInfoSection">
        <div className="logo">
          <img
            className="editorLogo"
            src="../../code-wise-logo.png"
            alt="code-wise-logo"
          ></img>
        </div>
        <h4>CONNECTED</h4>
        <div className="clientSection">
          {clients?.map((client) => {
            return <Client username={client.username} />;
          })}
        </div>
        <div className="editorBtn">
          <button className="btn copyRoomBtn" onClick={copyRoomId}>
            Copy RoomId
          </button>
          <button className="btn leaveBtn" onClick={leaveRoom}>
            Leave
          </button>
        </div>
      </div>
      <div className="editor">
        <CodeEditor socketRef={socketRef} roomId={roomId} />
      </div>
    </div>
  );
};
