const fs = require('fs').promises;
const lexer = require('./lexer.js');

async function main() {
  const filename = process.argv[2];
  if (!filename) {
    console.log('please provide a filename');
  }

  const code = (await fs.readFile(`src/${filename}.m`)).toString();
  lexer.reset(code);
  let token;
  while (true) {
    token = lexer.next();
    if (token) {
      console.log(token.type, JSON.stringify(token.value));
    } else {
      break;
    }
  }
}

main().catch((err) => console.log(err.stack));
