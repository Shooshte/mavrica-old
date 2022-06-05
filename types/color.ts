export interface Color {}

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export type ColorCount = {
  rgba: RGBA;
  count: number;
};
