import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BLOCK_BREAK_STATE } from "../../../utils/constants";
import { initBlockBreakState } from "../../../utils/redux/slice/arrowGameSlice";
import { RootState } from "../../../utils/redux/store";

function BlockList() {
  const blockList = useSelector(
    (state: RootState) => state.arrowGame.blockList
  );
  const blockBreakState = useSelector(
    (state: RootState) => state.arrowGame.blockBreakState
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (blockBreakState !== BLOCK_BREAK_STATE.FAIL) {
      return;
    }

    const timeId: NodeJS.Timeout | undefined = setTimeout(() => {
      dispatch(initBlockBreakState());
    }, 300);

    return () => {
      clearTimeout(timeId);
    };
  }, [blockBreakState, dispatch]);

  return (
    <div className={`block-box block-effect-${blockBreakState}`}>
      {blockList.map((color, idx) => (
        <div className={`block bc-${color}`} key={`block-${idx}`}></div>
      ))}
      {blockBreakState === BLOCK_BREAK_STATE.FAIL ? (
        <div className={`block-fail-effect bc-${blockList[2]}`}></div>
      ) : (
        ""
      )}
    </div>
  );
}

export default BlockList;
