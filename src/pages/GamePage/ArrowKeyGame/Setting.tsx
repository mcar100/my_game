import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initCommands,
  setCommands,
  Commands,
} from "../../../utils/redux/slice/arrowGameSlice";
import {
  initTimer,
  updateTimer,
} from "../../../utils/redux/slice/commonSlicer";
import { RootState } from "../../../utils/redux/store";

function Setting() {
  const commandList = useSelector(
    (state: RootState) => state.arrowGame.commandList
  );
  const maxTimer = useSelector((state: RootState) => state.common.maxTime);
  const timerList = useSelector((state: RootState) => state.common.timerList);
  const dispatch = useDispatch();
  const focusTargetRefs = useRef<string>();
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
    focusTargetRefs.current = e.currentTarget.name;
    setIsConfirm(false);
  };

  const handleTabEvent = (e: FocusEvent) => {
    const tabTarget = e.target as HTMLElement;
    const newTarget = tabTarget.getAttribute("name");
    if (
      newTarget !== null &&
      (newTarget as "command1" | "command2" | "command3" | "command4")
    ) {
      focusTargetRefs.current = newTarget;
    }
  };

  const handleCommandChange = (e: KeyboardEvent) => {
    if (focusTargetRefs.current === undefined || e.code === "Tab") {
      return;
    }

    setCommandSetting((prev) => {
      const newCommandSetting = { ...prev };

      newCommandSetting[
        focusTargetRefs.current as
          | "command1"
          | "command2"
          | "command3"
          | "command4"
      ] = e.code;

      return newCommandSetting;
    });
  };

  const handleConfirmSetting = () => {
    dispatch(setCommands(commandSetting));
    dispatch(updateTimer(timerSetting));
    setIsConfirm(true);
  };

  const handleResetSetting = () => {
    dispatch(initCommands());
    dispatch(initTimer());
    setIsConfirm(true);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleCommandChange);
    if (focusTargetRefs.current !== undefined) {
      document.addEventListener("focusin", handleTabEvent);
    }

    return () => {
      document.removeEventListener("keydown", handleCommandChange);
    };
  }, [focusTargetRefs.current]);

  useEffect(() => {
    setCommandSetting(commandList);
    setTimerSetting(maxTimer);
  }, [maxTimer, commandList]);

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
            className={focusTargetRefs.current === "command1" ? "selected" : ""}
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
            className={focusTargetRefs.current === "command2" ? "selected" : ""}
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
            className={focusTargetRefs.current === "command3" ? "selected" : ""}
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
            className={focusTargetRefs.current === "command4" ? "selected" : ""}
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
