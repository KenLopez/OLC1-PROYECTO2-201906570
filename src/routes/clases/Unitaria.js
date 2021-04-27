const Type = require('./Type.js')
const Value = require('./Value.js')
class Unitaria{
    constructor(_exp, _type,_typeExp, _fila, _columna){
        this.exp = _exp
        this.type = _typeExp
        this.typeExp = _typeExp
        this.type = _type
        this.fila = _fila
        this.columna = _columna
    }

    ejecutar(tabla, global){
        let xp = this.exp.ejecutar(tabla,global)
        switch (this.type) {
            case Type.NEGACION: 
                switch (xp.type) {
                    case Type.INT:
                        return new Value(-1*xp.value,xp.type, xp.typeExp,this.fila,this.columna)
                    case Type.DOUBLE:
                        return new Value(-1*xp.value,xp.type, xp.typeExp,this.fila,this.columna)
                    default:
                        return nil;
                }
            case Type.NOT:
                switch (xp.type) {
                    case Type.BOOLEAN:
                        return new Value(!xp.value,xp.type, xp.typeExp,this.fila,this.columna)
                    default:
                        return null
                }
            default:
                return null
        }
    }
}

module.exports = Unitaria