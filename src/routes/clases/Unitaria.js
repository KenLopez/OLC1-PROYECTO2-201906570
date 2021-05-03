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
        if (xp == Type.ERROR) {
            global.newError(Type.SEMANTICO, 'No se pudo operar, null pointer exception.', this.fila, this.columna )
            return Type.ERROR
        }
        switch (this.type) {
            case Type.NEGACION: 
                switch (xp.type) {
                    case Type.INT:
                        return new Value(-1*xp.value,xp.type, xp.typeExp,this.fila,this.columna)
                    case Type.DOUBLE:
                        return new Value(-1*xp.value,xp.type, xp.typeExp,this.fila,this.columna)
                    default:
                        global.newError(Type.SEMANTICO, 'No se pudo operar, el tipo: '+xp.type+', no puede ser negado.', this.fila, this.columna )
                        return Type.ERROR
                }
            case Type.NOT:
                switch (xp.type) {
                    case Type.BOOLEAN:
                        return new Value(!xp.value,xp.type, xp.typeExp,this.fila,this.columna)
                    default:
                        global.newError(Type.SEMANTICO, 'No se pudo operar, el tipo: '+xp.type+', no puede ser negado.', this.fila, this.columna )
                        return Type.ERROR
                }
            default:
                return Type.ERROR
        }
    }
}

module.exports = Unitaria