import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import DisplayDigit from "../DisplayDigit/DisplayDigit";

import { boardSlice } from "../../store/reducers/BoardSlice";

import { getValueByNumericalDigit } from "../../helpers";
import { DIGIT_DIVIDER, INIT_TIME, SMILE_STATUS } from "../../constants";

import "../../styles/common/styles.css";

const TimerDisplay = () => {
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(INIT_TIME);
  const {
    gameResetStatus,
    gameEndStatus,
    smileStatus
  } = useSelector(state => state.boardReducer);
  const { changeGameResetStatus, changeGameEndStatus, changeSmileStatus } = boardSlice.actions;
  const MILLISECONDS_IN_MINUTE = 60000;
  let timer = useRef();

  useEffect(() => {
    if (gameResetStatus) {
      dispatch(changeGameResetStatus(false));
    } else {
      timer.current = setInterval(() => {
        setTimeLeft(prev => --prev);
      }, MILLISECONDS_IN_MINUTE);
    }

    return () => {
      setTimeLeft(INIT_TIME);
      clearInterval(timer.current);
    };
  }, [gameResetStatus, changeGameResetStatus, dispatch]);

  useEffect(() => {
    if (!gameEndStatus && timeLeft === 0) {
      dispatch(changeGameEndStatus(true));
      dispatch(changeSmileStatus(SMILE_STATUS.LOSE));
      setTimeLeft(INIT_TIME);
    }

    if (timeLeft === 0 || gameEndStatus || smileStatus === SMILE_STATUS.WIN) {
      clearInterval(timer.current);
    }
  }, [gameEndStatus, smileStatus, timeLeft, dispatch, changeGameEndStatus, changeSmileStatus]);

  return (
    <div className="display">
      <DisplayDigit value={getValueByNumericalDigit(timeLeft, DIGIT_DIVIDER.HUNDREDS)} />
      <DisplayDigit value={getValueByNumericalDigit(timeLeft, DIGIT_DIVIDER.TENS)} />
      <DisplayDigit value={getValueByNumericalDigit(timeLeft, DIGIT_DIVIDER.UNITS)} />
    </div>
  );
};

export default TimerDisplay;
