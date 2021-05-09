const Type = require('./Type.js')
class Value{
    constructor(_value, _type, _typeExp, _fila, _columna){
        this.value = _value
        this.type = _type
        this.fila = _fila
        this.typeExp = _typeExp
        this.columna = _columna
    }



    ejecutar(tabla, global) {
        return new Value(this.value, this.type, this.typeExp, this.fila, this.columna)
    }
}
module.exports = Value