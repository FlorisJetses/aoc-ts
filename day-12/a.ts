import { runSolution, toMatrix, traverseMatrix } from '../utils.ts';

type X = number
type Y = number

const directions: Record<string, [X, Y]> = {
  n: [0, -1],
  e: [1, 0],
  s: [0, 1],
  w: [-1, 0],
}

/** provide your solution as the return of this function */
export async function day12a(data: string[]) {
  const map = toMatrix(data)
  
  let sum = 0
  const locationsTraveled: string[] = []

  traverseMatrix(map, (plant, x, y) => {
    const location: [number, number] = [x, y]
    if (locationsTraveled.includes(location.join('-'))) return
    let regionSize = 0;
    let perimeter = 0;
 
    const findNextNode = (startPos: [number, number]) => {
      let sides = 4;
      regionSize++
      locationsTraveled.push(startPos.join('-'))
      const [locX, locY] = startPos

      Object.values(directions).forEach(dir => {
        const [dirX, dirY] = dir
        const newX = locX + dirX
        const newY = locY + dirY
        const newLocation = `${newX}-${newY}`
        const sideVal = map[newY]?.[newX]

        if (sideVal === plant){
          sides--
          if (!locationsTraveled.includes(newLocation)){
            findNextNode([newX, newY])
          }
        } 
      })
      perimeter += sides
    }
    findNextNode(location)
    sum += (regionSize * perimeter)
  })
  return sum;
}

await runSolution(day12a);
