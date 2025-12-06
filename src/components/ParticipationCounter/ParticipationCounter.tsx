import { useState, useRef } from "react";
import IntroBanner from "../IntroBanner/IntroBanner";
import {
  hasCertainPattern,
  createWordMap,
  sortByCount,
  dynamicSort
} from "../../utils/chatParser";
import type { ParticipantResult, ErrorElement } from "../../types";
import "./ParticipationCounter.css";

const ParticipationCounter = () => {
  const [sortedArray, updateSortedArray] = useState<ParticipantResult[] | null>(
    null
  );
  const [hostname, updateHostname] = useState("");
  const [results, showResults] = useState(false);
  const [hostnameError, updateHostnameError] = useState<string | null>(null);
  const [textareaError, updateTextareaError] = useState<string | null>(null);
  const [stepCounter, setStepCounter] = useState(1);

  const checkboxRef = useRef<HTMLInputElement>(null);
  const hostnameRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [textareaContent, updateTextareaContent] = useState("");
  // source: http://chrisjopa.com/2016/04/21/counting-word-frequencies-with-javascript/

  const scrollTo = (hashName: string) => {
    const element = document.getElementById(hashName);
    element?.scrollIntoView();
  };

  const showError = (text: string | null, element: ErrorElement) => {
    if (text === null && element === "name-label-div-id") {
      updateHostnameError(null);
      hostnameRef.current?.classList.remove("required-highlight");
    } else if (element === "name-label-div-id") {
      updateHostnameError(text);
      hostnameRef.current?.classList.add("required-highlight");
      scrollTo(element);
    } else if (text === null && element === "textarea-div-id") {
      updateTextareaError(null);
      document
        .getElementById("textarea-id")
        ?.classList.remove("required-highlight");
    } else if (element === "textarea-div-id") {
      updateTextareaError(text);
      document
        .getElementById("textarea-id")
        ?.classList.add("required-highlight");
      scrollTo(element);
    }
  };

  const readData = () => {
    let data = textareaContent;
    if (data === null || data === undefined || data === "") {
      return null;
    }

    if (hostname !== "" && data.indexOf(hostname) === -1) {
      showError(
        "No such last name was found in the uploaded text or file",
        "name-label-div-id"
      );
      return null;
    }

    const resultsArray = hasCertainPattern(data);
    const wordMap = createWordMap(resultsArray);
    const anotherArray = sortByCount(wordMap);

    updateSortedArray(anotherArray);
    hostnameRef.current?.classList.remove("required-highlight");
    updateHostnameError(null);
    showResults(true);

    return anotherArray;
  };

  const sortByParticipation = () => {
    readData();
  };

  const sortAlphabetically = () => {
    const data = readData();
    if (data) {
      const alphabetized = data.sort(dynamicSort("name"));
      updateSortedArray(alphabetized);
    }
  };
  // this function will filter the messages and return only the ones sent to the host only
  const filterMessagesToHostOnly = () => {
    const data = readData();
    if (data) {
      const filteredArray = data.filter(
        (el) =>
          el.name.includes(`to  ${hostname}(Direct Message)`) ||
          el.name.includes(`to  ${hostname}(Privately)`)
      );
      const alphabetized = filteredArray.sort(dynamicSort("name"));
      updateSortedArray(alphabetized);
    }
  };

  const clearTextArea = () => {
    updateTextareaContent("");
  };

  const clearResults = () => {
    showResults(false);
    updateSortedArray(null);
  };

  const resetAll = () => {
    clearTextArea();
    clearResults();
    updateHostname("");
    updateHostnameError("");
    setStepCounter(1);
    if (checkboxRef.current) checkboxRef.current.checked = false;
    if (hostnameRef.current) {
      hostnameRef.current.readOnly = false;
      hostnameRef.current.classList.remove("hostname-disable");
    }
  };

  const fileSelectedHandler = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const content = reader.result as string;
      const text = textareaRef.current!.value + content;
      updateTextareaContent(text);
    };
    reader.readAsText(file);
  };

  const handleMultipleFilesReader = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      Array.from(event.target.files).forEach((file) => {
        fileSelectedHandler(file);
      });
      event.target.value = "";
    }
  };

  const updateHostnameHandler = (hostnameValue: string) => {
    return new Promise<boolean>((resolve, reject) => {
      updateHostname(hostnameValue);
      if (hostnameValue === "") {
        showError("Hostname is required", "name-label-div-id");
        reject(false);
        return;
      }
      resolve(true);
    })
      .then((value) => {
        if (value) {
          showError(null, "name-label-div-id");
        }
      })
      .catch(() => {
        // Error already handled
      });
  };

  const updateTextareaHandler = (text: string) => {
    return new Promise<boolean>((resolve, reject) => {
      if (text === "") {
        showError("Text is required", "textarea-div-id");
        reject(false);
      } else {
        updateTextareaContent(text);
        resolve(true);
      }
    })
      .then((value) => {
        if (value) {
          showError(null, "textarea-div-id");
        }
      })
      .catch(() => {
        // Error already handled
      });
  };

  const updateCheckboxStatus = () => {
    if (
      hostname !== "" &&
      hostname !== undefined &&
      hostname !== null &&
      checkboxRef.current?.checked
    ) {
      showError(null, "textarea-div-id");
      if (hostnameRef.current) {
        hostnameRef.current.readOnly = true;
        hostnameRef.current.classList.add("hostname-disable");
      }
      setStepCounter(2);
    } else {
      showError("Hostname is required", "name-label-div-id");
      if (hostnameRef.current) {
        hostnameRef.current.readOnly = false;
        hostnameRef.current.classList.remove("hostname-disable");
      }
      setStepCounter(1);
    }
  };

  const handleSubmit = async () => {
    await updateTextareaHandler(textareaRef.current?.value || "");
    await updateHostnameHandler(hostname);
    sortAlphabetically();
    scrollTo("table-div-id");
  };

  return (
    <div className="participation-counter-container">
      <IntroBanner />
      {results && (
        <div
          className="table-div"
          id="table-div-id">
          <div className="buttons-above-table">
            <button
              type="button"
              onClick={() => sortAlphabetically()}>
              Sort Alphabetically
            </button>
            <button
              type="button"
              onClick={() => sortByParticipation()}>
              Sort by Participation
            </button>
            <button
              type="button"
              onClick={() => filterMessagesToHostOnly()}>
              Show Messages to Host only
            </button>
          </div>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Count</th>
              </tr>
              {sortedArray?.map((el, index) => (
                <tr key={index}>
                  <td>{el.name}</td>
                  <td>{el.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="clear-results-button"
            onClick={() => clearResults()}>
            Clear Results
          </button>
        </div>
      )}
      <div className="step-and-text-div">
        <span className="step">Step 1</span>
        <p className="step-para-1">
          Enter your hostname exactly as it appears in your Zoom Chat History
        </p>
      </div>
      <form>
        <div
          className="name-label-div"
          id="name-label-div-id">
          <label htmlFor="hostname">Hostname</label>
          <input
            ref={hostnameRef}
            type="text"
            required
            name="hostname"
            id="hostname-input"
            placeholder="Your Hostname"
            value={hostname}
            onChange={(event) => updateHostnameHandler(event.target.value)}
          />
          {hostnameError && (
            <div className="hostname-error">{hostnameError}</div>
          )}
        </div>
        <div className="checkbox-div">
          <input
            ref={checkboxRef}
            type="checkbox"
            id="hostname-confirm"
            name="hostname-confirm"
            onChange={() => updateCheckboxStatus()}
          />
          <label htmlFor="hostname-confirm">
            {`I've entered my hostname exactly as it appears in my zoom chat history.`}
          </label>
        </div>
        <br />
        <div className={`${stepCounter === 1 && "stepClass2"}`}>
          <div
            className={`step-and-text-div step-div-2 ${stepCounter === 1 && "stepClass2"}`}>
            <span className="step">Step 2</span>
            <p className="step-para-1">
              Copy-paste the contents from your saved "meeting_saved_chat.txt"
              file to the text area below
            </p>
          </div>
          <p className="step or">OR</p>
          <div className="step-and-text-div step-div-2">
            <span className="step">Step 2</span>
            <p className="step-para-1">
              Select a file from your computer using a button below
            </p>
          </div>
          <div className="file-upload-divs-parent">
            <div className="file-upload-div">
              <input
                className="file-upload-input"
                onChange={handleMultipleFilesReader}
                type="file"
                name="text"
                multiple={false}
                accept="text/plain"
              />
              <span className="file-upload-span">
                Upload files one by one from different folders
              </span>
            </div>
            <div className="file-upload-div">
              <input
                className="file-upload-input"
                onChange={handleMultipleFilesReader}
                type="file"
                name="text"
                multiple={true}
                accept="text/plain"
              />
              <span className="file-upload-span">
                Upload multiple files from same folder
              </span>
            </div>
          </div>
          <div
            className="textarea-div"
            id="textarea-div-id">
            <textarea
              ref={textareaRef}
              id="textarea-id"
              className="data"
              required
              name="message"
              value={textareaContent}
              onChange={(event) =>
                updateTextareaHandler(event.target.value)
              }></textarea>
            {textareaError && (
              <div className="textarea-error">{textareaError}</div>
            )}
          </div>
          <div className="step-and-text-div step-div-3">
            <span className="step">Step 3</span>
            <p className="step-para-1">{`Click on the Submit button below, and use the other 
        buttons as per your need. The results should be displayed above Step 1.`}</p>
          </div>
          <div className="buttons-div">
            <button
              className="submit-button"
              type="button"
              onClick={() => handleSubmit()}>
              Submit
            </button>
            <button
              className="clear-textarea-button"
              type="button"
              onClick={() => clearTextArea()}>
              Clear Text Area
            </button>
            <button
              className="reset-all-button"
              type="button"
              onClick={() => resetAll()}>
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ParticipationCounter;
