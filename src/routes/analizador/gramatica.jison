%{
   const Value = require('../clases/Value.js')
   const Type = require('../clases/Type.js')
   const Global = require('../clases/Global.js')
   const Print = require('../clases/Print.js')
   const Aritmetica = require('../clases/Aritmetica.js')
   const Unitaria = require('../clases/Unitaria.js')
   const Logica = require('../clases/Logica.js')
   const Declaracion = require('../clases/Declaracion.js')
   const Symbol = require('../clases/Symbol.js')
   const Asignacion = require('../clases/Asignacion.js')
   const If = require('../clases/If.js')
   const Bloque = require('../clases/Bloque.js')
   const While = require('../clases/While.js')
   const DoWhile = require('../clases/DoWhile.js')
   const For = require('../clases/For.js')
   const Control = require('../clases/Control.js')
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
([a-zA-Z_])([a-zA-Z0-9_])*                      {yytext = yytext.toUpperCase();return 'id';}
["\""]([^"\""])*["\""]                          {yytext = yytext.substring(1,yytext.length-1); return'cadena';}
[\']([^']|"\\n"|"\\r"|"\\t")[\']                {yytext = yytext.substring(1,yytext.length-1); return'caracter';}

<<EOF>>                                         return 'EOF';

.                                               {program.newError(Type.LEXICO, 'El símbolo: '+yytext+', no es parte'+
                                                ' del alfabeto.', yylloc.first_line, yylloc.first_column)}

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
%left interrog
%left parena, parenc, llavea, llavec, corchetea, corchetec


%%/*Gramática*/

INICIO
   :GLOBALES EOF {
      var p = program
      program = new Global()
      p.ejecutar()
      return p;
   }
   |EOF{
      var p = program
      program = new Global()
      p.ejecutar()
      return p;
   }
;


/*BLOQUE GLOBAL*/
GLOBALES
   :GLOBALES GLOBAL  {program.instrucciones.push($2);}
   |GLOBAL           {program.instrucciones.push($1);}
   |error SYNC       {program.newError(Type.SINTACTICO, "No se esperaba: " + $$, this._$.first_line, this._$.first_column)}
;

GLOBAL
   :DECLARACION SYNC    {$$ = $1}    
   |ASIGNACION SYNC     {$$ = $1}     
   |FUNCION
   |IF                  {$$ = new If($1,this._$.first_line, this._$.first_column);}                 
   |SWITCH
   |WHILE               {$$ = $1}
   |DOWHILE             {$$ = $1}
   |FOR                 {$$ = $1}
   |PRINT SYNC          {$$ = $1}
   |LLAMADA SYNC
   |MAIN SYNC
;

/*BLOQUE LOCAL*/
INSTRUCCIONES
   :INSTRUCCIONES INSTRUCCION    {$$=$2.unshift($1); $$ = $2;}
   |INSTRUCCION                  {$$=[$1]}
   |error SYNC                   {program.newError(Type.SINTACTICO, "No se esperaba: " + $$, this._$.first_line, this._$.first_column)}
;

INSTRUCCION
   :DECLARACION SYNC    {$$ = $1;}
   |ASIGNACION SYNC     {$$ = $1;}
   |TRANSFERENCIA SYNC  {$$ = $1;}
   |IF                  {$$ = new If($1,this._$.first_line, this._$.first_column);}
   |SWITCH              {$$ = $1;}
   |WHILE               {$$ = $1;}
   |DOWHILE             {$$ = $1;}
   |FOR                 {$$ = $1;}
   |PRINT SYNC          {$$ = $1;}
   |LLAMADA SYNC        {$$ = $1;}
   
;



BLOQUE
   :llavea BLOQUE2         {$$= new Bloque($2, this._$.first_line, this._$.first_column);}
;

BLOQUE2
   :INSTRUCCION BLOQUE2    {$2.unshift($1); $$ = $2;}
   |llavec                 {$$=[];}
   |error SYNC             {program.newError(Type.SINTACTICO, "No se esperaba: " + $$, this._$.first_line, this._$.first_column)}
;

/*FUNCIONES NATIVAS*/
PRINT 
   :print parena EXPRL parenc {$$ = new Print($3, Type.PRINT, Type.PRINT, this._$.first_line, this._$.first_column);}
   |print parena parenc       {$$ = new Print(null, Type.PRINT, Type.PRINT, this._$.first_line, this._$.first_column);}
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
   :TYPE id                                                                   {$$ = new Declaracion($2, null, $1, Type.DECLARACION, this._$.first_line, this._$.first_column)}
   |TYPE id igual EXPRL                                                       {$$ = new Declaracion($2, $4, $1, Type.DECLARACION, this._$.first_line, this._$.first_column)}
   |TYPE id igual CASTEO 
   |TYPE corchetea corchetec id igual nuevo TYPE corchetea EXPRL corchetec
   |TYPE corchetea corchetec id igual llavea LISTAVALORES llavec
   |tlista TYPE id igual nuevo tlista menor TYPE mayor   
;

CASTEO
   :parena TYPE parenc EXPRL
;

ASIGNACION
   :id igual EXPRL            {$$ = new Asignacion($1, $3, Type.ASIGNACION, this._$.first_line, this._$.first_column)}          
   |id igual CASTEO
   |id incremento             {$$ = new Asignacion($1, null, Type.INCREMENTO, this._$.first_line, this._$.first_column)}
   |id decremento             {$$ = new Asignacion($1, null, Type.DECREMENTO, this._$.first_line, this._$.first_column)} 
   |ACCESOVECTOR igual EXPRL 
   |ACCESOLISTA igual EXPRL 
;

TYPE
   :tint          {$$ = Type.INT;}
   |tstring       {$$ = Type.STRING;}
   |tdouble       {$$ = Type.DOUBLE;}
   |tbool         {$$ = Type.BOOLEAN;}
   |tchar         {$$ = Type.CHAR;}
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
   |error {program.newError(Type.SINTACTICO, "No se esperaba: " + $$, this._$.first_line, this._$.first_column)}
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
   :mientras parena EXPRL parenc BLOQUE   {$$ = new While($3, $5, this._$.first_line, this._$.first_column)}
;

DOWHILE
   :has BLOQUE mientras parena EXPRL parenc SYNC {$$ = new DoWhile($5, $2, this._$.first_line, this._$.first_column)}
;

FOR 
   :para parena ASIGNACION ptcoma EXPRL ptcoma ASIGNACION parenc BLOQUE    {$$ = new For($3,$5,$7,$9,this._$.first_line, this._$.first_column)}
   |para parena DECLARACION ptcoma EXPRL ptcoma ASIGNACION parenc BLOQUE   {$$ = new For($3,$5,$7,$9,this._$.first_line, this._$.first_column)}
;

TRANSFERENCIA
   :retorno 
   |continuar  {$$ = new Control(Type.CONTINUE,Type.CONTROL, this._$.first_line, this._$.first_column)}
   |romper     {$$ = new Control(Type.BREAK,Type.CONTROL, this._$.first_line, this._$.first_column)}
;


/*SENTENCIAS DE CONTROL Y OPERADOR TERNARIO*/
OPTERNARIO
   :EXPRL interrog EXPRL dospt EXPRL
;

IF
   :IFSOLO        {$$=$1;}            
   |IFSOLO ELSE   {$1.push(...$2);}
;

ELSE
   :sino BLOQUE      {$$ = [{exp: null, block: $2}];}  
   |sino IF          {$$ = $2;}
;

IFSOLO
   :si parena EXPRL parenc BLOQUE   {$$ = [{exp: $3, block: $5}];}
;

SWITCH
   :fswitch parena EXPRL parenc llavea CASES llavec
   |fswitch parena EXPRL parenc llavea DEFAULT llavec
   |fswitch parena EXPRL parenc llavea CASES DEFAULT llavec
;

CASES
   :CASES caso EXPRL dospt INSTRUCCIONES  {$1.push({exp:$3, block:$5})}
   |caso EXPRL dospt INSTRUCCIONES        {$$ = [{exp: $2, block: $4}]}
;

DEFAULT
   :defecto dospt INSTRUCCIONES
;


/*EXPRESIONES Y VALORES*/
EXPRL
   :OPTERNARIO
   |EXPRL ologico EXPRL       {$$ = new Logica($1, $3, Type.OR, Type.LOGICO, this._$.first_line, this._$.first_column);}
   |EXPRL ylogico EXPRL       {$$ = new Logica($1, $3, Type.AND, Type.LOGICO, this._$.first_line, this._$.first_column);}
   |exclamacion EXPRL         {$$ = new Unitaria($2, Type.NOT, Type.UNITARIA, this._$.first_line, this._$.first_column);}
   |EXPRL equals EXPRL        {$$ = new Logica($1, $3, Type.IGUAL, Type.LOGICO, this._$.first_line, this._$.first_column);}
   |EXPRL diferente EXPRL     {$$ = new Logica($1, $3, Type.DIFERENTE, Type.LOGICO, this._$.first_line, this._$.first_column);}
   |EXPRL menor EXPRL         {$$ = new Logica($1, $3, Type.MENOR, Type.LOGICO, this._$.first_line, this._$.first_column);}
   |EXPRL mayor EXPRL         {$$ = new Logica($1, $3, Type.MAYOR, Type.LOGICO, this._$.first_line, this._$.first_column);}
   |EXPRL mayorigual EXPRL    {$$ = new Logica($1, $3, Type.MAYORIGUAL, Type.LOGICO, this._$.first_line, this._$.first_column);}
   |EXPRL menorigual EXPRL    {$$ = new Logica($1, $3, Type.MENORIGUAL, Type.LOGICO, this._$.first_line, this._$.first_column);}
   |EXP2                      {$$ = $1}
;

EXP2
   :EXPRL mas EXPRL           {$$ = new Aritmetica($1, $3, Type.SUMA, Type.ARITMETICO, this._$.first_line, this._$.first_column);}
   |EXPRL menos EXPRL         {$$ = new Aritmetica($1, $3, Type.RESTA, Type.ARITMETICO, this._$.first_line, this._$.first_column);}
   |EXPRL por EXPRL           {$$ = new Aritmetica($1, $3, Type.MULTIPLICACION, Type.ARITMETICO, this._$.first_line, this._$.first_column);}
   |EXPRL dividido EXPRL      {$$ = new Aritmetica($1, $3, Type.DIVISION, Type.ARITMETICO, this._$.first_line, this._$.first_column);}
   |EXPRL modulo EXPRL        {$$ = new Aritmetica($1, $3, Type.MODULO, Type.ARITMETICO, this._$.first_line, this._$.first_column);}
   |EXPRL elevado EXPRL       {$$ = new Aritmetica($1, $3, Type.POTENCIA, Type.ARITMETICO, this._$.first_line, this._$.first_column);}
   |EXPVAL                    {$$ = $1}
;

EXPVAL
   :menos EXPRL            {$$ = new Unitaria($2, Type.NEGACION, Type.UNITARIA, this._$.first_line, this._$.first_column);}
   |parena EXPRL parenc    {$$ = $2}
   |NUM                    {$$ = new Value($1.value, $1.type, Type.VALOR, this._$.first_line, this._$.first_column);}
   |cadena                 {$$ = new Value(String($1), Type.STRING, Type.VALOR, this._$.first_line, this._$.first_column);}
   |caracter               {$$ = new Value(String($1), Type.CHAR, Type.VALOR, this._$.first_line, this._$.first_column);}
   |vtrue                  {$$ = new Value(true, Type.BOOLEAN, Type.VALOR, this._$.first_line, this._$.first_column);}
   |vfalse                 {$$ = new Value(false, Type.BOOLEAN, Type.VALOR, this._$.first_line, this._$.first_column);}
   |id                     {$$ = new Symbol($1, null, Type.SYMBOL, Type.VALOR, this._$.first_line, this._$.first_column );}
   |ACCESOVECTOR
   |ACCESOLISTA
   |NATIVA
   |LLAMADA
;

NUM
   :entero  {$$ = new Value(parseInt($1), Type.INT, Type.VALOR, this._$.first_line, this._$.first_column);}
   |decimal {$$ =new Value(parseFloat($1), Type.DOUBLE, Type.VALOR, this._$.first_line, this._$.first_column);}
;

