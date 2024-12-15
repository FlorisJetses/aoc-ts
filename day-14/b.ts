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
export async function day14b(data: string[]) {
  const results: number[] = []
  const mapWidth = 101
  const mapLength = 103

  const maxTries = mapLength * mapWidth

  const testVal = 32

  const attributes = parseData(data)

  const calcInMapPos = (max: number, val: number) => {
    if (val < 0){
      return ((val % max) + max) % max 
    } else {
      return (val % max) 
    }

  }

  for (let i = 0; i < maxTries; i++){
    const longest: {x: Record<number, number>, y: Record<number, number>} = {x: {}, y: {}}
    const locs: [number, number][] = []
    
  attributes.forEach(({p, v}) => {
    const endPosition = [p[0] + (v[0] * i), p[1] + (v[1] * i)] as [number,number]
    const endPosInBounds = [calcInMapPos(mapWidth, endPosition[0]), calcInMapPos(mapLength, endPosition[1])] as [number, number]
    

    locs.push(endPosInBounds)
    })

    locs.forEach((val) => {
      const [x, y] = val
      if (!longest.x?.[x]){
        longest.x[x] = 1
      } else {
        longest.x[x] = longest.x[x] + 1
      }
      if (!longest.y?.[y]){
        longest.y[y] = 1
      }else {
        longest.y[y] = longest.y[y] + 1
      }

    })

    const test = Object.keys(longest.x).filter((key) => {
      const length = longest.x[Number(key)]
      if (length < testVal) return false
      return true
    })

    const test2 = Object.keys(longest.y).filter((key) => {
      const length = longest.y[Number(key)]
      if (length < testVal) return false
      return true
    })

    test.forEach(key => {
      const findI = locs.some(coords => {
        const [x, y] = coords
        return Number(key) === x && test2.includes(`${y}`)
      })
      if (findI){
        results.push(i)
      }
    })

    // Object.keys(longest.x).forEach((key) => {
    //   const length = longest.x[Number(key)]
    //   if (length > testVal){
    //     results.push(i)
    //   }
    // })
    // Object.keys(longest.y).forEach((key) => {
    //   const length = longest.y[Number(key)]
    //   if (length > testVal){
    //     results.push(i)
    //   }
    // })
  }

  const set = new Set(results)

    console.log(set)


  return 0;
}

await runSolution(day14b);

