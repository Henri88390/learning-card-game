import React from "react";
import "./ThemeCard.scss";

interface ThemeCardProps {
  name: string;
}

export function ThemeCard(props: ThemeCardProps) {
  return (
    <div className="theme-card-container">
      <img
        className="game-button-img"
        src={"icons/" + props.name + ".png"}
        alt={props.name}
      />
    </div>
  );
}
