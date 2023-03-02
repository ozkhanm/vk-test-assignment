import { useSelector } from "react-redux";

import DisplayDigit from "../DisplayDigit/DisplayDigit";

import { getValueByNumericalDigit } from "../../helpers";
import { DIGIT_DIVIDER } from "../../constants";

import "../../styles/common/styles.css";

const MinesCounterDisplay = () => {
  const { minesLeft } = useSelector(state => state.boardReducer);

  return (
    <div className="display">
      <DisplayDigit value={getValueByNumericalDigit(minesLeft, DIGIT_DIVIDER.HUNDREDS)} />
      <DisplayDigit value={getValueByNumericalDigit(minesLeft, DIGIT_DIVIDER.TENS)} />
      <DisplayDigit value={getValueByNumericalDigit(minesLeft, DIGIT_DIVIDER.UNITS)} />
    </div>
  );
};

export default MinesCounterDisplay;
