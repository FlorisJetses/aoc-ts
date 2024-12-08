import { runSolution } from '../utils.ts';

const directions = {
  up: [-1, 0],
  right: [0, 1],
  down: [1, 0],
  left: [0, -1]
}

/** provide your solution as the return of this function */
export async function day6b(data: string[]) {
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

  let obstaclePossibilities = 0;
  const obstaclePositions = uniquePositions.toSpliced(0, 1)

  obstaclePositions.forEach((pos) => {
    let newIsFinished = false
    let newCurrentDirection: keyof typeof directions = 'up'
    let newCurrentPos = startPos
    let steps = 0
    const newMap = structuredClone(map)
    newMap[pos.y][pos.x] = '#'

  
    while(!newIsFinished){
      if (steps > 130 * 130){
        obstaclePossibilities++
        break
      }
      if (newCurrentPos.x > newMap[0].length -1 || newCurrentPos.x < 0 || newCurrentPos.y > newMap.length -1 || newCurrentPos.y < 0 ){
        newIsFinished = true
        break
      }
  
      const [y, x] = directions[newCurrentDirection]
      const nextPos = {x: newCurrentPos.x + x, y: newCurrentPos.y + y}
  
      if (newMap[nextPos.y]?.[nextPos.x] === '#'){
        switch (newCurrentDirection) {
          case 'up': 
          newCurrentDirection =  'right'
            break
          case 'right': 
          newCurrentDirection = 'down'
            break
          case 'down': 
          newCurrentDirection = 'left'
            break;
          case 'left': 
          newCurrentDirection = 'up'
            break
        }
        const [newY, newX] = directions[newCurrentDirection]
        const newNextPos = {x: newCurrentPos.x + newX, y: newCurrentPos.y + newY}
        if (newMap[newNextPos.y]?.[newNextPos.x] === '#'){
          switch (newCurrentDirection) {
            case 'up': 
            newCurrentDirection =  'right'
              break
            case 'right': 
            newCurrentDirection = 'down'
              break
            case 'down': 
            newCurrentDirection = 'left'
              break;
            case 'left': 
            newCurrentDirection = 'up'
              break
          }
        const [a, b] = directions[newCurrentDirection]
        const c = {x: newCurrentPos.x + b, y: newCurrentPos.y + a}
        newCurrentPos = c
        steps++
        } else {
          newCurrentPos = newNextPos
          steps++
        }

      } else {
        newCurrentPos = nextPos
        steps++
      }
    }
  })

  return obstaclePossibilities;
}

await runSolution(day6b);
