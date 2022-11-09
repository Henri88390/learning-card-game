import React, { FC } from "react";
import { Card } from "..";
import "./GameBoard.scss";

interface GameBoardProps {
  cards: Card[];
}

export function GameBoard(props: FC<GameBoardProps>) {
  return <div className="game-board-container"></div>;
}
