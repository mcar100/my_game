import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Commands,
  INIT_COMMANDS,
  MAX_FEVER,
  FEVER_UNIT,
} from "../../constants";
import {
  setBlocksCommand,
  initBlockList,
  addBlocks,
  breakNormalBlocks,
  breakFeverBlocks,
  updateMaxCombo,
} from "../../game/arrowGame";

export interface BlockCommands {
  red: string;
  blue: string;
  green: string;
}

export interface BlockCounts {
  red: number;
  blue: number;
  green: number;
}

export interface ArrowGameState {
  gameTitle: string;
  commandList: Commands;
  colors: Array<string>;
  blocks: BlockCommands;
  blockList: Array<string>;
  blockCounts: BlockCounts;
  point: number;
  combo: number;
  maxCombo: number;
  fever: number;
  pointUnit: number;
}

const arrowGameSlice = createSlice({
  name: "arrowGameSlice",
  initialState: {
    gameTitle: "Arrow Game",
    commandList: INIT_COMMANDS,
    colors: ["red", "blue", "green"],
    blocks: {
      red: "",
      blue: "",
      green: "",
    },
    blockList: [],
    blockCounts: {
      red: 0,
      blue: 0,
      green: 0,
    },
    point: 0,
    combo: 0,
    maxCombo: 0,
    pointUnit: 10,
    fever: 0,
  } as ArrowGameState,
  reducers: {
    initArrowGame: (state) => {
      state.blocks = {
        red: "",
        blue: "",
        green: "",
      };
      state.blockList = [];
      state.blockCounts = {
        red: 0,
        blue: 0,
        green: 0,
      };
      state.point = 0;
      state.combo = 0;
      state.maxCombo = 0;
      state.fever = 0;
    },
    setArrowGame: (state) => {
      setBlocksCommand(state.blocks, state.commandList);
      initBlockList(state.blockList, state.colors);
    },
    setCommands: (state, action: PayloadAction<Commands>) => {
      state.commandList = action.payload;
    },
    breakBlock: (state, action: PayloadAction<string>) => {
      if (state.fever !== MAX_FEVER) {
        breakNormalBlocks(state, action.payload);
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
    checkLastCombo: (state) => {
      updateMaxCombo(state);
    },
  },
});

export const {
  initArrowGame,
  setArrowGame,
  setCommands,
  breakBlock,
  addFever,
  initFever,
  checkLastCombo,
} = arrowGameSlice.actions;
export default arrowGameSlice;
