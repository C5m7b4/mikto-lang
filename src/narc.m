// A Narcissistic Number is a positive number which is the sum of its own digits, each raised to the power of
// the number of digits in a given base. In this Kata, we will restrict ourselves to decimal (base 10).
// For example, take 153 (3 digits), which is narcisstic:
// 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153

narcissistic = (num) => {
  s = num.toString()
  l = s.length
  total = 0
  result = false

  arr = Object.assign([], s)

  each: arr (item) => {
    i = item.toString()
    total += Math.pow(i, l)
    total
  }

  if: total === num => {
    result := true
  } else => {
    result := false
  }

  result
}

pow = (num1 num2) => {
  Math.pow(num1, num2)
}

result = narcissistic(153)
print(result)