import { ColorType, Commands, MAX_BLOCK_LENGTH } from "../constants";
import { ArrowGameState, BlockCommands } from "../redux/slice/arrowGameSlice";

export const setBlocksCommand = (
  blocks: BlockCommands,
  commandList: Commands
) => {
  blocks.red = commandList.command1;
  blocks.blue = commandList.command2;
  blocks.green = commandList.command3;
};

export const initBlockList = (
  blockList: Array<string>,
  colors: Array<string>
) => {
  for (let i = 0; i < 2; i++) {
    blockList.push("none");
  }
  for (let i = 0; i < MAX_BLOCK_LENGTH - 2; i++) {
    addBlocks(blockList, colors);
  }
};

export const addBlocks = (blockList: Array<string>, colors: Array<string>) => {
  if (blockList.length < MAX_BLOCK_LENGTH) {
    const randNum = Math.floor(Math.random() * 3);
    blockList.push(colors[randNum]);
  }
};

const breakBlocks = (state: ArrowGameState) => {
  const blockColor = state.blockList[2] as ColorType;
  state.blockList = state.blockList.splice(1);
  state.point += state.pointUnit;
  state.combo += 1;
  state.blockCounts[blockColor] += 1;
};

export const breakNormalBlocks = (state: ArrowGameState, command: string) => {
  if (command === state.commandList.command4) {
    return;
  }
  const blockColor = state.blockList[2] as ColorType;
  if (state.blocks[blockColor] === command) {
    breakBlocks(state);
  } else {
    state.maxCombo = state.combo;
    state.combo = 0;
  }
};

export const breakFeverBlocks = (state: ArrowGameState, command: string) => {
  if (state.commandList.command4 === command) {
    breakBlocks(state);
  }
};
