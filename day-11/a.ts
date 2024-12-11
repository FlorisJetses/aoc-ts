import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day11a(data: string[]) {
  const stones = data[0].split(' ')

  let oldArr = structuredClone(stones)
  let newArr = []

  const steps = 25

  for(let i = 0; i < steps; i++){
    oldArr.forEach(stone => {
      const num = Number(stone)
      if (num === 0){
        newArr.push(String(1))
        return
      } else if (stone.length % 2 === 0){
       const removeLeadingZeroes =  stone.substring(stone.length / 2).replace(/^0+/, '')
        newArr.push(stone.substring(0, stone.length / 2), removeLeadingZeroes.length === 0 ? '0' : removeLeadingZeroes)
        return
      } else {
        newArr.push(String(BigInt(String(num)) * BigInt(2024)))
      } 
    })

    oldArr = structuredClone(newArr)
    newArr = []
  }

  return oldArr.length;
}

await runSolution(day11a);
