import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCommands } from "../../../utils/redux/slice/arrowGameSlice";
import { updateTimer } from "../../../utils/redux/slice/commonSlicer";
import { RootState } from "../../../utils/redux/store";
import {
  ACCEPT_COMMANDS,
  ACCEPT_COMMANDS_REGEX,
  Commands,
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

  const handleMaxTimerChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTimerSetting(Number(e.target.value));
    setIsConfirm(false);
  };

  const handleClickTarget = (e: React.MouseEvent<HTMLInputElement>) => {
    setFocusTarget(e.currentTarget.name);
    setIsConfirm(false);
  };

  const handleTabEvent = (e: FocusEvent) => {
    const tabTarget = e.target as HTMLElement;
    const newTarget = tabTarget.getAttribute("name");
    if (
      newTarget !== null &&
      (newTarget as "command1" | "command2" | "command3" | "command4")
    ) {
      setFocusTarget(newTarget);
    }
  };

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

  const handleCommandChange = (e: KeyboardEvent) => {
    if (focusTarget === undefined || UNACCEPT_COMMANDS.includes(e.key)) {
      return;
    }

    const check = checkKeyInput(e);
    if (check) {
      setCommandSetting((prev) => {
        const newCommandSetting = { ...prev };

        newCommandSetting[
          focusTarget as "command1" | "command2" | "command3" | "command4"
        ] = e.code;

        return newCommandSetting;
      });
    }
  };

  const handleConfirmSetting = () => {
    const isDuplicate = checkKeyDuplicate();
    if (isDuplicate) {
      dispatch(setCommands(commandSetting));
      dispatch(updateTimer(timerSetting));
      setIsConfirm(true);
    }
  };

  const handleResetSetting = () => {
    setCommandSetting(INIT_COMMANDS);
    setTimerSetting(MAX_TIMER);
    handleConfirmSetting();
  };

  useEffect(() => {
    console.log(focusTarget);
    document.addEventListener("keydown", handleCommandChange);
    document.addEventListener("focusin", handleTabEvent);

    return () => {
      document.removeEventListener("keydown", handleCommandChange);
      document.removeEventListener("focusin", handleTabEvent);
    };
  }, [focusTarget]);

  return (
    <div className="setting-box">
      <div className="setting-title">Game Settings</div>
      <div className={isConfirm ? "setting-list confirm" : "setting-list"}>
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
          Red Key :{" "}
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
          Blue Key :{" "}
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
          Green Key :{" "}
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
          Fever Key :{" "}
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
  );
}

export default Setting;
