import { runSolution, toMatrix, traverseMatrix } from '../utils.ts';

const parseMapAndDirections = (data: string[]) => {
    const mapLines: string[] = [];
    let directionInput: string = "";

    for (const line of data) {
      if (['v', '>', '<', '^'].some(val => line.startsWith(val))) {
        directionInput = `${directionInput}${line}`;
      } else {
        if (line !== '\r'){
          mapLines.push(line);
        }
      }
    }


  return {mapLines, directionInput}
}

type X = number
type Y = number

const directions: Record<'n' | 'e' | 's' |
 'w', [X, Y]> = {
  n: [0, -1],
  e: [1, 0],
  s: [0, 1],
  w: [-1, 0],
}

const moveDirection = (direction: string) => {
  if (direction === '<') return directions.w
  if (direction === '>') return directions.e
  if (direction === '^') return directions.n
  if (direction === 'v') return directions.s
} 

/** provide your solution as the return of this function */
export async function day15a(data: string[]) {
  const {directionInput, mapLines} = parseMapAndDirections(data)
  const map = toMatrix(mapLines)
  const robot = '@'
  const wall = '#'
  const box = 'O'
  const empty = '.'

  let currentPosition = {x: 0, y: 0}

  traverseMatrix(map, (val, x, y) => {
    if (val === robot){
      currentPosition = {x, y}
    }
  })

  directionInput.split('').forEach(direction => {
    const [x,y] = moveDirection(direction)
    const [newX, newY] = [x + currentPosition.x, y + currentPosition.y]
    
    const newPositionValue = map[newY][newX]

    if (newPositionValue === wall){
      return
    } else if (newPositionValue == box){

      return
    }
    map[currentPosition.y][currentPosition.x] = empty
    map[newY][newX] = robot
    currentPosition = {x: newX, y: newY}
  })

  return 0;
}

await runSolution(day15a);
