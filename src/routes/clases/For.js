const SymbolTable = require('./SymbolTable.js')
const Type = require('./Type.js')
class For{
    constructor( _symbol, _condicion, _asignacion, _bloque, _fila, _columna){
        this.symbol = _symbol
        this.condicion = _condicion
        this.asignacion = _asignacion
        this.bloque = _bloque
        this.type = Type.FOR
        this.fila = _fila
        this.columna = _columna
    }

    ejecutar(table, global, ambito){
        let current = ambito+'_'+Type.FOR
        var newTable = new SymbolTable(table)
        if (this.symbol.typeExp == Type.ASIGNACION) {
            if (this.symbol.ejecutar(table,global)==Type.ERROR) {
                return Type.ERROR
            }
        }else if (this.symbol.typeExp == Type.DECLARACION) {
            if (this.symbol.ejecutar(newTable,global, current)==Type.ERROR) {
                return Type.ERROR
            }
        }
        let v = this.condicion.ejecutar(newTable, global)
        if (v!=null){
            if (v.type == Type.BOOLEAN){
                while (this.condicion.ejecutar(newTable, global).value) {
                    let res = this.bloque.ejecutar(newTable,global, current)
                    if (res == Type.ERROR) {
                        this.newError(Type.SEMANTICO, 'No se pudo realizar la instruccion: '+this.type,this.fila, this.columna)
                        return Type.ERROR
                    }else if (res == Type.BREAK) {
                        break
                    }
                    let tmp = new SymbolTable(table)
                    tmp.symbols.push(newTable.find(this.symbol.id))
                    newTable = tmp
                    this.asignacion.ejecutar(newTable,global)
                }
            }else{
                global.newError(Type.SEMANTICO, "La expresión no es una condicion", this.condicion.fila, this.condicion.columna)
                return Type.ERROR
            }
        }else{
            global.newError(Type.SEMANTICO, "No se pudo ejecutar, null pointer exception.", this.condicion.fila, this.condicion.columna)
            return Type.ERROR
        }
        return null
    }


}

module.exports = For