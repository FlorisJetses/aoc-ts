import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day4b(data: string[]) {
  let sum = 0;
  for(let x = 0; x < data[0].length; x++){
    if (x === 0 || x === data[0].length) {
      continue
    }
    for(let y = 0; y < data.length; y++){
      if (y === 0 || y === data.length) {
        continue
      }
      const value = data[y].charAt(x)
      if (value !== 'A') {
        continue
      }
      const diagonal1 = []
      const diagonal2 = []

      diagonal1.push(data[y - 1]?.charAt(x - 1))
      diagonal1.push('A')
      diagonal1.push(data[y + 1]?.charAt(x + 1))

      diagonal2.push(data[y - 1]?.charAt(x + 1))
      diagonal2.push('A')
      diagonal2.push(data[y + 1]?.charAt(x - 1))
      
      const val1 = diagonal1.join('')
      const val2 = diagonal2.join('')

      if (val1 !== "MAS" && val1 !== "SAM") {
        continue
      }
      if (val2 !== "MAS" && val2 !== "SAM") {
        continue
      }

      sum += 1
    }
  }
  return sum;
}

await runSolution(day4b);
