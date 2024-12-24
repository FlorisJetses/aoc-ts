import { runSolution } from '../utils.ts';

type BitWiseOperations = 'AND' | 'OR' | 'XOR'

type GateOperation = {
  input1: string;
  input2: string;
  operation: BitWiseOperations;
  result: string;
};


export async function day24a(data: string[]) {
  const variables: Record<string, number> = {};
  const operations: GateOperation[] = [];

  data.forEach(line => {
    const varMatch = line.match(/(\w+):\s*(\d)/);
    const gateMatch = line.match(/(\w+)\s(AND|OR|XOR)\s(\w+)\s->\s(\w+)/);

    if (varMatch) {
      const [, variable, value] = varMatch;
      variables[variable] = parseInt(value);
    }

    if (gateMatch) {
      const [, input1, operation, input2, result] = gateMatch;
        operations.push({ input1, input2, operation: operation as BitWiseOperations, result });
    }
  });

  const results: Record<string, number> = {}
  let isFinished = true;

  const calculateOperations = () => {
    operations.forEach((operation) => {
      const input1 = variables[operation.input1]
      const input2 = variables[operation.input2]

      if (input1 === undefined || input2 === undefined || results[operation.result] !== undefined){
        return
      }
      isFinished = false

      // const index = parseInt(operation.result.substring(1))
      let result = 0;

      if (operation.operation === 'AND'){
        result = input1 & input2
      } else if (operation.operation === 'OR') {
        result = input1 | input2
      } else if (operation.operation === 'XOR'){
        result = input1 ^ input2
      }

      // console.log(input1, operation.operation, input2, ' = ', operation.result, result)

      if (!variables[operation.result]){
        variables[operation.result] = result
      }
      results[operation.result] = result
    })
    if (!isFinished){
      isFinished = true
      calculateOperations()
    }
  }
  calculateOperations()

  const ZResults: number[] = []

  Object.keys(results).forEach(key => {
    if (key.startsWith('z')){
      const index = parseInt(key.substring(1))
      ZResults[index] = results[key]
    }
  })


  const actualNumber = parseInt(ZResults.toReversed().join(''), 2)

  return actualNumber;
}

await runSolution(day24a);
