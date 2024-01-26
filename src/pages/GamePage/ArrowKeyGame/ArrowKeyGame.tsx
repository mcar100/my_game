import { useSelector } from "react-redux";
import ArrowKeyCommand from "./ArrowKeyCommand";
import BlockList from "./BlockList";
import ButtonBox from "./ButtonBox";
import { RootState } from "../../../utils/redux/store";
import { GAME_STATE } from "../../../utils/constants";
import FeverBox from "./FeverBox";

function ArrowKeyGame() {
  const gameMode = useSelector((state: RootState) => state.common.gameState);

  return (
    <div className="arrow-game-container">
      <div className="arrow-game-top">
        <ButtonBox />
        {gameMode !== GAME_STATE.OVER ? <BlockList /> : ""}
        {gameMode !== GAME_STATE.OVER ? <FeverBox /> : ""}
      </div>
      <div className="arrow-game-bottom">
        <ArrowKeyCommand />
      </div>
    </div>
  );
}

export default ArrowKeyGame;
