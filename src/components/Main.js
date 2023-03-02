import React, { useState, useEffect } from "react";
import { cardsFactory } from "./Factory";
import defaultBackgroundImage from "../images/defaultImage.png";
import "../style/main.css";
import pageAudio from '../mp3/turn_page.mp3'
import correctAudio from '../mp3/correct.mp3'
import successAudio from '../mp3/success.mp3'

export default function Main(props) {
  const [level, setLevel] = useState(0);
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
//   const [pass, setPass] = useState(false)
  //   const [doubleClicked, setDoubleClicked] = useState(0);
  useEffect(() => {
    setCards(cardsFactory(level));
  }, [level]);

  // 1.level page
  const gameLevel = {
    Simple: 8,
    Hard: 18,
  };
  const chooseLevel = (value, e) => {
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
  const clickSound = new Audio(pageAudio);
  const correct = new Audio(correctAudio);
  const onClickCard = (card, e) => {
    const node = e.target;
      // turn over the card
    node.style.background = generateImagStyle(card.src);
    node.classList.add("clicked");
    clickedCards.push(card);
    clickedNodes.push(node);
    // wait next click and justify
    if (clickedCards.length === 2) {
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

        clickSound.play()
        clickSound.currentTime = 0;
      }
    }else {
        clickSound.play()
        clickSound.currentTime = 0;
    }
  };
  const generateImagStyle = (src) => {
    return `center/110% url(${src})`;
  };
  const cardListClass = "card_list"
  const playPage = (
    <div className='play_page' >
      <div className="score">score : {score}</div>
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
  const passPage = (
    <div className="pass_page">
        <h1>Congratulation</h1>
    </div>
  )  
  return (
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

    <div className="main">
      {/* if level is the default value show level page */}
      {level === 0 && levelPage}
      {cards.length > 0 && playPage}
    </div>
  );
}
