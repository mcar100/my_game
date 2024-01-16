interface GameState {
  OVER: number;
  PROCEEDING: number;
  STOPPED: number;
  BUGGED: number;
}

export const GAME_STATE: GameState = {
  OVER: 0,
  PROCEEDING: 1,
  STOPPED: 2,
  BUGGED: -1,
};
