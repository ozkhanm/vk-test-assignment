import "./DisplayDigit.css";

const DisplayDigit = ({ value }) => {
  const spritePosition = {
    backgroundPosition: `-${value === "0" ? 272 : (value - 1) * 30}px 0px`
  };

  return <div className="digit" style={spritePosition} />;
};

export default DisplayDigit;
