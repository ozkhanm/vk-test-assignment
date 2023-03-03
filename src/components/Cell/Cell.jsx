import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { boardSlice } from "../../store/reducers/BoardSlice";

import { generateMap, getAutoOpenArea } from "../../helpers";
import { CELLS, MAX_MINES_COUNT, ROWS, SMILE_STATUS, CELL_DISPLAY_STATUS } from "../../constants";

import "./Cell.css";

const Cell = ({ row, cell }) => {
  const dispatch = useDispatch();
  const btnRef = useRef();
  const [isBlown, setIsBlown] = useState(false);
  const [cellDisplayStatus, setCellDisplayStatus] = useState(CELL_DISPLAY_STATUS.DEFAULT);
  const { boardMap, gameEndStatus, openArea, gameResetStatus } = useSelector(state => state.boardReducer);
  const { setBoardMap, changeSmileStatus, changeGameEndStatus, 
    setOpenArea, decreaseMinesLeftCount, increaseMinesLeftCount, changeGameResetStatus } = boardSlice.actions;
  let hasMine = false;

  if (boardMap.length !== 0) {
    hasMine = boardMap[row][cell] === "#";
  }

  useEffect(() => {
    if (openArea.findIndex(([zeroRow, zeroCol]) => zeroRow === row && zeroCol === cell) !== -1) {
      const value = boardMap[row][cell];

      if (value !== 0) {
        btnRef.current.style.backgroundPosition = `-${(value - 1) * 31}px -120px`;
      } else {
        btnRef.current.classList.add("cell-active");
      }
      
      btnRef.current.disabled = "disabled";
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

  useEffect(() => {
    if (gameResetStatus) {
      btnRef.current.disabled = "";
      btnRef.current.className = "cell cell-default";
      btnRef.current.style = {};
    }
  }, [changeGameResetStatus, gameResetStatus, dispatch]);

  const cellClickHandler = useCallback(() => {
    const value = boardMap[row][cell];

    if (value === 0) {
      const autoOpenArea = getAutoOpenArea(boardMap, row, cell);

      dispatch(setOpenArea(autoOpenArea));
    }

    btnRef.current.style.backgroundPosition = `-${(value - 1) * 31}px -120px`;
    btnRef.current.disabled = "disabled";

    if (hasMine) {
      setIsBlown(true);

      dispatch(changeSmileStatus(SMILE_STATUS.LOSE));
      dispatch(changeGameEndStatus(true));

      btnRef.current.classList.add("cell-blown-mine");
    }
  }, [changeGameEndStatus, changeSmileStatus, cell, dispatch, boardMap, hasMine, row, setOpenArea]);

  const cellMouseDownHandler = useCallback((e) => {
    if (e.nativeEvent.which === 3) {
      return;
    }

    if (boardMap.length === 0) {
      const currentCoords = { currentRow: row, currentCell: cell };
      const boardMap = generateMap(ROWS, CELLS, MAX_MINES_COUNT, currentCoords);

      dispatch(setBoardMap(boardMap));

      const value = boardMap[row][cell];

      btnRef.current.style.backgroundPosition = `-${(value - 1) * 31}px -120px`;
    }

    dispatch(changeSmileStatus(SMILE_STATUS.CELL_CLICKED));
  }, [boardMap, cell, changeSmileStatus, dispatch, row, setBoardMap]);

  const cellMouseUpHandler = useCallback(() => {
    dispatch(changeSmileStatus(SMILE_STATUS.DEFAULT));
  }, [changeSmileStatus, dispatch]);

  const cellRightClickHandler = useCallback((e) => {
    e.preventDefault();

    if (e.target.disabled) {
      return;
    }

    switch (cellDisplayStatus) {
      case CELL_DISPLAY_STATUS.DEFAULT:
        setCellDisplayStatus(CELL_DISPLAY_STATUS.FLAG);
        dispatch(decreaseMinesLeftCount());
        break;

      case CELL_DISPLAY_STATUS.FLAG:
        setCellDisplayStatus(CELL_DISPLAY_STATUS.QUESTION_MARK);
        dispatch(increaseMinesLeftCount());
        break;

      case CELL_DISPLAY_STATUS.QUESTION_MARK:
        setCellDisplayStatus(CELL_DISPLAY_STATUS.DEFAULT);
        break;

      default:
        setCellDisplayStatus(CELL_DISPLAY_STATUS.DEFAULT);
    }
  }, [cellDisplayStatus, decreaseMinesLeftCount, dispatch, increaseMinesLeftCount]);

  const getButtonClassName = useCallback(() => {
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
  }, [cellDisplayStatus]);

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
