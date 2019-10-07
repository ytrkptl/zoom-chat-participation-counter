import React, { useState, useRef } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';
import ParticipationCounter from './components/ParticipationCounter/ParticipationCounter';
import IntroBanner from './components/IntroBanner/IntroBanner';

const App = () => {

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
    <div className="App">
      <Header />
      <IntroBanner />
      <ParticipationCounter />  
      <Footer />
    </div>
  );
}

export default App;