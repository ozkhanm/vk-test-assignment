import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { boardSlice } from "../../store/reducers/BoardSlice";

import { generateMap, getAutoOpenArea } from "../../helpers";
import { CELLS, MAX_MINES_COUNT, ROWS, SMILE_STATUS, CELL_DISPLAY_STATUS, ADDITIONAL_CELL_CLASSES } from "../../constants";

import "./Cell.css";

const Cell = ({ row, cell }) => {
  const dispatch = useDispatch();
  const btnRef = useRef();
  const [isBlown, setIsBlown] = useState(false);
  const [cellDisplayStatus, setCellDisplayStatus] = useState(CELL_DISPLAY_STATUS.DEFAULT);
  const {
    boardMap,
    gameEndStatus,
    openArea,
    gameResetStatus,
    smileStatus,
    minesLeft
  } = useSelector(state => state.boardReducer);
  const {
    setBoardMap,
    changeSmileStatus,
    changeGameEndStatus,
    setMinesLeftCount,
    setOpenArea,
    decreaseMinesLeftCount,
    increaseMinesLeftCount,
    changeGameResetStatus,
    addOpenedCells
  } = boardSlice.actions;
  let hasMine = false;

  if (boardMap.length !== 0) {
    hasMine = boardMap[row][cell] === "#";
  }

  useEffect(() => {
    if (openArea.findIndex(([zeroRow, zeroCol]) => zeroRow === row && zeroCol === cell) !== -1) {
      const value = boardMap[row][cell];

      if (value !== 0) {
        btnRef.current.classList.add(`cell-active-${value}`);
      } else {
        btnRef.current.classList.add("cell-active");
      }
      
      btnRef.current.disabled = "disabled";
    }
  }, [boardMap, cell, openArea, row]);

  useEffect(() => {
    if (gameEndStatus || smileStatus === SMILE_STATUS.WIN) {
      btnRef.current.disabled = "disabled";

      if (hasMine && !isBlown) {
        btnRef.current.classList.add("cell-mine");
      }

      if (cellDisplayStatus === CELL_DISPLAY_STATUS.FLAG && hasMine) {
        btnRef.current.classList.add("cell-mine-defused");
      }

      if (isBlown) {
        btnRef.current.classList.remove("cell-mine-defused");
      }
    }

    if (smileStatus === SMILE_STATUS.WIN) {
      dispatch(setMinesLeftCount(0));
    }
  }, [gameEndStatus, hasMine, isBlown, cellDisplayStatus, smileStatus, setMinesLeftCount, dispatch, minesLeft]);

  useEffect(() => {
    if (gameResetStatus) {
      btnRef.current.disabled = "";
      btnRef.current.className = "cell cell-default";
      btnRef.current.style = {};

      setCellDisplayStatus(CELL_DISPLAY_STATUS.DEFAULT);
    }
  }, [changeGameResetStatus, gameResetStatus, dispatch, hasMine]);

  const cellClickHandler = useCallback(() => {
    Object.values(ADDITIONAL_CELL_CLASSES).forEach(it => btnRef.current.classList.remove(it));

    const value = boardMap[row][cell];

    if (value === 0) {
      const autoOpenArea = getAutoOpenArea(boardMap, row, cell);
      const mappedOpenAreaData = autoOpenArea.map(([row, cell]) => `${row},${cell}`);

      dispatch(setOpenArea(autoOpenArea));
      dispatch(addOpenedCells(mappedOpenAreaData));

      return;
    }

    if (value !== "#") {
      btnRef.current.classList.add(`cell-active-${value}`);
      btnRef.current.disabled = "disabled";
    }

    if (!hasMine && value !== 0) {
      dispatch(addOpenedCells(`${row},${cell}`));
    }

    if (hasMine) {
      setIsBlown(true);

      dispatch(changeSmileStatus(SMILE_STATUS.LOSE));
      dispatch(changeGameEndStatus(true));

      btnRef.current.classList.add("cell-blown-mine");
    }
  }, [changeGameEndStatus, changeSmileStatus, cell, dispatch, boardMap, hasMine, row, setOpenArea, addOpenedCells]);

  const cellMouseDownHandler = useCallback((e) => {
    const RIGHT_MOUSE_CLICK_CODE = 3;

    if (e.nativeEvent.which === RIGHT_MOUSE_CLICK_CODE || e.ctrlKey) {
      return;
    }

    btnRef.current.classList.add("cell-active");

    if (boardMap.length === 0) {
      const currentCoords = { currentRow: row, currentCell: cell };
      const boardMap = generateMap(ROWS, CELLS, MAX_MINES_COUNT, currentCoords);

      dispatch(setBoardMap(boardMap));
    }

    dispatch(changeSmileStatus(SMILE_STATUS.CELL_CLICKED));
  }, [boardMap, cell, changeSmileStatus, dispatch, row, setBoardMap]);

  const cellMouseUpHandler = useCallback(() => {
    btnRef.current.classList.remove("cell-active");
    dispatch(changeSmileStatus(SMILE_STATUS.DEFAULT));
  }, [changeSmileStatus, dispatch]);

  const cellRightClickHandler = useCallback((e) => {
    e.preventDefault();

    if (e.target.disabled) {
      return;
    }

    switch (cellDisplayStatus) {
      case CELL_DISPLAY_STATUS.DEFAULT:
        if (minesLeft !== 0) {
          setCellDisplayStatus(CELL_DISPLAY_STATUS.FLAG);
          dispatch(decreaseMinesLeftCount());
        } else {
          setCellDisplayStatus(CELL_DISPLAY_STATUS.QUESTION_MARK);
        }
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
  }, [cellDisplayStatus, decreaseMinesLeftCount, dispatch, increaseMinesLeftCount, minesLeft]);

  const getButtonClassName = useCallback(() => {
    let additionalClass;

    switch (cellDisplayStatus) {
      case CELL_DISPLAY_STATUS.DEFAULT:
        additionalClass = ADDITIONAL_CELL_CLASSES.DEFAULT;
        break;

      case CELL_DISPLAY_STATUS.FLAG:
        additionalClass = ADDITIONAL_CELL_CLASSES.FLAG;
        break;

      case CELL_DISPLAY_STATUS.QUESTION_MARK:
        additionalClass = ADDITIONAL_CELL_CLASSES.QUESTION_MARK;
        break;

      default:
        additionalClass = ADDITIONAL_CELL_CLASSES.DEFAULT;
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
