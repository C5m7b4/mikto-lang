num1 = 5
num2 = 7

// here is how we do normal functions
print(num1)

print()

// here is how we do lambdas
main = (num1) => {
  print(num1)
}

// here is how we do if statements
if: num1 > num2 => {
  print(num1 " is greater than " num2)
}

if: num1 > num2 => {
  print(num1)
} else => {
  print(num2)
}

if: num1 > num2 => {
  print(num1)
} else if: num1 === num2 => {
  print("they are the same")
} else => {
  print(num2)
}


// arrays
names: [ "mike", 'tommy' ]

names1: ["mike" "tommy"]

// each statements
arr: [1,2,3,4,5,6,7]

addThree = (x) => {
  add(x 3)
}

each: arr (item, addThree) => {
  addThree(item)
}