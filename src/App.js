import './App.css';
import {useState, useEffect} from "react"
import axios from 'axios';



function App() {

  const [answer, setAnswer] = useState("")
  const [guess, setGuess] = useState("")
  let randomGuess = 'apple'

  const getWord = () => {
    axios
    .get('https://random-word-api.herokuapp.com/word?length=5')
    .then(res => {
      setAnswer(res.data)
    })
    .catch(err => {
      console.error(err)
    })
  }

  const checkGuess = (randomGuess) => {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomGuess}`)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      })
  }

  useEffect(() => {
    setAnswer(getWord());
    
  }, [])

  return (
    <div className="App">
      <h1>Hello</h1>
      <p>Here is the answer {answer}</p>
      <p>What is your guess? {guess}</p>
    </div>
  );
}

export default App;
