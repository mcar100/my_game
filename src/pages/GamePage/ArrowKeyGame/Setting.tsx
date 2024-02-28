import { ChangeEvent, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCommands } from "../../../utils/redux/slice/arrowGameSlice";
import { updateTimer } from "../../../utils/redux/slice/commonSlicer";
import { RootState } from "../../../utils/redux/store";
import {
  ACCEPT_COMMANDS,
  ACCEPT_COMMANDS_REGEX,
  Commands,
  CommandType,
  INIT_COMMANDS,
  MAX_TIMER,
  UNACCEPT_COMMANDS,
} from "../../../utils/constants";

function Setting() {
  const commandList = useSelector(
    (state: RootState) => state.arrowGame.commandList
  );
  const maxTimer = useSelector((state: RootState) => state.common.maxTime);
  const timerList = useSelector((state: RootState) => state.common.timerList);
  const dispatch = useDispatch();
  const [focusTarget, setFocusTarget] = useState<string | undefined>(undefined);
  const [timerSetting, setTimerSetting] = useState<number>(maxTimer);
  const [commandSetting, setCommandSetting] = useState<Commands>({
    command1: commandList.command1,
    command2: commandList.command2,
    command3: commandList.command3,
    command4: commandList.command4,
  });
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  const handleMaxTimerChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setTimerSetting(Number(e.target.value));
    setIsConfirm(false);
  };

  const handleClickTarget = (e: React.MouseEvent<HTMLInputElement>): void => {
    setFocusTarget(e.currentTarget.name);
    setIsConfirm(false);
  };

  const handleTabEvent = useCallback((e: FocusEvent) => {
    const tabTarget = e.target as HTMLElement;
    const newTarget = tabTarget.getAttribute("name");
    if (newTarget !== null && (newTarget as CommandType)) {
      setFocusTarget(newTarget);
    }
  }, []);

  const checkKeyInput = (e: KeyboardEvent): boolean => {
    // 키 유효 검사
    const isValid =
      (e.key.length === 1 && e.key.match(ACCEPT_COMMANDS_REGEX)) ||
      ACCEPT_COMMANDS.includes(e.code);
    if (!isValid) {
      e.preventDefault();
      return false;
    }
    return true;
  };

  const checkKeyDuplicate = (): boolean => {
    // 중복 검사
    const commands = Object.values(commandSetting);
    return new Set(commands).size === commands.length;
  };

  const handleCommandChange = useCallback(
    (e: KeyboardEvent) => {
      if (focusTarget === undefined || UNACCEPT_COMMANDS.includes(e.key)) {
        return;
      }

      const check = checkKeyInput(e);
      if (check) {
        setCommandSetting((prev) => {
          const newCommandSetting = { ...prev };

          newCommandSetting[focusTarget as CommandType] = e.code;

          return newCommandSetting;
        });
      }
    },
    [focusTarget]
  );

  const handleConfirmSetting = (): void => {
    const isDuplicate = checkKeyDuplicate();
    if (isDuplicate) {
      dispatch(setCommands(commandSetting));
      dispatch(updateTimer(timerSetting));
      setIsConfirm(true);
    }
  };

  const handleResetSetting = (): void => {
    setCommandSetting(INIT_COMMANDS);
    setTimerSetting(MAX_TIMER);
    handleConfirmSetting();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleCommandChange);
    document.addEventListener("focusin", handleTabEvent);

    return () => {
      document.removeEventListener("keydown", handleCommandChange);
      document.removeEventListener("focusin", handleTabEvent);
    };
  }, [focusTarget, handleCommandChange, handleTabEvent]);

  return (
    <div className="setting-box">
      <div className={isConfirm ? "setting-list confirm" : "setting-list"}>
        <div className="setting-title">Game Settings</div>
        <div className="setting-unit">
          Timer :{" "}
          <select value={timerSetting} onChange={handleMaxTimerChange}>
            {timerList.map((time, idx) => (
              <option value={time} key={`timer-${idx}`}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div className="setting-unit">
          <div className={`block bc-red`}></div>:
          <input
            type="text"
            name="command1"
            className={focusTarget === "command1" ? "selected" : ""}
            value={commandSetting.command1}
            onClick={handleClickTarget}
            onChange={(e) => {
              e.preventDefault();
            }}
          />
        </div>
        <div className="setting-unit">
          <div className={`block bc-blue`}></div>:
          <input
            type="text"
            name="command2"
            className={focusTarget === "command2" ? "selected" : ""}
            value={commandSetting.command2}
            onClick={handleClickTarget}
            onChange={(e) => {
              e.preventDefault();
            }}
          />
        </div>
        <div className="setting-unit">
          <div className={`block bc-green`}></div> :
          <input
            type="text"
            name="command3"
            className={focusTarget === "command3" ? "selected" : ""}
            value={commandSetting.command3}
            onClick={handleClickTarget}
            onChange={(e) => {
              e.preventDefault();
            }}
          />
        </div>
        <div className="setting-unit">
          <div className={`block bc-fever`}></div>:
          <input
            type="text"
            name="command4"
            className={focusTarget === "command4" ? "selected" : ""}
            value={commandSetting.command4}
            onClick={handleClickTarget}
            onChange={(e) => {
              e.preventDefault();
            }}
          />
        </div>
        <div className="setting-buttons">
          <button className="game-button" onClick={handleConfirmSetting}>
            Confirm
          </button>
          <button className="game-button" onClick={handleResetSetting}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Setting;
