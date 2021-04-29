const Value = require('./Value')
const Type = require('./Type')
class Symbol{
    constructor (_id, _value, _type, _typeExp, _fila, _columna){
        this.id = _id
        this.value = _value
        this.type = _type
        this.typeExp = _typeExp
        this.fila = _fila
        this.columna = _columna
    }

    ejecutar(tabla, global){
        this.value = tabla.find(this.id)
        var v = this.value.value.ejecutar(tabla, global)
        if (v.type == this.value.type && v.typeExp == Type.VALOR) {
            return new Value(v.value, v.type, v.typeExp, this.fila, this.columna)
        }
        return null
    }
}
module.exports = Symbol