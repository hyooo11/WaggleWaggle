type ButtonProps = {
  text: string;
  type?: string;
  onClick?: () => void;
};
const Button = ({ text, type, onClick }: ButtonProps) => {
  const btnType =
    type && ["positive", "negative"].includes(type) ? type : "default";
  return (
    <button
      className={["Button", `Button_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
