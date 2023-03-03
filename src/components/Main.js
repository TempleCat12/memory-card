import React, { useState, useEffect } from "react";
import { cardsFactory } from "./Factory";
import defaultBackgroundImage from "../images/defaultImage.png";
import "../style/main.css";
import pageAudio from '../mp3/turn_page.mp3'
import correctAudio from '../mp3/correct.mp3'
import successAudio from '../mp3/success.mp3'
import clickAudio from '../mp3/click.mp3'
import successGif from '../images/success.gif'

export default function Main(props) {
  const clickSound = new Audio(clickAudio)
  const turnPageSound = new Audio(pageAudio);
  const correct = new Audio(correctAudio);
  const passSound = new Audio(successAudio)
  const [level, setLevel] = useState(0);
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [pass, setPass] = useState(false)
  //   const [doubleClicked, setDoubleClicked] = useState(0);
  useEffect(() => {
    setCards(cardsFactory(level));
    
  }, [level]);
  useEffect(() => {
    // pass game
    if( score > 0 && score === level) {
      setPass(true)
      setLevel(0)
      setScore(0)
      passSound.play()
      passSound.currentTime = 0
    }
  },[score, level]);
  // 1.level page
  const gameLevel = {
    Simple: 8,
    Hard: 18,
  };
  const chooseLevel = (value, e) => {
    clickSound.play()
    clickSound.currentTime = 0
    setLevel(value);
  };
  const levelPage = (
    <div className="level-page">
      <h3>Choose Game Level</h3>
      {Object.entries(gameLevel).map(([key, value]) => {
        return (
          <button onClick={(e) => chooseLevel(value, e)} key={key}>
            {key + " : " + value * 2 + " cards"}
          </button>
        );
      })}
    </div>
  );
  // 2.play page
  let clickedCards = [];
  let clickedNodes = [];
  
  const onClickCard = (card, e) => {
    const node = e.target;
      // turn over the card
    node.style.background = generateImagStyle(card.src);
    node.classList.add("clicked");
    clickedCards.push(card);
    clickedNodes.push(node);
    console.log(clickedCards);
    // wait next click and justify
    if (clickedCards.length === 2) {
      console.log('justify');
        if (clickedCards[0].id === card.id) {
        setScore(score + 1);
        correct.play()
        correct.currentTime = 0
      } else {
        clickedNodes[0].style.background = generateImagStyle(
          defaultBackgroundImage
        );
        clickedNodes[1].style.background = generateImagStyle(
          defaultBackgroundImage
        );
        clickedNodes[0].classList.remove("clicked");
        clickedNodes[1].classList.remove("clicked");
        clickedCards = [];
        clickedNodes = [];

        turnPageSound.play()
        turnPageSound.currentTime = 0;
      }
    }else {
      turnPageSound.play()
      turnPageSound.currentTime = 0;
    }
  };
  const generateImagStyle = (src) => {
    return `center/110% url(${src})`;
  };
  const cardListClass = "card_list"
  const playPage = (
    <div className='play_page' >
      <div className="record">
        <div className="score">score : {score}</div>
      </div>
      <div className={cardListClass + ' ' + (level===8?'simple':'hard')}>
        {cards.map((card) => {
          return (
            <div
              key={card.index}
              style={{ background: generateImagStyle(defaultBackgroundImage) }}
              className="card"
              onClick={(e) => onClickCard(card, e)}
            ></div>
          );
        })}
      </div>
    </div>
  );
  //  3.pass page
  const onClickedAgainBtn = () => {
    setPass(false)
    clickSound.play()
    clickSound.currentTime = 0
  }
  const passPage = (
    <div className="pass-page">
      <div>
        <h1>Congratulation</h1>
        <img src={successGif}  alt="success.gif"></img>
        <button onClick={onClickedAgainBtn}>Try again</button>
      </div>
    </div>
  )  
  return (
    <div className="main">
      {/* if level is the default value show level page */}
      {level === 0 && levelPage}
      {cards.length > 0 && playPage}
      {pass && passPage}
    </div>
  );
}
// 1. display level page (4 level 4*4=16 cards; 5 level 5*5=25 cards and so on)
    // 2. get user choose
    // 3. close level page

    // 4. display play page against the level like 16 cards or 25 cards
    // 5. listen user click event
    // 6. if user click the card ,
    //      set clicked card click event disable
    //      set style.backgroundImage = card.backgroundImage
    //      clickedArr.push(card)
    //      if(clickedArr.length === 2) call justify()
    // 7. justify double click
    //      if user double click are the same cards (same backgroundImage)
    //          set score++
    //      else
    //          style.backgroundImage = defaultImage
    //          reset clickedArr = []
    //
    //  8. if score === level display pass page
    //  9. user click the back button
    //  10. close pass page
    //  11. display level page
