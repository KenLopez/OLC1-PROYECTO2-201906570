const Type = require('./Type.js')
const Global = require('./Global.js')
class Value{
    constructor(_value, _type, _typeExp, _fila, _columna){
        this.value = _value
        this.type = _type
        this.fila = _fila
        this.typeExp = _typeExp
        this.columna = _columna
    }



    ejecutar(tabla, global) {
        switch (this.type) {
            case Type.INT:
                return new Value(this.value, this.type, this.typeExp, this.fila, this.columna)
            case Type.DOUBLE:
                return new Value(this.value, this.type, this.typeExp, this.fila, this.columna)
            case Type.BOOLEAN:
                return new Value(this.value, this.type, this.typeExp, this.fila, this.columna)
            case Type.STRING:
                return new Value(this.value.substring(1,this.value.length-1), this.type, this.typeExp, this.fila, this.columna)
            case Type.CHAR:
                return new Value(this.value.substring(1,this.value.length-1), this.type, this.typeExp, this.fila, this.columna)
            default:
                break;
        }
        return new Value(this.value, this.type, this.typeExp, this.fila, this.columna)    
    }
}
module.exports = Value