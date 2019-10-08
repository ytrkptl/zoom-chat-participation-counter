import React, { useState, useRef } from 'react'
import './ParticipationCounter.css';

const ParticipationCounter = () => {
  
  let [sortedArray, updateSortedArray] = useState(null);
  let [lastname, updateLastname] = useState('Patel');
  let [results, showResults] = useState(false);
  let textareaRef = useRef();

  // source: http://chrisjopa.com/2016/04/21/counting-word-frequencies-with-javascript/
  const readData = () => {
    // if (err) throw err;
    let data = textareaRef.current.value;
    if (data===null || data===undefined || data==='') { return }
    // var wordsArray = splitByWords(data);
    // var wordsMap = createWordMap(wordsArray);
    // var finalWordsArray = sortByCount(wordsMap);
    // var filteredFinalWordsArray = finalWordsArray;
  
    let resultsArray = hasCertainPattern(data);
    let wordmappp = createWordMap(resultsArray);
    let anotherArray = sortByCount(wordmappp);
    updateSortedArray(anotherArray);
    showResults(true)
    
    return anotherArray;
    /*
      output:
      [ { name: 'he', total: 10 },
        { name: 'again', total: 7 },
        { name: 'away', total: 7 },
        ... ]
      The word "he" appears the most in the file 10 times
    */
  
  };
  
  const splitByLine = (text) => {
    // split string by lines
    var linesArray = text.split(/\n/);
    return linesArray;
  }
  
  const createWordMap = (wordsArray) =>{
  
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
  }
  
  const sortByCount = (wordsMap) => {
    // sort by count in descending order
    var finalWordsArray = [];
    finalWordsArray = Object.keys(wordsMap).map(function(key) {
      return {
        name: key,
        total: wordsMap[key]
      };
    });
  
    finalWordsArray.sort(function(a, b) {
      return b.total - a.total;
    });
  
    return finalWordsArray;
  }
  
  // source: https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
  const dynamicSort = (property) => {
    let sortOrder = 1;

    if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function (a,b) {
      if(sortOrder === -1){
          return b[property].localeCompare(a[property]);
      }else{
          return a[property].localeCompare(b[property]);
      }        
    }
  }

  const sortByParticipation = () => {
    readData();
  }

  const sortAlphabetically = () => {
    new Promise ((resolve, reject) => {
      let hmm = readData();
      if (resolve) {
        let sortedAlphabetically = hmm.sort(dynamicSort("name"));
        updateSortedArray(sortedAlphabetically);
      } else if (reject) {
        console.log('not done')
      }
    })
  }

  const hasCertainPattern = (data) => {
    const result = splitByLine(data);
    let someArray = []
    let fromIndex = result[0].indexOf('From');
    for (let i = 0; i < result.length; i++) {
      let teacherNameIndex = result[i].indexOf(lastname) + lastname.length;
      let sub = result[i].substring(fromIndex, teacherNameIndex)
      someArray.push(sub);
    }
    return someArray;
  }

  const clearTextArea = () => {
    textareaRef.current.value = null;
  }

  const clearResults = () => {
    showResults(false);
    updateSortedArray(null);
  }

  const clearAll = () => {
    clearTextArea();
    clearResults();
  }

  const fileSelectedHandler = (somefile) => {
    let reader;
    
    const handleFileRead = () => {
      const content = reader.result;
      textareaRef.current.value = content;
    }

    reader = new FileReader();
    reader.onloadend = handleFileRead;
    reader.readAsText(somefile);
  }

  return (
    <div>
      {
        results===true &&
        <div className="tableDiv">
          <div className="buttons-above-table">
            <button type="button" onClick={()=>sortByParticipation()}>Sort by Participation</button>
            <button type="button" onClick={()=>sortAlphabetically()}>Sort Alphabetically</button>
          </div>
          <table>
            <tbody>
            <tr>
              <th>Name</th>
              <th>Count</th>
            </tr>
          {
            sortedArray.map((el, index)=><tr key={index}><td>{el.name}</td><td>{el.total}</td></tr>)
          }
            </tbody>
          </table>
          <button className="clear-results-button" onClick={()=>clearResults()}>Clear Results</button>
        </div>
      }
      <p className="step-para-1"><span className="step" role="img" aria-label="step one">1️</span>Enter your last name exactly as it appears in your Zoom Chat History</p>
      <div className="name-label-div">
        <label htmlFor="lastname">Last name:</label>
        <input type="text" name="lastname" placeholder="Patel" value={lastname} onChange={(event)=>updateLastname(event.target.value)}/>
      </div>
      <br/>
      
      <p>
        <span className="step" role="img" aria-label="step one">2</span>
        Copy-paste the contents from your saved "meeting_saved_chat.txt" file to the text area below
      </p>
      <span className="step or">OR</span>
      <p>
        <span className="step" role="img" aria-label="step two">2</span>
        Select a file from your computer using the button below
      </p>
      <div className="file-upload-div">
          <input 
            className="file-upload-input"
            onChange={(event)=>fileSelectedHandler(event.target.files[0])}
            type="file"
            name="text"
            multiple={true}
            accept="text/plain"/>
          <span className="file-upload-span">Upload file</span>
        </div>
      <textarea ref={textareaRef} className="data" name="message"></textarea> 
      <br/>
      <div className="step-para-3-div">
        <p ><span className="step" role="img" aria-label="step three">3</span>{`Click on the Submit button below, and use the other buttons as per your need. The results
        should be displayed above Step 1.`}</p>
        <button className="submit-button" type="button" onClick={()=>sortByParticipation()}>Sort by Participation</button>
        <button className="submit-button" type="button" onClick={()=>sortAlphabetically()}>Sort Alphabetically</button>
        <button className="clear-textarea-button" type="button" onClick={()=>clearTextArea()}>Clear Text Area</button>
        <button className="clear-all-button" type="button" onClick={()=>clearAll()}>Clear All</button>
      </div>
    </div>
  )
}

export default ParticipationCounter;
