import { useState, useEffect, useCallback } from "react";
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
  const [isPressed, setIsPressed] = useState<PressedState>({
    command1: false,
    command2: false,
    command3: false,
  });
  const gameMode = useSelector((state: RootState) => state.common.gameState);
  const commandList = useSelector(
    (state: RootState) => state.arrowGame.commandList
  );
  const dispatch = useDispatch();

  const handleCommandBtnPressed = useCallback(
    (e: KeyboardEvent) => {
      const initState: PressedState = {
        command1: false,
        command2: false,
        command3: false,
      };

      const { command1, command2, command3 } = commandList;
      if (e.key === command1) {
        setIsPressed(() => ({ ...initState, command1: true }));
      } else if (e.key === command2) {
        setIsPressed(() => ({ ...initState, command2: true }));
      } else if (e.key === command3) {
        setIsPressed(() => ({ ...initState, command3: true }));
      } else {
        setIsPressed(() => ({ ...initState }));
      }
    },
    [commandList]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (Object.values(commandList).includes(e.code)) {
        e.preventDefault();
        dispatch(breakBlock(e.code));
      } else if (e.code === "ArrowDown") {
        e.preventDefault();
      }
    },
    [commandList, dispatch]
  );

  useEffect(() => {
    if (gameMode === GAME_STATE.PROCEEDING) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keydown", handleCommandBtnPressed);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keydown", handleCommandBtnPressed);
    }

    return () => {
      if (gameMode === GAME_STATE.PROCEEDING) {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keydown", handleCommandBtnPressed);
      }
    };
  }, [gameMode, commandList, dispatch, handleCommandBtnPressed, handleKeyDown]);

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
