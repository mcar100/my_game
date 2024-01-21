import { useEffect } from "react";
import { useSelector } from "react-redux";
import { GAME_STATE } from "../../../utils/constants";

import { RootState } from "../../../utils/redux/store";

function ArrowKeyCommand() {
  const gameMode = useSelector((state: RootState) => state.common.gameState);
  const commandList = useSelector(
    (state: RootState) => state.arrowGame.commandList
  );

  useEffect(() => {
    if (gameMode === GAME_STATE.PROCEEDING) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    function handleKeyDown(e: KeyboardEvent): void {
      if (Object.values(commandList).includes(e.key)) {
        e.preventDefault();
        console.log(e.key);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
      }
    }

    return () => {
      if (gameMode === GAME_STATE.PROCEEDING) {
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [gameMode, commandList]);

  return (
    <div className="command-box">
      <div className="command-button">
        <button className="game-button" value={commandList.command1}>
          ◁
        </button>
      </div>
      <div className="command-button">
        <button className="game-button" value={commandList.command2}>
          △
        </button>
      </div>
      <div className="command-button">
        <button className="game-button" value={commandList.command3}>
          ▷
        </button>
      </div>
    </div>
  );
}

export default ArrowKeyCommand;
