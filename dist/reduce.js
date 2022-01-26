const arr = [1, 2, 3];
let result = arr.reduce((accum, cur) => {
	return accum + cur;
}, 0);
console.log(result);