const Value = require('./Value')
const Type = require('./Type.js')
const Global = require('./Global.js')
const Aritmetica = require('./Aritmetica.js')
class Print{
    constructor(_value, _type,_typeExp, _fila, _columna){
        this.value = _value
        this.typeExp = _typeExp
        this.type = _type
        this.fila = _fila
        this.columna = _columna
    }

    ejecutar(tabla, global){
        console.log(new Value(2,Type.INT,Type.VALOR,3, 6))
        console.log('hola')
        if (this.value != null) {
            let v = this.value.ejecutar(tabla, global)
            global.newPrint(String(v.value)+'\n')
        }else{
            global.newPrint('\n')
        }
        return null
    }
}

module.exports = Print