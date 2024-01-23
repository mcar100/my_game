import ArrowKeyCommand from "./ArrowKeyCommand";
import BlockList from "./BlockList";
import ButtonBox from "./ButtonBox";

function ArrowKeyGame() {
  return (
    <div className="arrow-game-container">
      <div className="arrow-game-top">
        <ButtonBox />
        <BlockList />
        <div className="block-box"></div>
      </div>
      <div className="arrow-game-bottom">
        <ArrowKeyCommand />
      </div>
    </div>
  );
}

export default ArrowKeyGame;
