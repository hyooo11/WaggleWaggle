import React from "react";

type Props = {
  score: number;
  fillIcon: React.ElementType;
  outLineIcon: React.ElementType;
};

const ScoreDraw: React.FC<Props> = ({
  score,
  fillIcon: FillIcon,
  outLineIcon: OutlineIcon,
}: Props) => {
  const Draw = (score: number) => {
    let scores = Array.from({ length: 5 }, (_, index) =>
      index < Math.round(score) ? (
        <FillIcon key={index} />
      ) : (
        <OutlineIcon key={index} />
      )
    );
    return scores;
  };

  return <>{Draw(score)}</>;
};

export default ScoreDraw;
