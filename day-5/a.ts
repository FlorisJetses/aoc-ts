import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day5a(data: string[]) {
  let sum = 0;
  const splitIndex = data.findIndex((val) => val === '\r');
  const rules = data.slice(0, splitIndex);
  const updates = data.slice(splitIndex + 1, data.length);

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
      console.log(update);
      sum += middleNum;
    }
  });
  return sum;
}

await runSolution(day5a);
