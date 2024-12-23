import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day23a(data: string[]) {
  const stored: Record<string, Record<string, boolean>> = {}
  data.forEach(row => {
    const [val1, val2] = row.replace('\r', '').toLowerCase().split('-')

    stored[val1] = {...stored[val1], [val2]: true}
    stored[val2] = {...stored[val2], [val1]: true}
  })

  const interConnected = new Set<string>()

  data.forEach(row => {
    const [val1, val2] = row.replace('\r', '').toLowerCase().split('-')
    const connected1 = stored[val1]
    const connected2 = stored[val2]
    const filtered = Object.keys(connected1).filter(x => Object.keys(connected2).some(y => x === y && x !== val2 && y !== val1)
)
    filtered.forEach(val => {
      interConnected.add([val1, val2, val].sort().join())
    })
  })

  let count = 0;
  interConnected.forEach(key => {
    const test = key.split(',')
    for (const item of test){
      if (item.startsWith('t')){
        count++
        break;
      }
    }
  })
  return count;
}

await runSolution(day23a);
