import React, { useState, useRef } from 'react'
import zoomLogo from '../../assets/Zoom Blue Logo.png';
import './ParticipationCounter.css';

const ParticipationCounter = () => {
  
  let [sortedArray, updateSortedArray] = useState(null);
  let [lastname, updateLastname] = useState('Patel');
  let [results, showResults] = useState(false);
  let textareaRef = useRef();

  const readData = () => {
    // if (err) throw err;
    let data = textareaRef.current.value;
    if (data===null || data===undefined || data==='') { return }
    // var wordsArray = splitByWords(data);
    // var wordsMap = createWordMap(wordsArray);
    // var finalWordsArray = sortByCount(wordsMap);
    // var filteredFinalWordsArray = finalWordsArray;
  
    let resultsArray = hasCertainPattern(data);
    let wordmappp = createWordMap(resultsArray)
    updateSortedArray(sortByCount(wordmappp))
    showResults(true)
    // setTimeout(()=>showResults(true), 2000); 
  
    // console.log(filteredFinalWordsArray);
    // console.log('The word "' + sortedArray[0].name + '" appears the most in the file ' +
    //   sortedArray[0].total + ' times');
    
    return sortedArray;
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

  return (
    <div>
      {
        results===true &&
        <div className="tableDiv">
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
      <p className="step-para-1"><span className="step">1️</span>Enter your last name exactly as it appears in your Zoom Chat History</p>
      <div className="name-label-div">
        <label htmlFor="lastname">Last name:</label>
        <input type="text" name="lastname" placeholder="Patel" value={lastname} onChange={(event)=>updateLastname(event.target.value)}/>
      </div>
      <br/>
      <p><span className="step">2</span>Copy-paste the contents from your saved "meeting_saved_chat.txt" file to the text area below</p>
      <textarea ref={textareaRef} className="data" name="message"></textarea> 
      <br/>
      <div className="step-para-3-div">
        <p ><span className="step">3</span>{`Click on the Submit button below, and use the other buttons as per your need. The results
        should be displayed above Step 1.`}</p>

        <button className="submit-button" type="button" onClick={()=>readData()}>Submit</button>
        <button className="clear-textarea-button" type="button" onClick={()=>clearTextArea()}>Clear Text Area</button>
        <button className="clear-all-button" type="button" onClick={()=>clearAll()}>Clear All</button>
      </div>
    </div>
  )
}

export default ParticipationCounter;
