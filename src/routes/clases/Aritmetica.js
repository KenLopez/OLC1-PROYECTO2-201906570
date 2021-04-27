const Type = require('./Type.js')
const Global = require('./Global.js')
const Value = require('./Value.js')
class Aritmetica{
    constructor(_expDer, _expIzq, _type,_typeExp, _fila, _columna){
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
        if (der.type == Type.INT) {
            if (izq.type == Type.INT) {
                switch (this.type) {
                    case Type.SUMA:
                        console.log(new Value(2,Type.INT,Type.VALOR,3, 6))
                        return new Value(der.value + izq.value,Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value(der.value - izq.value,Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.MULTIPLICACION:
                        return new Value(der.value * izq.value,Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.DIVISION:
                        return new Value(der.value / izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MODULO:
                        return new Value(der.value % izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.POTENCIA:
                        return new Value(der.value ^ izq.value,Type.INT,Type.VALOR,this.fila, this.columna)
                    default:
                        return null
                } 
            }else if (izq.type == Type.DOUBLE) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(der.value + izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value(der.value - izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MULTIPLICACION:
                        return new Value(der.value * izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.DIVISION:
                        return new Value(der.value / izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MODULO:
                        return new Value(der.value % izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.POTENCIA:
                        return new Value(der.value ^ izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    default:
                        return null
                } 
            }else if (izq.type == Type.BOOLEAN) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(der.value + (izq.value?1:0),Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value(der.value - (izq.value?1:0),Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.MULTIPLICACION:
                        return null
                    case Type.DIVISION:
                        return null
                    case Type.MODULO:
                        return null
                    case Type.POTENCIA:
                        return null
                    default:
                        return null
                } 
            }else if (izq.type == Type.CHAR) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(der.value + izq.value.charCodeAt(0),Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value(der.value - izq.value.charCodeAt(0),Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.MULTIPLICACION:
                        return new Value(der.value * izq.value.charCodeAt(0),Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.DIVISION:
                        return new Value(der.value / izq.value.charCodeAt(0),Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MODULO:
                        return null
                    case Type.POTENCIA:
                        return null
                    default:
                        return null
                }
            }else if (izq.type == Type.STRING) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(String(der.value) + izq.value,Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return null
                    case Type.MULTIPLICACION:
                        return null
                    case Type.DIVISION:
                        return null
                    case Type.MODULO:
                        return null
                    case Type.POTENCIA:
                        return null
                    default:
                        return null
                } 
            }
        }else if (der.type == Type.DOUBLE) {
            if (izq.type == Type.INT) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(der.value + izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value(der.value - izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MULTIPLICACION:
                        return new Value(der.value * izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.DIVISION:
                        return new Value(der.value / izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MODULO:
                        return new Value(der.value % izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.POTENCIA:
                        return new Value(der.value ^ izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    default:
                        return null
                } 
            }else if (izq.type == Type.DOUBLE) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(der.value + izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value(der.value - izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MULTIPLICACION:
                        return new Value(der.value * izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.DIVISION:
                        return new Value(der.value / izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MODULO:
                        return new Value(der.value % izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.POTENCIA:
                        return new Value(der.value ^ izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    default:
                        return null
                } 
            }else if (izq.type == Type.BOOLEAN) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(der.value + (izq.value?1:0),Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value(der.value - (izq.value?1:0),Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MULTIPLICACION:
                        return null
                    case Type.DIVISION:
                        return null
                    case Type.MODULO:
                        return null
                    case Type.POTENCIA:
                        return null
                    default:
                        return null
                } 
            }else if (izq.type == Type.CHAR) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(der.value + izq.value.charCodeAt(0),Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value(der.value - izq.value.charCodeAt(0),Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MULTIPLICACION:
                        return new Value(der.value * izq.value.charCodeAt(0),Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.DIVISION:
                        return new Value(der.value / izq.value.charCodeAt(0),Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MODULO:
                        return null
                    case Type.POTENCIA:
                        return null
                    default:
                        return null
                } 
            }else if (izq.type == Type.STRING) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(String(der.value) + izq.value,Type.STRING,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return null
                    case Type.MULTIPLICACION:
                        return null
                    case Type.DIVISION:
                        return null
                    case Type.MODULO:
                        return null
                    case Type.POTENCIA:
                        return null
                    default:
                        return null
                }
            }
        }else if (der.type == Type.BOOLEAN) {
            if (izq.type == Type.INT) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value((der.value?1:0) + izq.value,Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value((der.value?1:0) - izq.value,Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.MULTIPLICACION:
                        return null
                    case Type.DIVISION:
                        return null
                    case Type.MODULO:
                        return null
                    case Type.POTENCIA:
                        return null
                    default:
                        return null
                } 
            }else if (izq.type == Type.DOUBLE) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value((der.value?1:0) + izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value((der.value?1:0) + izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MULTIPLICACION:
                        return null
                    case Type.DIVISION:
                        return null
                    case Type.MODULO:
                        return null
                    case Type.POTENCIA:
                        return null
                    default:
                        return null
                } 
            }else if (izq.type == Type.BOOLEAN) {
                switch (this.type) {
                    case Type.SUMA:
                        return null
                    case Type.RESTA:
                        return null
                    case Type.MULTIPLICACION:
                        return null
                    case Type.DIVISION:
                        return null
                    case Type.MODULO:
                        return null
                    case Type.POTENCIA:
                        return null
                    default:
                        return null
                } 
            }else if (izq.type == Type.CHAR) {
                switch (this.type) {
                    case Type.SUMA:
                        return null
                    case Type.RESTA:
                        return null
                    case Type.MULTIPLICACION:
                        return null
                    case Type.DIVISION:
                        return null
                    case Type.MODULO:
                        return null
                    case Type.POTENCIA:
                        return null
                    default:
                        return null
                } 
            }else if (izq.type == Type.STRING) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(String(der.value) + izq.value,Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return null
                    case Type.MULTIPLICACION:
                        return null
                    case Type.DIVISION:
                        return null
                    case Type.MODULO:
                        return null
                    case Type.POTENCIA:
                        return null
                    default:
                        return null
                } 
            }
        }else if (der.type == Type.CHAR) {
            if (izq.type == Type.INT) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(der.value.charCodeAt(0) + izq.value,Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value(der.value.charCodeAt(0) - izq.value,Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.MULTIPLICACION:
                        return new Value(der.value.charCodeAt(0) * izq.value,Type.INT,Type.VALOR,this.fila, this.columna)
                    case Type.DIVISION:
                        return new Value(der.value.charCodeAt(0) / izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MODULO:
                        return null
                    case Type.POTENCIA:
                        return null
                    default:
                        return null
                } 
            }else if (izq.type == Type.DOUBLE) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(der.value.charCodeAt(0) + izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return new Value(der.value.charCodeAt(0) - izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MULTIPLICACION:
                        return new Value(der.value.charCodeAt(0) * izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.DIVISION:
                        return new Value(der.value.charCodeAt(0) / izq.value,Type.DOUBLE,Type.VALOR,this.fila, this.columna)
                    case Type.MODULO:
                        return null
                    case Type.POTENCIA:
                        return null
                    default:
                        return null
                } 
            }else if (izq.type == Type.BOOLEAN) {
                switch (this.type) {
                    case Type.SUMA:
                        return null
                    case Type.RESTA:
                        return null
                    case Type.MULTIPLICACION:
                        return null
                    case Type.DIVISION:
                        return null
                    case Type.MODULO:
                        return null
                    case Type.POTENCIA:
                        return null
                    default:
                        return null
                } 
            }else if (izq.type == Type.CHAR) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(der.value + izq.value,Type.STRING,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return null
                    case Type.MULTIPLICACION:
                        return null
                    case Type.DIVISION:
                        return null
                    case Type.MODULO:
                        return null
                    case Type.POTENCIA:
                        return null
                    default:
                        return null
                } 
            }else if (izq.type == Type.STRING) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(der.value + izq.value,Type.STRING,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return null
                    case Type.MULTIPLICACION:
                        return null
                    case Type.DIVISION:
                        return null
                    case Type.MODULO:
                        return null
                    case Type.POTENCIA:
                        return null
                    default:
                        return null
                } 
            }
        }else if (der.type == Type.STRING) {
            if (izq.type == Type.INT) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(der.value + izq.value,Type.STRING,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return null
                    case Type.MULTIPLICACION:
                        return null
                    case Type.DIVISION:
                        return null
                    case Type.MODULO:
                        return null
                    case Type.POTENCIA:
                        return null
                    default:
                        return null
                }  
            }else if (izq.type == Type.DOUBLE) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(der.value + izq.value,Type.STRING,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return null
                    case Type.MULTIPLICACION:
                        return null
                    case Type.DIVISION:
                        return null
                    case Type.MODULO:
                        return null
                    case Type.POTENCIA:
                        return null
                    default:
                        return null
                }  
            }else if (izq.type == Type.BOOLEAN) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(der.value + String(izq.value),Type.STRING,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return null
                    case Type.MULTIPLICACION:
                        return null
                    case Type.DIVISION:
                        return null
                    case Type.MODULO:
                        return null
                    case Type.POTENCIA:
                        return null
                    default:
                        return null
                }  
            }else if (izq.type == Type.CHAR) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(der.value + izq.value,Type.STRING,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return null
                    case Type.MULTIPLICACION:
                        return null
                    case Type.DIVISION:
                        return null
                    case Type.MODULO:
                        return null
                    case Type.POTENCIA:
                        return null
                    default:
                        return null
                }  
            }else if (izq.type == Type.STRING) {
                switch (this.type) {
                    case Type.SUMA:
                        return new Value(der.value + izq.value,Type.STRING,Type.VALOR,this.fila, this.columna)
                    case Type.RESTA:
                        return null
                    case Type.MULTIPLICACION:
                        return null
                    case Type.DIVISION:
                        return null
                    case Type.MODULO:
                        return null
                    case Type.POTENCIA:
                        return null
                    default:
                        return null
                } 
            }
        }
    }
}

module.exports = Aritmetica