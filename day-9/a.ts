import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day9a(data: string[]) {
  let sum = 0;
  const input = data[0]

  const result = []

  input.split('').forEach((char, index) => {
    const isID = index % 2 !== 0
    const actualIndex = index / 2

    if (!isID && char === '0'){
      console.log('test')
      result.push(String(actualIndex))
      return
    }
    if (isID){
      result.push(...(`${isID ? '.' : actualIndex},`.repeat(Number(char)).split(',').filter(Boolean)))
    } else {
      result.push(...(`${isID ? '.' : actualIndex},`.repeat(Number(char)).split(',').filter(Boolean)))
    }

  })
  console.log(result)

  const idealStringLength = result.filter(val => val !== '.').length

  let lastIndex: number;
  const newArr = []

  for(let i = 0; i < idealStringLength; i++){
    const char = result[i]
    if (char !== '.'){
      newArr[i] = char
    } else {
      const charIndex = result.findLastIndex((val, index) => val !== '.' && (!(typeof lastIndex === 'number') || index < lastIndex))
      lastIndex = charIndex
      newArr[i] = result[charIndex]
    }
  }


  newArr.forEach((val, index) => {
    sum += (Number(val) * index)
  })

  return sum;
}

await runSolution(day9a);
