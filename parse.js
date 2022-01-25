const nearley = require('nearley');
const fs = require('fs').promises;
const grammar = require('./grammar/grammar.js');

async function main() {
  const filename = process.argv[2];
  if (!filename) {
    console.log('please provide a filename');
    return;
  }

  const code = (await fs.readFile(`src/${filename}.m`)).toString();
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

  parser.feed(code);
  if (parser.results === 0) {
    console.log('end of file detected');
  } else if (parser.results > 1) {
    console.log('ambiguous grammar detected');
    for (let i = 0; i < parser.results.length; i++) {
      const ast = parser.results[i];
      await fs.writeFile(
        `probs/${filename}_${i}.prob`,
        JSON.stringify(ast, null, ' ')
      );
      console.log(`wrote probs/${filename}_${i}.prob`);
    }
  } else {
    const ast = parser.results[0];
    await fs.writeFile(`ast/${filename}.ast`, JSON.stringify(ast, null, ' '));
    console.log(`wrote ast/${filename}.ast`);
  }
}

main().catch((err) => console.log(err.stack));
