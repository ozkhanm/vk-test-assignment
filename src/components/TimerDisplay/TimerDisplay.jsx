import { useEffect, useState } from "react";

import DisplayDigit from "../DisplayDigit/DisplayDigit";

import { getValueByNumericalDigit } from "../../helpers";
import { DIGIT_DIVIDER } from "../../constants";

import "../../styles/common/styles.css";

const TimerDisplay = () => {
  const INIT_TIME = 40;
  const MILLISECONDS_IN_MINUTE = 60000;
  const [time, setTime] = useState(INIT_TIME);

  useEffect(() => {
    setTimeout(() => {
      setTime(prev => --prev);
    }, MILLISECONDS_IN_MINUTE);
  }, [time]);

  return (
    <div className="display">
      <DisplayDigit value={getValueByNumericalDigit(time, DIGIT_DIVIDER.HUNDREDS)} />
      <DisplayDigit value={getValueByNumericalDigit(time, DIGIT_DIVIDER.TENS)} />
      <DisplayDigit value={getValueByNumericalDigit(time, DIGIT_DIVIDER.UNITS)} />
    </div>
  );
};

export default TimerDisplay;
