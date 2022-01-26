const moo = require('moo');

let lexer = moo.compile({
  keywords: [
    'if',
    'each',
    'length',
    'trim',
    'toString',
    'Math.pow',
    'Array',
    'from',
    'Object',
    'assign',
    'new',
    'sort',
    'join',
    'Set',
    '...',
  ],
  ws: /[ \t]+/,
  comment: /\/\/.*?$/,
  mlstart: /\/\*/,
  mlend: /\*\//,
  number: /0|[1-9][0-9]*/,
  string: [/"(?:\\["\\]|[^\n"\\])*"/, /'(?:\\["\\]|[^\n"\\])*'/],
  lparen: '(',
  rparen: ')',
  lbrace: '{',
  rbrace: '}',
  lsquarebracket: '[',
  rsquarebracket: ']',
  fatarrow: '=>',
  identifier: /[a-zA-z][a-zA-Z0-9]*/,
  plusequals: '+=',
  minusequals: '-=',
  minus: '-',
  plus: '+',
  times: '*',
  divide: '/',
  mod: '%',
  caret: '^',
  pound: '#',
  dollar: '$',
  at: '@',
  amper: '&',
  tilda: '~',
  backtick: '`',
  lessthan: '<',
  greaterthan: '>',
  equalto: /===|==/,
  notequalto: /!==|!=/,
  excl: '!',
  colon: ':',
  assign: '=',
  comma: ',',
  period: '.',
  nl: { match: /\r\n/, lineBreaks: true },
});

module.exports = lexer;
