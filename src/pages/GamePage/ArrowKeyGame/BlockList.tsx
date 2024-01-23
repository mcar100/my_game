import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GAME_STATE, MAX_BLOCK_LENGTH } from "../../../utils/constants";
import { BlockCommands } from "../../../utils/redux/slice/arrowGameSlice";
import { RootState } from "../../../utils/redux/store";

type BlockKey = keyof BlockCommands;

function BlockList() {
  const [blockList, setBlockList] = useState([]);
  const gameMode = useSelector((state: RootState) => state.common.gameState);
  const blockCommands = useSelector(
    (state: RootState) => state.arrowGame.blocks
  );
  const blockColors = Object.keys(blockCommands);
  const dispatch = useDispatch();

  const handleArrayPush = (): void => {
    const newBlockNumber = Math.floor(Math.random() * 3);
    // setBlockArray((prevArray) => [...prevArray, blockColor[newBlockNumber]]);
  };
  const handleArrayShift = (): void => {
    // setBlockArray((prevArray) => prevArray.slice(1));
  };

  useEffect(() => {
    // const newBlockNumber = Math.floor(Math.random() * 3);
    // if(blockList.length<5){
    //   blockList.push(blockColors[newBlockNumber]);
    // }
    console.log(blockColors);
  }, [blockList]);

  return (
    <div className="block-box">
      {blockList.map((block) => (
        <div className="block">{block}</div>
      ))}
    </div>
  );
}

export default BlockList;
