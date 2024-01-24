import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MAX_BLOCK_LENGTH } from "../../constants";
import {
  setBlocksCommand,
  initBlockList,
  addBlocks,
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

interface ArrowGameState {
  gameTitle: string;
  commandList: Commands;
  colors: Array<string>;
  blocks: BlockCommands;
  blockList: Array<string>;
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
      command4: " " || "Space",
    },
    colors: ["red", "blue", "green"],
    blocks: {
      red: "",
      blue: "",
      green: "",
    },
    blockList: [],
    pointUnit: 10,
    fever: 0,
  } as ArrowGameState,
  reducers: {
    initArrowGame: (state) => {
      state.fever = 0;
      setBlocksCommand(state.blocks, state.commandList);
      initBlockList(state.blockList, state.colors);
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
    breakBlock: (state, action: PayloadAction<string>) => {
      const blockcolor = state.blockList[0] as "red" | "blue" | "green";
      if (state.blocks[blockcolor] === action.payload) {
        state.blockList = state.blockList.splice(1);
      }
      addBlocks(state.blockList, state.colors);
    },
    addFever: (state, action: PayloadAction<number>) => {
      if (action.payload === 10) {
        state.fever = state.fever + 10;
      }
    },
    initFever: (state) => {
      state.fever = 0;
    },
  },
});

export const {
  initArrowGame,
  initCommand,
  changeCommand,
  breakBlock,
  addFever,
  initFever,
} = arrowGameSlice.actions;
export default arrowGameSlice;
