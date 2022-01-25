arr: = [1,2,3,4,5,6,7,8]

x = 5

addThree = (x) => {
  result = x + 3
  print(result)
}

map: arr (item, i) => {
  addThree(item)
}