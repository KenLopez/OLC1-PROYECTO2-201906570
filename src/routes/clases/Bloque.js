const SymbolTable = require('./SymbolTable.js')
const Type = require('./Type.js')
class Bloque{
    constructor(_instrucciones, _fila, _columna){
        this.instrucciones = _instrucciones
        this.type = Type.BLOQUE
        this.fila = _fila
        this.columna = _columna
    }

    ejecutar(table, global, ambito){
        for (let index = 0; index < this.instrucciones.length; index++) {
            const instruccion = this.instrucciones[index]
            let res = instruccion.ejecutar(table, global, ambito)
            if (res == Type.ERROR) {
                global.newError(Type.SEMANTICO, 'No se pudo realizar la instruccion: '+instruccion.type,instruccion.fila, instruccion.columna)
                return Type.ERROR
            }else if (res == Type.BREAK) {
                return Type.BREAK
            }else if (res == Type.CONTINUE) {
                return Type.CONTINUE
            }
        }
        return null
    }


}

module.exports = Bloque