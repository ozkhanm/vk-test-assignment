import { useState } from "react";

import DisplayDigit from "../DisplayDigit/DisplayDigit";

import { getValueByNumericalDigit } from "../../helpers";
import { DIGIT_DIVIDER } from "../../constants";

import "../../styles/common/styles.css";

const MinesCounterDisplay = () => {
  const MINES_COUNT = 40;
  const [mines, setMines] = useState(MINES_COUNT);

  return (
    <div className="display">
      <DisplayDigit value={getValueByNumericalDigit(mines, DIGIT_DIVIDER.HUNDREDS)} />
      <DisplayDigit value={getValueByNumericalDigit(mines, DIGIT_DIVIDER.TENS)} />
      <DisplayDigit value={getValueByNumericalDigit(mines, DIGIT_DIVIDER.UNITS)} />
    </div>
  );
};

export default MinesCounterDisplay;
