import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GAME_STATE, MAX_TIMER } from "../../constants";

interface CommonState {
  gameState: number;
  maxTime: number;
  timer: number;
  timerList: Array<number>;
  lastDate: string;
  savedData: SavedData;
}

export interface SavedData {
  title: string;
  point: number;
  timer: number;
  date: string;
}

const commonSlice = createSlice({
  name: "commonSlice",
  initialState: {
    gameState: GAME_STATE.WAITING,
    maxTime: MAX_TIMER,
    timer: 0,
    timerList: [30, 60, 90, 120, 150, 180],
    lastDate: new Date().toISOString(),
    savedData: {
      point: 0,
      timer: 0,
    },
  } as CommonState,
  reducers: {
    startGame: (state) => {
      state.gameState = GAME_STATE.PROCEEDING;
      state.timer = state.maxTime;
      state.lastDate = new Date().toISOString();
    },
    stopGame: (state, action: PayloadAction<SavedData>) => {
      state.gameState = GAME_STATE.STOPPED;
      state.savedData.title = action.payload.title;
      state.savedData.point = action.payload.point;
      state.savedData.timer = state.timer;
    },
    resumeGame: (state) => {
      state.gameState = GAME_STATE.PROCEEDING;
      state.timer = state.savedData.timer;
    },
    finishGame: (state) => {
      state.gameState = GAME_STATE.OVER;
    },
    goHome: (state) => {
      state.gameState = GAME_STATE.WAITING;
      state.timer = 0;
    },
    setGame: (state) => {
      state.gameState = GAME_STATE.SETTING;
    },
    saveGameData: (state, action: PayloadAction<SavedData>) => {
      state.savedData.title = action.payload.title;
      state.savedData.point = action.payload.point;
      state.savedData.timer = state.timer;
      state.savedData.date = state.lastDate;
    },
    updateTimer: (state, action: PayloadAction<number>) => {
      state.maxTime = action.payload;
    },
    initTimer: (state) => {
      state.maxTime = MAX_TIMER;
    },
    decrementTimer: (state) => {
      if (state.gameState === GAME_STATE.PROCEEDING) {
        state.timer = state.timer - 1;
      }
      if (state.timer === 0) {
        state.gameState = GAME_STATE.OVER;
      }
    },
  },
});

export const {
  startGame,
  stopGame,
  resumeGame,
  finishGame,
  goHome,
  setGame,
  updateTimer,
  initTimer,
  decrementTimer,
} = commonSlice.actions;
export default commonSlice;
