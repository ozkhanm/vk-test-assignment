import { createSlice } from "@reduxjs/toolkit";

import { SMILE_STATUS, MAX_MINES_COUNT } from "../../constants";

const initialState = {
  boardMap: [],
  smileStatus: SMILE_STATUS.DEFAULT,
  gameEndStatus: false,
  openArea: [],
  minesLeft: MAX_MINES_COUNT,
  gameResetStatus: false,
  openedCells: []
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoardMap(state, { payload }) {
      state.boardMap = payload;
    },
    changeSmileStatus(state, { payload }) {
      state.smileStatus = payload;
    },
    changeGameEndStatus(state, { payload }) {
      state.gameEndStatus = payload;
    },
    setOpenArea(state, { payload }) {
      state.openArea = payload;
    },
    decreaseMinesLeftCount(state) {
      state.minesLeft--;
    },
    increaseMinesLeftCount(state) {
      state.minesLeft++;
    },
    setMinesLeftCount(state, { payload }) {
      state.minesLeft = payload;
    },
    reset: () => initialState,
    changeGameResetStatus(state, { payload }) {
      state.gameResetStatus = payload;
    },
    addOpenedCells(state, { payload }) {
      if (Array.isArray(payload)) {
        state.openedCells = [...state.openedCells, ...payload];
      } else {
        state.openedCells.push(payload);
      }

      state.openedCells = Array.from(new Set(state.openedCells));
    }
  },
});

export default boardSlice.reducer;
