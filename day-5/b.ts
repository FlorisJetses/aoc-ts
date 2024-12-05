import { runSolution } from '../utils.ts';



/** provide your solution as the return of this function */
export async function day5b(data: string[]) {
  let sum = 0;
  const splitIndex = data.findIndex((val) => val === '\r');
  const rules = data.slice(0, splitIndex);
  const updates = data.slice(splitIndex + 1, data.length);

  const checkNumValidity = (num: string, index: number, row: string[]) => {
    let isValid = true
    rules.forEach((rule) => {
      const [first, second] = rule.split('|');
      const firstVal = first.trim();
      const secondVal = second.trim();
  
      if (secondVal !== num) return;
  
      const arrayBeforeIndex = row.slice(0, index);
  
      if (!row.includes(firstVal) || arrayBeforeIndex.includes(firstVal)) {
        // console.log()
      } else {
        isValid = false
      }
    });
    return isValid
  }

  const checkRowValidity = (row: string[]) => {
    let isValid = true;
    const allowed = [];

   row.forEach((num, index) => {
      if (!isValid || allowed.includes(num)) return;
      rules.forEach((rule, i) => {
        const [first, second] = rule.split('|');
        const firstVal = first.trim();
        const secondVal = second.trim();

        if (secondVal !== num && i === rules.length) allowed.push(num);
        if (secondVal !== num) return;

        const arrayBeforeIndex = row.slice(0, index);

        if (!row.includes(firstVal) || arrayBeforeIndex.includes(firstVal)) {
          allowed.push(num);
        } else {
          isValid = false;
        }
      });
    });
    return isValid
  }

  updates.forEach((row) => {
    const update = row.replace('\r', '').split(',');
    let isValid = true;
    const allowed = [];

    update.forEach((num, index) => {
      if (!isValid || allowed.includes(num)) return;
      rules.forEach((rule, i) => {
        const [first, second] = rule.split('|');
        const firstVal = first.trim();
        const secondVal = second.trim();

        if (secondVal !== num && i === rules.length) allowed.push(num);
        if (secondVal !== num) return;

        const arrayBeforeIndex = update.slice(0, index);

        if (!update.includes(firstVal) || arrayBeforeIndex.includes(firstVal)) {
          allowed.push(num);
        } else {
          isValid = false;
        }
      });
    });

    if (isValid) {
      const middleNum = Number(update.at(Math.floor(update.length / 2)));
    } else {
      let validOrder = update
      update.forEach((num, index) => {
        for(let i = 0; i < update.length; i++){
          const newOrder = validOrder.toSpliced(validOrder.findIndex(val => val === num),1).toSpliced(i, 0, num)
          const isNewNumPositionValid = checkNumValidity(num, i, newOrder)
          if (isNewNumPositionValid){
            validOrder = newOrder
            break
          }
        }
      })
      const middleNum = Number(validOrder.at(Math.floor(update.length / 2)));
      sum += middleNum

    }
  });
  return sum;
}

await runSolution(day5b);
