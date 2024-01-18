import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Blocks {
  red: string | null;
  blue: string | null;
  green: string | null;
}

export interface Commands {
  command1: string;
  command2: string;
  command3: string;
  command4: string;
}

interface ArrowGameState {
  gameTitle: string;
  commandList: Commands;
  point: number;
  fever: number;
  blocks: Blocks;
  savedBlocks: Array<Blocks>;
}

const arrowGameSlice = createSlice({
  name: "arrowGameSlice",
  initialState: {
    gameTitle: "화살표 게임",
    commandList: {
      command1: "ArrowLeft",
      command2: "ArrowUp",
      command3: "ArrowDown",
      command4: " " || "Space",
    },
    point: 10,
    fever: 0,
    blocks: {
      red: null,
      blue: null,
      green: null,
    },
    savedBlocks: [],
  } as ArrowGameState,
  reducers: {
    initArrowGame: (state) => {
      state.fever = 0;
      state.blocks.red = state.commandList.command1;
      state.blocks.blue = state.commandList.command2;
      state.blocks.green = state.commandList.command3;
    },
    initCommand: (state) => {
      state.commandList.command1 = "ArrowLeft";
      state.commandList.command2 = "ArrowUp";
      state.commandList.command3 = "ArrowRight";
      state.commandList.command4 = " " || "Space";
    },
    changeCommand: (state, action: PayloadAction<Commands>) => {
      state.commandList = action.payload;
    },
    saveBlocks: (state, action: PayloadAction<Array<Blocks>>) => {
      state.savedBlocks = [...action.payload];
    },
  },
});

export const { initArrowGame, initCommand, changeCommand, saveBlocks } =
  arrowGameSlice.actions;
export default arrowGameSlice;
