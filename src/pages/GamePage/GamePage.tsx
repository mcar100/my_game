import ArrowKeyGame from "./ArrowKeyGame/ArrowKeyGame";
import Timer from "../../components/Game/GameHead/Timer";
import Pointer from "../../components/Game/GameHead/Point";
import Combo from "../../components/Game/GameHead/Combo";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/redux/store";
import { GAME_STATE } from "../../utils/constants";

function GamePage() {
  const gameMode = useSelector((state: RootState) => state.common.gameState);

  return (
    <div className="game-container">
      <div className="game-head">
        {gameMode === GAME_STATE.PROCEEDING ||
        gameMode === GAME_STATE.STOPPED ? (
          <div className="state-bar">
            <Timer />
            <Pointer />
            <Combo />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="game-body">
        <ArrowKeyGame />
      </div>
    </div>
  );
}

export default GamePage;
