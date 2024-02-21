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

// arrowGame
export type ColorType = "red" | "green" | "blue";
export type CommandType = "command1" | "command2" | "command3" | "command4";
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
export const ACCEPT_COMMANDS: Array<string> = [
  "ArrowLeft",
  "ArrowUp",
  "ArrowRight",
  "ArrowDown",
  "Space",
];
export const UNACCEPT_COMMANDS: Array<string> = ["Tab", "F5", "F12"];
export const ACCEPT_COMMANDS_REGEX: RegExp = /[a-z0-9]/i;
export const MAX_BLOCK_LENGTH: number = 5;
export interface BlockBreakType {
  FAIL: number;
  NORMAL: number;
  FEVER: number;
}
export const BLOCK_BREAK_STATE: BlockBreakType = {
  FAIL: 0,
  NORMAL: 1,
  FEVER: 2,
};
export const MAX_FEVER: number = 100;
export const FEVER_UNIT: number = 50;
export const FEVER_TIME_UNIT: number = 500;
