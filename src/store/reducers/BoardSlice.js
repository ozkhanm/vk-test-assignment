import { createSlice } from "@reduxjs/toolkit";

import { SMILE_STATUS } from "../../constants";

const initialState = {
  boardMap: [],
  smileStatus: SMILE_STATUS.DEFAULT,
  gameEndStatus: false,
  zeros: []
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
    setZeros(state, { payload }) {
      state.zeros = payload;
    }
  },
});

export default boardSlice.reducer;
