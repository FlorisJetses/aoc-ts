import { toMatrix } from "../utils.ts";

export class Matrix {
  private matrix: string[][];

  constructor(list: string[]) {
    this.matrix = toMatrix(list);
  }

  traverse(cb: (val: string, x: number, y: number) => void) {
    this.matrix.forEach((row, y) => row.forEach((val, x) => cb(val, x, y)));
  }

  get length() {
    return this.matrix.length;
  }

  get width() {
    return this.matrix[0].length;
  }

  isInBounds(x: number, y: number) {
    return x >= 0 && x < this.width && y >= 0 && y < this.length;
  }

  get(x: number, y: number) {
    return this.matrix[y]?.[x];
  }

  set(x: number, y: number, val: string) {
    this.matrix[y][x] = val;
  }

  getMatrix() {
    return this.matrix.map((row) => row.join(""));
  }

}
