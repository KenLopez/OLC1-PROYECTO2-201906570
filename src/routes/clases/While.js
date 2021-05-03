const SymbolTable = require('./SymbolTable.js')
const Type = require('./Type.js')
class While{
    constructor( _condicion, _bloque, _fila, _columna){
        this.condicion = _condicion
        this.bloque = _bloque
        this.type = Type.WHILE
        this.fila = _fila
        this.columna = _columna
    }

    ejecutar(table, global, ambito){
        let current = ambito+'_'+Type.WHILE
        let v = this.condicion.ejecutar(table, global)
        if (v!=Type.ERROR){
            if (v.type == Type.BOOLEAN){
                while (this.condicion.ejecutar(table, global).value) {
                    let res = this.bloque.ejecutar(new SymbolTable(table),global,current)
                    if (res == Type.ERROR) {
                        global.newError(Type.SEMANTICO, 'No se pudo realizar la instruccion: '+this.type,this.fila, this.columna)
                        return Type.ERROR
                    }else if (res == Type.BREAK) {
                        break
                    }
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

module.exports = While