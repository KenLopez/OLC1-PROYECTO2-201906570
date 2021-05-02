const SymbolTable = require('./SymbolTable.js')
const Type = require('./Type.js')
class DoWhile{
    constructor( _condicion, _bloque, _fila, _columna){
        this.condicion = _condicion
        this.bloque = _bloque
        this.type = Type.DOWHILE
        this.fila = _fila
        this.columna = _columna
    }

    ejecutar(table, global){
        let v = this.condicion.ejecutar(table, global)
        if (v!=null){
            if (v.type == Type.BOOLEAN){
                this.bloque.ejecutar(new SymbolTable(table),global)
                while (this.condicion.ejecutar(table, global).value) {
                    this.bloque.ejecutar(new SymbolTable(table),global)
                }
                return null
            }else{
                global.newError(Type.SEMANTICO, "La expresión no es una condicion", this.condicion.fila, this.condicion.columna)
                return Type.ERROR
            }
        }else{
            global.newError(Type.SEMANTICO, "No se pudo ejecutar, null pointer exception.", this.condicion.fila, this.condicion.columna)
            return Type.ERROR
        }
        
    }


}

module.exports = DoWhile