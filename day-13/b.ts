import { runSolution } from '../utils.ts';

type Root = Root2[]

interface Root2 {
  buttons: Button[]
  prize: Prize
}

interface Button {
  button: string
  coordinates: Coordinates
}

interface Coordinates {
  x: number
  y: number
}

interface Prize {
  x: number
  y: number
}

const returnKey = (x: number, y: number) => `${x}-${y}`
const getCoordinates = (key: string) => key.split('-').map((num) => parseInt(num)) as [number, number]

type Machine = {
  a: [number, number],
  b: [number, number],
  prize: [number, number]
};

/** provide your solution as the return of this function */
export async function day13b(data: string[]) {
  const machines = processInputArray(data) as Root
  let sum = 0;

  // A = (p_x*b_y - prize_y*b_x) / (a_x*b_y - a_y*b_x)
  // B = (a_x*p_y - a_y*p_x) / (a_x*b_y - a_y*b_x)


  machines.forEach((machine) => {
    const buttonA = machine.buttons.find((button) => button.button === 'A').coordinates
    const buttonB = machine.buttons.find((button) => button.button === 'B').coordinates
    const prize =  machine.prize

    console.log(buttonA, buttonB, prize)

    function solve_machine(machine: Machine, offset: number): number {
      // Adjust the prize coordinates with the offset
      const prize: [number, number] = [machine.prize[0] + offset, machine.prize[1] + offset];

      // Calculate the determinant (det)
      const det = machine.a[0] * machine.b[1] - machine.a[1] * machine.b[0];

      // Calculate the values of a and b
      const a = (prize[0] * machine.b[1] - prize[1] * machine.b[0]) / det;
      const b = (machine.a[0] * prize[1] - machine.a[1] * prize[0]) / det;

      const roundedA = Math.round(a);
      const roundedB = Math.round(b);

      // Check if the result matches the prize
      if (
        machine.a[0] * roundedA + machine.b[0] * roundedB === prize[0] &&
        machine.a[1] * roundedA + machine.b[1] * roundedB === prize[1]
      ) {
        return roundedA * 3 + roundedB
      } else {
        return 0;
      }
    }

    const test = solve_machine({prize: [prize.x, prize.y], a: [buttonA.x, buttonA.y], b: [buttonB.x, buttonB.y]}, 10000000000000)

    sum += test
  })

  return sum;
}

await runSolution(day13b);



// Helper function to parse the coordinates from the input string
function parseCoordinates(input: string): { x: number, y: number } {
  const match = input.match(/X([+-]?\d+), Y([+-]?\d+)/);
  if (match) {
    return { x: parseInt(match[1]), y: parseInt(match[2]) };
  }
  return { x: 0, y: 0 }; // Default value if no match found
}

// Function to process the array
function processInputArray(arr: string[]): any[] {
  const result: any[] = [];
  let currentSection: any = { buttons: [], prize: null };

  arr.forEach((item) => {
    if (item === '') {
      // Empty string indicates end of section, push the section and reset
      if (currentSection.buttons.length > 0 || currentSection.prize) {
        result.push(currentSection);
        currentSection = { buttons: [], prize: null };
      }
    } else if (item.startsWith('Button A')) {
      // Extract coordinates for Button A
      currentSection.buttons.push({ button: 'A', coordinates: parseCoordinates(item) });
    } else if (item.startsWith('Button B')) {
      // Extract coordinates for Button B
      currentSection.buttons.push({ button: 'B', coordinates: parseCoordinates(item) });
    } else if (item.startsWith('Prize')) {
      // Extract coordinates for the prize
      const matchPrize = item.match(/X=(\d+), Y=(\d+)/);
      if (matchPrize) {
        currentSection.prize = { x: parseInt(matchPrize[1]), y: parseInt(matchPrize[2]) };
      }
    }
  });

  // Add any remaining section if the array doesn't end with an empty string
  if (currentSection.buttons.length > 0 || currentSection.prize) {
    result.push(currentSection);
  }

  return result;
}
