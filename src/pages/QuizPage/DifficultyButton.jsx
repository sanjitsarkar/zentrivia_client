import React from "react";

export const DifficultyButton = ({
  difficulty,
  activeDifficulty,
  setActiveDifficulty,
}) => {
  return (
    <button
      onClick={() => {
        setActiveDifficulty(difficulty);
      }}
      className={`p-05 quiz-difficulty-button pl-3 pr-3 pt-1 pb-1 text-lg font-bold text-light ${
        activeDifficulty === difficulty ? "bg-light text-dark" : "bg-primary"
      }
            `}
    >
      {difficulty}
    </button>
  );
};
