import { useSelector } from "react-redux";

import { SMILE_STATUS } from "../../constants";

import "./SmileButton.css";

const SmileButton = () => {
  const { smileStatus } = useSelector(state => state.boardReducer);
  let additionalButtonClass = "default";

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
    />
  );
};

export default SmileButton;
