import { directions } from '../constants.ts';
import { returnKey, runSolution, toMatrix, traverseMatrix } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day16a(data: string[]) {
  const map = toMatrix(data)

  const start = 'S'
  const end = 'E'
  const wall = '#'

  const turn = 1000
  const move = 1

  let startPos = { x: 0, y: 0 }
  let endPos = { x: 0, y: 0 }

  const graph: Record<string, Record<string, string>> = {}

  traverseMatrix(map, (val, x, y) => {
    if (val !== wall) {
      const key = returnKey(x, y)
      graph[key] = {}

      Object.keys(directions).forEach((dir) => {
        const [dx, dy] = directions[dir]
        const [newX, newY] = [x + dx, y + dy]
        const newVal = map[newY]?.[newX]
        if (newVal && newVal !== wall) {
          const newKey = returnKey(newX, newY)

          graph[key] = { ...graph[key], [newKey]: dir}
        }
      })

      if (val === start) {
        startPos = { x, y }
      }
      if (val === end) {
        endPos = { x, y }
      }
  }
  })

  const visited = new Set<string>()
  const distances: Record<string, {distance: number, direction?: string, step?: number}> = {}

  const nodes = Object.keys(graph)
  const length = nodes.length

  for (const node of nodes) {
    distances[node] = {distance: Infinity}
  }

  const startKey = returnKey(startPos.x, startPos.y)
  distances[startKey] = {distance: 0, direction: 'e', step: 0}
  visited.add(startKey)

  while (nodes.length){
    nodes.sort((a, b) => distances[a].distance - distances[b].distance)
    const closestNode = nodes.shift()

    if (distances[closestNode].distance === Infinity) {
      break
    }

    visited.add(closestNode)

    for (const neighbor in graph[closestNode]) {
      let distance = 0;

      const currentDirection = distances[closestNode].direction
      const neighborDirection = graph[closestNode][neighbor]

      if (neighborDirection === currentDirection){
        distance = move
      } else {
        distance = turn + move
      }

      const newDistance = distances[closestNode].distance + distance

      if (visited.has(neighbor)) {
        console.log(distances[neighbor].distance, newDistance, closestNode, neighbor)
      }


      if (newDistance < distances[neighbor].distance) {
        if (visited.has(neighbor)) {
          continue
        }
        distances[neighbor] = {distance: newDistance, step: length - nodes.length, direction: neighborDirection}
      }
    }
  }

  const endKey = returnKey(endPos.x, endPos.y)


  const filteredDistances = Object.keys(distances).map(dist => {
    if (distances[dist].distance <= distances[endKey].distance){
      return {dist, ...distances[dist]}
    }
  }).filter(Boolean)

  // console.log(filteredDistances.filter(val => val.step < 13), distances[endKey])

  console.log(distances)



  return distances[endKey].distance;
}

await runSolution(day16a);
