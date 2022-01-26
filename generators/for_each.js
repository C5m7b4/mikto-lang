function generateForEach(node, generateLine, indent, insideFunction) {
  const eachArray = node.array[0].value;
  const manipulator = node.arguments.itemToManipulate.value;
  //const operateFunction = node.arguments.operateFunction.value;
  let eachBody = node.body
    .map((arg, i) => {
      const eachCode = generateLine(arg);
      if (i === node.body.length - 1) {
        return `return ${eachCode}`;
      } else {
        return eachCode;
      }
    })
    .join(';\n');
  if (insideFunction) {
    eachBody = indent(eachBody);
  }
  return `${eachArray}.forEach((${manipulator}) => {\n${indent(eachBody)}\n})`;
}

module.exports = generateForEach;
