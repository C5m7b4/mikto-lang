function generateVarAssign(node, generateLine, indent) {
  const variable = node.variable.value;
  const value = generateLine(node.value);
  const assignmentOperator = node.assignmentOperator.value;
  let optional = '';
  if (node.optional) {
    optional = node.optional
      .map((arg, i) => {
        return generateLine(arg);
      })
      .join('');
    if (assignmentOperator !== '=') {
      return `${variable} ${assignmentOperator} ${value}${optional}`;
    } else {
      return `let ${variable} ${assignmentOperator} ${value}${optional}`;
    }
  } else {
    if (assignmentOperator !== '=') {
      return `${variable} ${assignmentOperator} ${value}`;
    } else {
      return `let ${variable} ${assignmentOperator} ${value}`;
    }
  }
}

module.exports = generateVarAssign;
