import { useSelector, useDispatch } from "react-redux";
import { GAME_STATE } from "../../../utils/constants";
import {
  initArrowGame,
  setArrowGame,
} from "../../../utils/redux/slice/arrowGameSlice";
import {
  resumeGame,
  startGame,
  stopGame,
  finishGame,
  SavedData,
} from "../../../utils/redux/slice/commonSlicer";
import { RootState } from "../../../utils/redux/store";

function ButtonBox() {
  const gameTitle = useSelector(
    (state: RootState) => state.arrowGame.gameTitle
  );
  const point = useSelector((state: RootState) => state.arrowGame.point);
  const gameMode = useSelector((state: RootState) => state.common.gameState);

  const dispatch = useDispatch();

  const handleGameStart = () => {
    dispatch(startGame());
    dispatch(initArrowGame());
    dispatch(setArrowGame());
  };

  const handleGameStop = () => {
    const savedData: SavedData = {
      title: gameTitle,
      point: point,
      timer: 0,
      date: "",
    };
    dispatch(stopGame(savedData));
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
