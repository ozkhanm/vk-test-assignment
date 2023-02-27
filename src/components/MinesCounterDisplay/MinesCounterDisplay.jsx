import DisplayDigit from "../DisplayDigit/DisplayDigit";

import "../../styles/common/styles.css";

const MinesCounterDisplay = () => {
  return (
    <div className="display">
      <DisplayDigit />
      <DisplayDigit />
      <DisplayDigit />
    </div>
  );
};

export default MinesCounterDisplay;
