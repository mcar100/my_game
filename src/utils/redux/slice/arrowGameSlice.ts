import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FEVER_UNIT, MAX_FEVER } from "../../constants";
import {
  setBlocksCommand,
  initBlockList,
  addBlocks,
  breakNormalBlocks,
  breakFeverBlocks,
} from "../../game/arrowGame";

export interface BlockCommands {
  red: string;
  blue: string;
  green: string;
}

export interface Commands {
  command1: string;
  command2: string;
  command3: string;
  command4: string;
}

export interface ArrowGameState {
  gameTitle: string;
  commandList: Commands;
  colors: Array<string>;
  blocks: BlockCommands;
  blockList: Array<string>;
  point: number;
  combo: number;
  fever: number;
  pointUnit: number;
}

const arrowGameSlice = createSlice({
  name: "arrowGameSlice",
  initialState: {
    gameTitle: "Arrow Game",
    commandList: {
      command1: "ArrowLeft",
      command2: "ArrowUp",
      command3: "ArrowRight",
      command4: "Space" || "Spacebar",
    },
    colors: ["red", "blue", "green"],
    blocks: {
      red: "",
      blue: "",
      green: "",
    },
    blockList: [],
    point: 0,
    combo: 0,
    pointUnit: 10,
    fever: 0,
  } as ArrowGameState,
  reducers: {
    initArrowGame: (state) => {
      state.point = 0;
      state.combo = 0;
      state.fever = 0;
      state.blockList = [];
      state.blocks = {
        red: "",
        blue: "",
        green: "",
      };
    },
    setArrowGame: (state) => {
      setBlocksCommand(state.blocks, state.commandList);
      initBlockList(state.blockList, state.colors);
    },
    initCommands: (state) => {
      state.commandList.command1 = "ArrowLeft";
      state.commandList.command2 = "ArrowUp";
      state.commandList.command3 = "ArrowRight";
      state.commandList.command4 = "Space" || "Spacebar";
    },
    setCommands: (state, action: PayloadAction<Commands>) => {
      state.commandList = action.payload;
    },
    breakBlock: (state, action: PayloadAction<string>) => {
      const blockColor = state.blockList[2] as "red" | "blue" | "green";
      if (state.fever !== MAX_FEVER) {
        breakNormalBlocks(state, action.payload, blockColor);
      } else {
        breakFeverBlocks(state, action.payload);
      }
      addBlocks(state.blockList, state.colors);
    },
    addFever: (state) => {
      state.fever += FEVER_UNIT;
    },
    initFever: (state) => {
      state.fever = 0;
    },
  },
});

export const {
  initArrowGame,
  setArrowGame,
  initCommands,
  setCommands,
  breakBlock,
  addFever,
  initFever,
} = arrowGameSlice.actions;
export default arrowGameSlice;
