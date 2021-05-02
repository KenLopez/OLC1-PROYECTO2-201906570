const SymbolTable = require('./SymbolTable.js')
const Type = require('./Type.js')
class Bloque{
    constructor(_instrucciones, _fila, _columna){
        this.instrucciones = _instrucciones
        this.type = Type.BLOQUE
        this.fila = _fila
        this.columna = _columna
    }

    ejecutar(table, global){
        for (let index = 0; index < this.instrucciones.length; index++) {
            const instruccion = this.instrucciones[index]
            let res = instruccion.ejecutar(table, global)
            if (res == Type.ERROR) {
                this.newError(Type.SEMANTICO, 'No se pudo realizar la instruccion: '+instruccion.type,instruccion.fila, instruccion.columna)
            }
        }
    }


}

module.exports = Bloque