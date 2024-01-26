import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MAX_FEVER } from "../../../utils/constants";
import { addFever } from "../../../utils/redux/slice/arrowGameSlice";
import { RootState } from "../../../utils/redux/store";

function Combo() {
  const combo = useSelector((state: RootState) => state.arrowGame.combo);
  const fever = useSelector((state: RootState) => state.arrowGame.fever);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fever === MAX_FEVER) {
      return;
    }

    if (combo > 0 && combo % 5 === 0) {
      dispatch(addFever());
    }
  }, [combo]);

  return (
    <div className="combo-box">
      Combo:
      <span>{combo}</span>
    </div>
  );
}

export default Combo;
