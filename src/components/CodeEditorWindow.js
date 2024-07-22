import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { languageOptions } from "../constants/languageOptions";

const CodeEditorWindow = ({ onChange, language, theme }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const selectedLanguage = languageOptions.find(
      (option) => option.value === language
    );
    setValue(
      selectedLanguage ? selectedLanguage.sampleCode : "// some comment"
    );
  }, [language]);

  const handleEditorChange = (value) => {
    setValue(value);
    onChange && onChange("code", value);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl border-20 border-green">
      <Editor
        options={{
          fontFamily: "Ubuntu Mono",
          fontSize: "17px",
          minimap: { enabled: false },
          automaticLayout: true,
        }}
        height="80vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme="vs-dark"
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditorWindow;
