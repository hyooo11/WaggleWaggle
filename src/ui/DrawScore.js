import { BsHexagon, BsHexagonFill } from "react-icons/bs";

export const DrawScore = (score) => {
  let sweet = Array.from({ length: 5 }, (_, index) =>
    index < Math.round(score) ? (
      <BsHexagonFill key={index} />
    ) : (
      <BsHexagon key={index} />
    )
  );
  return sweet;
};
