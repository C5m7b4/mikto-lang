let s1 = 'aretheyhere'
let s2 = 'yestheyarehere'

const longest = (s1, s2) => {
		return Array.from(new Set(s1 + s2)).sort().join('')
}
let result = longest(s1, s2)
console.log(result);