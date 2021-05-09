const Type = require('./Type.js')
const Value = require('./Value.js')
class Print{
    constructor(_value, _type,_typeExp, _fila, _columna){
        this.value = _value
        this.typeExp = _typeExp
        this.type = _type
        this.fila = _fila
        this.columna = _columna
        if(this.value == null){
            this.value = new Value('',Type.STRING, Type.VALOR, this.fila, this.columna)
        }
    }

    ejecutar(tabla, global){
        var v = this.value.ejecutar(tabla, global)
        if (v!=Type.ERROR) {
            global.newPrint(v)   
        }else{
            global.newError(Type.SEMANTICO, "No se pudo ejecutar, null pointer exception.", this.fila, this.columna)
            return Type.ERROR
        }
        return null
    }
}

module.exports = Print