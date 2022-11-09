import React from "react";
import "./ThemeCard.scss";

interface ThemeCardProps {
  name: string;
}

export function ThemeCard(props: ThemeCardProps) {
  return <div className="theme-card-container">{props.name}</div>;
}
