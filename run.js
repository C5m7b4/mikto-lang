const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs').promises;

async function main() {
  const filename = process.argv[2];
  if (!filename) {
    console.log('please supply a filename');
    return;
  }

  await myExec(`node parse.js ${filename}`);
  await myExec(`node generate.js ${filename}`);
  await myExec(`node dist/${filename}.js`);
}

async function myExec(command) {
  console.log(command);
  const output = await exec(command);
  if (output.stdout) {
    console.log(output.stdout);
  }
  if (output.stderr) {
    console.log(output.stderr);
  }
}

main().catch((err) => console.log(err.stack));
