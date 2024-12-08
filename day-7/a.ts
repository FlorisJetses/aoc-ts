import { runSolution } from '../utils.ts';

const operators = ['*', '+']

/** provide your solution as the return of this function */
export async function day7a(data: string[]) {
  let sum = 0;
  data.forEach((line, x) => {
    const split = line.split(' ')
    const answer = Number(split[0].replace(':', ''))
    const values = split.toSpliced(0, 1)

    const tempAnswers: number[][] = [[]]
    const finalAnswers: number[] = []
    values.forEach((val, index) => {
      if (index === 0) {
        return
      }
      tempAnswers.push([])
      
      operators.forEach((operator, i) => {
        if (index === 1){
          const result = eval(val + operator + values[index -1]) as number
          if (index === values.length -1){
            finalAnswers.push(result)
          } else {
            tempAnswers[index][i] = result
          }
        } else {
          const previousAnswers = tempAnswers.at(index -1)
          previousAnswers.map((num) => {
            const result = eval(val + operator + num) as number
            if (index === values.length -1){
              finalAnswers.push(result)
            } else {
              tempAnswers[index].push(result)
            }
          })
        }

      })
    })

    if (finalAnswers.includes(answer)){
      sum += answer
    }
    
  })
  return sum;
}

await runSolution(day7a);
