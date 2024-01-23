import { useSelector, useDispatch } from "react-redux";
import { GAME_STATE } from "../../../utils/constants";
import { initArrowGame } from "../../../utils/redux/slice/arrowGameSlice";
import {
  resumeGame,
  startGame,
  stopGame,
  finishGame,
} from "../../../utils/redux/slice/commonSlicer";
import { RootState } from "../../../utils/redux/store";

function ButtonBox() {
  const gameTitle = useSelector(
    (state: RootState) => state.arrowGame.gameTitle
  );
  const gameMode = useSelector((state: RootState) => state.common.gameState);

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

  const handleGameOver = () => {
    dispatch(finishGame());
  };

  return (
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
        <>
          {" "}
          <button className="game-button" onClick={handleGameResume}>
            Game Resume
          </button>
          <button className="game-button" onClick={handleGameOver}>
            Game Over
          </button>
        </>
      )}
    </div>
  );
}

export default ButtonBox;
