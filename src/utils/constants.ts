// export common interface and constants

export interface GameState {
  WAITING: number;
  PROCEEDING: number;
  STOPPED: number;
  OVER: number;
  SETTING: number;
}

export const GAME_STATE: GameState = {
  WAITING: 1,
  PROCEEDING: 2,
  STOPPED: 3,
  OVER: 4,
  SETTING: 5,
};

export const MAX_TIMER = 90;
export const MAX_BLOCK_LENGTH = 5;
export const MAX_FEVER = 100;
export const FEVER_UNIT = 10;
export const FEVER_TIME_UNIT = 1000;
