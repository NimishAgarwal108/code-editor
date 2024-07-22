import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useKeyPress from "../hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import LanguagesDropdown from "./LanguagesDropdown";

const Landing = () => {
  const [code, setCode] = useState(languageOptions[0].sampleCode); // Initialize with the sample code of the default language
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");
  const onSelectChange = (selectedOption) => {
    setLanguage(selectedOption);
    setCode(selectedOption.sampleCode); // Update the code with the sample code of the selected language
  };
  useEffect(() => {
    if (enterPress && ctrlPress) {
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = async () => {
    setProcessing(true);
    const url =
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "b8bd8f4accmshd7f7e2e5979aab3p1f148ajsn4914764d3488",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        language_id: language.id,
        source_code: btoa(code),
        stdin: btoa(customInput),
      }),
    };
    
    try {
      console.log("TEST")
      const response = await fetch(url, options);
      console.log("TEST2")
      const result = await response.json();
      console.log("TEST3")
      const token = result.token;
      console.log("TEST4")
      checkStatus(token);
      console.log("TEST5")
    } catch (error) {
      console.log("TEST ERRROR")
      setProcessing(false);
      console.error(error);
    }
  };
  const checkStatus = async (token) => {
    console.log("TEST6")
    const url = `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=*`;
    console.log("TEST7")
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b8bd8f4accmshd7f7e2e5979aab3p1f148ajsn4914764d3488",
        // "X-RapidAPI-Key":"108d301970msh68dbe6d39fbf202p1139ddjsn6eb50b9aa735",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    };
    console.log("TEST8")
    try {
      const response = await fetch(url, options);
      console.log("TEST9")
      const result = await response.json();
      console.log("TEST10")
      let statusId = result.status?.id;
      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          console.log("TEST11111111")
          checkStatus(token);
        }, 2000);
        return;
      } else {
        console.log("TEST ELSE")
        setProcessing(false);
        setOutputDetails(result);
        showSuccessToast(`Compiled Successfully!`);
        return;
      }
    } catch (error) {
      console.error(error);
      setProcessing(false);
      showErrorToast();
    }
  };
  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="drops flex flex-row">
        <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
      </div>
      <div className="main flex flex-row space-x-4 items-start px-4 py-4">
        <div className="edit flex flex-col justify-start items-end ">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
          />
        </div>
        <div className="flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-center my-5">
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <button
              onClick={handleCompile}
              className={classnames(
                "tc mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_#000000] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                processing ? "opacity-50" : ""
              )}
              disabled={processing}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
          <div className="outerd">
            {/* <div className="outd">
              {outputDetails && <OutputDetails outputDetails={outputDetails} />}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Landing;