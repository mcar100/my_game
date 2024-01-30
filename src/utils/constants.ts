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

export interface Commands {
  command1: string;
  command2: string;
  command3: string;
  command4: string;
}

export const INIT_COMMANDS: Commands = {
  command1: "ArrowLeft",
  command2: "ArrowUp",
  command3: "ArrowRight",
  command4: "Space" || "Spacebar",
};

export const MAX_TIMER = 90;
export const MAX_BLOCK_LENGTH = 5;
export const MAX_FEVER = 100;
export const FEVER_UNIT = 10;
export const FEVER_TIME_UNIT = 500;
