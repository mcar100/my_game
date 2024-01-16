import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GAME_STATE } from "../../constants";

interface CommonState {
  gameState: number;
  point: number;
  maxTime: number;
  timer: number;
  lastDate: Date;
  savedData: SavedData;
}

interface SavedData {
  point: number;
  timer: number;
}

const commonSlice = createSlice({
  name: "commonSlice",
  initialState: {
    gameState: GAME_STATE.OVER,
    point: 0,
    maxTime: 60,
    timer: 0,
    lastDate: new Date(),
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
      state.lastDate = new Date();
    },
    stopGame: (state, action: PayloadAction<SavedData>) => {
      state.gameState = GAME_STATE.STOPPED;
      state.savedData.point = action.payload.point;
      state.savedData.timer = action.payload.timer;
    },
    resumeGame: (state) => {
      state.gameState = GAME_STATE.PROCEEDING;
      state.point = state.savedData.point;
      state.timer = state.savedData.timer;
    },
    finishGame: (state, action: PayloadAction<number>) => {
      state.gameState = GAME_STATE.OVER;
      state.point = action.payload;
    },
    updateTimer: (state, action: PayloadAction<number>) => {
      state.maxTime = action.payload;
    },
  },
});

export const { startGame, stopGame, finishGame, updateTimer } =
  commonSlice.actions;
export default commonSlice;
