import { getCoordinates, returnKey, runSolution } from '../utils.ts';
import { directionKey, Direction, cardinalDirections, turn180Degrees } from '../utils/directions.ts';
import { Graph } from '../utils/graph.ts';
import { Matrix } from '../utils/matrix.ts';
import { PriorityQueue, Queue } from '../utils/queue.ts';

const start = 'S'
const end = 'E'
const wall = '#'
const path = '.'

const turn = 1000
const move = 1

const directions = [directionKey.N, directionKey.E, directionKey.S, directionKey.W]

const returnKeyWithDirection = (key: string, direction: Direction) => `${key}-${direction}`

const weightedDirectionalGraph = (map: Matrix, start: string) => {
  const graph = new Graph<string>()
  const queue = new Queue<{key: string, direction: Direction}>()

  queue.enqueue({key: start, direction: directionKey.E})

  const visited = new Set<string>()

  while (!queue.empty()) {
    const current = queue.dequeue()

    const [x, y] = getCoordinates(current.key)
    visited.add(current.key)

    directions.forEach((dir) => {
      const [dx, dy] = cardinalDirections[dir] as [number, number]
      const [newX, newY] = [Number(x)+ dx, Number(y) + dy]
      const newVal = map.get(newX, newY)

      if (newVal === start || newVal === path || newVal === end) {
        if (dir === turn180Degrees(current.direction)) {
          return
        }

        const newKey = returnKeyWithDirection(returnKey(newX, newY), dir)

        let cost = move

        if (dir !== current.direction) {
          cost += turn
        }

        graph.addEdge(current.key, newKey, cost, dir)
        if (!visited.has(newKey)) {
          queue.enqueue({key: newKey, direction: dir})
        }
      }

    })
  }

  return graph

}


const dijkstra = (graph: Graph<string>, start: string) => {
  const frontier = new PriorityQueue<{key: string, cost: number}>((a, b) => a.cost - b.cost)
  frontier.enqueue({key: start, cost: 0})

  const cameFrom: Record<string, string> = {}
  cameFrom[start] = null

  const costSoFar: Record<string, number> = {}
  costSoFar[start] = 0

  while (!frontier.empty()) {
    const current = frontier.dequeue()

    for (const neighbor of graph.neighbors(current.key)) {
      const newCost = costSoFar[current.key] + graph.cost(current.key, neighbor.node);

      if (!(neighbor.node in costSoFar) || newCost < costSoFar[neighbor.node]) {
          costSoFar[neighbor.node] = newCost;
          frontier.enqueue({key: neighbor.node, cost: newCost});
          cameFrom[neighbor.node] = current.key;
      }
    }
  }

  return { cameFrom, costSoFar}
}

const dijkstraWithMultiplePaths = (graph: Graph<string>, start: string) => {
  const frontier = new PriorityQueue<{key: string, cost: number}>((a, b) => a.cost - b.cost)
  frontier.enqueue({key: start, cost: 0})

  const cameFrom: Record<string, string[]> = {}
  cameFrom[start] = null

  const costSoFar: Record<string, number> = {}
  costSoFar[start] = 0

  while (!frontier.empty()) {
    const current = frontier.dequeue()

    for (const neighbor of graph.neighbors(current.key)) {
      const newCost = costSoFar[current.key] + graph.cost(current.key, neighbor.node);

      if (newCost === costSoFar?.[neighbor.node]) {
        if (!cameFrom[neighbor.node].includes(current.key)) {
          cameFrom[neighbor.node].push(current.key)
        }
      }

      if (!(neighbor.node in costSoFar) || newCost < costSoFar[neighbor.node]) {
          costSoFar[neighbor.node] = newCost;
          frontier.enqueue({key: neighbor.node, cost: newCost});
          cameFrom[neighbor.node] = [current.key];
      }
    }
  }

  return { cameFrom, costSoFar}
}

/** provide your solution as the return of this function */
export async function day16b(data: string[]) {
  const map = new Matrix(data)

  let startPos = { x: 0, y: 0 }
  let endPos = { x: 0, y: 0 }

  map.traverse((val, x, y) => {
    if (val !== wall) {
      if (val === start) {
        startPos = { x, y }
      }
      if (val === end) {
        endPos = { x, y }
      }
  }
  })

  const startKey = returnKey(startPos.x, startPos.y)
  const endKey = returnKey(endPos.x, endPos.y)

  const graph = weightedDirectionalGraph(map, startKey)

  const { costSoFar, cameFrom } = dijkstraWithMultiplePaths(graph, startKey)


  const endKeyWithDirection = Object.keys(costSoFar).find(key => {
    const [x, y] = key.split('-')
    return returnKey(Number(x), Number(y)) === endKey
  })

  const totalPath: string[] = []


  const pathFinder = (start: string) => {
    if (start !== startKey) {
      totalPath.push(start)
        cameFrom[start].forEach(pathFinder)
    }
  }

  pathFinder(endKeyWithDirection)

  totalPath.push(startKey)


  const test = new Set<string>()

  totalPath.forEach((key) => {
    const [x, y] = key.split('-')
    test.add(returnKey(Number(x), Number(y)))
  })


  return test.size
}

await runSolution(day16b);
