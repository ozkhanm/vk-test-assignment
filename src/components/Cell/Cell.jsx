import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { boardSlice } from "../../store/reducers/BoardSlice";

import { generateMap, getSweeperZeros } from "../../helpers";
import { CELLS, MAX_MINES_COUNT, ROWS, SMILE_STATUS, CELL_DISPLAY_STATUS } from "../../constants";

import "./Cell.css";

const Cell = ({ row, cell }) => {
  const dispatch = useDispatch();
  const btnRef = useRef();
  const [isBlown, setIsBlown] = useState(false);
  const [cellDisplayStatus, setCellDisplayStatus] = useState(CELL_DISPLAY_STATUS.DEFAULT);
  const { boardMap, gameEndStatus, zeros } = useSelector(state => state.boardReducer);
  const { setBoardMap, changeSmileStatus, changeGameEndStatus, setZeros } = boardSlice.actions;
  let hasMine = false;

  if (boardMap.length !== 0) {
    hasMine = boardMap[row][cell] === "#";
  }

  useEffect(() => {
    if (zeros.findIndex(([zeroRow, zeroCol]) => zeroRow === row && zeroCol === cell) !== -1) {
      btnRef.current.classList.add("cell-active");
    }
  });

  useEffect(() => {
    if (gameEndStatus) {
      btnRef.current.disabled = "disabled";

      if (hasMine && !isBlown) {
        btnRef.current.classList.add("cell-mine");
      }

      if (cellDisplayStatus === CELL_DISPLAY_STATUS.FLAG) {
        btnRef.current.classList.add("cell-mine-defused");
      }
    }
  }, [gameEndStatus, hasMine, isBlown, cellDisplayStatus]);

  const cellClickHandler = () => {
    const value = boardMap[row][cell];

    if (value === 0) {
      const zeros = getSweeperZeros(boardMap, row, cell);

      dispatch(setZeros(zeros));
    }

    btnRef.current.style.backgroundPosition = `-${(value - 1) * 31}px -120px`;
    btnRef.current.disabled = "disabled";

    if (hasMine) {
      setIsBlown(true);

      dispatch(changeSmileStatus(SMILE_STATUS.LOSE));
      dispatch(changeGameEndStatus(true));

      btnRef.current.classList.add("cell-blown-mine");
    }
  };

  const cellMouseDownHandler = (e) => {
    if (boardMap.length === 0) {
      const currentCoords = { currentRow: row, currentCell: cell };
      const boardMap = generateMap(ROWS, CELLS, MAX_MINES_COUNT, currentCoords);

      dispatch(setBoardMap(boardMap));

      const value = boardMap[row][cell];

      btnRef.current.style.backgroundPosition = `-${(value - 1) * 31}px -120px`;
    }

    if (e.nativeEvent.which === 3) {
      e.stopPropagation();
    }

    dispatch(changeSmileStatus(SMILE_STATUS.CELL_CLICKED));

    btnRef.current.classList.add("cell-active");
  };

  const cellMouseUpHandler = () => {
    dispatch(changeSmileStatus(SMILE_STATUS.DEFAULT));

    btnRef.current.classList.remove("cell-active");
  };

  const cellRightClickHandler = (e) => {
    e.preventDefault();

    if (e.target.disabled) {
      return;
    }

    switch (cellDisplayStatus) {
      case CELL_DISPLAY_STATUS.DEFAULT:
        setCellDisplayStatus(CELL_DISPLAY_STATUS.FLAG);
        break;

      case CELL_DISPLAY_STATUS.FLAG:
        setCellDisplayStatus(CELL_DISPLAY_STATUS.QUESTION_MARK);
        break;

      case CELL_DISPLAY_STATUS.QUESTION_MARK:
        setCellDisplayStatus(CELL_DISPLAY_STATUS.DEFAULT);
        break;

      default:
        setCellDisplayStatus(CELL_DISPLAY_STATUS.DEFAULT);
    }
  };

  const getButtonClassName = () => {
    let additionalClass;

    switch (cellDisplayStatus) {
      case CELL_DISPLAY_STATUS.DEFAULT:
        additionalClass = "cell-default";
        break;

      case CELL_DISPLAY_STATUS.FLAG:
        additionalClass = "cell-flag";
        break;

      case CELL_DISPLAY_STATUS.QUESTION_MARK:
        additionalClass = "cell-question-mark";
        break;

      default:
        additionalClass = "cell-default";
        break;
    }

    return `cell ${additionalClass}`;
  };

  return (
    <button 
      className={getButtonClassName()}
      type="button"
      onClick={cellClickHandler}
      ref={btnRef}
      onMouseDown={cellMouseDownHandler}
      onMouseUp={cellMouseUpHandler}
      onContextMenu={cellRightClickHandler}
    />
  );
};

export default Cell;
