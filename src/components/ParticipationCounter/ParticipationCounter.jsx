import React, { useState, useRef } from "react";
import IntroBanner from "../IntroBanner/IntroBanner";
import "./ParticipationCounter.css";

const ParticipationCounter = () => {
  const [sortedArray, updateSortedArray] = useState(null);
  const [lastname, updateLastname] = useState("");
  const [results, showResults] = useState(false);
  const [lastnameError, updateLastnameError] = useState(null);
  const [textareaError, updateTextareaError] = useState(null);
  const [stepCounter, setStepCounter] = useState(1);
  const checkboxRef = useRef()
  const lastnameRef = useRef()
  const textareaRef = useRef()
  const [textareaContent, updateTextareaContent] = useState("")

  // source: http://chrisjopa.com/2016/04/21/counting-word-frequencies-with-javascript/
  const readData = () => {
    // if (err) throw err;
    let data = textareaContent;
    if (data === null || data === undefined || data === "") {
      return;
    }
    if (lastname !== "" && data.indexOf(`${lastname}`) === -1) {
      showError(
        "No such last name was found in the uploaded text or file",
        "name-label-div-id"
      );
      return;
    }

    let resultsArray = hasCertainPattern(data);
    let wordmappp = createWordMap(resultsArray);
    let anotherArray = sortByCount(wordmappp);
    updateSortedArray(anotherArray);
    lastnameRef.current.classList.remove("required-highlight");
    updateLastnameError(null);
    showResults(true);

    return anotherArray;
    /*
      output:
      [ { name: 'he', total: 10 },
        { name: 'again', total: 7 },
        { name: 'away', total: 7 },
        ... ]
    */
  };

  const splitByLine = text => {
    // split string by lines
    var linesArray = text.split(/\n/);
    return linesArray;
  };

  const createWordMap = wordsArray => {
    // create map for word counts
    var wordsMap = {};
    /*
      wordsMap = {
        'Oh': 2,
        'Feelin': 1,
        ...
      }
    */
    wordsArray.forEach(function (key) {
      if (wordsMap.hasOwnProperty(key)) {
        wordsMap[key]++;
      } else {
        wordsMap[key] = 1;
      }
    });

    return wordsMap;
  };

  const sortByCount = wordsMap => {
    // sort by count in descending order
    var finalWordsArray = [];
    finalWordsArray = Object.keys(wordsMap).map(function (key) {
      return {
        name: key,
        total: wordsMap[key]
      };
    });

    finalWordsArray.sort(function (a, b) {
      return b.total - a.total;
    });

    return finalWordsArray;
  };

  // source: https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
  const dynamicSort = property => {
    let sortOrder = 1;

    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function (a, b) {
      if (sortOrder === -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    };
  };

  const sortByParticipation = () => {
    readData();
  };

  const sortAlphabetically = async () => {
    const data = readData();
    const alphabetizeIt = data.sort(dynamicSort("name"));
    updateSortedArray(alphabetizeIt)
  };

  const hasCertainPattern = data => {
    const result = splitByLine(data);
    let someArray = [];
    let fromIndex = result[0].indexOf("From");
    for (let i = 0; i < result.length; i++) {
      let sub = result[i].substr(fromIndex)
      sub = sub.substr(0,sub.indexOf(":"))
      if(sub!=="") someArray.push(sub);
    }
    return someArray;
  };

  const clearTextArea = () => {
    updateTextareaContent("")
  };

  const clearResults = () => {
    showResults(false);
    updateSortedArray(null);
  };

  const resetAll = () => {
    clearTextArea();
    clearResults();
    updateLastname("");
    updateLastnameError("");
    setStepCounter(1)
    checkboxRef.current.checked = false
    lastnameRef.current.readOnly = false
    lastnameRef.current.classList.remove("lastname-disable")
  };

  const fileSelectedHandler = somefile => {
    let reader = new FileReader();
    reader.onloadend = () => {
      const content = reader.result;
      let text = textareaRef.current.value + content
      updateTextareaContent(text)
    }
    reader.readAsText(somefile);
  };

  const handleMultipleFilesReader = (event) => {
    Object.values(event.target.files).forEach(value => {
      fileSelectedHandler(value)
    })
    event.target.value = ""
  }

  const scrollTo = hashName => {
    let element = document.getElementById(hashName);
    element.scrollIntoView()
  };

  const showError = (text, element) => {
    if (text === null && element === "name-label-div-id") {
      updateLastnameError(null);
      lastnameRef.current.classList.remove("required-highlight");
    } else if (element === "name-label-div-id") {
      updateLastnameError(text);
      lastnameRef.current.classList.add("required-highlight");
      scrollTo(element);
    } else if (text === null && element === "textarea-div-id") {
      updateTextareaError(null);
      document
        .getElementById("textarea-id")
        .classList.remove("required-highlight");
    } else if (element === "textarea-div-id") {
      updateTextareaError(text);
      document
        .getElementById("textarea-id")
        .classList.add("required-highlight");
      scrollTo(element);
    } else {
      updateLastnameError(null);
      updateTextareaError(null);
    }
    return;
  };

  const updateLastnameHandler = lastname => {
    return new Promise((resolve, reject) => {
      updateLastname(lastname);
      if (lastname === "") {
        showError("Lastname is required", "name-label-div-id");
        reject(false);
        return;
      } else {
        resolve(true);
      }
    })
      .then(value => {
        if (value !== false) {
          showError(null, "name-label-div-id");
        }
      })
      .catch(err => console.log(err));
  };

  const updateTextareaHandler = text => {
    return new Promise((resolve, reject) => {
      if (text === "") {
        showError("Text is required", "textarea-div-id");
        reject(false);
      } else {
        // textareaRef.current.value = text;
        updateTextareaContent(text)
        resolve(true);
      }
    })
      .then(value => {
        if (value) {
          showError(null, "textarea-div-id");
        }
      })
      .catch(err => console.log(err));
  };

  const updateCheckboxStatus = () => {
    if (lastname !== "" && lastname !== undefined && lastname !== null && checkboxRef.current.checked) {
      showError(null, "textarea-div-id");
      lastnameRef.current.readOnly = true
      lastnameRef.current.classList.add("lastname-disable")
      setStepCounter(2)
    } else {
      showError("Lastname is required", "name-label-div-id");
      lastnameRef.current.readOnly = false
      lastnameRef.current.classList.remove("lastname-disable")
      setStepCounter(1)
    }
  }

  const handleSubmit = async () => {
    await updateTextareaHandler(textareaRef.current.value);
    await updateLastnameHandler(lastname)
      .then(sortAlphabetically())
      .then(scrollTo("table-div-id"))
      .catch(err => console.log(err));
  };

  return (
    <div className="participation-counter-container">
      <IntroBanner />
      {results === true && (
        <div className="table-div" id="table-div-id">
          <div className="buttons-above-table">
            <button type="button" onClick={() => sortAlphabetically()}>
              Sort Alphabetically
            </button>
            <button type="button" onClick={() => sortByParticipation()}>
              Sort by Participation
            </button>
          </div>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Count</th>
              </tr>
              {sortedArray.map((el, index) => (
                <tr key={index}>
                  <td>{el.name}</td>
                  <td>{el.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="clear-results-button"
            onClick={() => clearResults()}
          >
            Clear Results
          </button>
        </div>
      )}
      <div className="step-and-text-div">
        <span className="step">Step 1</span>
        <p className="step-para-1">
          Enter your lastname exactly as it appears in your Zoom Chat History
        </p>
      </div>
      <form>
        <div className="name-label-div" id="name-label-div-id">
          <label htmlFor="lastname">Lastname</label>
          <input
            ref={lastnameRef}
            type="text"
            required
            name="lastname"
            id="lastname-input"
            placeholder="Your Lastname"
            value={lastname}
            onChange={event => updateLastnameHandler(event.target.value)}
          />
          {lastnameError && (
            <div className="lastname-error">{lastnameError}</div>
          )}
        </div>
        <div className="checkbox-div">
          <input ref={checkboxRef} type="checkbox" id="lastname-confirm" name="lastname-confirm" onChange={() => updateCheckboxStatus()} />
          <label htmlFor="lastname-confirm">{`I've entered my lastname exactly as it appears in my zoom chat history.`}</label>
        </div>
        <br />
        <div className={`${stepCounter === 1 && "stepClass2"}`}>
          <div
            className={`step-and-text-div step-div-2 ${stepCounter === 1 &&
              "stepClass2"}`}
          >
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
                onChange={event => handleMultipleFilesReader(event)}
                type="file"
                name="text"
                multiple={false}
                accept="text/plain"
              />
              <span className="file-upload-span">Upload files one by one from different folders</span>
            </div>
            <div className="file-upload-div">
              <input
                className="file-upload-input"
                onChange={event => handleMultipleFilesReader(event)}
                type="file"
                name="text"
                multiple={true}
                accept="text/plain"
              />
              <span className="file-upload-span">Upload multiple files from same folder</span>
            </div>
          </div>
          <div className="textarea-div" id="textarea-div-id">
            <textarea
              ref={textareaRef}
              id="textarea-id"
              className="data"
              required
              name="message"
              value={textareaContent}
              onChange={event => updateTextareaHandler(event.target.value)}
            ></textarea>
            {textareaError && (
              <div className="textarea-error">{textareaError}</div>
            )}
          </div>

          <br />
          <div className="step-and-text-div step-div-3">
            <span className="step">Step 3</span>
            <p className="step-para-1">{`Click on the Submit button below, and use the other 
        buttons as per your need. The results should be displayed above Step 1.`}</p>
          </div>
          <div className="buttons-div">
            <button
              className="submit-button"
              type="button"
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
            <button
              className="clear-textarea-button"
              type="button"
              onClick={() => clearTextArea()}
            >
              Clear Text Area
            </button>
            <button
              className="reset-all-button"
              type="button"
              onClick={() => resetAll()}
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ParticipationCounter;
