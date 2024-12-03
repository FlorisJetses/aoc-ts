import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day3b(data: string[]) {
  let sum = 0
  const test = data.toString().matchAll(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g)
  let shouldMultiply = true
  test.forEach((val) => {
    if (val[0] === 'do()'){
      shouldMultiply = true
    } else if (val[0] === "don't()"){
      shouldMultiply = false
    } else if (shouldMultiply){
      const numbers = val[0].match(/\d+/g)
      sum += parseInt(numbers[0]) * parseInt(numbers[1])
    }
  })
  return sum;
}

await runSolution(day3b);
