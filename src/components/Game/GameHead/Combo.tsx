import { useState } from "react";
import { RootState } from "../../../utils/redux/store";

function Combo() {
  const [combo, setCombo] = useState(0);

  return (
    <div className="combo-box">
      Combo:
      <span>{combo}</span>
    </div>
  );
}

export default Combo;
