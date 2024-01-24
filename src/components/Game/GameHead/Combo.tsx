import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFever } from "../../../utils/redux/slice/arrowGameSlice";
import { RootState } from "../../../utils/redux/store";

function Combo() {
  const combo = useSelector((state: RootState) => state.arrowGame.combo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (combo > 0 && combo % 10 === 0) {
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
