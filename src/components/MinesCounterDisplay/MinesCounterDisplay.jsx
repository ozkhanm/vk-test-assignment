import { useState } from "react";

import DisplayDigit from "../DisplayDigit/DisplayDigit";

import { getValueByNumericalDigit } from "../../helpers";
import { DIGIT_DIVIDER } from "../../constants";

import "../../styles/common/styles.css";

const MinesCounterDisplay = () => {
  const MAX_MINES_COUNT = 40;
  const [minesLeftCount, setMinesLeftCount] = useState(MAX_MINES_COUNT);

  return (
    <div className="display">
      <DisplayDigit value={getValueByNumericalDigit(minesLeftCount, DIGIT_DIVIDER.HUNDREDS)} />
      <DisplayDigit value={getValueByNumericalDigit(minesLeftCount, DIGIT_DIVIDER.TENS)} />
      <DisplayDigit value={getValueByNumericalDigit(minesLeftCount, DIGIT_DIVIDER.UNITS)} />
    </div>
  );
};

export default MinesCounterDisplay;
