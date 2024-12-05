import { runSolution } from '../utils.ts';

const safetyInspector = (arr: string[]) => {
  const isUnsafe = arr.some((val, index) => {
    if (index === 0) return false
    const previous = arr[index - 1]
    return !(((val - previous) > 0) && Math.abs(previous - val) <= 3)
  })
  return isUnsafe
}

/** provide your solution as the return of this function */
export async function day2b(data: string[]) {
  let sum = 0
  data.forEach(item => {
    let values = item.split(' ')
    if (!values[0]) return
    if (Number(values[values.length - 1]) <= Number(values[0])){
      values = values.reverse()
    }
    const isUnsafe = safetyInspector(values)
    if (!isUnsafe){
      sum += 1
    } else {
      let isSafe = false
      values.forEach((val, index) => {
        if (isSafe) return
        const newValues = [...values]
        newValues.splice(index, 1)
        const newIsUnsafe = safetyInspector(newValues)
        if (!newIsUnsafe){
          sum += 1
          isSafe = true
        }
      })
    }
  })
  return sum;
}

await runSolution(day2b);
