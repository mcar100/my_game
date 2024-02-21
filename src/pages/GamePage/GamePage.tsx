import ArrowKeyGame from "./ArrowKeyGame/ArrowKeyGame";
import Timer from "../../components/Game/GameHead/Timer";
import Pointer from "../../components/Game/GameHead/Point";
import Combo from "../../components/Game/GameHead/Combo";

function GamePage() {
  return (
    <div className="game-container">
      <div className="game-head">
        <div className="state-bar">
          <Timer />
          <Pointer />
          <Combo />
        </div>
      </div>
      <div className="game-body">
        <ArrowKeyGame />
      </div>
    </div>
  );
}

export default GamePage;
