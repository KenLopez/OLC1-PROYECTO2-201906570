const Type = require('./Type.js')
const Value = require('./Value.js')
class Aritmetica{
    constructor(_expIzq, _expDer, _type,_typeExp, _fila, _columna){
        this.expDer = _expDer
        this.expIzq = _expIzq
        this.type = _typeExp
        this.typeExp = _typeExp
        this.type = _type
        this.fila = _fila
        this.columna = _columna
    }

    ejecutar(tabla, global){
        let der = this.expDer.ejecutar(tabla, global)
        let izq = this.expIzq.ejecutar(tabla, global)
        if ((der == null) || (izq == null) || (der == Type.ERROR) || (izq == Type.ERROR)) {
            global.newError(Type.SEMANTICO, 'No se pudo operar, null pointer exception.', this.fila, this.columna )
            return null
        }   
        if (izq.type == Type.INT) {
            if (der.type == Type.INT) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(izq.value + der.value,Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value(izq.value - der.value,Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.MULTIPLICACION:
                        return new Value(izq.value * der.value,Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.DIVISION:
                        return new Value(izq.value / der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MODULO:
                        return new Value(izq.value % der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.POTENCIA:
                        return new Value(Math.pow(izq.value,der.value),Type.INT,Type.VALOR,this.fila, this.columna)
                } 
            }else if (der.type == Type.DOUBLE) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(izq.value + der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value(izq.value - der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MULTIPLICACION:
                        return new Value(izq.value * der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.DIVISION:
                        return new Value(izq.value / der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MODULO:
                        return new Value(izq.value % der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.POTENCIA:
                        return new Value(Math.pow(izq.value,der.value),Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                } 
            }else if (der.type == Type.BOOLEAN) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(izq.value + (der.value?1:0),Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value(izq.value - (der.value?1:0),Type.INT,Type.VALOR,this.fila, this.columna)
                } 
            }else if (der.type == Type.CHAR) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(izq.value + der.value.charCodeAt(0),Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value(izq.value - der.value.charCodeAt(0),Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.MULTIPLICACION:
                        return new Value(izq.value * der.value.charCodeAt(0),Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.DIVISION:
                        return new Value(izq.value / der.value.charCodeAt(0),Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                }
            }else if (der.type == Type.STRING) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(String(izq.value) + der.value,Type.INT,Type.VALOR,this.fila, this.columna)
                } 
            }
        }else if (izq.type == Type.DOUBLE) {
            if (der.type == Type.INT) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(izq.value + der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value(izq.value - der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MULTIPLICACION:
                        return new Value(izq.value * der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.DIVISION:
                        return new Value(izq.value / der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MODULO:
                        return new Value(izq.value % der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.POTENCIA:
                        return new Value(Math.pow(izq.value,der.value),Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                } 
            }else if (der.type == Type.DOUBLE) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(izq.value + der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value(izq.value - der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MULTIPLICACION:
                        return new Value(izq.value * der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.DIVISION:
                        return new Value(izq.value / der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MODULO:
                        return new Value(izq.value % der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.POTENCIA:
                        return new Value(Math.pow(izq.value,der.value),Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                } 
            }else if (der.type == Type.BOOLEAN) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(izq.value + (der.value?1:0),Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value(izq.value - (der.value?1:0),Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                } 
            }else if (der.type == Type.CHAR) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(izq.value + der.value.charCodeAt(0),Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value(izq.value - der.value.charCodeAt(0),Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MULTIPLICACION:
                        return new Value(izq.value * der.value.charCodeAt(0),Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.DIVISION:
                        return new Value(izq.value / der.value.charCodeAt(0),Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                } 
            }else if (der.type == Type.STRING) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(String(izq.value) + der.value,Type.STRING,Type.VALOR,this.fila, this.columna)
                }
            }
        }else if (izq.type == Type.BOOLEAN) {
            if (der.type == Type.INT) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value((izq.value?1:0) + der.value,Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value((izq.value?1:0) - der.value,Type.INT,Type.VALOR,this.fila, this.columna)
                } 
            }else if (der.type == Type.DOUBLE) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value((izq.value?1:0) + der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value((izq.value?1:0) + der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                } 
            }else if (der.type == Type.BOOLEAN) {
            }else if (der.type == Type.CHAR) {
            }else if (der.type == Type.STRING) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(String(izq.value) + der.value,Type.INT,Type.VALOR,this.fila, this.columna)
                } 
            }
        }else if (izq.type == Type.CHAR) {
            if (der.type == Type.INT) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(izq.value.charCodeAt(0) + der.value,Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value(izq.value.charCodeAt(0) - der.value,Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.MULTIPLICACION:
                        return new Value(izq.value.charCodeAt(0) * der.value,Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.DIVISION:
                        return new Value(izq.value.charCodeAt(0) / der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                } 
            }else if (der.type == Type.DOUBLE) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(izq.value.charCodeAt(0) + der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value(izq.value.charCodeAt(0) - der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MULTIPLICACION:
                        return new Value(izq.value.charCodeAt(0) * der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.DIVISION:
                        return new Value(izq.value.charCodeAt(0) / der.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                } 
            }else if (der.type == Type.BOOLEAN) {
            }else if (der.type == Type.CHAR) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(izq.value + der.value,Type.STRING,Type.VALOR,this.fila, this.columna)
                } 
            }else if (der.type == Type.STRING) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(izq.value + der.value,Type.STRING,Type.VALOR,this.fila, this.columna)
                } 
            }
        }else if (izq.type == Type.STRING) {
            if (der.type == Type.INT) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(izq.value + der.value,Type.STRING,Type.VALOR,this.fila, this.columna)
                }  
            }else if (der.type == Type.DOUBLE) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(izq.value + der.value,Type.STRING,Type.VALOR,this.fila, this.columna)
                }  
            }else if (der.type == Type.BOOLEAN) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(izq.value + String(der.value),Type.STRING,Type.VALOR,this.fila, this.columna)
                }  
            }else if (der.type == Type.CHAR) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(izq.value + der.value,Type.STRING,Type.VALOR,this.fila, this.columna)
                }  
            }else if (der.type == Type.STRING) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(izq.value + der.value,Type.STRING,Type.VALOR,this.fila, this.columna)
                } 
            }
        }
        global.newError(Type.SEMANTICO, 'No se pudo operar: '+izq.type+' '+this.type+' '+der.type +
        '; tipos incompatibles.', this.fila, this.columna )
        return null
    }
}

module.exports = Aritmetica