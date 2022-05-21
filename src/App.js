import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages= [
  {"src":"/images/itachi.jpg"},
  {"src":"/images/jiraiya.jpg"},
  {"src":"/images/kakashi.jpg"},
  {"src":"/images/minato.jpg"},
  {"src":"/images/naruto.jpg"},
  {"src":"/images/sasuke.jpg"},
]

function App() {

  const [cards, setCards] =useState([]);
  const[turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState();

  
  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(()=>Math.random()-0.5)
    .map((card)=> ({...card, id: Math.random(),matched:false}));
    
    setCards(shuffledCards);
    resetChoice();
    setTurns(0);
  }
  
  useEffect(() => {
    shuffleCards();
  }, [])
  
  //handle a choice
  const handleChoice = (card) =>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  } 

  //compare selected cards
  useEffect(() => {
    if(choiceTwo){
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src){
        setCards(prev => {
          return prev.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched:true};
            } else return card;
          })
        })
        // console.log("Match");
      } else {
        // console.log("No Match");
      }
      setTimeout(() => resetChoice(), 1000) ;
    }
  },[choiceOne,choiceTwo]);

  // reset choices & increase turn
  const resetChoice = () =>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prev => prev+1);
    setDisabled(false);
  }

  return (
    <>
    <div className="App">
      <h1>Shinobi Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            card={card} 
            key={card.id} 
            handleChoice ={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled = {disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>

    </>
  );
}

export default App;
