/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var gramatica = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,25],$V1=[1,44],$V2=[1,18],$V3=[1,28],$V4=[1,29],$V5=[1,30],$V6=[1,31],$V7=[1,32],$V8=[1,27],$V9=[1,19],$Va=[1,22],$Vb=[1,23],$Vc=[1,24],$Vd=[1,33],$Ve=[1,21],$Vf=[1,36],$Vg=[1,43],$Vh=[1,42],$Vi=[1,45],$Vj=[1,46],$Vk=[1,47],$Vl=[1,48],$Vm=[5,26,27,31,40,41,42,43,44,46,47,50,51,52,59,60,71,83,89,90,91,92,93],$Vn=[1,52],$Vo=[2,107],$Vp=[1,62],$Vq=[1,59],$Vr=[1,60],$Vs=[1,61],$Vt=[5,25,26,27,31,40,41,42,43,44,46,47,50,51,52,59,60,63,65,66,71,83,89,90,91,92,93],$Vu=[1,68],$Vv=[1,73],$Vw=[23,25,29,35,45,49,54,55,67],$Vx=[23,25,29,35,45,49,54,55,67,69],$Vy=[23,25,29,35,45,49,54,55,67,69,73,74],$Vz=[23,25,29,35,45,49,54,55,67,69,73,74,76,77],$VA=[23,25,29,35,45,49,54,55,67,69,73,74,76,77,79,80],$VB=[1,92],$VC=[1,93],$VD=[1,94],$VE=[1,95],$VF=[23,25,29,35,45,49,54,55,67,69,73,74,76,77,79,80,82,83,84,85,86,87],$VG=[1,102],$VH=[1,111],$VI=[1,128],$VJ=[29,31,34],$VK=[29,45],$VL=[1,154],$VM=[5,26,27,31,40,41,42,43,44,45,46,47,50,51,52,59,60,71,83,89,90,91,92,93],$VN=[25,29,49],$VO=[1,160],$VP=[25,26,27,31,40,41,42,43,44,50,51,52,59,60,63,65,66,71,83,89,90,91,92,93],$VQ=[23,25,29,35,45,49,54,55,67,69,73,74,76,77,79,80,82,83],$VR=[23,25,29,35,45,49,54,55,67,69,73,74,76,77,79,80,82,83,84,85,86],$VS=[5,25,26,27,31,40,41,42,43,44,46,47,50,51,52,58,59,60,63,65,66,71,83,89,90,91,92,93],$VT=[29,49],$VU=[1,198],$VV=[25,63,65],$VW=[1,226];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"INICIO":3,"GLOBALES":4,"EOF":5,"GLOBAL":6,"DECLARACION":7,"SYNC":8,"ASIGNACION":9,"METODO":10,"IF":11,"SWITCH":12,"WHILE":13,"DOWHILE":14,"FOR":15,"PRINT":16,"OPTERNARIO":17,"LLAMADA":18,"MAIN":19,"INSTRUCCIONES":20,"INSTRUCCION":21,"BLOQUE":22,"llavea":23,"BLOQUE2":24,"llavec":25,"print":26,"parena":27,"EXPRL":28,"parenc":29,"TYPE":30,"id":31,"igual":32,"CASTEO":33,"corchetea":34,"corchetec":35,"nuevo":36,"LISTAVALORES":37,"incremento":38,"decremento":39,"tint":40,"tstring":41,"tdouble":42,"tboolean":43,"tchar":44,"ptcoma":45,"ex":46,"tmethod":47,"PARAM":48,"coma":49,"mientras":50,"do":51,"para":52,"EXPLR":53,"interrog":54,"dospt":55,"IFSOLO":56,"ELSE":57,"sino":58,"si":59,"fswitch":60,"CASES":61,"DEFAULT":62,"caso":63,"BREAK":64,"defecto":65,"romper":66,"ologico":67,"EXPRL2":68,"ylogico":69,"EXPRL3":70,"exclamacion":71,"EXP":72,"equals":73,"diferente":74,"EXP2":75,"menor":76,"mayor":77,"EXP3":78,"mayorigual":79,"menorigual":80,"EXP4":81,"mas":82,"menos":83,"por":84,"dividido":85,"modulo":86,"elevado":87,"EXPVAL":88,"num":89,"cadena":90,"caracter":91,"vtrue":92,"vfalse":93,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",23:"llavea",25:"llavec",26:"print",27:"parena",29:"parenc",31:"id",32:"igual",34:"corchetea",35:"corchetec",36:"nuevo",38:"incremento",39:"decremento",40:"tint",41:"tstring",42:"tdouble",43:"tboolean",44:"tchar",45:"ptcoma",46:"ex",47:"tmethod",49:"coma",50:"mientras",51:"do",52:"para",53:"EXPLR",54:"interrog",55:"dospt",58:"sino",59:"si",60:"fswitch",63:"caso",65:"defecto",66:"romper",67:"ologico",69:"ylogico",71:"exclamacion",73:"equals",74:"diferente",76:"menor",77:"mayor",79:"mayorigual",80:"menorigual",82:"mas",83:"menos",84:"por",85:"dividido",86:"modulo",87:"elevado",89:"num",90:"cadena",91:"caracter",92:"vtrue",93:"vfalse"},
productions_: [0,[3,2],[3,1],[4,2],[4,1],[6,2],[6,2],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,2],[6,2],[6,2],[6,1],[20,2],[20,1],[21,2],[21,2],[21,1],[21,1],[21,1],[21,1],[21,1],[21,2],[21,2],[21,2],[22,2],[24,2],[24,1],[16,4],[16,3],[7,2],[7,4],[7,5],[7,10],[7,8],[33,3],[9,3],[9,4],[9,3],[9,3],[30,2],[30,2],[30,2],[30,2],[30,2],[8,1],[19,2],[10,6],[10,5],[48,4],[48,2],[18,4],[18,3],[37,3],[37,1],[13,5],[14,9],[15,11],[15,11],[17,5],[11,1],[11,2],[57,2],[57,2],[56,5],[12,7],[12,7],[12,8],[61,4],[61,3],[61,4],[62,3],[62,4],[64,2],[28,3],[28,1],[68,3],[68,1],[70,2],[70,1],[72,3],[72,3],[72,1],[75,3],[75,3],[75,1],[78,3],[78,3],[78,1],[81,3],[81,3],[81,3],[81,3],[81,3],[81,3],[81,1],[88,1],[88,2],[88,3],[88,1],[88,1],[88,1],[88,1],[88,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
}
},
table: [{3:1,4:2,5:[1,3],6:4,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,26:$V0,27:$V1,28:26,30:17,31:$V2,40:$V3,41:$V4,42:$V5,43:$V6,44:$V7,46:$V8,47:$V9,50:$Va,51:$Vb,52:$Vc,56:20,59:$Vd,60:$Ve,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{1:[3]},{5:[1,49],6:50,7:5,9:6,10:7,11:8,12:9,13:10,14:11,15:12,16:13,17:14,18:15,19:16,26:$V0,27:$V1,28:26,30:17,31:$V2,40:$V3,41:$V4,42:$V5,43:$V6,44:$V7,46:$V8,47:$V9,50:$Va,51:$Vb,52:$Vc,56:20,59:$Vd,60:$Ve,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{1:[2,2]},o($Vm,[2,4]),{8:51,45:$Vn},{8:53,45:$Vn},o($Vm,[2,7]),o($Vm,[2,8]),o($Vm,[2,9]),o($Vm,[2,10]),o($Vm,[2,11]),o($Vm,[2,12]),{8:54,45:$Vn},{8:55,45:$Vn},{8:56,45:$Vn},o($Vm,[2,16]),{31:[1,57],34:[1,58]},o([54,67,69,73,74,76,77,79,80,82,83,84,85,86,87],$Vo,{27:$Vp,32:$Vq,38:$Vr,39:$Vs}),{31:[1,63]},o($Vt,[2,64],{57:64,58:[1,65]}),{27:[1,66]},{27:$V1,28:67,31:$Vu,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{23:[1,69]},{27:[1,70]},{27:[1,71]},{54:[1,72],67:$Vv},{18:74,31:[1,75]},{8:76,45:$Vn},{8:77,45:$Vn},{8:78,45:$Vn},{8:79,45:$Vn},{8:80,45:$Vn},{27:[1,81]},o($Vw,[2,79],{69:[1,82]}),o($Vx,[2,81]),{27:$V1,31:$Vu,70:83,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},o($Vx,[2,83],{73:[1,84],74:[1,85]}),o($Vy,[2,86],{76:[1,86],77:[1,87]}),o($Vz,[2,89],{79:[1,88],80:[1,89]}),o($VA,[2,92],{82:[1,90],83:[1,91],84:$VB,85:$VC,86:$VD,87:$VE}),o($VF,[2,99]),o($VF,[2,100]),{89:[1,96]},{27:$V1,28:97,31:$Vu,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},o($VF,[2,103]),o($VF,[2,104]),o($VF,[2,105]),o($VF,[2,106]),{1:[2,1]},o($Vm,[2,3]),o($Vm,[2,5]),o([5,25,26,27,29,31,34,40,41,42,43,44,45,46,47,50,51,52,53,59,60,63,65,66,71,83,89,90,91,92,93],[2,49]),o($Vm,[2,6]),o($Vm,[2,13]),o($Vm,[2,14]),o($Vm,[2,15]),{32:[1,98],45:[2,34]},{35:[1,99]},{27:$VG,28:100,31:$Vu,33:101,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{8:103,45:$Vn},{8:104,45:$Vn},{27:$V1,28:107,29:[1,106],31:$Vu,37:105,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{27:[1,108]},o($Vt,[2,65]),{11:110,22:109,23:$VH,56:20,59:$Vd},{27:$V1,28:112,31:$Vu,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{23:[1,113],67:$Vv},o($VF,$Vo),{7:116,9:117,11:118,12:119,13:120,14:121,15:122,16:123,17:124,18:125,20:114,21:115,26:$V0,27:$V1,28:26,30:17,31:$V2,40:$V3,41:$V4,42:$V5,43:$V6,44:$V7,50:$Va,51:$Vb,52:$Vc,56:20,59:$Vd,60:$Ve,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{7:127,9:126,30:17,31:$VI,40:$V3,41:$V4,42:$V5,43:$V6,44:$V7},{27:$V1,28:129,29:[1,130],31:$Vu,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{27:$V1,28:131,31:$Vu,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{27:$V1,28:132,31:$Vu,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},o($Vm,[2,50]),{27:$Vp},o($VJ,[2,44]),o($VJ,[2,45]),o($VJ,[2,46]),o($VJ,[2,47]),o($VJ,[2,48]),{27:$V1,28:133,31:$Vu,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{27:$V1,31:$Vu,68:134,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},o($Vx,[2,82]),{27:$V1,31:$Vu,72:135,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{27:$V1,31:$Vu,72:136,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{27:$V1,31:$Vu,75:137,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{27:$V1,31:$Vu,75:138,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{27:$V1,31:$Vu,78:139,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{27:$V1,31:$Vu,78:140,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{27:$V1,31:$Vu,81:141,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{27:$V1,31:$Vu,81:142,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{27:$V1,31:$Vu,81:143,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{27:$V1,31:$Vu,81:144,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{27:$V1,31:$Vu,81:145,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{27:$V1,31:$Vu,81:146,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},o($VF,[2,101]),{29:[1,147],67:$Vv},{27:$VG,28:148,31:$Vu,33:149,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{31:[1,150]},o($VK,[2,40],{67:$Vv}),{27:$V1,28:151,31:$Vu,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{27:$V1,28:97,30:152,31:$Vu,40:$V3,41:$V4,42:$V5,43:$V6,44:$V7,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},o($VK,[2,42]),o($VK,[2,43]),{29:[1,153],49:$VL},o($VM,[2,56]),o($VN,[2,58],{67:$Vv}),{29:[1,156],30:157,40:$V3,41:$V4,42:$V5,43:$V6,44:$V7,48:155},o($Vt,[2,66]),o($Vt,[2,67]),{7:116,9:117,11:118,12:119,13:120,14:121,15:122,16:123,17:124,18:125,21:159,24:158,25:$VO,26:$V0,27:$V1,28:26,30:17,31:$V2,40:$V3,41:$V4,42:$V5,43:$V6,44:$V7,50:$Va,51:$Vb,52:$Vc,56:20,59:$Vd,60:$Ve,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{29:[1,161],67:$Vv},{7:116,9:117,11:118,12:119,13:120,14:121,15:122,16:123,17:124,18:125,20:162,21:115,26:$V0,27:$V1,28:26,30:17,31:$V2,40:$V3,41:$V4,42:$V5,43:$V6,44:$V7,50:$Va,51:$Vb,52:$Vc,56:20,59:$Vd,60:$Ve,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{7:116,9:117,11:118,12:119,13:120,14:121,15:122,16:123,17:124,18:125,21:164,25:[1,163],26:$V0,27:$V1,28:26,30:17,31:$V2,40:$V3,41:$V4,42:$V5,43:$V6,44:$V7,50:$Va,51:$Vb,52:$Vc,56:20,59:$Vd,60:$Ve,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},o($VP,[2,18]),{8:165,45:$Vn},{8:166,45:$Vn},o($VP,[2,21]),o($VP,[2,22]),o($VP,[2,23]),o($VP,[2,24]),o($VP,[2,25]),{8:167,45:$Vn},{8:168,45:$Vn},{8:169,45:$Vn},{8:170,45:$Vn},{8:171,45:$Vn},{32:$Vq,38:$Vr,39:$Vs},{29:[1,172],67:$Vv},{45:[2,33]},{55:[1,173],67:$Vv},o($Vw,[2,78]),{29:[1,174],67:$Vv},o($Vx,[2,80]),o($Vy,[2,84]),o($Vy,[2,85]),o($Vz,[2,87]),o($Vz,[2,88]),o($VA,[2,90]),o($VA,[2,91]),o($VQ,[2,93],{84:$VB,85:$VC,86:$VD,87:$VE}),o($VQ,[2,94],{84:$VB,85:$VC,86:$VD,87:$VE}),o($VR,[2,95],{87:$VE}),o($VR,[2,96],{87:$VE}),o($VR,[2,97],{87:$VE}),o($VR,[2,98],{87:$VE}),o($VF,[2,102]),{45:[2,35],67:$Vv},{27:$V1,28:175,31:$Vu,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{32:[1,176]},o($VK,[2,41],{67:$Vv}),{29:[1,177]},o($VM,[2,55]),{27:$V1,28:178,31:$Vu,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{29:[1,179],49:[1,180]},{22:181,23:$VH},{31:[1,182]},o($VS,[2,29]),{7:116,9:117,11:118,12:119,13:120,14:121,15:122,16:123,17:124,18:125,21:159,24:183,25:$VO,26:$V0,27:$V1,28:26,30:17,31:$V2,40:$V3,41:$V4,42:$V5,43:$V6,44:$V7,50:$Va,51:$Vb,52:$Vc,56:20,59:$Vd,60:$Ve,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},o($VS,[2,31]),{23:[1,184]},{7:116,9:117,11:118,12:119,13:120,14:121,15:122,16:123,17:124,18:125,21:164,25:[1,185],26:$V0,27:$V1,28:26,30:17,31:$V2,40:$V3,41:$V4,42:$V5,43:$V6,44:$V7,50:$Va,51:$Vb,52:$Vc,56:20,59:$Vd,60:$Ve,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{50:[1,186]},o($VP,[2,17]),o($VP,[2,19]),o($VP,[2,20]),o($VP,[2,26]),o($VP,[2,27]),o($VP,[2,28]),{53:[1,187]},{53:[1,188]},{45:[2,32]},{27:$V1,28:189,31:$Vu,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{22:190,23:$VH},{45:[2,36],67:$Vv},{23:[1,192],36:[1,191]},o([27,31,71,83,89,90,91,92,93],[2,39]),o($VN,[2,57],{67:$Vv}),{22:193,23:$VH},{30:194,40:$V3,41:$V4,42:$V5,43:$V6,44:$V7},o($Vm,[2,52]),o($VT,[2,54]),o($VS,[2,30]),{61:195,62:196,63:[1,197],65:$VU},o($Vt,[2,59]),{27:[1,199]},{8:200,45:$Vn},{8:201,45:$Vn},{45:[2,63],67:$Vv},o($VS,[2,68]),{30:202,40:$V3,41:$V4,42:$V5,43:$V6,44:$V7},{27:$V1,28:107,31:$Vu,37:203,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},o($Vm,[2,51]),{31:[1,204]},{25:[1,205],62:206,63:[1,207],65:$VU},{25:[1,208]},{55:[1,209]},{55:[1,210]},{27:$V1,28:211,31:$Vu,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{9:212,31:$VI},{9:213,31:$VI},{34:[1,214]},{25:[1,215],49:$VL},o($VT,[2,53]),o($Vt,[2,69]),{25:[1,216]},{55:[1,217]},o($Vt,[2,70]),{7:116,9:117,11:118,12:119,13:120,14:121,15:122,16:123,17:124,18:125,20:218,21:115,26:$V0,27:$V1,28:26,30:17,31:$V2,40:$V3,41:$V4,42:$V5,43:$V6,44:$V7,50:$Va,51:$Vb,52:$Vc,56:20,59:$Vd,60:$Ve,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{7:116,9:117,11:118,12:119,13:120,14:121,15:122,16:123,17:124,18:125,20:219,21:115,26:$V0,27:$V1,28:26,30:17,31:$V2,40:$V3,41:$V4,42:$V5,43:$V6,44:$V7,50:$Va,51:$Vb,52:$Vc,56:20,59:$Vd,60:$Ve,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{29:[1,220],67:$Vv},{29:[1,221]},{29:[1,222]},{27:$V1,28:223,31:$Vu,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{45:[2,38]},o($Vt,[2,71]),{7:116,9:117,11:118,12:119,13:120,14:121,15:122,16:123,17:124,18:125,20:224,21:115,26:$V0,27:$V1,28:26,30:17,31:$V2,40:$V3,41:$V4,42:$V5,43:$V6,44:$V7,50:$Va,51:$Vb,52:$Vc,56:20,59:$Vd,60:$Ve,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},o($VV,[2,73],{30:17,56:20,28:26,68:34,70:35,72:37,75:38,78:39,81:40,88:41,7:116,9:117,11:118,12:119,13:120,14:121,15:122,16:123,17:124,18:125,21:164,64:225,26:$V0,27:$V1,31:$V2,40:$V3,41:$V4,42:$V5,43:$V6,44:$V7,50:$Va,51:$Vb,52:$Vc,59:$Vd,60:$Ve,66:$VW,71:$Vf,83:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl}),{7:116,9:117,11:118,12:119,13:120,14:121,15:122,16:123,17:124,18:125,21:164,25:[2,75],26:$V0,27:$V1,28:26,30:17,31:$V2,40:$V3,41:$V4,42:$V5,43:$V6,44:$V7,50:$Va,51:$Vb,52:$Vc,56:20,59:$Vd,60:$Ve,64:227,66:$VW,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{8:228,45:$Vn},{23:[1,229]},{23:[1,230]},{35:[1,231],67:$Vv},o($VV,[2,72],{30:17,56:20,28:26,68:34,70:35,72:37,75:38,78:39,81:40,88:41,7:116,9:117,11:118,12:119,13:120,14:121,15:122,16:123,17:124,18:125,21:164,26:$V0,27:$V1,31:$V2,40:$V3,41:$V4,42:$V5,43:$V6,44:$V7,50:$Va,51:$Vb,52:$Vc,59:$Vd,60:$Ve,71:$Vf,83:$Vg,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl}),o($VV,[2,74]),{8:232,45:$Vn},{25:[2,76]},o($Vt,[2,60]),{7:116,9:117,11:118,12:119,13:120,14:121,15:122,16:123,17:124,18:125,20:233,21:115,26:$V0,27:$V1,28:26,30:17,31:$V2,40:$V3,41:$V4,42:$V5,43:$V6,44:$V7,50:$Va,51:$Vb,52:$Vc,56:20,59:$Vd,60:$Ve,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{7:116,9:117,11:118,12:119,13:120,14:121,15:122,16:123,17:124,18:125,20:234,21:115,26:$V0,27:$V1,28:26,30:17,31:$V2,40:$V3,41:$V4,42:$V5,43:$V6,44:$V7,50:$Va,51:$Vb,52:$Vc,56:20,59:$Vd,60:$Ve,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{45:[2,37]},o($VV,[2,77]),{7:116,9:117,11:118,12:119,13:120,14:121,15:122,16:123,17:124,18:125,21:164,25:[1,235],26:$V0,27:$V1,28:26,30:17,31:$V2,40:$V3,41:$V4,42:$V5,43:$V6,44:$V7,50:$Va,51:$Vb,52:$Vc,56:20,59:$Vd,60:$Ve,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},{7:116,9:117,11:118,12:119,13:120,14:121,15:122,16:123,17:124,18:125,21:164,25:[1,236],26:$V0,27:$V1,28:26,30:17,31:$V2,40:$V3,41:$V4,42:$V5,43:$V6,44:$V7,50:$Va,51:$Vb,52:$Vc,56:20,59:$Vd,60:$Ve,68:34,70:35,71:$Vf,72:37,75:38,78:39,81:40,83:$Vg,88:41,89:$Vh,90:$Vi,91:$Vj,92:$Vk,93:$Vl},o($Vt,[2,61]),o($Vt,[2,62])],
defaultActions: {3:[2,2],49:[2,1],130:[2,33],172:[2,32],215:[2,38],227:[2,76],231:[2,37]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

   
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0://Espacios
break;
case 1://Comentario
break;
case 2://Comentario bloque
break;
case 3:return 82;
break;
case 4:return 38;
break;
case 5:return 83;
break;
case 6:return 39;
break;
case 7:return 84;
break;
case 8:return 85;
break;
case 9:return 87;
break;
case 10:return 86;
break;
case 11:return 32;
break;
case 12:return 73;
break;
case 13:return 71;
break;
case 14:return 74;
break;
case 15:return 76;
break;
case 16:return 80;
break;
case 17:return 77;
break;
case 18:return 79;
break;
case 19:return 54;
break;
case 20:return 55;
break;
case 21:return 45;
break;
case 22:return 69;
break;
case 23:return 67;
break;
case 24:return 27;
break;
case 25:return 29;
break;
case 26:return 23;
break;
case 27:return 25;
break;
case 28:return 49;
break;
case 29:return 87;
break;
case 30:return 34;
break;
case 31:return 35;
break;
case 32:return 40;
break;
case 33:return 42;
break;
case 34:return 'tbool';
break;
case 35:return 44;
break;
case 36:return 41;
break;
case 37:return 26;
break;
case 38:return 92;
break;
case 39:return 93;
break;
case 40:return 59;
break;
case 41:return 58;
break;
case 42:return 52;
break;
case 43:return 50;
break;
case 44:return 60;
break;
case 45:return 63;
break;
case 46:return 65;
break;
case 47:return 'has';
break;
case 48:return 46;
break;
case 49:return 47;
break;
case 50:return 'retorno';
break;
case 51:return 36;
break;
case 52:return 66;
break;
case 53:yy_.yytext=yy_.yytext.substr(1,yy_.yyleng-2);return'caracter';
break;
case 54:yy_.yytext=yy_.yytext.substr(1,yy_.yyleng-2);return'cadena';
break;
case 55:return 89;
break;
case 56:return 31;
break;
case 57:return 5;
break;
case 58:console.log('Error léxico: '+yy_.yytext+', en la línea: '+yy_.yylloc.first_line+'; columna: '+yy_.yylloc.first_column);
break;
}
},
rules: [/^(?:\s+)/i,/^(?:\\.*)/i,/^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/i,/^(?:\+)/i,/^(?:\+\+)/i,/^(?:-)/i,/^(?:--)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:\^)/i,/^(?:%)/i,/^(?:=)/i,/^(?:==)/i,/^(?:!)/i,/^(?:!=)/i,/^(?:<)/i,/^(?:<=)/i,/^(?:>)/i,/^(?:>=)/i,/^(?:\?)/i,/^(?::)/i,/^(?:;)/i,/^(?:&&)/i,/^(?:\|\|)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\{)/i,/^(?:\})/i,/^(?:,)/i,/^(?:\^)/i,/^(?:\[)/i,/^(?:\])/i,/^(?:int\b)/i,/^(?:double\b)/i,/^(?:boolean\b)/i,/^(?:char\b)/i,/^(?:string\b)/i,/^(?:print\b)/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:if\b)/i,/^(?:else\b)/i,/^(?:for\b)/i,/^(?:while\b)/i,/^(?:switch\b)/i,/^(?:case\b)/i,/^(?:default\b)/i,/^(?:do\b)/i,/^(?:exec\b)/i,/^(?:void\b)/i,/^(?:return\b)/i,/^(?:new\b)/i,/^(?:break\b)/i,/^(?:'[[a-zA-Z0-9]|[\\]|[\\\']|[\\\"]|[\\n]|[\\t]|[\\r]')/i,/^(?:"[[^\"]|[\\\""]*")/i,/^(?:[0-9]+(\.[0-9]+)?\b)/i,/^(?:([a-zA-Z_])(azAZ09_)*)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = gramatica;
exports.Parser = gramatica.Parser;
exports.parse = function () { return gramatica.parse.apply(gramatica, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}