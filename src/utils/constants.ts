// export common interface and constants

export interface GameState {
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

export const MAX_TIMER = 100;
export const MAX_BLOCK_LENGTH = 5;
export const MAX_FEVER = 100;
export const FEVER_UNIT = 10;
export const FEVER_TIME_UNIT = 1000;
