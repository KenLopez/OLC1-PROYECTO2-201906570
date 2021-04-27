%{
   const Value = require('../clases/Value.js')
   const Type = require('../clases/Type.js')
   const Global = require('../clases/Global.js')
   const Print = require('../clases/Print.js')
   const Aritmetica = require('../clases/Aritmetica.js')
   var program = new Global()
%}

/*Analizador Léxico*/

%lex

%options case-insensitive

%%

\s+                                             //Espacios
"//".*                                      //Comentario unilinea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]         //Comentario multilinea

/*Signos*/
"++"                                            return 'incremento';
"+"                                             return 'mas';
"--"                                            return 'decremento';
"-"                                             return 'menos';
"*"                                             return 'por';
"/"                                             return 'dividido';
"^"                                             return 'elevado';
"%"                                             return 'modulo';
"=="                                            return 'equals';
"="                                             return 'igual';
"!="                                            return 'diferente';
"!"                                             return 'exclamacion';
">="                                            return 'mayorigual';
"<="                                            return 'menorigual';
"<"                                             return 'menor';
">"                                             return 'mayor';
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
([0-9])+(["."])([0-9])+                         return 'decimal';
([0-9])+                                        return 'entero';  
([a-zA-Z_])([a-zA-Z0-9_])*                      return 'id';
["\""]([^"\""])*["\""]                          {yytext = yytext.substring(1,yytext.length-1); return'cadena';}
[\']([^']|"\\n"|"\\r"|"\\t")[\']                {yytext = yytext.substring(1,yytext.length-1); return'caracter';}

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
   :GLOBALES EOF {
      var p = program
      program = new Global()
      p.ejecutar()
      return p;
   }
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
   |PRINT SYNC {program.instrucciones.push($1)}
   |OPTERNARIO SYNC
   |LLAMADA SYNC
   |MAIN SYNC
   |error SYNC
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
   :print parena EXPRL parenc {$$ = new Print($3, null, Type.PRINT, this._$.first_line, this._$.first_column);}
   |print parena parenc       {$$ = new Print(null, null, Type.PRINT, this._$.first_line, this._$.first_column);}
;

NATIVA
   :minusculas parena EXPRL parenc
   |mayusculas parena EXPRL parenc
   |tamanio parena EXPRL parenc
   |truncar parena EXPRL parenc
   |redondear parena EXPRL parenc
   |typeOf parena EXPRL parenc
   |acadena parena EXPRL parenc
   |aarreglo parena EXPRL parenc
;

/*VARIABLES*/
DECLARACION
   :TYPE id
   |TYPE id igual EXPRL
   |TYPE id igual CASTEO EXPRL
   |TYPE corchetea corchetec id igual nuevo TYPE corchetea EXPRL corchetec
   |TYPE corchetea corchetec id igual llavea LISTAVALORES llavec
   |tlista TYPE id igual nuevo tlista menor TYPE mayor       
;

CASTEO
   :parena TYPE parenc
;

ASIGNACION
   :id igual EXPRL
   |id igual CASTEO EXPRL
   |id incremento 
   |id decremento 
   |ACCESOVECTOR igual EXPRL 
   |ACCESOLISTA igual EXPRL 
;

TYPE
   :tint 
   |tstring 
   |tdouble 
   |tboolean
   |tchar 
;

ACCESOVECTOR
   :id corchetea EXPRL corchetec 
;

ACCESOLISTA
   :id corchetea corchetea EXPRL corchetec corchetec
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
   :mientras parena EXPRL parenc BLOQUE
;

DOWHILE
   :do BLOQUE mientras parena EXPRL parenc SYNC
;

FOR 
   :para parena ASIGNACION dospt EXPRL dospt ASIGNACION parenc llavea INSTRUCCIONES llavec
   |para parena DECLARACION dospt EXPRL dospt ASIGNACION parenc llavea INSTRUCCIONES llavec
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
   |EXPRL ylogico EXPRL
   |exclamacion EXPRL
   |EXPRL equals EXPRL
   |EXPRL diferente EXPRL
   |EXPRL menor EXPRL
   |EXPRL mayor EXPRL
   |EXPRL mayorigual EXPRL
   |EXPRL menorigual EXPRL
   |EXP2
;

EXP2
   :EXP2 mas EXP2          {$$ = new Aritmetica($1, $3, Type.SUMA, Type.ARITMETICO, this._$.first_line, this._$.first_column);}
   |EXP2 menos EXP2        {$$ = new Aritmetica($1, $3, Type.RESTA, Type.ARITMETICO, this._$.first_line, this._$.first_column);}
   |EXP2 por EXP2          {$$ = new Aritmetica($1, $3, Type.MULTIPLICACION, Type.ARITMETICO, this._$.first_line, this._$.first_column);}
   |EXP2 dividido EXP2     {$$ = new Aritmetica($1, $3, Type.DIVISION, Type.ARITMETICO, this._$.first_line, this._$.first_column);}
   |EXP2 modulo EXP2       {$$ = new Aritmetica($1, $3, Type.MODULO, Type.ARITMETICO, this._$.first_line, this._$.first_column);}
   |EXP2 elevado EXP2      {$$ = new Aritmetica($1, $3, Type.POTENCIA, Type.ARITMETICO, this._$.first_line, this._$.first_column);}
   |EXPVAL
;

EXPVAL
   :menos EXPVAL
   |NUM                    {$$ = new Value($1.value, $1.type, Type.VALOR, this._$.first_line, this._$.first_column);}
   |parena EXPRL parenc
   |cadena                 {$$ = new Value(String($1), Type.STRING, Type.VALOR, this._$.first_line, this._$.first_column);}
   |caracter               {$$ = new Value(String($1), Type.CHAR, Type.VALOR, this._$.first_line, this._$.first_column);}
   |vtrue                  {$$ = new Value(true, Type.BOOLEAN, Type.VALOR, this._$.first_line, this._$.first_column);}
   |vfalse                 {$$ = new Value(false, Type.BOOLEAN, Type.VALOR, this._$.first_line, this._$.first_column);}
   |id {console.log($1);}
   |ACCESOVECTOR
   |ACCESOLISTA
   |NATIVA
   |LLAMADA
;

NUM
   :entero  {$$ = new Value(parseInt($1), Type.INT, Type.VALOR, this._$.first_line, this._$.first_column);}
   |decimal {$$ =new Value(parseFloat($1), Type.DOUBLE, Type.VALOR, this._$.first_line, this._$.first_column);}
;

