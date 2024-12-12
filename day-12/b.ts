import { runSolution, toMatrix, traverseMatrix } from '../utils.ts';

type X = number
type Y = number

const directions: Record<string, [X, Y]> = {
  n: [0, -1],
  e: [1, 0],
  s: [0, 1],
  w: [-1, 0],
}

const diagonals: Record<string, [X, Y]> = {
  ne: [1, -1],
  se: [1, 1],
  sw: [-1, 1],
  nw: [-1, -1],
}

/** provide your solution as the return of this function */
export async function day12b(data: string[]) {
  const map = toMatrix(data)

  let sum = 0
  const locationsTraveled: string[] = []

  traverseMatrix(map, (plant, x, y) => {
    const location: [number, number] = [x, y]
    if (locationsTraveled.includes(location.join('-'))) return
    let regionSize = 0;
    let corners = 0;

    const findNextNode = (startPos: [number, number]) => {
      let sides = 0;
      regionSize++
      locationsTraveled.push(startPos.join('-'))
      const [locX, locY] = startPos
      let left = false
      let right = false
      let up = false
      let down = false

      Object.values(directions).forEach((dir, index) => {
        const [dirX, dirY] = dir
        const newX = locX + dirX
        const newY = locY + dirY
        const newLocation = `${newX}-${newY}`
        const sideVal = map[newY]?.[newX]

        if (sideVal === plant){
          sides++
          if (index === 0) up = true
          if (index === 1) right = true
          if (index === 2) down = true
          if (index === 3) left = true
          if (!locationsTraveled.includes(newLocation)){
            findNextNode([newX, newY])
          }
        }
      })
      const vertical = up && down
      const horizontal = left && right
      const plus = vertical && horizontal
      const corner = (horizontal && up || horizontal && down || vertical && left || vertical && right)
      const T = corner && sides === 3
      const L = !horizontal && !vertical && sides === 2

      if (sides === 0){
        corners += 4
      } else if (sides === 1){
        corners +=2
      } else if (L) {
        corners++
        Object.values(diagonals).forEach((dir, index) => {
          const [dirX, dirY] = dir
          const newX = locX + dirX
          const newY = locY + dirY
          const sideVal = map[newY]?.[newX]
          if (sideVal !== plant){
            if (up && right && index === 0) {
              corners++
            }
            if (right && down && index === 1) {
              corners++
            }
            if (down && left && index === 2) {
              corners++
            }
            if (left && up && index === 3) {
              corners++
            }
          }
        })
      } else if (T) {
        Object.values(diagonals).forEach((dir, index) => {
          const [dirX, dirY] = dir
          const newX = locX + dirX
          const newY = locY + dirY
          const sideVal = map[newY]?.[newX]
          if (sideVal !== plant){
            if (horizontal && up && index === 0){ corners++; console.log('up', index)}
            if (horizontal && up && index === 3) {corners++; console.log('up', index)}

            if (right && vertical && index === 1) {corners++; console.log('right', index)}
            if (right && vertical && index === 0) {corners++; console.log('right', index)}

            if (down && horizontal && index === 1) {corners++; console.log('down', index)}
            if (down && horizontal && index === 2){ corners++; console.log('down', index)}

            if (left && vertical && index === 2) {corners++; console.log('left', index)}
            if (left && vertical && index === 3){ corners++; console.log('left', index)}
          }
        })
      } else if (plus) {
        Object.values(diagonals).forEach((dir) => {
          const [dirX, dirY] = dir
          const newX = locX + dirX
          const newY = locY + dirY
          const sideVal = map[newY]?.[newX]
          if (sideVal !== plant){
            corners++
          }
        })
      }
    }
    findNextNode(location)
    sum += (regionSize * corners)
  })
  return sum;
}

await runSolution(day12b);
