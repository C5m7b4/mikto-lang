s1 = 'aretheyhere'
s2 = 'yestheyarehere'

longest = (s1 s2) => {
  Array.from(new Set(s1 + s2)).sort().join('')
}

result = longest(s1 s2)
print(result)