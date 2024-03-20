import React, { useState } from "react";
import Client from "./Client";
import CodeEditor from "./Editor";

export const EditorPage = () => {
  const [clients, setClients] = useState([
    { socketId: 1, username: "John Doe" },
    { socketId: 1, username: "Himaanshu Doe" },
    { socketId: 1, username: "Himanshu Suman" },
    { socketId: 1, username: "Bimanshu Suman" },
    { socketId: 1, username: "Dimanshu Suman" },
    { socketId: 1, username: "Fimanshu Suman" },
    { socketId: 1, username: "Kimanshu Suman" },
    { socketId: 1, username: "Rimanshu Suman" },
  ]);

  return (
    <div className="editorPage">
      <div className="editorInfoSection">
        <button className="btn copyRoomBtn">Copy Room Id</button>
        <button className="btn leaveBtn">Leave</button>
        <h4>Connected</h4>
        <div className="clientSection">
          {clients.map((client) => {
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
