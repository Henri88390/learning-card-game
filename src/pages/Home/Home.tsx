import React, { useEffect, useState } from "react";
import { ThemeCard } from "../../components";
import { Card } from "../../models/card";
import Stack from "../../models/stack.ts";
import "./Home.scss";

export function Home() {
  const [viewAnswer, setViewAnswer] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("");
  const [, setCount] = useState(0); // exists because without it, the view doesn't render when we update cards
  const [cards, setCards] = useState(new Stack<Card>());
  const [playedCards, setPlayedCards] = useState(new Stack<Card>());
  const [unplayedCards, setUnplayedCards] = useState(new Stack<Card>());
  const themes = [
    "Objects",
    "Food",
    "Numbers",
    "Adjectives",
    "Colors",
    "Hobbies",
  ];

  useEffect(() => {}, [setCards, setPlayedCards, setUnplayedCards]);

  const getData = (exerciceThemeName: string) => {
    fetch("data/cards.json", {
      headers: {
        "Content-Type": "application/json",

        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((myJson) => {
        const data = JSON.parse(JSON.stringify(myJson));
        let exerciseCards = data[exerciceThemeName];
        if (exerciceThemeName === "Numbers") {
          exerciseCards = generateNumbersCards(data[exerciceThemeName]);
        }
        setCards(new Stack(exerciseCards));
        setUnplayedCards(shuffleCards(exerciseCards));
        setPlayedCards(new Stack<Card>());
      });
  };

  function generateNumbersCards(values: Card[]) {
    return values.map(
      (value, index) =>
        ({
          url: index.toString(),
          name: value.name,
        } as Card)
    );
  }

  function shuffleCards(data: Card[]) {
    const cardsList = [...data]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    return new Stack(cardsList);
  }

  function shuffleCards2() {
    const cardsList = [...cards.items]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setUnplayedCards(new Stack(cardsList));
    setPlayedCards(new Stack());
  }

  function handleThemeClick(event: string) {
    setCurrentTheme(event);
    getData(event);
  }

  function drawCard() {
    setCount((prevCount) => prevCount + 1);
    setViewAnswer(false);
    const [unplayedCardsLeft, topCard] = unplayedCards.pop();
    setUnplayedCards(unplayedCardsLeft);
    setPlayedCards(playedCards.push(topCard));
  }

  function undo() {
    setViewAnswer(false);
    setCount((prevCount) => prevCount + 1);
    const [playedCardsLeft, topCard] = playedCards.pop();
    setPlayedCards(playedCardsLeft);
    setUnplayedCards(unplayedCards.push(topCard));
  }

  return (
    <div className="home-container">
      <div className="home-menu">
        {themes.map((theme) => (
          <div key={theme} onClick={() => handleThemeClick(theme)}>
            <ThemeCard key={theme} name={theme} />
          </div>
        ))}
      </div>
      <div className="home-current-category">{currentTheme}</div>
      {!cards.isEmpty() && (
        <div className="home-game-container">
          <div className="home-game-header">
            <button className="game-button" onClick={shuffleCards2}>
              Shuffle
            </button>
            {!playedCards.isEmpty() && (
              <button className="game-button" onClick={undo}>
                Previous card
              </button>
            )}
          </div>

          <div className="home-game-cards">
            {!unplayedCards.isEmpty() ? (
              <img
                className="game-card-container"
                src={process.env.PUBLIC_URL + "media/card-back.jpg"}
                alt="deck"
                onClick={drawCard}
                loading="lazy"
              />
            ) : (
              <div className="empty-card" onClick={shuffleCards2}></div>
            )}
            <div className="played-cards">
              {!playedCards.isEmpty() && (
                <div className="game-card-container">
                  <img
                    className="game-card-container"
                    src={process.env.PUBLIC_URL + "/media/card-front.jpg"}
                    alt="Card front"
                    onClick={() =>
                      setViewAnswer((prevViewAnswer) => !prevViewAnswer)
                    }
                  />
                  {!playedCards.peek().url.includes(".") ? (
                    <div
                      className="game-card-number"
                      onClick={() =>
                        setViewAnswer((prevViewAnswer) => !prevViewAnswer)
                      }
                    >
                      {playedCards.peek().url}
                    </div>
                  ) : (
                    <img
                      className="game-card-img"
                      src={
                        process.env.PUBLIC_URL + "/" + playedCards.peek().url
                      }
                      alt={playedCards.peek().url}
                      onClick={() =>
                        setViewAnswer((prevViewAnswer) => !prevViewAnswer)
                      }
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          {viewAnswer && !playedCards.isEmpty() && (
            <div className="home-game-answer">{playedCards.peek().name}</div>
          )}
        </div>
      )}
    </div>
  );
}
