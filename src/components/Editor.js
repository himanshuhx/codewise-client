import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { ACTIONS } from "../utillity/constants";

const CodeEditor = ({ socketRef, roomId }) => {
  const [code, setCode] = useState();

  const handleEditorChange = (code) => {
    socketRef.current.emit(ACTIONS.CODE_CHANGE, { roomId, code });
    setCode(code);
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        setCode(code);
      });
    }
  }, [socketRef.current]);

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
