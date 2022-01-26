// A Narcissistic Number is a positive number which is the sum of its own digits, each raised to the power of
// the number of digits in a given base. In this Kata, we will restrict ourselves to decimal (base 10).
// For example, take 153 (3 digits), which is narcisstic:
// 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153

const narcissistic = (num) => {
		let s = num.toString()
		let l = s.length
		let total = 0;
		let result = false;
		let arr = Object.assign([], s);;
		arr.forEach((item) => {
		let i = item.toString();
		total += Math.pow(i, l);;
		return total
	})
		if (total === num) {
		result = true;
	} else {
		result = false;
	}
		return result
}

const pow = (num1, num2) => {
		return Math.pow(num1, num2)
}
let result = narcissistic(153);
console.log(result);