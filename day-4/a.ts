import { runSolution } from '../utils.ts';

const findXMAXorXMASReverse = (val: string) => {
  const xmas = val.match(/XMAS/g)
  const xmasReverse = val.match(/SAMX/g)

  return {xmas, xmasReverse}
}

const diagonal = (data: string[]) => {
  let sum = 0
    //find diagonal

  //based vertically
  data.forEach((row, index) => {
    const verticalRowArray = []
    let startPos = 0
    for(let y = index; y < data.length; y++){
        const value = data[y].charAt(startPos)
        if (value){
          verticalRowArray.push(value)
          startPos += 1
        }
    }
    const rowAsString = verticalRowArray.join('')
    const {xmasReverse, xmas} = findXMAXorXMASReverse(rowAsString)
    if (xmas) {
      sum += xmas.length
    }
    if(xmasReverse){
      sum += xmasReverse.length
    }
  })

  // based horizontally
  for(let i = 1; i < data[0].length; i++) {
    const horizontalBasedVerticalArray = []
    let startPos = i
    for(let y = 0; y < data.length; y++){
      const value = data[y].charAt(startPos)
      if (value){
        horizontalBasedVerticalArray.push(value)
        startPos += 1
      }
     
    }
    // console.log(horizontalBasedVerticalArray, 'horizontal')

    const rowAsString = horizontalBasedVerticalArray.join('')
    const {xmasReverse, xmas} = findXMAXorXMASReverse(rowAsString)
    if (xmas) {
      sum += xmas.length
    }
    if(xmasReverse){
      sum += xmasReverse.length
    }
  }

  return sum;
}

/** provide your solution as the return of this function */
export async function day4a(data: string[]) {
  let sum = 0

  //find horizontal
  data.forEach(val => {
    const {xmasReverse, xmas} = findXMAXorXMASReverse(val)
    if (xmas) {
      sum += xmas.length
    }
    if(xmasReverse){
      sum += xmasReverse.length
    }
  })

  //find vertical
  for(let i = 0; i < data[0].length; i++){
    const rowArray = []
    data.forEach(row => {
      rowArray.push(row[i])
    })
    const rowAsString = rowArray.join('')
    const {xmasReverse, xmas} = findXMAXorXMASReverse(rowAsString)
    if (xmas) {
      sum += xmas.length
    }
    if(xmasReverse){
      sum += xmasReverse.length
    }
  }

  const normalDiagonal = diagonal(data)
  const dataReverse = []
  data.forEach(row => {
    dataReverse.push(row.split('').reverse().join('').replace('\r', ''))
  })
 const reverseDiagonal = diagonal(dataReverse)

  return sum + normalDiagonal + reverseDiagonal;
}

await runSolution(day4a);

