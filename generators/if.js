function generateIf(node, generateLine, indent) {
  const param1 = node.params.param1.value;
  const param2 = node.params.param2.value;
  const operator = node.params.operator.value;
  const elseIfBody = generateElseIf(node.elseif, generateLine);
  const elseBody = generateElse(node.else, generateLine);

  const ifBody = node.body
    .map((arg, i) => {
      const ifCode = generateLine(arg);
      return ifCode;
    })
    .join(';\n');

  if (param2) {
    if (elseBody) {
      return `if (${param1} ${operator} ${param2}) {\n${indent(
        ifBody
      )}\n} else {\n${indent(elseBody)}\n}`;
    } else if (elseIfBody) {
      return `if (${param1} ${operator} ${param2}) {\n${indent(
        ifBody
      )}\n} else if ${elseIfBody} \nelse {\n${indent(elseBody)}\n}`;
    } else {
      return `if (${param1} ${operator} ${param2}) {\n${indent(ifBody)}\n};`;
    }
  } else {
    if (elseBody) {
      return `if (${param1}) {\n${indent(ifBody)}\n} else {\n${indent(
        elseBody
      )}\n}`;
    } else if (elseIfBody) {
      return `if (${param1}) {\n${indent(
        ifBody
      )}\n} else if ${elseIfBody} else {\n${indent(elseBody)}\n}`;
    } else {
      return `if (${param1}) {\n${indent(ifBody)}\n};`;
    }
  }
}

function generateElseIf(node, generateLine) {
  if (node.arguments) {
    const arg1 = node.arguments.param1.value;
    const arg2 = node.arguments.param2.value;
    const operator = node.arguments.operator.value;
    elseIfBody = node.body.map((arg, i) => {
      const elseIfCode = generateLine(arg);
      return elseIfCode;
    });
    if (arg2) {
      return `else if (${arg1} ${operator} ${arg2}) {\n\t${elseIfBody}\n}`;
    } else {
      return `else if (${arg1}) {\n\t${elseIfBody}\n}`;
    }
  } else {
    return '';
  }
}

function generateElse(node, generateLine) {
  return (
    node.body &&
    node.body
      .map((arg, i) => {
        const elseCode = generateLine(arg);
        return elseCode;
      })
      .join(';\n')
  );
}

module.exports = generateIf;
