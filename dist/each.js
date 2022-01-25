const arr = [1, 2, 3, 4, 5, 6, 7];
const addThree = (x) => {
	return function add(x, 3);
};
arr.forEach((item, addThree) => {
	addThree(item);
})