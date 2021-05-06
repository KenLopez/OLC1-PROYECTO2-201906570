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
   const Switch = require('../clases/Switch.js')
   const Nodo = require('../clases/Nodo.js')
   const Funcion = require('../clases/Funcion.js')
   const Call = require('../clases/Call.js')
   var program = new Global()
   var cadena ='';
%}

/*Analizador Léxico*/

%lex

%options case-insensitive
%x str

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
([a-zA-Z_ñÑ])([a-z0-9A-Z_ñÑ])*                          {yytext = yytext.toUpperCase();return 'id';}
["]                                                     {cadena = '';this.begin("str");}
<str>[^"\\]+                                            {cadena += yytext;}
<str>"\\\""                                             {cadena += '\"';}
<str>"\\n"                                              {cadena += '\n';}
<str>"\\t"                                              {cadena += '\t';}
<str>"\\r"                                              {cadena += '\r';}
<str>"\\\\"                                             {cadena += '\\';}
<str>"\\'"                                             {cadena += '\'';}
<str>["]                                                {yytext = cadena; this.popState(); return 'cadena'}
<str>.                                                  {cadena=''; this.popState();program.newError(
                                                         Type.LEXICO, 'El símbolo: '+cadena+', no se pudo'+
                                                         ' reconocer.', yylloc.first_line, yylloc.first_column)}
[\']("\\n"|"\\r"|"\\t"|"\\'"|"\\\""|"\\\\"|[^\'])[\']   {yytext = yytext.substring(1,yytext.length-1); 
                                                         yytext = yytext.replace(/\\n/g, '\n')
                                                         yytext = yytext.replace(/\\r/g, '\r')
                                                         yytext = yytext.replace(/\\t/g, '\t')
                                                         yytext = yytext.replace(/\\\'/g, '\'')
                                                         yytext = yytext.replace(/\\\"/g, '\"')
                                                         yytext = yytext.replace(/\\\\/g, '\\')
                                                         return'caracter';}
<<EOF>>                                                  return 'EOF';

.                                               {program.newError(Type.LEXICO, 'El símbolo: '+yytext+', no se pudo'+
                                                ' reconocer.', yylloc.first_line, yylloc.first_column)}

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
      program.ast = new Nodo('INICIO', [$1])
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
   :GLOBALES GLOBAL  {$$ = new Nodo('GLOBALES', [$1, $2])}
   |GLOBAL           {$$ = new Nodo('GLOBALES', [$1])}
   |error            {program.newError(Type.SINTACTICO, "No se esperaba: " + $$, this._$.first_line, this._$.first_column)}
;

GLOBAL
   :DECLARACION SYNC    {program.instrucciones.push($1.s); $$ = new Nodo('GLOBAL', [$1.n, $2.n])}   
   |ASIGNACION SYNC     {program.instrucciones.push($1.s); $$ = new Nodo('GLOBAL', [$1.n, $2.n])}    
   |FUNCION             {program.instrucciones.push($1.s); $$ = new Nodo('GLOBAL', [$1.n])}
   |IF                  {program.instrucciones.push(new If($1.s,this._$.first_line, this._$.first_column)); $$ = new Nodo('GLOBAL', [$1.n])}                 
   |SWITCH              {program.instrucciones.push($1.s); $$ = new Nodo('GLOBAL', [$1.n])}
   |WHILE               {program.instrucciones.push($1.s); $$ = new Nodo('GLOBAL', [$1.n])}
   |DOWHILE             {program.instrucciones.push($1.s); $$ = new Nodo('GLOBAL', [$1.n])}
   |FOR                 {program.instrucciones.push($1.s); $$ = new Nodo('GLOBAL', [$1.n])}
   |PRINT SYNC          {program.instrucciones.push($1.s); $$ = new Nodo('GLOBAL', [$1.n, $2.n])}
   |MAIN SYNC           {program.newExec($1.s); $$ = new Nodo('GLOBAL', [$1.n,$2.n])}
;

/*BLOQUE LOCAL*/
INSTRUCCIONES
   :INSTRUCCION INSTRUCCIONES    {$2.s.unshift($1.s);$$={s:$2.s,n:new Nodo('INSTRUCCIONES', [$1.n, $2.n])}}
   |INSTRUCCION                  {$$={s:[$1.s], n:new Nodo('INSTRUCCIONES', [$1.n])}}
   |error                        {program.newError(Type.SINTACTICO, "No se esperaba: " + $$, this._$.first_line, this._$.first_column)}
;

INSTRUCCION
   :DECLARACION SYNC    {$$ = {s:$1.s,n:new Nodo('INSTRUCCION', [$1.n, $2.n])};}
   |ASIGNACION SYNC     {$$ = {s:$1.s,n:new Nodo('INSTRUCCION', [$1.n, $2.n])};}
   |TRANSFERENCIA SYNC  {$$ = {s:$1.s,n:new Nodo('INSTRUCCION', [$1.n, $2.n])};}
   |IF                  {$$ = {s:new If($1.s,this._$.first_line, this._$.first_column),n:new Nodo('INSTRUCCION', [$1.n])}}
   |SWITCH              {$$ = {s:$1.s,n:new Nodo('INSTRUCCION', [$1.n])};}
   |WHILE               {$$ = {s:$1.s,n:new Nodo('INSTRUCCION', [$1.n])};}
   |DOWHILE             {$$ = {s:$1.s,n:new Nodo('INSTRUCCION', [$1.n])};}
   |FOR                 {$$ = {s:$1.s,n:new Nodo('INSTRUCCION', [$1.n])};}
   |PRINT SYNC          {$$ = {s:$1.s,n:new Nodo('INSTRUCCION', [$1.n, $2.n])};}
   |LLAMADA SYNC        {$$ = {s:$1.s,n:new Nodo('INSTRUCCION', [$1.n, $2.n])};}
   
;



BLOQUE
   :llavea BLOQUE2         {$$= {s:new Bloque($2.s, this._$.first_line, this._$.first_column), n: new Nodo('BLOQUE', [new Nodo($1,null), $2.n])};}
;

BLOQUE2
   :INSTRUCCION BLOQUE2    {$2.s.unshift($1.s); $$ = {s:$2.s, n:new Nodo('BLOQUE2', [$1.n, $2.n])};}
   |llavec                 {$$={s:[], n:new Nodo('BLOQUE2', [new Nodo($1, null)])};}
   |error                  {program.newError(Type.SINTACTICO, "No se esperaba: " + $$, this._$.first_line, this._$.first_column)}
;

/*FUNCIONES NATIVAS*/
PRINT 
   :print parena EXPRL parenc {$$ = {s:new Print($3.s, Type.PRINT, Type.PRINT, this._$.first_line, this._$.first_column),n:new Nodo('PRINT', [new Nodo($1,null),new Nodo($2, null), $3.n, new Nodo($4,null)])};}
   |print parena parenc       {$$ = {s:new Print(null, Type.PRINT, Type.PRINT, this._$.first_line, this._$.first_column),n:new Nodo('PRINT', [new Nodo($1,null),new Nodo($2,null),new Nodo($3,null)])};}
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
   :TYPE id                                                                   {$$ = {s:new Declaracion($2, null, $1.s, Type.DECLARACION, this._$.first_line, this._$.first_column),n:new Nodo('DECLARACION', [$1.n, new Nodo($2, null)])}}
   |TYPE id igual EXPRL                                                       {$$ = {s:new Declaracion($2, $4.s, $1.s, Type.DECLARACION, this._$.first_line, this._$.first_column),n:new Nodo('DECLARACION', [$1.n, new Nodo($2, null), new Nodo($3, null), $4.n])}}
   //|TYPE id igual CASTEO 
   //|TYPE corchetea corchetec id igual nuevo TYPE corchetea EXPRL corchetec
   //|TYPE corchetea corchetec id igual llavea LISTAVALORES llavec
   //|tlista TYPE id igual nuevo tlista menor TYPE mayor   
;

CASTEO
   :parena TYPE parenc EXPRL
;

ASIGNACION
   :id igual EXPRL            {$$ = {s:new Asignacion($1, $3.s, Type.ASIGNACION, this._$.first_line, this._$.first_column), n:new Nodo('ASIGNACION', [new Nodo($1, null), new Nodo($2, null), $3.n])}}          
   //|id igual CASTEO
   |id incremento             {$$ = {s:new Asignacion($1, null, Type.INCREMENTO, this._$.first_line, this._$.first_column),n:new Nodo('ASIGNACION', [new Nodo($1, null), new Nodo($2, null)])}}
   |id decremento             {$$ = {s:new Asignacion($1, null, Type.DECREMENTO, this._$.first_line, this._$.first_column),n:new Nodo('ASIGNACION', [new Nodo($1, null), new Nodo($2, null)])}} 
   //|ACCESOVECTOR igual EXPRL 
   //|ACCESOLISTA igual EXPRL 
;

TYPE
   :tint          {$$ = {s:Type.INT,n:new Nodo('TYPE', [new Nodo($1,null)])};}
   |tstring       {$$ = {s:Type.STRING,n:new Nodo('TYPE', [new Nodo($1,null)])};}
   |tdouble       {$$ = {s:Type.DOUBLE,n:new Nodo('TYPE', [new Nodo($1,null)])};}
   |tbool         {$$ = {s:Type.BOOLEAN,n:new Nodo('TYPE', [new Nodo($1,null)])};}
   |tchar         {$$ = {s:Type.CHAR,n:new Nodo('TYPE', [new Nodo($1,null)])};}
;

ACCESOVECTOR
   :id corchetea EXPRL corchetec 
;

ACCESOLISTA
   :id corchetea corchetea EXPRL corchetec corchetec
;

/*SIGNO DE SINCRONIZACIÓN*/
SYNC
   :ptcoma {$$ = {s:$1, n:new Nodo('SYNC', [new Nodo($1, null)])}}
   |error {program.newError(Type.SINTACTICO, "No se esperaba: " + $$, this._$.first_line, this._$.first_column)}
;


/*FUNCIONES*/
MAIN
   :ex LLAMADA    {$$ = {s:$2.s,n:new Nodo('MAIN', [new Nodo($1, null), $2.n])}}
;

LLAMADA
   :id parena LISTAVALORES parenc   {$$ = {s:new Call($1, $3.s, this._$.first_line, this._$.first_column),n:new Nodo('LLAMADA', [new Nodo($1,null), new Nodo($2, null), $3.n, new Nodo($4, null)])};}
   |id parena parenc                {$$ = {s:new Call($1, [], this._$.first_line, this._$.first_column),n:new Nodo('LLAMADA', [new Nodo($1,null), new Nodo($2, null), new Nodo($3, null)])}}
;

LISTAVALORES
   :LISTAVALORES coma EXPRL   {$1.s.push($3.s),$$ ={s:$1.s,n:new Nodo('LISTAVALORES', [$1.n, new Nodo($2, null), $3.n])}}
   |EXPRL                     {$$ = {s:[$1.s],n:new Nodo('LISTAVALORES', [$1.n])}}
;

FUNCION
   ://TYPE id parena PARAM parenc BLOQUE
   //|TYPE id parena parenc BLOQUE
   /*|*/tmethod id parena PARAM parenc BLOQUE      {$$={s: new Funcion($2,$4.s,$6.s,Type.METODO,Type.FUNCION,this._$.first_line, this._$.first_column),n:new Nodo('FUNCION',[new Nodo($1,null), new Nodo($2,null), new Nodo($3,null), $4.n,new Nodo($5,null), $6.n])}}
   |tmethod id parena parenc BLOQUE                {$$={s: new Funcion($2,[],$5.s,Type.METODO,Type.FUNCION,this._$.first_line, this._$.first_column),n:new Nodo('FUNCION',[new Nodo($1,null), new Nodo($2,null), new Nodo($3,null),new Nodo($4,null), $5.n])}}
;

PARAM
   :PARAM coma TYPE id     {$1.s.push({id: $4, type: $3.s}); $$ = {s:$1.s,n:new Nodo('PARAM', [$1.n, new Nodo($2, null), $3.n, new Nodo($4, null)])}}
   |TYPE id                {$$ = {s:[{id: $2, type: $1.s}],n:new Nodo('PARAM', [$1.n, new Nodo($2, null)])}} 
;

/*CICLOS*/
WHILE 
   :mientras parena EXPRL parenc BLOQUE   {$$ = {s:new While($3.s, $5.s, this._$.first_line, this._$.first_column),n:new Nodo('WHILE', [new Nodo($1,null), new Nodo($2,null), $3.n, new Nodo($4,null), $5.n])}}
;

DOWHILE
   :has BLOQUE mientras parena EXPRL parenc SYNC {$$ = {s:new DoWhile($5.s, $2.s, this._$.first_line, this._$.first_column), 
                                                  n:new Nodo('DOWHILE',[new Nodo($1, null), $2.n, new Nodo($3,null), new Nodo($4,null),$5.n, new Nodo($6,null), $7.n])}}
;

FOR 
   :para parena ASIGNACION ptcoma EXPRL ptcoma ASIGNACION parenc BLOQUE    {$$ = {s:new For($3.s,$5.s,$7.s,$9.s,this._$.first_line, this._$.first_column),
                                                                             n:new Nodo('FOR', [new Nodo($1, null), new Nodo($2, null), $3.n, new Nodo($4,null), $5.n, new Nodo($6, null), $7.n, new Nodo($8, null), $9.n])}}
   |para parena DECLARACION ptcoma EXPRL ptcoma ASIGNACION parenc BLOQUE   {$$ = {s:new For($3.s,$5.s,$7.s,$9.s,this._$.first_line, this._$.first_column),
                                                                            n:new Nodo('FOR', [new Nodo($1, null), new Nodo($2, null), $3.n, new Nodo($4,null), $5.n, new Nodo($6, null), $7.n, new Nodo($8, null), $9.n])}}
;

TRANSFERENCIA
   :retorno 
   |continuar  {$$ = {s:new Control(Type.CONTINUE,Type.CONTROL, this._$.first_line, this._$.first_column),n:new Nodo('TRANSFERENCIA', [new Nodo($1, null)])}}
   |romper     {$$ = {s:new Control(Type.BREAK,Type.CONTROL, this._$.first_line, this._$.first_column),n:new Nodo('TRANSFERENCIA', [new Nodo($1, null)])}}
;


/*SENTENCIAS DE CONTROL Y OPERADOR TERNARIO*/
OPTERNARIO
   :EXPRL interrog EXPRL dospt EXPRL
;

IF
   :IFSOLO        {$$ = {s:$1.s,n:new Nodo('IF', [$1.n])};}            
   |IFSOLO ELSE   {$1.s.push(...($2.s));$$ = {s:$1.s, n:new Nodo('IF', [$1.n, $2.n])};}
;

ELSE
   :sino BLOQUE      {$$ = {s:[{exp: null, block: $2.s}], n:new Nodo('ELSE', [new Nodo($1, null), $2.n])};}  
   |sino IF          {$$ = {s:$2.s, n:new Nodo('ELSE', [new Nodo($1, null), $2.n])}}
;

IFSOLO
   :si parena EXPRL parenc BLOQUE   {$$ = {s:[{exp: $3.s, block: $5.s}],n:new Nodo('IFSOLO', [new Nodo($1, null), new Nodo($2, null), $3.n, new Nodo($4, null), $5.n])};}
;

SWITCH
   :fswitch parena EXPRL parenc llavea CASES llavec            {$$ = {s:new Switch($3.s, $6.s, null, this._$.first_line, this._$.first_column),n:new Nodo('SWITCH',[new Nodo($1,null), new Nodo($2, null), $3.n, new Nodo($4, null), new Nodo($5, null), $6.n, new Nodo($7, null)])}}
   |fswitch parena EXPRL parenc llavea DEFAULT llavec          {$$ = {s:new Switch($3.s, null, $6.s, this._$.first_line, this._$.first_column),n:new Nodo('SWITCH',[new Nodo($1,null), new Nodo($2, null), $3.n, new Nodo($4, null), new Nodo($5, null), $6.n, new Nodo($7, null)])}}
   |fswitch parena EXPRL parenc llavea CASES DEFAULT llavec    {$$ = {s:new Switch($3.s, $6.s, $7.s, this._$.first_line, this._$.first_column),n:new Nodo('SWITCH',[new Nodo($1,null), new Nodo($2, null), $3.n, new Nodo($4, null), new Nodo($5, null), $6.n, $7.n, new Nodo($8, null)])}}
;

CASES
   :CASES caso EXPRL dospt INSTRUCCIONES  {$1.s.push({exp:$3.s, block:new Bloque($5.s, this._$.first_line, this._$.first_column)}); $$ = {s:$1.s, n:new Nodo('CASES', [$1.n, new Nodo($2, null), $3.n , new Nodo($4, null), $5.n])}}
   |caso EXPRL dospt INSTRUCCIONES        {$$ = {s:[{exp: $2.s, block: new Bloque($4.s, this._$.first_line, this._$.first_column)}],n:new Nodo('CASES',[new Nodo($1, null), $2.n])}}
;

DEFAULT
   :defecto dospt INSTRUCCIONES           {$$ = {s:new Bloque($3.s, this._$.first_line, this._$.first_column),n:new Nodo('DEFAULT',[new Nodo($1,null),new Nodo($2, null), $3.n])}}
;


/*EXPRESIONES Y VALORES*/
EXPRL
   ://OPTERNARIO
   EXPRL ologico EXPRL       {$$ = {s:new Logica($1.s, $3.s, Type.OR, Type.LOGICO, this._$.first_line, this._$.first_column),n: new Nodo('EXPRL', [$1.n, new Nodo($2, null), $3.n])};}
   |EXPRL ylogico EXPRL       {$$ = {s:new Logica($1.s, $3.s, Type.AND, Type.LOGICO, this._$.first_line, this._$.first_column),n: new Nodo('EXPRL', [$1.n, new Nodo($2, null), $3.n])};}
   |exclamacion EXPRL         {$$ = {s:new Unitaria($2.s, Type.NOT, Type.UNITARIA, this._$.first_line, this._$.first_column),n: new Nodo('EXPRL', [new Nodo($1, null), $2.n])};}
   |EXPRL equals EXPRL        {$$ = {s:new Logica($1.s, $3.s, Type.IGUAL, Type.LOGICO, this._$.first_line, this._$.first_column),n: new Nodo('EXPRL', [$1.n, new Nodo($2, null), $3.n])};}
   |EXPRL diferente EXPRL     {$$ = {s:new Logica($1.s, $3.s, Type.DIFERENTE, Type.LOGICO, this._$.first_line, this._$.first_column),n: new Nodo('EXPRL', [$1.n, new Nodo($2, null), $3.n])};}
   |EXPRL menor EXPRL         {$$ = {s:new Logica($1.s, $3.s, Type.MENOR, Type.LOGICO, this._$.first_line, this._$.first_column),n: new Nodo('EXPRL', [$1.n, new Nodo($2, null), $3.n])};}
   |EXPRL mayor EXPRL         {$$ = {s:new Logica($1.s, $3.s, Type.MAYOR, Type.LOGICO, this._$.first_line, this._$.first_column),n: new Nodo('EXPRL', [$1.n, new Nodo($2, null), $3.n])};}
   |EXPRL mayorigual EXPRL    {$$ = {s:new Logica($1.s, $3.s, Type.MAYORIGUAL, Type.LOGICO, this._$.first_line, this._$.first_column),n: new Nodo('EXPRL', [$1.n, new Nodo($2, null), $3.n])};}
   |EXPRL menorigual EXPRL    {$$ = {s:new Logica($1.s, $3.s, Type.MENORIGUAL, Type.LOGICO, this._$.first_line, this._$.first_column),n: new Nodo('EXPRL', [$1.n, new Nodo($2, null), $3.n])};}
   |EXP2                      {$$ = {s:$1.s, n:new Nodo('EXPRL', [$1.n])}}
;

EXP2
   :EXPRL mas EXPRL           {$$ = {s:new Aritmetica($1.s, $3.s, Type.SUMA, Type.ARITMETICO, this._$.first_line, this._$.first_column),n: new Nodo('EXP2', [$1.n, new Nodo($2, null), $3.n])};}
   |EXPRL menos EXPRL         {$$ = {s:new Aritmetica($1.s, $3.s, Type.RESTA, Type.ARITMETICO, this._$.first_line, this._$.first_column),n: new Nodo('EXP2', [$1.n, new Nodo($2, null), $3.n])};}
   |EXPRL por EXPRL           {$$ = {s:new Aritmetica($1.s, $3.s, Type.MULTIPLICACION, Type.ARITMETICO, this._$.first_line, this._$.first_column),n: new Nodo('EXP2', [$1.n, new Nodo($2, null), $3.n])};}
   |EXPRL dividido EXPRL      {$$ = {s:new Aritmetica($1.s, $3.s, Type.DIVISION, Type.ARITMETICO, this._$.first_line, this._$.first_column),n: new Nodo('EXP2', [$1.n, new Nodo($2, null), $3.n])};}
   |EXPRL modulo EXPRL        {$$ = {s:new Aritmetica($1.s, $3.s, Type.MODULO, Type.ARITMETICO, this._$.first_line, this._$.first_column),n: new Nodo('EXP2', [$1.n, new Nodo($2, null), $3.n])};}
   |EXPRL elevado EXPRL       {$$ = {s:new Aritmetica($1.s, $3.s, Type.POTENCIA, Type.ARITMETICO, this._$.first_line, this._$.first_column), n: new Nodo('EXP2', [$1.n, new Nodo($2, null), $3.n])};}
   |EXPVAL                    {$$ = {s:$1.s, n: new Nodo('EXP2',[$1.n])}}
;

EXPVAL
   :menos EXPRL            {$$ = {s:new Unitaria($2.s, Type.NEGACION, Type.UNITARIA, this._$.first_line, this._$.first_column),n:new Nodo('EXPVAL', [new Nodo($1, null), $2.n])};}
   |parena EXPRL parenc    {$$ = {s:$2.s,n:new Nodo('EXPVAL', [new Nodo($1, null),$2.n,new Nodo($3, null)])}}
   |NUM                    {$$ = {s:new Value($1.s.value, $1.s.type, Type.VALOR, this._$.first_line, this._$.first_column),n:new Nodo('EXPVAL', [$1.n])};}
   |cadena                 {$$ = {s:new Value(String($1), Type.STRING, Type.VALOR, this._$.first_line, this._$.first_column),n:new Nodo('EXPVAL', [new Nodo("\\\""+$1+"\\\"", null)])};}
   |caracter               {$$ = {s:new Value(String($1), Type.CHAR, Type.VALOR, this._$.first_line, this._$.first_column),n:new Nodo('EXPVAL', [new Nodo("\\\'"+$1+"\\\'", null)])};}
   |vtrue                  {$$ = {s:new Value(true, Type.BOOLEAN, Type.VALOR, this._$.first_line, this._$.first_column),n:new Nodo('EXPVAL', [new Nodo($1, null)])};}
   |vfalse                 {$$ = {s:new Value(false, Type.BOOLEAN, Type.VALOR, this._$.first_line, this._$.first_column), n:new Nodo('EXPVAL', [new Nodo($1, null)])};}
   |id                     {$$ = {s:new Symbol($1, null, Type.SYMBOL, Type.VALOR, this._$.first_line, this._$.first_column), n:new Nodo('EXPVAL', [new Nodo($1, null)])};}
   //|ACCESOVECTOR
   //|ACCESOLISTA
   //|NATIVA
   //|LLAMADA
;

NUM
   :entero  {$$ = {s:new Value(parseInt($1), Type.INT, Type.VALOR, this._$.first_line, this._$.first_column), n: new Nodo('NUM', [new Nodo($1, null)])};}
   |decimal {$$ = {s:new Value(parseFloat($1), Type.DOUBLE, Type.VALOR, this._$.first_line, this._$.first_column), n:new Nodo('NUM', [new Nodo($1, null)])};}
;