import { runSolution } from '../utils.ts';

const directions = {
  up: [-1, 0],
  right: [0, 1],
  down: [1, 0],
  left: [0, -1]
}

/** provide your solution as the return of this function */
export async function day6a(data: string[]) {
  const map: string[][] = []
  data.forEach(row => map.push(row.replace('\r', '').split('')))

  const startPos = {x: 0, y: 0}
  map.forEach((row, idy) => {
    if (row.includes('^')){
      startPos.y = idy
      startPos.x = row.findIndex(val => val === '^')
    }
  })
  
  let isFinished = false
  let currentDirection: keyof typeof directions = 'up'
  let currentPos = startPos
  const uniquePositions: {x: number, y: number}[] = [startPos]

  while(!isFinished){
    if (currentPos.x > map[0].length -1 || currentPos.x < 0 || currentPos.y > map.length -1 || currentPos.y < 0 ){
      console.log('FINISHED', currentPos)
      isFinished = true
      break
    }

    if(!uniquePositions.some(pos => pos.x === currentPos.x && currentPos.y === pos.y)){
      uniquePositions.push({x: currentPos.x, y: currentPos.y})
    }

    const [y, x] = directions[currentDirection]
    const nextPos = {x: currentPos.x + x, y: currentPos.y + y}

    if (data[nextPos.y]?.[nextPos.x] === '#'){
      switch (currentDirection) {
        case 'up': 
          currentDirection =  'right'
          break
        case 'right': 
          currentDirection = 'down'
          break
        case 'down': 
          currentDirection = 'left'
          break;
        case 'left': 
          currentDirection = 'up'
          break
      }
      const [newY, newX] = directions[currentDirection]
      const newNextPos = {x: currentPos.x + newX, y: currentPos.y + newY}
      currentPos = newNextPos
    } else {
      currentPos = nextPos

    }
  }

  return uniquePositions.length;
}

await runSolution(day6a);
