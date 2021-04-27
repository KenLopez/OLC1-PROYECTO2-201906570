const Type = require('./Type.js')
class Value{
    constructor(_value, _type, _typeExp, _fila, _columna){
        this.value = _value
        this.type = _type
        this.fila = _fila
        this.typeExp = _typeExp
        this.columna = _columna
        if ((this.type == Type.STRING) || (this.type == Type.CHAR)) {
            this.value = this.value.replace(/\\n/g, '\n')
            this.value = this.value.replace(/\\r/g, '\r')
            this.value = this.value.replace(/\\t/g, '\t')
            //this.value = this.value.substring(1,this.value.length-1)
        }
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
                return new Value(this.value, this.type, this.typeExp, this.fila, this.columna)
            case Type.CHAR:
                return new Value(this.value, this.type, this.typeExp, this.fila, this.columna)
            default:
                break;
        }
        return new Value(this.value, this.type, this.typeExp, this.fila, this.columna)    
    }
}
module.exports = Value