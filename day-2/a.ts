import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day2a(data: string[]) {
  let sum = 0
  data.forEach(item => {
    let values = item.split(' ')
    if (!values[0]) return
    if (Number(values[1]) <= Number(values[0])){
      values = values.reverse()
    }
    const isUnsafe = values.some((val, index) => {
      if (index === 0) return false
      const previous = values[index - 1]
      return !(((val - previous) > 0) && Math.abs(previous - val) <= 3)
    })
    if (!isUnsafe){
      sum += 1
    }
  })
  return sum;
}

await runSolution(day2a);
