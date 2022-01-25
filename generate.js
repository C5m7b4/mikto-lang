const fs = require('fs').promises;
const generateIf = require('./generators/if');

async function main() {
  const filename = process.argv[2];
  if (!filename) {
    console.log('please provide a filename');
    return;
  }

  const astCode = (await fs.readFile(`ast/${filename}.ast`)).toString();
  const ast = JSON.parse(astCode);
  const jsCode = generate(ast);
  await fs.writeFile(`dist/${filename}.js`, jsCode);
  console.log(`wrote dist/${filename}.js`);
}

function generate(ast) {
  const lines = [];
  for (let statement of ast) {
    const line = generateLine(statement);
    lines.push(line);
  }
  return lines.join('\n');
}

function generateLine(node) {
  switch (node.type) {
    case 'comment':
      return node.value;
    case 'var_assign':
      const variable = node.variable.value;
      const value = generateLine(node.value);
      return `let ${variable} = ${value};`;
    case 'function_call':
      const functionName = node.function_name.value;
      const arguments =
        node.arguments && node.arguments.map(generateLine).join(', ');
      if (functionName === 'print') {
        if (arguments) {
          return `console.log(${arguments});`;
        } else {
          return `console.log();`;
        }
      } else {
        if (arguments) {
          return `\nfunction ${functionName}(${arguments})`;
        } else {
          // if there are no arguments,
          // then we should probably just be calling the function
          return `\n${functionName}();`;
        }
      }
    case 'internal_function_call':
      const internalFunctionName = node.function_name.value;
      const internalArguments = node.arguments.map(generateLine).join(', ');
      if (internalFunctionName === 'print') {
        if (internalArguments) {
          return `console.log(${internalArguments});`;
        } else {
          return `console.log();`;
        }
      } else {
        if (internalArguments) {
          return `${internalFunctionName}(${internalArguments})`;
        } else {
          return `${internalFunctionName}()`;
        }
      }
    case 'string':
      return node.value;
    case 'number':
      return node.value;
    case 'identifier':
      return node.value;
    case 'array':
      const arrayName = node.name.value;
      const arrayContents = node.contents
        .map((arg) => {
          const regExpArray = new RegExp("'", 'g');
          let result = generateLine(arg);
          return result.replace(regExpArray, '"');
        })
        .join(', ');
      return `const ${arrayName} = [${arrayContents}];`;
    case 'lambda':
      const lambdaName = node.lambda_name.value;
      const params = node.params.map(generateLine).join(', ');
      const lambdaBody = node.body
        .map((arg, i) => {
          const lambdaCode = generateLine(arg);
          if (i === node.body.length - 1) {
            return `\treturn ${lambdaCode}`;
          } else {
            return `\t${lambdaCode}`;
          }
        })
        .join('\n');
      return `\nconst ${lambdaName} = (${params}) => {\n${lambdaBody}\n}`;
    case 'if_statement':
      return generateIf(node, generateLine, indent);
    case 'each_statement':
      const eachArray = node.array[0].value;
      const manipulator = node.arguments.itemToManipulate.value;
      const operateFunction = node.arguments.operateFunction.value;
      const eachBody = node.body.map(generateLine).join(';\n');
      return `${eachArray}.forEach((${manipulator}, ${operateFunction}) => {\n${indent(
        eachBody
      )}\n})`;
    case 'math':
      const mathExp1 = node.exp1.value;
      const mathExp2 = node.exp2.value;
      const mathOperator = node.operator.value;
      return `${mathExp1} ${mathOperator} ${mathExp2};`;
    default:
      console.log(`unknown node type detected: ${node.type}`);
  }
}

function indent(string) {
  return string
    .split('\n')
    .map((l) => `\t${l}`)
    .join('\n');
}

main().catch((err) => console.log(err.stack));
