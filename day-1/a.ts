import { runSolution } from '../utils.ts';

const sortNumberAscending = (a: number, b: number) => a - b

/** provide your solution as the return of this function */
export async function day1a(data: string[]) {
  let sum = 0
  const firstList = []
  const secondList = []

  data.forEach((item) => {
    const [firstValue, secondValue] = item.split(' ').filter(Boolean)
    if (firstValue && secondValue){
      firstList.push(firstValue)
      secondList.push(secondValue.replace('\r', ''))
    }

  })
  firstList.sort(sortNumberAscending)
  secondList.sort(sortNumberAscending)

  firstList.forEach((val, index) => {
    const secondListValue = secondList[index]
    sum += Math.abs(Number(val) - Number(secondListValue))
  })
  return sum;
}

await runSolution(day1a);
