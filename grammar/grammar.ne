@{%
  const lexer = require("../lexer/lexer.js")
%}

@lexer lexer

statements
  -> _ml statement (__lb_ statement):* _ml
    {%
      (data) => {
        const chunks = data[2];
        const restParams = chunks.map(chunk => chunk[1])
        return [data[1], ...restParams]
      }
    %}


  
statement
  -> assignment {% id %} 
  | %comment {% id %}
  | %mlcomment {% id %}
  | %mlstart {% id %}
  | %mlend {% id %}
  | function_call {% id %}
  | lambda {% id %}
  | if_Statment {% id %}
  | array {% id %}
  | each_statement {% id %}

assignment
  -> %identifier _ %assign _ expression
    {%
      (data) => {
        return {
          type:'var_assign',
          variable: data[0],
          value: data[4]
        }
      }
    %}


function_call
  -> %identifier _ %lparen _ml %rparen
    {%
      (data) => {
        return {
          type: 'function_call',
          function_name: data[0]
        }
      }
    %} 
  | %identifier _ %lparen _ml argument_list _ml %rparen
    {%
      (data) => {
        return {
          type: 'function_call',
          function_name: data[0],
          arguments: data[4]
        }
      }
    %}

argument_list
  -> expression 
    {%
      (data) => {
        return [data[0]]
      }
    %}
  | argument_list __ml expression 
    {%
      (data) => {
        return [...data[0], data[2]]
      }
    %}

lambda
  -> %identifier _ %assign _ %lparen _ (lambda_arguments):? _ %rparen _ %fatarrow _ml lambda_body
    {%
      (data) => {
        return {
          type: 'lambda',
          lambda_name: data[0],
          params: data[6] ? data[6][0] : [],
          body: data[12]
        }
      }
    %} 

lambda_arguments  
  ->   %identifier (__ %identifier):*
    {%
      (data) => {
        const chunks = data[1]
        const restParams = chunks.map(chunk => chunk[1])
        return [data[0], ...restParams]
      }
    %}

lambda_body
  -> expression
    {%
      (data) => {
        return [data[0]]
      }
    %}
  | %lbrace __lb_ statements __lb_ %rbrace
    {%
      (data) => {
        return data[2]
      }
    %}

if_Statment
  -> "if" _ %colon _ if_arguments _ %fatarrow _ lambda_body (_ else_if):? (_ else):?
    {%
      (data) => {
        return {
          type: 'if_statement',
          params: data[4],
          body: data[8],
          elseif: data[9] ? data[9][1] : [],
          else: data[10] ? data[10][1] : []
        }
      }
    %}

else_if
  => "else" __ "if" _ %colon _ if_arguments _ %fatarrow _ lambda_body
    {%
      (data) => {
        return {
          type: 'else_if',
          arguments: data[6],
          body: data[10]
        }
      }
    %}

else
  -> "else" _ %fatarrow _ lambda_body
    {%
      (data) => {
        return {
          type: 'else',
          body: data[4]
        }
      }
    %}  

if_arguments
  -> %identifier (_ operator _ %identifier):?
    {%
      (data) => {
        return {
          type:'if_arguments',
          param1: data[0],
          operator: data[1] ? data[1][1] : [],
          param2: data[1] ? data[1][3] : []
        }
      }
    %}

array
  -> %identifier _ %colon _ %lsquarebracket _  array_expressions _ %rsquarebracket
    {%
      (data) => {
        return {
          type:'array',
          name: data[0],
          contents: data[6]
        }
      }
    %}

array_expressions
  -> expression _ (%comma _ expression):*
    {%
      (data) => {
        const chunks = data[2]
        const restParams = chunks.map(chunk => chunk[2])
        return [data[0], ...restParams]
      }
    %}
  | expression (_ expression):*
    {%
      (data) => {
        const chunks = data[1]
        const restParams = chunks.map(chunk => chunk[1])
        return [data[0], ...restParams]
      }
    %}


each_statement
  -> "each" _ %colon _ each_array _ %lparen _ each_args _ %rparen _ %fatarrow _ lambda_body
    {%
      (data) => {
        return {
          type:'each_statement',
          array: data[4],
          arguments: data[8],
          body: data[14]
        }
      }
    %}

each_array -> array_expressions {% id %}

each_args
  -> expression _ %comma _ expression
    {%
      (data) => {
        return {
          type:'each_args',
          itemToManipulate: data[0],
          operateFunction: data[4]
        }
      }
    %}

expression
  -> %string {% id %}
  | %number {% id %}
  | %identifier {% id %}
  | function_call {% id %} 

operator
  -> %greaterthan {% id %}
  | %lessthan {% id %}
  | %equalto {% id %}
  | %notequalto {% id %}


# multiline comment
mlcomment -> "/*" [^*]:* ("*":+ [^/*] [^*]:*):* "*":* "*/"

# mandatory line-break with optional whitespace around it
__lb_ => (_ %nl):+ _

# mandatory multiline whitespace
__ml => (%ws | %nl):+

# optional multiline whitespace
_ml -> (%ws | %nl):*

# optional whitespace
_ -> (%ws):*  

#mandatory whitespace
__ -> (%ws):+