import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day8a(data: string[]) {
  let sum = 0;
  const map = data.map(row => {
    if (row.length){
     return row.replace('\r', '').split('')
    }
  }).filter(Boolean)
  const mapLength = map.length
  const mapWidth = map[0].length

  const frequencies: Record<string | number, {locations: {x: number; y: number}[]}> = {}
  for(let y = 0; y < mapLength; y++){
    for (let x = 0; x < mapWidth; x++){
      const value = map[y][x]

      if (!value) continue

      const match = value.match(/[0-9a-zA-Z]/g)
      if(match){
        if (!frequencies[value]){
          frequencies[value] = {locations: [{x, y}]}
        } else {
          frequencies[value].locations.push({x, y})
        }
      }
    }
  }

  const uniqueLocs: Record<number, Record<number, boolean>> = {}

  Object.values(frequencies).forEach(freq => {
    freq.locations.forEach((loc, index) => {
      for(let i = 0; i < freq.locations.length - (index + 1); i++){
        const location = freq.locations[i + 1 + index]
        const yDiff = Math.abs(loc.y - location.y)
        const xDiff = Math.abs(loc.x - location.x)

        const point1 = {x: loc.x < location.x ? loc.x - xDiff : loc.x + xDiff, y: loc.y - yDiff}
        const point2 = {x: loc.x < location.x ? location.x + xDiff : location.x - xDiff, y: location.y + yDiff}
        if (!uniqueLocs[point1.y]?.[point1.x]){
          if (point1.x < mapWidth && point1.x >= 0 && point1.y < mapLength && point1.y >= 0){
            uniqueLocs[point1.y] = {...uniqueLocs[point1.y], [point1.x]: true}
          }
        }

        if (!uniqueLocs[point2.y]?.[point2.x]){
          if (point2.x < mapWidth && point2.x >= 0 && point2.y < mapLength && point2.y >= 0){
            uniqueLocs[point2.y] = {...uniqueLocs[point2.y], [point2.x]: true}
          }
        }

      }
    })
  })
  Object.values(uniqueLocs).forEach(loc => {
    sum += Object.keys(loc).length
  })
  return sum;
}

await runSolution(day8a);
