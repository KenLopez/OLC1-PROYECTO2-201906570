const Type = require('./Type.js')
const Value = require('./Value.js')
class Logica{
    constructor(_expIzq, _expDer, _type,_typeExp, _fila, _columna){
        this.expIzq = _expIzq
        this.expDer = _expDer
        this.type = _typeExp
        this.typeExp = _typeExp
        this.type = _type
        this.fila = _fila
        this.columna = _columna
    }

    ejecutar(tabla, global){
        let izq = this.expIzq.ejecutar(tabla,global)
        let der = this.expDer.ejecutar(tabla,global)
        if (izq.type == Type.INT) {
            if (der.type == Type.INT) {
                switch (this.type) {
                    case Type.IGUAL: 
                        return new Value(izq.value == der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MAYOR: 
                        return new Value(izq.value > der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MENOR: 
                        return new Value(izq.value < der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MAYORIGUAL: 
                        return new Value(izq.value >= der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MENORIGUAL: 
                        return new Value(izq.value <= der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.DIFERENTE: 
                        return new Value(izq.value != der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.AND: 
                        return null
                    case Type.OR: 
                        return null
                    default:
                        return null
                }
            }else if (der.type == Type.DOUBLE) {
                switch (this.type) {
                    case Type.IGUAL: 
                        return new Value(izq.value == der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MAYOR: 
                        return new Value(izq.value > der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MENOR: 
                        return new Value(izq.value < der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MAYORIGUAL: 
                        return new Value(izq.value >= der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MENORIGUAL: 
                        return new Value(izq.value <= der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.DIFERENTE: 
                        return new Value(izq.value != der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.AND: 
                        return null
                    case Type.OR: 
                        return null
                    default:
                        return null
                } 
            }else if (der.type == Type.BOOLEAN) {
                return null 
            }else if (der.type == Type.CHAR) {
                switch (this.type) {
                    case Type.IGUAL: 
                        return new Value(izq.value == der.value.charCodeAt(0), Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MAYOR: 
                        return new Value(izq.value > der.value.charCodeAt(0), Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MENOR: 
                        return new Value(izq.value < der.value.charCodeAt(0), Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MAYORIGUAL: 
                        return new Value(izq.value >= der.value.charCodeAt(0), Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MENORIGUAL: 
                        return new Value(izq.value <= der.value.charCodeAt(0), Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.DIFERENTE: 
                        return new Value(izq.value != der.value.charCodeAt(0), Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.AND: 
                        return null
                    case Type.OR: 
                        return null
                    default:
                        return null
                }
            }else if (der.type == Type.STRING) {
                return null
            }
        }else if (izq.type == Type.DOUBLE) {
            if (der.type == Type.INT) {
                switch (this.type) {
                    case Type.IGUAL: 
                        return new Value(izq.value == der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MAYOR: 
                        return new Value(izq.value > der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MENOR: 
                        return new Value(izq.value < der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MAYORIGUAL: 
                        return new Value(izq.value >= der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MENORIGUAL: 
                        return new Value(izq.value <= der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.DIFERENTE: 
                        return new Value(izq.value != der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.AND: 
                        return null
                    case Type.OR: 
                        return null
                    default:
                        return null
                }
            }else if (der.type == Type.DOUBLE) {
                switch (this.type) {
                    case Type.IGUAL: 
                        return new Value(izq.value == der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MAYOR: 
                        return new Value(izq.value > der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MENOR: 
                        return new Value(izq.value < der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MAYORIGUAL: 
                        return new Value(izq.value >= der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MENORIGUAL: 
                        return new Value(izq.value <= der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.DIFERENTE: 
                        return new Value(izq.value != der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.AND: 
                        return null
                    case Type.OR: 
                        return null
                    default:
                        return null
                } 
            }else if (der.type == Type.BOOLEAN) {
                return null 
            }else if (der.type == Type.CHAR) {
                switch (this.type) {
                    case Type.IGUAL: 
                        return new Value(izq.value == der.value.charCodeAt(0), Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MAYOR: 
                        return new Value(izq.value > der.value.charCodeAt(0), Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MENOR: 
                        return new Value(izq.value < der.value.charCodeAt(0), Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MAYORIGUAL: 
                        return new Value(izq.value >= der.value.charCodeAt(0), Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MENORIGUAL: 
                        return new Value(izq.value <= der.value.charCodeAt(0), Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.DIFERENTE: 
                        return new Value(izq.value != der.value.charCodeAt(0), Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.AND: 
                        return null
                    case Type.OR: 
                        return null
                    default:
                        return null
                }
            }else if (der.type == Type.STRING) {
                return null
            }
        }else if (izq.type == Type.BOOLEAN) {
            if (der.type == Type.INT) {
                return null
            }else if (der.type == Type.DOUBLE) {
                return null
            }else if (der.type == Type.BOOLEAN) {
                switch (this.type) {
                    case Type.IGUAL: 
                        return new Value(izq.value == der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MAYOR: 
                        return new Value((izq.value?1:0) > (der.value?1:0), Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MENOR: 
                        return new Value((izq.value?1:0) < (der.value?1:0), Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MAYORIGUAL: 
                        return new Value((izq.value?1:0) >= (der.value?1:0), Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MENORIGUAL: 
                        return new Value((izq.value?1:0) <= (der.value?1:0), Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.DIFERENTE: 
                        return new Value(izq.value != der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.AND: 
                        return new Value(izq.value && der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.OR: 
                        return new Value(izq.value || der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    default:
                        return null
                } 
            }else if (der.type == Type.CHAR) {
                return null
            }else if (der.type == Type.STRING) {
                return null
            }
        }else if (izq.type == Type.CHAR) {
            if (der.type == Type.INT) {
                switch (this.type) {
                    case Type.IGUAL: 
                        return new Value(izq.value.charCodeAt(0) == der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MAYOR: 
                        return new Value(izq.value.charCodeAt(0) > der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MENOR: 
                        return new Value(izq.value.charCodeAt(0) < der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MAYORIGUAL: 
                        return new Value(izq.value.charCodeAt(0) >= der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MENORIGUAL: 
                        return new Value(izq.value.charCodeAt(0) <= der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.DIFERENTE: 
                        return new Value(izq.value.charCodeAt(0) != der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.AND: 
                        return null
                    case Type.OR: 
                        return null
                    default:
                        return null
                }
            }else if (der.type == Type.DOUBLE) {
                switch (this.type) {
                    case Type.IGUAL: 
                        return new Value(izq.value.charCodeAt(0) == der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MAYOR: 
                        return new Value(izq.value.charCodeAt(0) > der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MENOR: 
                        return new Value(izq.value.charCodeAt(0) < der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MAYORIGUAL: 
                        return new Value(izq.value.charCodeAt(0) >= der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MENORIGUAL: 
                        return new Value(izq.value.charCodeAt(0) <= der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.DIFERENTE: 
                        return new Value(izq.value.charCodeAt(0) != der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.AND: 
                        return null
                    case Type.OR: 
                        return null
                    default:
                        return null
                }
            }else if (der.type == Type.BOOLEAN) {
                return null 
            }else if (der.type == Type.CHAR) {
                switch (this.type) {
                    case Type.IGUAL: 
                        return new Value(izq.value.charCodeAt(0) == der.value.charCodeAt(0), Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MAYOR: 
                        return new Value(izq.value.charCodeAt(0) > der.value.charCodeAt(0), Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MENOR: 
                        return new Value(izq.value.charCodeAt(0) < der.value.charCodeAt(0), Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MAYORIGUAL: 
                        return new Value(izq.value.charCodeAt(0) >= der.value.charCodeAt(0), Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MENORIGUAL: 
                        return new Value(izq.value.charCodeAt(0) <= der.value.charCodeAt(0), Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.DIFERENTE: 
                        return new Value(izq.value.charCodeAt(0) != der.value.charCodeAt(0), Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.AND: 
                        return null
                    case Type.OR: 
                        return null
                    default:
                        return null
                }
            }else if (der.type == Type.STRING) {
                return null
            }
        }else if (izq.type == Type.STRING) {
            if (der.type == Type.INT) {
                return null
            }else if (der.type == Type.DOUBLE) {
                return null 
            }else if (der.type == Type.BOOLEAN) {
                return null 
            }else if (der.type == Type.CHAR) {
                return null 
            }else if (der.type == Type.STRING) {
                switch (this.type) {
                    case Type.IGUAL: 
                        return new Value(izq.value == der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.MAYOR: 
                        return null
                    case Type.MENOR: 
                        return null
                    case Type.MAYORIGUAL: 
                        return null
                    case Type.MENORIGUAL: 
                        return null
                    case Type.DIFERENTE: 
                        return new Value(izq.value.charCodeAt(0) != der.value, Type.BOOLEAN, Type.VALOR, this.fila, this.columna)
                    case Type.AND: 
                        return null
                    case Type.OR: 
                        return null
                    default:
                        return null
                } 
            }
        }
    }
}

module.exports = Logica