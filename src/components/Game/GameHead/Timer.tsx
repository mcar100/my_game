import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GAME_STATE } from "../../../utils/constants";
import { checkLastCombo } from "../../../utils/redux/slice/arrowGameSlice";
import { decrementTimer } from "../../../utils/redux/slice/commonSlicer";
import { RootState } from "../../../utils/redux/store";

function Timer() {
  const timer = useSelector((state: RootState) => state.common.timer);
  const gameMode = useSelector((state: RootState) => state.common.gameState);
  const dispatch = useDispatch();

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    const startTimer = () => {
      timerId = setInterval(() => {
        dispatch(decrementTimer());
      }, 1000);
    };

    if (gameMode === GAME_STATE.PROCEEDING) {
      startTimer();
    } else if (gameMode === GAME_STATE.OVER) {
      dispatch(checkLastCombo());
    }
    return () => {
      clearInterval(timerId);
    };
  }, [gameMode, dispatch]);

  return (
    <div className="timer-box">
      Time:
      <span className={timer < 5 && timer > 0 ? "warning" : ""}>{timer}</span>
    </div>
  );
}

export default Timer;
