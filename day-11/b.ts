import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day11b(data: string[]) {
  const stones = data[0].split(' ')
  const steps = 75

  const map: Record<number, Record<string, number>> = {}


  const returnStoneAmount = (stone: string, step: number): number => {
    if (!map[step]){
      map[step] = {}
    }
    if (map[step][stone]){
      return map[step][stone]
    }
    if (step === steps){
      return 1
    }
    const num = Number(stone)
    if (num === 0){
      const val = returnStoneAmount(String(1), step + 1)

      map[step][stone] = val

      return val
    } else if (stone.length % 2 === 0){
      const removeLeadingZeroes = stone.substring(stone.length / 2).replace(/^0+/, '')
      const val = returnStoneAmount(stone.substring(0, stone.length / 2), step + 1) + returnStoneAmount(removeLeadingZeroes.length === 0 ? '0' : removeLeadingZeroes, step + 1)

      map[step][stone] = val

      return val
    } else {
      const val = returnStoneAmount(String(num * 2024), step + 1)
      map[step][stone] = val

      return val
    } 
  }

  let sum = 0
    stones.forEach(stone => {
     sum += returnStoneAmount(stone, 0)
    })


  return sum;
}

await runSolution(day11b);
