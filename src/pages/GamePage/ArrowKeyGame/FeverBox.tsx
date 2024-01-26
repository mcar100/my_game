import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FEVER_TIME_UNIT,
  GAME_STATE,
  MAX_FEVER,
} from "../../../utils/constants";
import { initFever } from "../../../utils/redux/slice/arrowGameSlice";
import { RootState } from "../../../utils/redux/store";

function FeverBox() {
  const [isFever, setIsFever] = useState<boolean>(false);
  const [feverGague, setFeverGague] = useState<number>(0);
  const fever = useSelector((state: RootState) => state.arrowGame.fever);
  const gameMode = useSelector((state: RootState) => state.common.gameState);
  const dispatch = useDispatch();

  useEffect(() => {
    let feverId: NodeJS.Timeout | undefined;
    if (fever === MAX_FEVER && gameMode === GAME_STATE.PROCEEDING) {
      setIsFever(true);
      feverId = setInterval(() => {
        setFeverGague((prev) => prev - 1);
      }, FEVER_TIME_UNIT);
    }
    return () => {
      setIsFever(false);
      clearInterval(feverId);
    };
  }, [fever, gameMode]);

  useEffect(() => {
    const feverGague = Math.floor(fever / 10);
    setFeverGague(feverGague);
  }, [fever]);

  useEffect(() => {
    if (feverGague === 0) {
      setIsFever(false);
      dispatch(initFever());
    }
  }, [feverGague]);

  return (
    <div className="fever-box">
      <div className="fever-bar">
        <div
          className={isFever ? `fever-on g-${feverGague}` : `g-${feverGague}`}
        ></div>
      </div>
    </div>
  );
}

export default FeverBox;
