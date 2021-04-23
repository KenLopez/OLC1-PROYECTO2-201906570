%{
   
%}


/*Analizador Léxico*/

%lex

%options case-insensitive

%%

\s+                                             //Espacios
"\\".*                                          //Comentario
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]             //Comentario bloque


/*Signos*/
"+"                                             return 'mas';
"-"                                             return 'menos';
"*"                                             return 'por';
"/"                                             return 'dividido';
"^"                                             return 'elevado';
"%"                                             return 'modulo';
"="                                             return 'igual';
"!"                                             return 'exclamacion';
"<"                                             return 'menor';
">"                                             return 'mayor';
"?"                                             return 'interrog';
":"                                             return 'dospt';
";"                                             return 'ptcoma';
"&"                                             return 'ylogico';
"|"                                             return 'ologico';
"("                                             return 'parena';
")"                                             return 'parenc';
"{"                                             return 'llavea';
"}"                                             return 'llavec';

/*Reservadas*/
"int"                                           return 'tint';
"double"                                        return 'tdouble';
"boolean"                                       return 'tbool';
"char"                                          return 'tchar';
"string"                                        return 'tstring';
"print"                                         return 'print';
"true"                                          return 'vtrue';
"false"                                         return 'vfalse';
"if"                                            return 'si';
"else"                                          return 'sino';
"for"                                           return 'para';
"while"                                         return 'mientras';
"switch"                                        return 'fswitch';
"case"                                          return 'caso';
"default"                                       return 'defecto';
"do"                                            return 'has';
"exec"                                          return 'exec';

/*Valores*/
\"[^\"]*\"                                      {yytext=yytext.substr(1,yyleng-2);return'cadena';}
[0-9]+("."[0-9]+)?\b                            return 'num';
([a-zA-Z_])(a-zA-Z0-9_)*                        return 'id';

<<EOF>>                                         return 'EOF';

.                                               {console.log('Error léxico: '+yytext+', en la línea: '+yylloc.first_line+'; columna: '+yylloc.first_column);}

/lex

%start INICIO

%%/*Gramática*/

INICIO
   :BLOQUE EOF
   |EOF
;

BLOQUE
   :llavea BLOQUE2
;

BLOQUE2
   :INSTRUCCION BLOQUE2
   |llavec
;

INSTRUCCION
   :DECLARACION INSTRUCCION
   |FUNCION INSTRUCCION
   |PRINT INSTRUCCION
;

PRINT 
   :print parena VALUE parenc ptcoma
;

VALUE
   :num
   |cadena
;


