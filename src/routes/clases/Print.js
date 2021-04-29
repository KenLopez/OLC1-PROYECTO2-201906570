const Type = require('./Type.js')
class Print{
    constructor(_value, _type,_typeExp, _fila, _columna){
        this.value = _value
        this.typeExp = _typeExp
        this.type = _type
        this.fila = _fila
        this.columna = _columna
    }

    ejecutar(tabla, global){
        var v = this.value.ejecutar(tabla, global)
        global.newPrint(v)
        return null
    }
}

module.exports = Print