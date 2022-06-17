import './App.css';
import {useState, useEffect} from "react"
import axios from 'axios';

function App() {
  const [answer, setAnswer] = useState("")
  const [guess, setGuess] = useState("")
  const [counter, setCounter] = useState(1)
  const [win, setWin] = useState(false)
  const [lose, setLose] = useState(false)

  const [answer1, setAnswer1] = useState("")
  const [answer2, setAnswer2] = useState("")
  const [answer3, setAnswer3] = useState("")
  const [answer4, setAnswer4] = useState("")
  const [answer5, setAnswer5] = useState("")
  const [answer6, setAnswer6] = useState("")

  const [notWord, setNotWord] = useState(false)

  useEffect(() => {
    setAnswer(getWord());
  }, []);

  const getWord = () => {
    axios
    .get('https://random-word-api.herokuapp.com/word?length=5')
    .then(res => {
      setAnswer(res.data);
    })
    .catch(err => {
      console.error(err);
    });
  };

  const checkGuess = (guess) => {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`)
      .then(res => {
        setNotWord(false) 
        makeGuess(guess);
        setCounter(counter + 1)
      })
      .catch(err => {
        console.error(err);
        setNotWord(true)
      });
  };

  const makeGuess = (guess) => {
    let tempAnswer = answer[0].toUpperCase();
    let goldAnswer = "";

    if(tempAnswer === guess){
      setWin(true);
    };
    
    for(let i=0; i<guess.length; i++){
      if(guess[i] === tempAnswer[i]){
        document.getElementById(`${counter}-${i+1}`).setAttribute("style", "background-color: green;");
        document.getElementById(`${counter}-${i+1}`).style.borderColor = "green";
        goldAnswer += "!";
      }else{
        goldAnswer += `${tempAnswer[i]}`;
      }
    }
    const goldArr = Array.from(goldAnswer);
    for(let j=0; j<guess.length; j++){
      if(goldAnswer[j]==="!"){
        continue;
      }
      else if(goldArr.indexOf(guess[j]) !== -1){
        document.getElementById(`${counter}-${j+1}`).setAttribute("style", "background-color: gold;");
        document.getElementById(`${counter}-${j+1}`).style.borderColor = "gold";
        goldArr[goldArr.indexOf(guess[j])] = "!"
      }else{
        document.getElementById(`${counter}-${j+1}`).setAttribute("style", "background-color: grey;");
      }
    }
    switch(counter){
      case 1:
        setAnswer1(guess);
        break;
      case 2:
        setAnswer2(guess);
        break;
      case 3:
        setAnswer3(guess);
        break;
      case 4:
        setAnswer4(guess);
        break;
      case 5:
        setAnswer5(guess);
        break;
      case 6:
        setAnswer6(guess);
        break;
      default:
        setAnswer6(guess);
    };
    if(counter === 6){
      setLose(true)
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    checkGuess(guess);
  }

  const handleChange = (e) => {
    const lettersOnly = e.target.value.replace(/[^a-z]/gi, '');
    setGuess(lettersOnly.toUpperCase());
  };

  return (
    <div className="App">
      <h1>Wordie</h1>
      <div className="Container">
        <div className="Row">
          <div id="1-1" className="Cell">
            <p className="Letter">{answer1[0]}</p>
          </div>
          <div id="1-2" className="Cell">
            <p className="Letter">{answer1[1]}</p>
          </div>
          <div id="1-3" className="Cell">
            <p className="Letter">{answer1[2]}</p>
          </div>
          <div id="1-4" className="Cell">
            <p className="Letter">{answer1[3]}</p>
          </div>
          <div id="1-5" className="Cell">
            <p className="Letter">{answer1[4]}</p>
          </div>
        </div>
        <div className="Row">
          <div id="2-1" className="Cell">
            <p className="Letter">{answer2[0]}</p>
          </div>
          <div id="2-2" className="Cell">
            <p className="Letter">{answer2[1]}</p>
          </div>
          <div id="2-3" className="Cell">
          <p className="Letter">{answer2[2]}</p>
          </div>
          <div id="2-4" className="Cell">
            <p className="Letter">{answer2[3]}</p>
          </div>
          <div id="2-5" className="Cell">
            <p className="Letter">{answer2[4]}</p>
          </div>
        </div> 
        <div className="Row">
          <div id="3-1" className="Cell">
            <p className="Letter">{answer3[0]}</p>
          </div>
          <div id="3-2" className="Cell">
            <p className="Letter">{answer3[1]}</p>
          </div>
          <div id="3-3"className="Cell">
          <p className="Letter">{answer3[2]}</p>
          </div>
          <div id="3-4" className="Cell">
            <p className="Letter">{answer3[3]}</p>
          </div>
          <div id="3-5" className="Cell">
            <p className="Letter">{answer3[4]}</p>
          </div>
        </div> 
        <div className="Row">
          <div id="4-1" className="Cell">
            <p className="Letter">{answer4[0]}</p>
          </div>
          <div id="4-2" className="Cell">
            <p className="Letter">{answer4[1]}</p>
          </div>
          <div id="4-3" className="Cell">
            <p className="Letter">{answer4[2]}</p>
          </div>
          <div id="4-4" className="Cell">
            <p className="Letter">{answer4[3]}</p>
          </div>
          <div id="4-5" className="Cell">
            <p className="Letter">{answer4[4]}</p>
          </div>
        </div> 
        <div className="Row">
          <div id="5-1" className="Cell">
            <p className="Letter">{answer5[0]}</p>
          </div>
          <div id="5-2" className="Cell">
            <p className="Letter">{answer5[1]}</p>
          </div>
          <div id="5-3" className="Cell">
          <p className="Letter">{answer5[2]}</p>
          </div>
          <div id="5-4" className="Cell">
            <p className="Letter">{answer5[3]}</p>
          </div>
          <div id="5-5" className="Cell">
            <p className="Letter">{answer5[4]}</p>
          </div>
        </div> 
        <div className="Row">
          <div id="6-1" className="Cell">
            <p className="Letter">{answer6[0]}</p>
          </div>
          <div id="6-2" className="Cell">
            <p className="Letter">{answer6[1]}</p>
          </div>
          <div id="6-3" className="Cell">
          <p className="Letter">{answer6[2]}</p>
          </div>
          <div id="6-4" className="Cell">
            <p className="Letter">{answer6[3]}</p>
          </div>
          <div id="6-5" className="Cell">
            <p className="Letter">{answer6[4]}</p>
          </div>
        </div>
      </div>
      {win === false && lose === false ? 
      <form onSubmit={handleSubmit}>
        <label>
          <input 
            type="text"
            name="guess" 
            onChange={handleChange}
            value={guess}
            maxLength={5}
            placeholder="GUESS"/>
        </label>
        <button>Submit Guess</button>
      </form>:
      <div>
        {win === true?
        <p>You won!!!</p>:
        <p>The answer was {answer}, better luck next time!</p>
        }
        <button onClick={() => window.location.reload(false)}>Restart</button>
      </div>
      }
      {notWord === true ? 
      <div className='ErrorMessage'>
        <p>Not a word (according to this API)</p>
        <p>Please try something else!</p>
      </div>:null}
    </div>
  );
}
export default App;
