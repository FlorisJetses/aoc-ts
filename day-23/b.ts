import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day23b(data: string[]) {
  const stored: Record<string, Record<string, boolean>> = {}

  data.forEach(row => {
    const [val1, val2] = row.replace('\r', '').toLowerCase().split('-')

    stored[val1] = {...stored[val1], [val2]: true}
    stored[val2] = {...stored[val2], [val1]: true}
  })

  const cliques: Set<string>[] = []

  const getVertices = (candidates: Set<string>, edges: string[]) => {
    const newSet = new Set<string>()
    edges.forEach(e => {
      if (candidates.has(e)){
        newSet.add(e)
      }
    })

    return newSet
  }
 

  const BronKerbosch = (clique: Set<string>, candidates: Set<string>, visited: Set<string>) => {
    if (!candidates.size && !visited.size){
      cliques.push(clique)
      return
    }
    candidates.forEach(candidate => {
      BronKerbosch(new Set(clique).add(candidate), getVertices(candidates, Object.keys(stored[candidate])), getVertices(visited, Object.keys(stored[candidate])))
      candidates.delete(candidate)
      visited.add(candidate)
    })
    
  }

  BronKerbosch(new Set(), new Set(Object.keys(stored)), new Set())

  const biggest = cliques.sort((a, b) => a.size - b.size).at(-1)

  const test = Array.from(biggest).sort().join()
  return test;
}

await runSolution(day23b);
