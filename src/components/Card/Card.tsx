import React from "react";
import { CardModel } from "../../models";
import "./Card.scss";

export interface CardProps {
  card: CardModel;
  animate: boolean;
  handleClick: Function;
}
export function Card(props: CardProps) {
  function handleClick() {
    props.handleClick();
  }
  return (
    <div>
      <img
        className="game-played-card-back"
        src={process.env.PUBLIC_URL + "/media/card-front.jpg"}
        alt="Card front"
      />
      <div
        className={
          props.animate
            ? "game-played-card-container--animate"
            : "game-played-card-container"
        }
      >
        <img
          className={
            props.animate
              ? "game-played-card-img--animate"
              : "game-played-card-img"
          }
          src={process.env.PUBLIC_URL + "/media/card-front.jpg"}
          alt="Card front"
          onClick={handleClick}
        />
        {props.card.english ? (
          <div className={"game-card-english-container"} onClick={handleClick}>
            <div className="game-card-english-text">{props.card.english}</div>
          </div>
        ) : (
          <img
            className={
              props.animate ? "game-card-img--animate" : "game-card-img"
            }
            src={process.env.PUBLIC_URL + "/" + props.card.url}
            alt={props.card.url}
            onClick={handleClick}
          />
        )}
      </div>
    </div>
  );
}
