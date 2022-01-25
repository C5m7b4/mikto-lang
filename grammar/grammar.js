// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  const lexer = require("../lexer/lexer.js")
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "statements$ebnf$1", "symbols": []},
    {"name": "statements$ebnf$1$subexpression$1", "symbols": ["__lb_", "statement"]},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", "statements$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["_ml", "statement", "statements$ebnf$1", "_ml"], "postprocess": 
        (data) => {
          const chunks = data[2];
          const restParams = chunks.map(chunk => chunk[1])
          return [data[1], ...restParams]
        }
            },
    {"name": "statement", "symbols": ["assignment"], "postprocess": id},
    {"name": "statement", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id},
    {"name": "statement", "symbols": [(lexer.has("mlcomment") ? {type: "mlcomment"} : mlcomment)], "postprocess": id},
    {"name": "statement", "symbols": [(lexer.has("mlstart") ? {type: "mlstart"} : mlstart)], "postprocess": id},
    {"name": "statement", "symbols": [(lexer.has("mlend") ? {type: "mlend"} : mlend)], "postprocess": id},
    {"name": "statement", "symbols": ["function_call"], "postprocess": id},
    {"name": "statement", "symbols": ["lambda"], "postprocess": id},
    {"name": "statement", "symbols": ["if_Statment"], "postprocess": id},
    {"name": "statement", "symbols": ["array"], "postprocess": id},
    {"name": "statement", "symbols": ["each_statement"], "postprocess": id},
    {"name": "assignment", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", (lexer.has("assign") ? {type: "assign"} : assign), "_", "expression"], "postprocess": 
        (data) => {
          return {
            type:'var_assign',
            variable: data[0],
            value: data[4]
          }
        }
            },
    {"name": "function_call", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_ml", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": 
        (data) => {
          return {
            type: 'function_call',
            function_name: data[0]
          }
        }
            },
    {"name": "function_call", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_ml", "argument_list", "_ml", (lexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": 
        (data) => {
          return {
            type: 'function_call',
            function_name: data[0],
            arguments: data[4]
          }
        }
            },
    {"name": "argument_list", "symbols": ["expression"], "postprocess": 
        (data) => {
          return [data[0]]
        }
            },
    {"name": "argument_list", "symbols": ["argument_list", "__ml", "expression"], "postprocess": 
        (data) => {
          return [...data[0], data[2]]
        }
            },
    {"name": "lambda$ebnf$1$subexpression$1", "symbols": ["lambda_arguments"]},
    {"name": "lambda$ebnf$1", "symbols": ["lambda$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "lambda$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "lambda", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", (lexer.has("assign") ? {type: "assign"} : assign), "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "lambda$ebnf$1", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", (lexer.has("fatarrow") ? {type: "fatarrow"} : fatarrow), "_ml", "lambda_body"], "postprocess": 
        (data) => {
          return {
            type: 'lambda',
            lambda_name: data[0],
            params: data[6] ? data[6][0] : [],
            body: data[12]
          }
        }
            },
    {"name": "lambda_arguments$ebnf$1", "symbols": []},
    {"name": "lambda_arguments$ebnf$1$subexpression$1", "symbols": ["__", (lexer.has("identifier") ? {type: "identifier"} : identifier)]},
    {"name": "lambda_arguments$ebnf$1", "symbols": ["lambda_arguments$ebnf$1", "lambda_arguments$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "lambda_arguments", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "lambda_arguments$ebnf$1"], "postprocess": 
        (data) => {
          const chunks = data[1]
          const restParams = chunks.map(chunk => chunk[1])
          return [data[0], ...restParams]
        }
            },
    {"name": "lambda_body", "symbols": ["expression"], "postprocess": 
        (data) => {
          return [data[0]]
        }
            },
    {"name": "lambda_body", "symbols": [(lexer.has("lbrace") ? {type: "lbrace"} : lbrace), "__lb_", "statements", "__lb_", (lexer.has("rbrace") ? {type: "rbrace"} : rbrace)], "postprocess": 
        (data) => {
          return data[2]
        }
            },
    {"name": "if_Statment$ebnf$1$subexpression$1", "symbols": ["_", "else_if"]},
    {"name": "if_Statment$ebnf$1", "symbols": ["if_Statment$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "if_Statment$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "if_Statment$ebnf$2$subexpression$1", "symbols": ["_", "else"]},
    {"name": "if_Statment$ebnf$2", "symbols": ["if_Statment$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "if_Statment$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "if_Statment", "symbols": [{"literal":"if"}, "_", (lexer.has("colon") ? {type: "colon"} : colon), "_", "if_arguments", "_", (lexer.has("fatarrow") ? {type: "fatarrow"} : fatarrow), "_", "lambda_body", "if_Statment$ebnf$1", "if_Statment$ebnf$2"], "postprocess": 
        (data) => {
          return {
            type: 'if_statement',
            params: data[4],
            body: data[8],
            elseif: data[9] ? data[9][1] : [],
            else: data[10] ? data[10][1] : []
          }
        }
            },
    {"name": "else_if", "symbols": [{"literal":"else"}, "__", {"literal":"if"}, "_", (lexer.has("colon") ? {type: "colon"} : colon), "_", "if_arguments", "_", (lexer.has("fatarrow") ? {type: "fatarrow"} : fatarrow), "_", "lambda_body"], "postprocess": 
        (data) => {
          return {
            type: 'else_if',
            arguments: data[6],
            body: data[10]
          }
        }
            },
    {"name": "else", "symbols": [{"literal":"else"}, "_", (lexer.has("fatarrow") ? {type: "fatarrow"} : fatarrow), "_", "lambda_body"], "postprocess": 
        (data) => {
          return {
            type: 'else',
            body: data[4]
          }
        }
            },
    {"name": "if_arguments$ebnf$1$subexpression$1", "symbols": ["_", "operator", "_", (lexer.has("identifier") ? {type: "identifier"} : identifier)]},
    {"name": "if_arguments$ebnf$1", "symbols": ["if_arguments$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "if_arguments$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "if_arguments", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "if_arguments$ebnf$1"], "postprocess": 
        (data) => {
          return {
            type:'if_arguments',
            param1: data[0],
            operator: data[1] ? data[1][1] : [],
            param2: data[1] ? data[1][3] : []
          }
        }
            },
    {"name": "array", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", (lexer.has("colon") ? {type: "colon"} : colon), "_", (lexer.has("lsquarebracket") ? {type: "lsquarebracket"} : lsquarebracket), "_", "array_expressions", "_", (lexer.has("rsquarebracket") ? {type: "rsquarebracket"} : rsquarebracket)], "postprocess": 
        (data) => {
          return {
            type:'array',
            name: data[0],
            contents: data[6]
          }
        }
            },
    {"name": "array_expressions$ebnf$1", "symbols": []},
    {"name": "array_expressions$ebnf$1$subexpression$1", "symbols": [(lexer.has("comma") ? {type: "comma"} : comma), "_", "expression"]},
    {"name": "array_expressions$ebnf$1", "symbols": ["array_expressions$ebnf$1", "array_expressions$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "array_expressions", "symbols": ["expression", "_", "array_expressions$ebnf$1"], "postprocess": 
        (data) => {
          const chunks = data[2]
          const restParams = chunks.map(chunk => chunk[2])
          return [data[0], ...restParams]
        }
            },
    {"name": "array_expressions$ebnf$2", "symbols": []},
    {"name": "array_expressions$ebnf$2$subexpression$1", "symbols": ["_", "expression"]},
    {"name": "array_expressions$ebnf$2", "symbols": ["array_expressions$ebnf$2", "array_expressions$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "array_expressions", "symbols": ["expression", "array_expressions$ebnf$2"], "postprocess": 
        (data) => {
          const chunks = data[1]
          const restParams = chunks.map(chunk => chunk[1])
          return [data[0], ...restParams]
        }
            },
    {"name": "each_statement", "symbols": [{"literal":"each"}, "_", (lexer.has("colon") ? {type: "colon"} : colon), "_", "each_array", "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "each_args", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", (lexer.has("fatarrow") ? {type: "fatarrow"} : fatarrow), "_", "lambda_body"], "postprocess": 
        (data) => {
          return {
            type:'each_statement',
            array: data[4],
            arguments: data[8],
            body: data[14]
          }
        }
            },
    {"name": "each_array", "symbols": ["array_expressions"], "postprocess": id},
    {"name": "each_args", "symbols": ["expression", "_", (lexer.has("comma") ? {type: "comma"} : comma), "_", "expression"], "postprocess": 
        (data) => {
          return {
            type:'each_args',
            itemToManipulate: data[0],
            operateFunction: data[4]
          }
        }
            },
    {"name": "expression", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expression", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expression", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "expression", "symbols": ["function_call"], "postprocess": id},
    {"name": "operator", "symbols": [(lexer.has("greaterthan") ? {type: "greaterthan"} : greaterthan)], "postprocess": id},
    {"name": "operator", "symbols": [(lexer.has("lessthan") ? {type: "lessthan"} : lessthan)], "postprocess": id},
    {"name": "operator", "symbols": [(lexer.has("equalto") ? {type: "equalto"} : equalto)], "postprocess": id},
    {"name": "operator", "symbols": [(lexer.has("notequalto") ? {type: "notequalto"} : notequalto)], "postprocess": id},
    {"name": "mlcomment$ebnf$1", "symbols": []},
    {"name": "mlcomment$ebnf$1", "symbols": ["mlcomment$ebnf$1", /[^*]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "mlcomment$ebnf$2", "symbols": []},
    {"name": "mlcomment$ebnf$2$subexpression$1$ebnf$1", "symbols": [{"literal":"*"}]},
    {"name": "mlcomment$ebnf$2$subexpression$1$ebnf$1", "symbols": ["mlcomment$ebnf$2$subexpression$1$ebnf$1", {"literal":"*"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "mlcomment$ebnf$2$subexpression$1$ebnf$2", "symbols": []},
    {"name": "mlcomment$ebnf$2$subexpression$1$ebnf$2", "symbols": ["mlcomment$ebnf$2$subexpression$1$ebnf$2", /[^*]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "mlcomment$ebnf$2$subexpression$1", "symbols": ["mlcomment$ebnf$2$subexpression$1$ebnf$1", /[^/*]/, "mlcomment$ebnf$2$subexpression$1$ebnf$2"]},
    {"name": "mlcomment$ebnf$2", "symbols": ["mlcomment$ebnf$2", "mlcomment$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "mlcomment$ebnf$3", "symbols": []},
    {"name": "mlcomment$ebnf$3", "symbols": ["mlcomment$ebnf$3", {"literal":"*"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "mlcomment", "symbols": [{"literal":"/*"}, "mlcomment$ebnf$1", "mlcomment$ebnf$2", "mlcomment$ebnf$3", {"literal":"*/"}]},
    {"name": "__lb_$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("nl") ? {type: "nl"} : nl)]},
    {"name": "__lb_$ebnf$1", "symbols": ["__lb_$ebnf$1$subexpression$1"]},
    {"name": "__lb_$ebnf$1$subexpression$2", "symbols": ["_", (lexer.has("nl") ? {type: "nl"} : nl)]},
    {"name": "__lb_$ebnf$1", "symbols": ["__lb_$ebnf$1", "__lb_$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__lb_", "symbols": ["__lb_$ebnf$1", "_"]},
    {"name": "__ml$ebnf$1$subexpression$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "__ml$ebnf$1$subexpression$1", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl)]},
    {"name": "__ml$ebnf$1", "symbols": ["__ml$ebnf$1$subexpression$1"]},
    {"name": "__ml$ebnf$1$subexpression$2", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "__ml$ebnf$1$subexpression$2", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl)]},
    {"name": "__ml$ebnf$1", "symbols": ["__ml$ebnf$1", "__ml$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__ml", "symbols": ["__ml$ebnf$1"]},
    {"name": "_ml$ebnf$1", "symbols": []},
    {"name": "_ml$ebnf$1$subexpression$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "_ml$ebnf$1$subexpression$1", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl)]},
    {"name": "_ml$ebnf$1", "symbols": ["_ml$ebnf$1", "_ml$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_ml", "symbols": ["_ml$ebnf$1"]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1$subexpression$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "_$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1$subexpression$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1$subexpression$1"]},
    {"name": "__$ebnf$1$subexpression$2", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "__$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]}
]
  , ParserStart: "statements"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
