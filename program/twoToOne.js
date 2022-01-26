const arg1 = 'aretheyhere';
const arg2 = 'yestheyarehere';

function longest(s1, s2) {
  const d1 = distinct(s1, []);
  const d2 = distinct(s2, d1);
  return d2
    .sort()
    .map((i) => {
      return i;
    })
    .join('');
}

function distinct(arg, existingArray) {
  const arr = Object.assign([], arg);
  arr.forEach((item) => {
    if (!existingArray.includes(item)) {
      existingArray.push(item);
    }
  });
  return existingArray;
}

result = longest(arg1, arg2);
console.log('result=', result);
