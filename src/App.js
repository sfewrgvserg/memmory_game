import React, { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";
const cardImage = [
  { src: "./img/helmet-1.png", matched: false },
  { src: "./img/potion-1.png", matched: false },
  { src: "./img/ring-1.png", matched: false },
  { src: "./img/scroll-1.png", matched: false },
  { src: "./img/shield-1.png", matched: false },
  { src: "./img/sword-1.png", matched: false },
];

export default function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImage, ...cardImage]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
  };

  const handlechoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 600);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setTurns(turns + 1);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-4xl text-white mt-5">Memmory Game</h1>
      <button
        className="hover:bg-[#c23866] text-white border-2 font-bold my-7 duration-300 bg-primay_800 p-3 rounded-lg "
        type="button"
        onClick={shuffleCards}
      >
        New Game
      </button>
      <div className="grid grid-cols-4 max-w-fit gap-6">
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handlechoice={handlechoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>{turns}</p>
    </div>
  );
}
