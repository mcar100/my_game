import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GAME_STATE } from "../../constants";

interface CommonState {
  gameState: number;
  point: number;
  maxTime: number;
  timer: number;
  lastDate: string;
  savedData: SavedData;
}

interface SavedData {
  title: string;
  point: number;
  timer: number;
  date: string;
}

const commonSlice = createSlice({
  name: "commonSlice",
  initialState: {
    gameState: GAME_STATE.OVER,
    point: 0,
    maxTime: 20,
    timer: 0,
    lastDate: new Date().toISOString(),
    savedData: {
      point: 0,
      timer: 0,
    },
  } as CommonState,
  reducers: {
    startGame: (state) => {
      state.gameState = GAME_STATE.PROCEEDING;
      state.point = 0;
      state.timer = state.maxTime;
      state.lastDate = new Date().toISOString();
    },
    stopGame: (state, action: PayloadAction<string>) => {
      state.gameState = GAME_STATE.STOPPED;
      state.savedData.title = action.payload;
      state.savedData.point = state.point;
      state.savedData.timer = state.timer;
    },
    resumeGame: (state) => {
      state.gameState = GAME_STATE.PROCEEDING;
      state.point = state.savedData.point;
      state.timer = state.savedData.timer;
    },
    finishGame: (state) => {
      state.gameState = GAME_STATE.OVER;
    },
    saveGame: (state, action: PayloadAction<string>) => {
      state.savedData.title = action.payload;
      state.savedData.point = state.point;
      state.savedData.timer = state.timer;
      state.savedData.date = state.lastDate;
    },
    incrementPoint: (state, action: PayloadAction<number>) => {
      state.point = state.point + action.payload;
    },
    updateTimer: (state, action: PayloadAction<number>) => {
      state.maxTime = action.payload;
    },
    decrementTimer: (state) => {
      if (state.gameState === GAME_STATE.PROCEEDING) {
        state.timer = state.timer - 1;
      }
    },
  },
});

export const {
  startGame,
  stopGame,
  resumeGame,
  finishGame,
  incrementPoint,
  updateTimer,
  decrementTimer,
} = commonSlice.actions;
export default commonSlice;
