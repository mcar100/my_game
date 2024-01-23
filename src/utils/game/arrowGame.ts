import { MAX_BLOCK_LENGTH } from "../constants";
import { BlockCommands, Commands } from "../redux/slice/arrowGameSlice";

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
  for (let i = 0; i < MAX_BLOCK_LENGTH; i++) {
    addBlocks(blockList, colors);
  }
};

export const addBlocks = (blockList: Array<string>, colors: Array<string>) => {
  if (blockList.length < MAX_BLOCK_LENGTH) {
    const randNum = Math.floor(Math.random() * 3);
    blockList.push(colors[randNum]);
  }
};
