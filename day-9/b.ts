import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day9b(data: string[]) {
  let sum = 0;
  const input = data[0]

  const result: string[][]= []

  input.split('').forEach((char, index) => {
    const isID = index % 2 !== 0
    const actualIndex = index / 2

    if (!isID && char === '0'){
      console.log('test')
      result.push([String(actualIndex)])
      return
    }
    const val = (`${isID ? '.' : actualIndex},`.repeat(Number(char)).split(',').filter(Boolean))
    if (val.length){
      result.push(val)
    }
  })


  const reversed = result.toReversed()

  let newRes = structuredClone(result)

  for (let index = 0; index < result.length; index++) {
    const file = reversed[index]
    if (file[0] === '.') continue
    const i = newRes.findIndex(val => val.filter(x => x === '.').length >= file.length)
    if (i === -1){
      continue
    }
    const findIndex = newRes[i].findIndex(val => val === '.')
    if (findIndex === -1){
      continue
    }
    const isBigger = newRes[i].length - file.length
    newRes[i] = file

    if(isBigger > 0){
      newRes = newRes.toSpliced(i + 1, 0, Array(isBigger).fill('.'))
    }


    const test = Array(file.length).fill('/')
    const findLast = newRes.findLastIndex(val => val.length === file.length && file.join('') === val.join(''))
    newRes[findLast] = test
  }


  const flat = newRes.flat().filter(Boolean)



  flat.forEach((char, index) => {
    if (char === '.' || char === '/') return
    sum += (Number(char) * index)
  })

  return sum;
}

await runSolution(day9b);
