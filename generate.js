const fs = require('fs').promises;
const generateIf = require('./generators/if');
const generateVarAssign = require('./generators/var_assign');
const generateForEach = require('./generators/for_each');
const generateArrayConversion = require('./generators/arrar_conversion');

let insideFunction = false;

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
      return generateVarAssign(node, generateLine, indent);
    case 'var_assign_standalone':
      const svariable = node.variable.value;
      const svalue = generateLine(node.value);
      const sassignmentOperator = node.assignmentOperator.value;
      let soptional = '';
      if (node.optional) {
        soptional = node.optional
          .map((arg, i) => {
            return generateLine(arg);
          })
          .join('');
        if (sassignmentOperator !== '=') {
          return `${svariable} ${sassignmentOperator} ${svalue}${soptional}`;
        } else {
          return `${svariable} ${sassignmentOperator} ${svalue}${soptional}`;
        }
      } else {
        if (sassignmentOperator !== '=') {
          return `${svariable} ${sassignmentOperator} ${svalue};`;
        } else {
          return `${svariable} ${sassignmentOperator} ${svalue};`;
        }
      }
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
          return `function ${functionName}(${arguments})`;
        } else {
          // if there are no arguments,
          // then we should probably just be calling the function
          return `${functionName}();`;
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
      insideFunction = true;
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
      const lambdaResult = `\nconst ${lambdaName} = (${params}) => {\n${indent(
        lambdaBody
      )}\n}`;
      insideFunction = false;
      return lambdaResult;
    case 'if_statement':
      return generateIf(node, generateLine, indent);
    case 'each_statement':
      return generateForEach(node, generateLine, indent, insideFunction);
    case 'map_statement':
      const mapArray = node.array[0].value;
      const mapManipulator = node.arguments.itemToManipulate.value;
      const mapBody = node.body
        .map((arg, i) => {
          const mapCode = generateLine(arg);
          if (i === node.body.length - 1) {
            return `return ${mapCode};`;
          } else {
            return `${mapCode};`;
          }
        })
        .join(';\n');
      return `${mapArray}.map((${mapManipulator}, i) => {\n${indent(
        mapBody
      )}\n})`;
    case 'math':
      const mathExp1 = node.exp1.value;
      const mathExp2 = node.exp2.value;
      const mathOperator = node.operator.value;
      return `${mathExp1} ${mathOperator} ${mathExp2};`;
    case 'reduce_statement':
      const reduceArray = node.array[0].value;
      const accum = node.arguments.accum.value;
      const cur = node.arguments.cur.value;
      const startAt = node.arguments.startAt.value;
      const reduceBody = node.body
        .map((arg, i) => {
          const reduceCode = generateLine(arg);
          if (i === node.body.length - 1) {
            return `return ${reduceCode}`;
          } else {
            return `${reduceCode}`;
          }
        })
        .join('\n');
      return `${reduceArray}.reduce((${accum}, ${cur}) => {\n${indent(
        reduceBody
      )}\n}, ${startAt})`;
    case 'math_expression':
      const meFunction = node.function;
      const meArg1 = node.arg1.value;
      const meArg2 = node.arg2.value;
      switch (meFunction) {
        case 'pow':
          return `Math.pow(${meArg1}, ${meArg2})`;
        default:
          return '';
      }
    case 'toString':
      return node.value;
    case 'object_assignment':
      arr = node.arr.value;
      return `Object.assign([], ${arr});`;
    case 'length':
      return node.value;
    case 'array_conversion':
      return generateArrayConversion(node, generateLine, indent);
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
