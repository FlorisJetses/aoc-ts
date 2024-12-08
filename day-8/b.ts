import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day8b(data: string[]) {
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
        const directions = [{x: location.x - loc.x, y: location.y - loc.y}, {x: loc.x - location.x, y: loc.y - location.y}]
        if (!uniqueLocs[loc.y]?.[loc.x]){
          uniqueLocs[loc.y] = {...uniqueLocs[loc.y], [loc.x]: true}
        }
        if (!uniqueLocs[location.y]?.[location.x]){
          uniqueLocs[location.y] = {...uniqueLocs[location.y], [location.x]: true}
        }

        directions.forEach(dir => {
          const {x: stepX, y: stepY} = dir
          let startPos = structuredClone(loc)
          while(true){
            const x = startPos.x + stepX
            const y = startPos.y + stepY
            const isValid = x < mapWidth && x >= 0 && y < mapLength && y >= 0
            if (!isValid) {
              break;
            }
            if (!uniqueLocs[y]?.[x]){
              uniqueLocs[y] = {...uniqueLocs[y], [x]: true}
            }
            startPos = {x, y}
          }
        })

      }
    })
  })

  Object.values(uniqueLocs).forEach(loc => {
    sum += Object.keys(loc).length
  })

  return sum;
}

await runSolution(day8b);
