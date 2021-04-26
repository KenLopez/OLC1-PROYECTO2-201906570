/*Analizador Léxico*/

%lex

%options case-insensitive

%%

\s+                                             //Espacios
"\\".*                                          //Comentario
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]             //Comentario bloque

/*Signos*/
"+"                                             return 'mas';
"++"                                            return 'incremento';
"-"                                             return 'menos';
"--"                                            return 'decremento';
"*"                                             return 'por';
"/"                                             return 'dividido';
"^"                                             return 'elevado';
"%"                                             return 'modulo';
"="                                             return 'igual';
"=="                                            return 'equals';
"!"                                             return 'exclamacion';
"!="                                            return 'diferente';
"<"                                             return 'menor';
"<="                                            return 'menorigual';
">"                                             return 'mayor';
">="                                            return 'mayorigual';
"?"                                             return 'interrog';
":"                                             return 'dospt';
";"                                             return 'ptcoma';
"&&"                                             return 'ylogico';
"||"                                             return 'ologico';
"("                                             return 'parena';
")"                                             return 'parenc';
"{"                                             return 'llavea';
"}"                                             return 'llavec';
","                                             return 'coma';
"^"                                             return 'elevado';
"["                                             return 'corchetea';
"]"                                             return 'corchetec';

/*Reservadas*/
"int"                                           return 'tint';
"double"                                        return 'tdouble';
"boolean"                                       return 'tbool';
"char"                                          return 'tchar';
"list"                                          return 'tlista';
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
"exec"                                          return 'ex';
"void"                                          return 'tmethod';
"return"                                        return 'retorno';
"new"                                           return 'nuevo';
"break"                                         return 'romper';
"continue"                                      return 'continuar';
"toLower"                                       return 'minusculas';
"toUpper"                                       return 'mayusculas';
"length"                                        return 'tamanio';
"truncate"                                      return 'truncar';
"round"                                         return 'redondear';
"typeOf"                                        return 'typeOf';
"toString"                                      return 'acadena';
"toCharArray"                                   return 'aarreglo';

/*Valores*/
\'[[a-zA-Z0-9]]|[\\]|[\\\']|[\\\"]|[\\n]|[\\t]|[\\r]]\'  {yytext=yytext.substr(1,yyleng-2);return'caracter';}
\"[[^\"]|[\\\""]]*\"                                     {yytext=yytext.substr(1,yyleng-2);return'cadena';}
[0-9]+("."[0-9]+)?\b                            return 'num';
([a-zA-Z_])(a-zA-Z0-9_)*                        return 'id';

<<EOF>>                                         return 'EOF';

.                                               {console.log('Error léxico: '+yytext+', en la línea: '+yylloc.first_line+'; columna: '+yylloc.first_column);}

/lex

%start INICIO

/*PRECEDENCIA*/
%right igual
%left incremento
%left decremento
%left ologico
%left ylogico
%right exclamacion
%left equals, diferente
%left mayor, menor, mayorigual, menorigual
%left mas, menos
%left por, dividido, modulo
%right elevado
%left parena, parenc, llavea, llavec, corchetea, corchetec


%%/*Gramática*/

INICIO
   :GLOBALES EOF
   |EOF
;


/*BLOQUE GLOBAL*/
GLOBALES
   :GLOBALES GLOBAL
   |GLOBAL
;

GLOBAL
   :DECLARACION SYNC
   |ASIGNACION SYNC
   |FUNCION
   |IF
   |SWITCH
   |WHILE
   |DOWHILE
   |FOR
   |PRINT SYNC
   |OPTERNARIO SYNC
   |LLAMADA SYNC
   |MAIN
;

/*BLOQUE LOCAL*/
INSTRUCCIONES
   :INSTRUCCIONES INSTRUCCION
   |INSTRUCCION
;

INSTRUCCION
   :DECLARACION SYNC
   |ASIGNACION SYNC
   |TRANSFERENCIA SYNC
   |IF
   |SWITCH
   |WHILE
   |DOWHILE
   |FOR
   |PRINT SYNC
   |OPTERNARIO SYNC
   |LLAMADA SYNC
;

BLOQUE
   :llavea BLOQUE2
;

BLOQUE2
   :INSTRUCCION BLOQUE2
   |llavec
;

/*FUNCIONES NATIVAS*/
PRINT 
   :print parena EXPRL parenc 
   |print parena parenc
;

NATIVA
   :minusculas parena EXPRL parenc
   |mayusculas parena EXPLR parenc
   |tamanio parena EXPLR parenc
   |truncar parena EXPLR parenc
   |redondear parena EXPLR parenc
   |typeOf parena EXPLR parenc
   |toString parena EXPLR parenc
   |toCharArray parena EXPLR parenc
;

/*VARIABLES*/
DECLARACION
   :TYPE id
   |TYPE id igual EXPRL
   |TYPE id igual CASTEO EXPRL
   |TYPE corchetea corchetec id igual nuevo TYPE corchetea EXPRL corchetec
   |TYPE corchetea corchetec id igual llavea LISTAVALORES llavec
   |tlista TYPE id igual nuevo tlista menor TYPE mayor         //Lista
;

CASTEO
   :parena TYPE parenc
;

ASIGNACION
   :id igual EXPRL
   |id igual CASTEO EXPRL
   |id incremento 
   |id decremento 
   |ACCESOVECTOR igual EXPLR 
   |ACCESOLISTA igual EXPLR 
;

TYPE
   :tint 
   |tstring 
   |tdouble 
   |tboolean
   |tchar 
;

ACCESOVECTOR
   :id corchetea EXPLR corchetec 
;

ACCESOLISTA
   :id corchetea corchetea EXPLR corchetec corchetec
;

/*SIGNO DE SINCRONIZACIÓN*/
SYNC
   :ptcoma
;


/*FUNCIONES*/
MAIN
   :ex LLAMADA
;

LLAMADA
   :id parena LISTAVALORES parenc
   |id parena parenc
;

LISTAVALORES
   :LISTAVALORES coma EXPRL
   |EXPRL
;

FUNCION
   :TYPE id parena PARAM parenc BLOQUE
   |TYPE id parena parenc BLOQUE
   |tmethod id parena PARAM parenc BLOQUE
   |tmethod id parena parenc BLOQUE
;

PARAM
   :PARAM coma TYPE id
   |TYPE id 
;

/*CICLOS*/
WHILE 
   :mientras EXPRL llavea INSTRUCCIONES llavec
;

DOWHILE
   :do llavea INSTRUCCIONES llavec mientras parena EXPRL parenc SYNC
;

FOR 
   :para parena ASIGNACION dospt EXPLR dospt ASIGNACION parenc llavea INSTRUCCIONES llavec
   |para parena DECLARACION dospt EXPLR dospt ASIGNACION parenc llavea INSTRUCCIONES llavec
;

TRANSFERENCIA
   :retorno 
   |continuar 
   |romper 
;


/*SENTENCIAS DE CONTROL Y OPERADOR TERNARIO*/
OPTERNARIO
   :EXPRL interrog EXPRL dospt EXPRL
;

IF
   :IFSOLO
   |IFSOLO ELSE
;

ELSE
   :sino BLOQUE
   |sino IF
;

IFSOLO
   :si parena EXPRL parenc BLOQUE
;

SWITCH
   :fswitch parena EXPRL parenc llavea CASES llavec
   |fswitch parena EXPRL parenc llavea DEFAULT llavec
   |fswitch parena EXPRL parenc llavea CASES DEFAULT llavec
;

CASES
   :CASES caso dospt INSTRUCCIONES
   |caso dospt INSTRUCCIONES
;

DEFAULT
   :defecto dospt INSTRUCCIONES
;


/*EXPRESIONES Y VALORES*/
EXPRL
   :EXPRL ologico EXPRL
   |EXPRL2
;

EXPRL2
   :EXPRL2 ylogico EXPRL2
   |EXPRL3
;

EXPRL3
   :exclamacion EXPRL3
   |EXP
;

EXP
   :EXP equals EXP
   |EXP diferente EXP
   |EXP2
;

EXP2
   :EXP2 menor EXP2
   |EXP2 mayor EXP2
   |EXP3
;

EXP3
   :EXP3 mayorigual EXP3
   |EXP3 menorigual EXP3
   |EXP4
;

EXP4
   :EXP4 mas EXP4
   |EXP4 menos EXP4
   |EXP4 por EXP4
   |EXP4 dividido EXP4
   |EXP4 modulo EXP4
   |EXP4 elevado EXP4
   |EXPVAL
;

EXPVAL
   :num
   |menos num
   |parena EXPRL parenc
   |cadena
   |caracter
   |vtrue
   |vfalse
   |id
   |ACCESOVECTOR
   |ACCESOLISTA
   |NATIVA
   |LLAMADA
;

