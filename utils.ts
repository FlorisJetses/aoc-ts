import chalk from 'chalk';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function runSolution(solution: (data: string[]) => unknown) {
  const data = await readData();
  const answer = await solution(data);
  console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
}

export async function readData() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, fullPath, dataSet] = process.argv as
    | [string, string, string]
    | [string, string];
  const puzzle = fullPath.replaceAll('\\', '/').split('/').slice(-2).join('/');
  const [day, part] = puzzle
    .split('/')
    .map((x, i) => (i === 0 ? +x.split('-')[1] : x)) as [number, 'a' | 'b'];
  const fileName = createFileName(day, part, dataSet);
  const data = (await readFile(fileName)).toString().split('\n');
  return data;
}

function createFileName(day: number, part: 'a' | 'b', dataSet?: string) {
  return join(`day-${day}`, `${part}.data${dataSet ? `.${dataSet}` : ''}.txt`);
}

export function toMatrix(data: string[]) {
  return data.map(row => row.replace('\r', '').split('').filter(Boolean));
}

export function traverseMatrix <T>(matrix: T[][], cb: (val: T, x: number, y: number) => void) {
  matrix.forEach((row, y) => row.forEach((val, x) => cb(val, x, y)));
}

type X = number
type Y = number

export const returnKey = (x: number, y: number): `${X}-${Y}` => `${x}-${y}`
export const getCoordinates = (key: string) => key.split('-').map((num) => parseInt(num)) as [number, number]
