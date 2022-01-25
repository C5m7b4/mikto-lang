let x = 5;
let y = 10;

const add = (x, y) => {
	return x + y;
}

const test = () => {
	let sum = add(x, y);
	return console.log(sum);
}

test();