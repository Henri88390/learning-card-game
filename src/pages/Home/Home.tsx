import React, { useEffect, useState } from "react";
import { Card, ThemeCard } from "../../components";
import { CardModel, Stack } from "../../models";
import "./Home.scss";

export function Home() {
  const [prevCardAnimate, setPrevCardAnimate] = useState(false);
  const [drawCardAnimate, setDrawCardAnimate] = useState(false);
  const [viewAnswer, setViewAnswer] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("");
  const [, setCount] = useState(0); // exists because without it, the view doesn't render when we update cards
  const [cards, setCards] = useState(new Stack<CardModel>());
  const [playedCards, setPlayedCards] = useState(new Stack<CardModel>());
  const [unplayedCards, setUnplayedCards] = useState(new Stack<CardModel>());
  const themes = [
    "Vehicules",
    "Directions",
    "Objects",
    "Food",
    "Numbers",
    "Adjectives",
    "Colors",
    "Hobbies",
    "Verbs",
    "Weather",
    "Professions",
    "Frequency",
    "Family",
    "Time",
    "Clothes",
    "Days of the week",
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
        setPlayedCards(new Stack<CardModel>());
      });
  };

  function generateNumbersCards(values: CardModel[]) {
    return values.map(
      (value, index) =>
        ({
          english: index.toString(),
          name: value.name,
        } as CardModel)
    );
  }

  function shuffleCards(data: CardModel[]) {
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
    setDrawCardAnimate(true);
    setCount((prevCount) => prevCount + 1);
    setViewAnswer(false);

    setTimeout(() => {
      const [unplayedCardsLeft, topCard] = unplayedCards.pop();
      setPlayedCards(playedCards.push(topCard));
      setUnplayedCards(unplayedCardsLeft);
      setDrawCardAnimate(false);
    }, 500);
  }

  function previousCard() {
    setPrevCardAnimate(true);
    setTimeout(() => {
      setViewAnswer(false);
      setCount((prevCount) => prevCount + 1);
      const [playedCardsLeft, topCard] = playedCards.pop();
      setPrevCardAnimate(false);
      setPlayedCards(playedCardsLeft);
      setUnplayedCards(unplayedCards.push(topCard));
    }, 250);
  }

  function viewAnswerToggle() {
    setTimeout(() => {
      setViewAnswer((prevViewAnswer) => !prevViewAnswer);
    });
  }

  return (
    <div className="home-container">
      <div className="home-sub-container">
        <div className="home-menu">
          {themes.map((theme) => (
            <div key={theme} onClick={() => handleThemeClick(theme)}>
              <ThemeCard key={theme} name={theme} />
            </div>
          ))}
        </div>
        {currentTheme.length > 0 ? (
          <div className="home-current-category">
            <div className="home-current-category-text">{currentTheme}</div>
            <div className="game-button" onClick={shuffleCards2}>
              <img
                className="game-button-img"
                src="icons/shuffle.png"
                alt="Shuffle"
              />
              Shuffle
            </div>
          </div>
        ) : (
          <div className="home-current-category-instruction">
            Select a theme!
          </div>
        )}
        {!cards.isEmpty() && (
          <div className="home-game-container">
            <div className="home-game-cards">
              {!unplayedCards.isEmpty() ? (
                <div>
                  {unplayedCards.items.length > 1 && (
                    <img
                      className="game-bottom-card"
                      src={process.env.PUBLIC_URL + "media/card-back.jpg"}
                      alt="deck"
                    />
                  )}
                  <img
                    className={
                      drawCardAnimate
                        ? "game-card-container--animate"
                        : "game-card-container"
                    }
                    src={process.env.PUBLIC_URL + "media/card-back.jpg"}
                    alt="deck"
                    onClick={drawCard}
                  />
                </div>
              ) : (
                <div className="empty-card" onClick={shuffleCards2}></div>
              )}
              <div className="played-cards">
                {!playedCards.isEmpty() && (
                  <Card
                    card={playedCards.peek()}
                    animate={prevCardAnimate}
                    handleClick={previousCard}
                  ></Card>
                )}
              </div>
            </div>
            {!playedCards.isEmpty() ? (
              viewAnswer ? (
                <div
                  className="view-answer-container"
                  onClick={viewAnswerToggle}
                >
                  <div className="view-answer-text">
                    {playedCards.peek().name}
                  </div>
                </div>
              ) : (
                <div
                  className="view-answer-container"
                  onClick={viewAnswerToggle}
                >
                  Reveal word
                </div>
              )
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
