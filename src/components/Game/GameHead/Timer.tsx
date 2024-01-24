import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementTimer,
  finishGame,
} from "../../../utils/redux/slice/commonSlicer";
import { RootState } from "../../../utils/redux/store";

function Timer() {
  const timer = useSelector((state: RootState) => state.common.timer);
  const gameMode = useSelector((state: RootState) => state.common.gameState);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(decrementTimer());
    }, 1000);

    if (timer === 0) {
      clearTimeout(timeoutId);
      dispatch(finishGame());
    }
  }, [gameMode, timer, dispatch]);

  return (
    <div className="timer-box">
      Time:
      <span className={timer < 5 && timer > 0 ? "warning" : ""}>{timer}</span>
    </div>
  );
}

export default Timer;
