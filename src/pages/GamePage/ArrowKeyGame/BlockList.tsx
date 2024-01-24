import { useSelector } from "react-redux";
import { RootState } from "../../../utils/redux/store";

function BlockList() {
  const blockList = useSelector(
    (state: RootState) => state.arrowGame.blockList
  );

  return (
    <div className="block-box">
      {blockList.map((color, idx) => (
        <div className={`block bc-${color}`} key={`block-${idx}`}></div>
      ))}
    </div>
  );
}

export default BlockList;
