const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');
const { red, green, blud, magenta } = require('./utils/colors');

async function main() {
  // first parse all of our files
  const srcDir = path.join(__dirname, 'src');
  fs.readdirSync(srcDir).forEach((file) => {
    const filename = file.replace('.m', '');
    myExec(`node parse ${filename}`);
  });

  magenta('******************* done parsing files *****************');

  const astDir = path.join(__dirname, 'ast');
  fs.readdirSync(astDir).forEach((file) => {
    const astFilename = file.replace('.ast', '');
    myExec(`node generate ${astFilename}`);
  });

  magenta('***************** done generating files *******************');
}

async function myExec(command) {
  green(command);
  const output = await exec(command);
  if (output.stdout) {
    console.log(output.stdout);
  }
  if (output.stderr) {
    console.log(stderr);
  }
}

main().catch((err) => console.log(err.stack));
