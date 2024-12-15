import { runSolution } from '../utils.ts';

const parseData = (data: string[]): { p: [number, number], v: [number, number] }[] => {

  // Parse each line into an object with p and v arrays
  const result = data.map(line => {
    const [pStr, vStr] = line.trim().split(' ') // Split the line by space into position (p) and velocity (v)
    
    const p = pStr.split('=')[1].split(',').map(Number) as [number, number]; // Convert position to [x, y]
    const v = vStr.split('=')[1].split(',').map(Number) as [number, number]; // Convert velocity to [x, y]
    
    return { p, v };
  });

  return result;
};


/** provide your solution as the return of this function */
export async function day14a(data: string[]) {
  let sum = 1;
  const steps = 100
  const mapWidth = 101
  const mapLength = 103

  const attributes = parseData(data)

  const calcInMapPos = (max: number, val: number) => {
    if (val < 0){
      return ((val % max) + max) % max 
    } else {
      return (val % max) 
    }

  }

  const middleX = Math.ceil(mapWidth / 2) - 1
  const middleY = Math.ceil(mapLength / 2) - 1

  // nw, ne, sw, se
  const robotsInQuadrants = [0, 0, 0, 0]

  const addToQuadrant = (coords: [number, number]) => {
  const [x, y] = coords
      if (x < middleX){
        if (y < middleY){
          robotsInQuadrants[0] = robotsInQuadrants[0] + 1
          return
        } else if (y > middleY) {
          robotsInQuadrants[2] = robotsInQuadrants[2] + 1
          return
        }
      } else if (x > middleX){
        if (y < middleY){
          robotsInQuadrants[1] = robotsInQuadrants[1] + 1
          return
        } else if (y > middleY) {
          robotsInQuadrants[3] = robotsInQuadrants[3] + 1
          return
        }
      }
      console.log(coords)
  }

  attributes.forEach(({p, v}) => {
    const endPosition = [p[0] + (v[0] * steps), p[1] + (v[1] * steps)]
    const endPosInBounds = [calcInMapPos(mapWidth, endPosition[0]), calcInMapPos(mapLength, endPosition[1])] as [number, number]
    addToQuadrant(endPosInBounds)

    console.log(endPosition, endPosInBounds)
    })
    
    
    robotsInQuadrants.forEach(q => {
      sum = sum * q
    })

  console.log(robotsInQuadrants)
  return sum;
}

await runSolution(day14a);

