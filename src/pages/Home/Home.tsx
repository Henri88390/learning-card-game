import React, { useState } from "react";
import { GameBoard, ThemeCard } from "../../components";
import { Card } from "../../models/card";
import "./Home.scss";

export function Home() {
  const [theme, setTheme] = useState("");
  const [cards, setCards] = useState([] as Card[]);
  const themes = ["Objects", "Food", "Numbers"];

  const getData = () => {
    fetch(
      "data/cards.json",

      {
        headers: {
          "Content-Type": "application/json",

          Accept: "application/json",
        },
      }
    )
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(theme);
        console.log(myJson[theme]);
        setCards(myJson[theme]);
        console.log(cards);
      });
  };

  function handleThemeClick(event: string) {
    console.log(event);
    setTheme(() => event);
    console.log(theme);
    getData();
  }

  return (
    <div className="home-container">
      <div className="home-header"></div>
      <div className="home-menu">
        {themes.map((theme) => (
          <div
            key={theme}
            className="home-theme"
            onClick={() => handleThemeClick(theme)}
          >
            <ThemeCard key={theme} name={theme} />
          </div>
        ))}
      </div>
      <div className="home-game-container">
        <GameBoard></GameBoard>
      </div>
    </div>
  );
}
