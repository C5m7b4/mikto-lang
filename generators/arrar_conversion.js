function generateArrayConversion(node, generateLine, inset) {
  switch (node.method) {
    case 'set':
      const arg1 = node.arg1.value;
      const arg2 = node.arg2.value;
      const mathOperator = node.math_operator.value;
      return `Array.from(new Set(${arg1} ${mathOperator} ${arg2})).sort().join('')`;
  }
}

module.exports = generateArrayConversion;
