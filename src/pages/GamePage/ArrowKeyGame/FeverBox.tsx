import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initFever } from "../../../utils/redux/slice/arrowGameSlice";
import { RootState } from "../../../utils/redux/store";

function FeverBox() {
  const fever = useSelector((state: RootState) => state.arrowGame.fever);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fever === 100) {
      setTimeout(() => {
        dispatch(initFever());
      }, 1000);
    }
  }, [fever]);

  return (
    <div className="fever-box">
      <div className="fever-bar">
        <div className={`gauge${fever}`}></div>
      </div>
    </div>
  );
}

export default FeverBox;
