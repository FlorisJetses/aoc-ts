import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day3a(data: string[]) {
  let sum = 0
  const test = data.toString().matchAll(/mul\(\d+,\d+\)/g)
  test.forEach((val) => {
    const numbers = val[0].match(/\d+/g)
    sum += parseInt(numbers[0]) * parseInt(numbers[1])
  })
  return sum;
}

await runSolution(day3a);
