import DisplayDigit from "../DisplayDigit/DisplayDigit";

import "../../styles/common/styles.css";

const TimerDisplay = () => {
  return (
    <div className="display">
      <DisplayDigit />
      <DisplayDigit />
      <DisplayDigit />
    </div>
  );
};

export default TimerDisplay;
