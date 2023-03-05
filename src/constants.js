export const DIGIT_DIVIDER = {
  HUNDREDS: 100,
  TENS: 10,
  UNITS: 1,
};

export const SMILE_STATUS = {
  DEFAULT: "DEFAULT",
  DEFAULT_ACTIVE: "DEFAULT_ACTIVE",
  CELL_CLICKED: "CELL_CLICKED",
  WIN: "WIN",
  LOSE: "LOSE"
};

export const CELL_DISPLAY_STATUS = {
  DEFAULT: "DEFAULT",
  FLAG: "FLAG",
  QUESTION_MARK: "QUESTION_MARK"
};

export const ADDITIONAL_CELL_CLASSES = {
  DEFAULT: "cell-default",
  FLAG: "cell-flag",
  QUESTION_MARK: "cell-question-mark"
}

export const ROWS = 16;
export const CELLS = 16;
export const MAX_MINES_COUNT = 40;
export const CELLS_TO_OPEN = ROWS * CELLS - MAX_MINES_COUNT;
export const INIT_TIME = 40;
