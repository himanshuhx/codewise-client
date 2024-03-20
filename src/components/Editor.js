import React, { useEffect } from "react";

import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  return (
    <Editor
      height="100%"
      language="javascript"
      theme="vs-dark"
      options={{
        inlineSuggest: true,
        fontSize: "25px",
        formatOnType: true,
        autoClosingBrackets: true,
      }}
    />
  );
};

export default CodeEditor;
