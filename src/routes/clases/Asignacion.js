const Type = require("./Type")
const Value = require("./Value")

class Asignacion{
    constructor(_id, _value, _typeExp, _fila, _columna){
        this.id = _id
        this.value = _value
        this.typeExp = _typeExp
        this.fila = _fila
        this.columna = _columna
    }

    ejecutar(tabla, global){
        var v
        switch (this.typeExp) {
            case Type.INCREMENTO:
                tabla.increment(this.id, this.fila, this.columna)
                return null
            case Type.DECREMENTO:
                console.log(this)
                tabla.decrement(this.id, this.fila, this.columna)
                return null
            default:
                v = this.value.ejecutar(tabla, global)
                if (v!=null) {
                    tabla.updateSymbol(this.id, new Value(v.value, v.type, Type.VALOR, v.fila, v.columna))
                }
                return null
        }
    }
}
module.exports = Asignacion