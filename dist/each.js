const arr = [1, 2, 3, 4, 5, 6, 7];

const add = (x, y) => {
	return x + y;
}

const addThree = (x) => {
	let result = add(x, 3);
	return console.log(result);
}
arr.forEach((item, undefined) => {
	addThree(item)
})