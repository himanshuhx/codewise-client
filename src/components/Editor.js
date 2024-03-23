import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { ACTIONS } from "../utillity/constants";

const CodeEditor = ({ socketRef, roomId }) => {
  const [code, setCode] = useState();

  const handleEditorChange = (value) => {
    console.log("editor", value);
    setCode(value);
    socketRef.current.emit(ACTIONS.CODE_CHANGE, { roomId, code });
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, async ({ code }) => {
        setCode(code);
      });
    }
    console.log(code);
  }, []);

  return (
    <Editor
      height="100%"
      language="javascript"
      options={{
        inlineSuggest: true,
        fontSize: "25px",
        formatOnType: true,
        autoClosingBrackets: true,
      }}
      value={code}
      onChange={handleEditorChange}
    />
  );
};

export default CodeEditor;
