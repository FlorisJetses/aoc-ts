import { runSolution, toMatrix, traverseMatrix } from '../utils.ts';

const trail = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const

type X = number
type Y = number

const directions: Record<string, [X, Y]> = {
  n: [0, -1],
  e: [1, 0],
  s: [0, 1],
  w: [-1, 0],
}

/** provide your solution as the return of this function */
export async function day10a(data: string[]) {
  let sum = 0;
  const map = toMatrix(data)
  const mapLength = map.length
  const mapWidth = map[0].length

  const isInBounds = (x: number, y: number) => x >= 0 && y >= 0 && x < mapWidth && y < mapLength

  const reachables: Record<Y, Record<X, Record<Y, Record<X, true>>>> = {}

  const findNextNode = (currentStep: number, currX: number, currY: number, startPos: [X, Y]) => {
    const trailPos = trail[currentStep]
    if (trailPos === '9'){
      const [x, y] = startPos
      // if (!reachables[y]?.[x]?.[currY]?.[currX]){
      //   reachables[y] = {...reachables[y], [x]: {...reachables[y]?.[x], [currY]: {...reachables[y]?.[x]?.[currY], [currX]: true}}}
        sum++
      // }
      return
    }
    Object.values(directions).forEach(([x, y]) => {
      const [newX, newY] = [currX + x, currY + y]
      if (!isInBounds(newX, newY)) return
      const newVal = map[newY][newX]
      if (newVal === trail[currentStep + 1]){
        findNextNode(currentStep + 1, newX, newY, startPos)
      }
    })
  }

  traverseMatrix(map, (val, x, y) => {
    if (val !== '0') return
      findNextNode(0, x, y, [x, y])
  })
  
  return sum;
}

await runSolution(day10a);
