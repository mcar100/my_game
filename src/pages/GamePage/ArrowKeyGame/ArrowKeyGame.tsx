import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GAME_STATE, MAX_BLOCK_LENGTH } from "../../../utils/constants";
import {
  Blocks,
  initArrowGame,
} from "../../../utils/redux/slice/arrowGameSlice";
import {
  resumeGame,
  startGame,
  stopGame,
} from "../../../utils/redux/slice/commonSlicer";
import { RootState } from "../../../utils/redux/store";
import ArrowKeyCommand from "./ArrowKeyCommand";

type BlockKey = keyof Blocks;

function ArrowKeyGame() {
  const gameTitle = useSelector(
    (state: RootState) => state.arrowGame.gameTitle
  );
  const gameMode = useSelector((state: RootState) => state.common.gameState);
  const commandList = useSelector(
    (state: RootState) => state.arrowGame.commandList
  );
  const dispatch = useDispatch();

  const handleGameStart = () => {
    dispatch(startGame());
    dispatch(initArrowGame());
  };

  const handleGameStop = () => {
    dispatch(stopGame(gameTitle));
  };

  const handleGameResume = () => {
    dispatch(resumeGame());
  };

  const handleArrayPush = (): void => {
    const newBlockNumber = Math.floor(Math.random() * 3);
    // setBlockArray((prevArray) => [...prevArray, blockColor[newBlockNumber]]);
  };
  const handleArrayShift = (): void => {
    // setBlockArray((prevArray) => prevArray.slice(1));
  };

  const getKeyFromColor = (obj: Blocks, key: keyof Blocks): string | null => {
    return obj[key];
  };

  return (
    <div className="arrow-game-container">
      <div className="arrow-game-top">
        <div className="button-box">
          {gameMode === GAME_STATE.OVER ? (
            <div className="absolute-box">
              <button className="game-button" onClick={handleGameStart}>
                Game Start
              </button>
            </div>
          ) : gameMode !== GAME_STATE.STOPPED ? (
            <button className="game-button" onClick={handleGameStop}>
              Game Stop
            </button>
          ) : (
            <button className="game-button" onClick={handleGameResume}>
              Game Resume
            </button>
          )}
        </div>
        <div className="block-box"></div>
      </div>
      <div className="arrow-game-bottom">
        <ArrowKeyCommand />
      </div>
    </div>
  );
}

export default ArrowKeyGame;
