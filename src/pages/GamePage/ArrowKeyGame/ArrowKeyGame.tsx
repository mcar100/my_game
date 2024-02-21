import { useSelector } from "react-redux";
import ArrowKeyCommand from "./ArrowKeyCommand";
import BlockList from "./BlockList";
import ButtonBox from "../../../components/Game/GameHead/ButtonBox";
import { RootState } from "../../../utils/redux/store";
import { GAME_STATE } from "../../../utils/constants";
import FeverBox from "./FeverBox";
import Setting from "./Setting";
import EndBoard from "./EndBoard";

function ArrowKeyGame() {
  const gameMode = useSelector((state: RootState) => state.common.gameState);

  return (
    <div className="arrow-game-container">
      <div className="arrow-game-top">
        <ButtonBox />
        {gameMode === GAME_STATE.WAITING ? <Setting /> : ""}
        {gameMode === GAME_STATE.OVER ? <EndBoard /> : ""}
        {gameMode === GAME_STATE.PROCEEDING ||
        gameMode === GAME_STATE.STOPPED ? (
          <BlockList />
        ) : (
          ""
        )}
        {gameMode === GAME_STATE.PROCEEDING ||
        gameMode === GAME_STATE.STOPPED ? (
          <FeverBox />
        ) : (
          ""
        )}
      </div>
      <div className="arrow-game-bottom">
        <ArrowKeyCommand />
      </div>
    </div>
  );
}

export default ArrowKeyGame;
