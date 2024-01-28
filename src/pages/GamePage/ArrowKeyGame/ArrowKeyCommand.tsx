import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GAME_STATE } from "../../../utils/constants";
import { RootState } from "../../../utils/redux/store";
import { breakBlock } from "../../../utils/redux/slice/arrowGameSlice";

interface PressedState {
  command1: boolean;
  command2: boolean;
  command3: boolean;
}

function ArrowKeyCommand() {
  const initState: PressedState = {
    command1: false,
    command2: false,
    command3: false,
  };
  const [isPressed, setIsPressed] = useState<PressedState>(initState);
  const gameMode = useSelector((state: RootState) => state.common.gameState);
  const commandList = useSelector(
    (state: RootState) => state.arrowGame.commandList
  );
  const dispatch = useDispatch();

  const handleCommandBtnPressed = (e: KeyboardEvent) => {
    if (e.key === commandList.command1) {
      setIsPressed(() => ({ ...initState, command1: true }));
    } else if (e.key === commandList.command2) {
      setIsPressed(() => ({ ...initState, command2: true }));
    } else if (e.key === commandList.command3) {
      setIsPressed(() => ({ ...initState, command3: true }));
    } else {
      setIsPressed(() => ({ ...initState }));
    }
  };
  useEffect(() => {
    if (gameMode === GAME_STATE.PROCEEDING) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keydown", handleCommandBtnPressed);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keydown", handleCommandBtnPressed);
    }

    function handleKeyDown(e: KeyboardEvent): void {
      if (Object.values(commandList).includes(e.code)) {
        e.preventDefault();
        dispatch(breakBlock(e.code));
      } else if (e.code === "ArrowDown") {
        e.preventDefault();
      }
    }

    return () => {
      if (gameMode === GAME_STATE.PROCEEDING) {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keydown", handleCommandBtnPressed);
      }
    };
  }, [gameMode, commandList]);

  return (
    <div className="command-box">
      <div className={isPressed.command1 ? "active" : ""}>
        <button className="game-button btn-red" value={commandList.command1}>
          ◀
        </button>
      </div>
      <div className={isPressed.command2 ? "active" : ""}>
        <button className="game-button btn-blue" value={commandList.command2}>
          ▲
        </button>
      </div>
      <div className={isPressed.command3 ? "active" : ""}>
        <button className="game-button btn-green" value={commandList.command3}>
          ▶
        </button>
      </div>
    </div>
  );
}

export default ArrowKeyCommand;
