import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { boardSlice } from "../../store/reducers/BoardSlice";

import { SMILE_STATUS } from "../../constants";

import "./SmileButton.css";

const SmileButton = () => {
  const dispatch = useDispatch();
  const { smileStatus } = useSelector(state => state.boardReducer);
  const { reset, changeSmileStatus, changeGameResetStatus } = boardSlice.actions;
  let additionalButtonClass = "default";

  const buttonClickHandler = useCallback(() => {
    dispatch(reset());
    dispatch(changeGameResetStatus(true));
  }, [dispatch, reset, changeGameResetStatus]);

  const onMouseDownHandler = useCallback(() => {
    dispatch(changeSmileStatus(SMILE_STATUS.DEFAULT_ACTIVE));
  }, [dispatch, changeSmileStatus]);

  const onMouseUpHandler = useCallback(() => {
    dispatch(changeSmileStatus(SMILE_STATUS.DEFAULT));
  }, [dispatch, changeSmileStatus]);

  switch(smileStatus) {
    case SMILE_STATUS.DEFAULT:
      additionalButtonClass = "default";
      break;

    case SMILE_STATUS.DEFAULT_ACTIVE:
      additionalButtonClass = "default-active";
      break;

    case SMILE_STATUS.CELL_CLICKED:
      additionalButtonClass = "cell-clicked";
      break;

    case SMILE_STATUS.WIN:
      additionalButtonClass = "win";
      break;

    case SMILE_STATUS.LOSE:
      additionalButtonClass = "lose";
      break;

    default:
      additionalButtonClass = "default";
      break;
  }

  return (
    <button
      type="button"
      className={`smile-button ${additionalButtonClass}`}
      onClick={buttonClickHandler}
      onMouseDown={onMouseDownHandler}
      onMouseUp={onMouseUpHandler}
    />
  );
};

export default SmileButton;
