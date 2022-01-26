const arr = [1, 2, 3, 4, 5, 6, 7, 8];
let x = 5;

const addThree = (x) => {
	let result = x + 3;;
	return result
}
let results = arr.map((item, i) => {
	return addThree(item);
});
console.log("results", results);