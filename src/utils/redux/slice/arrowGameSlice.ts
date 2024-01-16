import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Blocks {
  red: number;
  blue: number;
  green: number;
}

export interface Commands {
  command1: number;
  command2: number;
  command3: number;
  command4: number;
}

interface ArrowGameState {
  gameTitle: string;
  command1: number;
  command2: number;
  command3: number;
  command4: number;
  point: number;
  fever: number;
  blocks: Blocks;
  savedBlocks: Array<Blocks>;
}

const arrowGameSlice = createSlice({
  name: "arrowGameSlice",
  initialState: {
    gameTitle: "화살표 게임",
    command1: 37,
    command2: 38,
    command3: 39,
    command4: 32,
    point: 10,
    fever: 0,
    blocks: {
      red: 0,
      blue: 0,
      green: 0,
    },
    savedBlocks: [],
  } as ArrowGameState,
  reducers: {
    initArrowGame: (state) => {
      state.fever = 0;
      state.blocks.red = state.command1;
      state.blocks.blue = state.command2;
      state.blocks.green = state.command3;
    },
    initCommand: (state) => {
      state.command1 = 37;
      state.command2 = 38;
      state.command3 = 39;
      state.command4 = 32;
    },
    changeCommand: (state, action: PayloadAction<Commands>) => {
      state.command1 = action.payload.command1;
      state.command2 = action.payload.command2;
      state.command3 = action.payload.command3;
      state.command4 = action.payload.command4;
    },
    saveBlocks: (state, action: PayloadAction<Array<Blocks>>) => {
      state.savedBlocks = [...action.payload];
    },
  },
});

export const { initArrowGame, initCommand, changeCommand, saveBlocks } =
  arrowGameSlice.actions;
export default arrowGameSlice;
