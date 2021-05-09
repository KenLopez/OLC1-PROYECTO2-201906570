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

    ejecutar(table, global, ambito){
        let current = ambito + '_' + Type.DOWHILE
        let v = this.condicion.ejecutar(table, global)
        if (v!=null){
            if (v.type == Type.BOOLEAN){
                let res = this.bloque.ejecutar(new SymbolTable(table),global, current)
                if (res == Type.ERROR) {
                    this.newError(Type.SEMANTICO, 'No se pudo realizar la instruccion: '+this.type,this.fila, this.columna)
                    return Type.ERROR
                }else if (res == Type.BREAK) {
                    return null
                }
                while (this.condicion.ejecutar(table, global).value) {
                    res = this.bloque.ejecutar(new SymbolTable(table),global, current)
                    if ((res == Type.ERROR)&&(res!=null)) {
                        global.newError(Type.SEMANTICO, 'No se pudo realizar la instruccion: '+this.type,this.fila, this.columna)
                        return Type.ERROR
                    }else if (res == Type.BREAK) {
                        break
                    }else if((res != null) && (res.type == Type.RETURN)){
                        return res
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

module.exports = DoWhile