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

/** provide your solution as the return of this function */
export async function day13a(data: string[]) {
  const machines = processInputArray(data) as Root
  const costA = 3
  const costB = 1
  let sum = 0;

  machines.forEach((machine, i) => {
    const buttonA = machine.buttons.find((button) => button.button === 'A').coordinates
    const buttonB = machine.buttons.find((button) => button.button === 'B').coordinates
    const prize = machine.prize
    const traveled: Record<string, number> = {}

    const buttons = [buttonA, buttonB]
    const tempAnswers: Record<string, {cost: number, a: number, b: number}>[][] = []

    let step = 0;
    const answers: number[] = []

    const pressButton = (index: number, button: 'a' | 'b') => {
      if (index === 0 && button === 'a'){
        return 1
      } else if (index === 1 && button === 'b') {
        return 1
      }
      return 0
    }
  let isFinished = false

  while(!isFinished){
    buttons.forEach((button, index) => {
      // if (isFinished) return
      const cost = index === 0 ? costA : costB

      if (step === 0){
        const key = returnKey(button.x, button.y)
        tempAnswers[step] = ([{[key]: {cost, a: pressButton(index, 'a'), b: pressButton(index, 'b')}}])
        traveled[key] = cost
      } else {
        const previousAnswers = tempAnswers[step - 1]

        if (!previousAnswers){
          isFinished = true
          if (i === 0){
            // console.log('no prev answers', step, tempAnswers[step - 4])
          }
          return
        }

        previousAnswers.forEach((ans, ansI) => {
          const [x,y] = getCoordinates(Object.keys(ans)[0])
          const ansCost = Object.values(ans)[0].cost + cost
          const newX = button.x + x
          const newY = button.y + y

          const key = returnKey(newX, newY)
          const shouldContinue = !(newX > prize.x || newY > prize.y)
          if (newX > prize.x || newY > prize.y){
            console.log('wrong', shouldContinue)
          }

          if (ansI === 0 && index === 0){
            tempAnswers[step] = []
          }

          if (newX === prize.x && newY === prize.y) {
            answers.push(ansCost)
            // console.log('finished wooohooo', step)
            return
          } else if ((!traveled[key] || (traveled[key] && ansCost < traveled[key])) && shouldContinue){

            const newAPresses = Object.values(ans)[0].a + pressButton(index, 'a')
            const newBPresses = Object.values(ans)[0].b + pressButton(index, 'b')
            if (newAPresses === 80 && i === 0){
              // console.log(key)
            }

            // if (newAPresses > 100 && newBPresses > 100){
            //   return
            // }
            // if (newAPresses > 100 && index === 0){
            //   return
            // }
            // if (newBPresses > 100 && index === 1){
            //   return
            // }
            const val = {[key]: {cost: ansCost,a: newAPresses, b: newBPresses }}
            // if (i === 0) {
            //   console.log(val, ans)
            // }
            tempAnswers[step].push(val)
            traveled[key] = ansCost
            return
          }
        })
      }

      // pressButton(index)
    })
    step++

  }

  // if (i === 0){
  //   console.log(traveled)
  // }




    // let unreachable = false

    // while (true){
    //   const step = buttonAPressed + buttonBPressed
    //   if (buttonAPressed > 100 || buttonBPressed > 0){
    //     unreachable = true
    //     break;
    //   }
    //   if (step === 0){

    //   }

    // }

  const leastTokens =  answers.sort((a,b) => a - b)?.[0]

  if (leastTokens){
    sum += leastTokens
  }

  })

  return sum;
}

await runSolution(day13a);



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
