import { useSelector } from "react-redux";
import { RootState } from "../../../utils/redux/store";

function Pointer() {
  const pointUnit = useSelector(
    (state: RootState) => state.arrowGame.pointUnit
  );
  const point = useSelector((state: RootState) => state.arrowGame.point);

  return (
    <div className="point-box">
      Point:
      <span>{point}</span>
    </div>
  );
}

export default Pointer;
