import { useSelector } from "react-redux";
import { ColorType } from "../../../utils/constants";
import { RootState } from "../../../utils/redux/store";

function EndBoard() {
  const blockCounts = useSelector(
    (state: RootState) => state.arrowGame.blockCounts
  );
  const blockColor: Array<string> = Object.keys(blockCounts);
  const totalCount: number = Object.values(blockCounts).reduce(
    (prev, acc) => prev + acc,
    0
  );
  const maxCombo = useSelector((state: RootState) => state.arrowGame.maxCombo);

  return (
    <div className="endboard-box">
      <div className="endboard-list">
        <div className="endboard-title">Game Result</div>
        {blockColor.map((color, idx) => (
          <div className="endboard-unit" key={`color-${idx}`}>
            <div className={`block bc-${color}`} key={`block-${idx}`}></div>:{" "}
            {blockCounts[color.toLowerCase() as ColorType]}
          </div>
        ))}
        <div className="endboard-unit">Total Blocks : {totalCount}</div>
        <div className="endboard-unit">Max Combo : {maxCombo}</div>
      </div>
    </div>
  );
}

export default EndBoard;
