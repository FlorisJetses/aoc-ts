import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day1b(data: string[]) {
  let sum = 0
  const firstList: string[] = []
  const secondList: string[] = []

  data.forEach((item) => {
    const [firstValue, secondValue] = item.split(' ').filter(Boolean)
    if (firstValue && secondValue){
      firstList.push(firstValue)
      secondList.push(secondValue.replace('\r', ''))
    }

  })
  const similarities = {}
  
  firstList.forEach((val) => {
    if (similarities[val]){
      sum += similarities[val]
    } else {
      const occurrences = secondList.filter(x => x === val).length
      const result = Number(val) * Number(occurrences)
      similarities[val] = result
      sum += result
    }

  })

  return sum;
}

await runSolution(day1b);
