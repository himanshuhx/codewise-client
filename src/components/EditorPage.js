import React, { useEffect, useRef, useState } from "react";
import Client from "./Client";
import CodeEditor from "./Editor";
import { initSocket } from "../utillity/socket";
import { ACTIONS } from "../utillity/constants";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export const EditorPage = () => {
  const socketRef = useRef(null);
  const { roomId } = useParams();
  const location = useLocation();
  const [clients, setClients] = useState([]);

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
        if (username !== location.state.userName) {
          toast.success(`${username} joined the room`);
        } else {
          toast.success(`You joined the room`);
        }
        setClients(connectedClients);
      });
    };

    init();
  }, []);

  return (
    <div className="editorPage">
      <div className="editorInfoSection">
        <button className="btn copyRoomBtn">Copy Room Id</button>
        <button className="btn leaveBtn">Leave</button>
        <h4>Connected</h4>
        <div className="clientSection">
          {clients?.map((client) => {
            return <Client username={client.username} />;
          })}
        </div>
      </div>
      <div className="editor">
        <CodeEditor />
      </div>
    </div>
  );
};
