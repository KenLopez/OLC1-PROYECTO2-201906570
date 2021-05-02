const SymbolTable = require('./SymbolTable.js')
const Type = require('./Type.js')
class If{
    constructor( _data, _fila, _columna){
        this.condiciones = []
        this.bloques = []
        this.type = Type.IF
        this.fila = _fila
        this.columna = _columna
        this.else = null
        for (let index = 0; index < _data.length; index++) {
            const element = _data[index];
            if(element.exp !=null){
                this.condiciones.push(element.exp)
                this.bloques.push(element.block)
            }else{
                this.else = element.block
            }
        }
    }

    ejecutar(table, global){
        let bandera = true
        for (let index = 0; index < this.condiciones.length; index++) {
            const condicion = this.condiciones[index]
            let res = condicion.ejecutar(table, this)
            if (res!=null) {
                if (res.type == Type.BOOLEAN) {
                    if (res.value) {
                        this.bloques[index].ejecutar(new SymbolTable(table), global)
                        bandera = false
                        break
                    }
                }else{
                    global.newError(Type.SEMANTICO, "La expresión no es una condicion", condicion.fila, condicion.columna)
                    return Type.ERROR
                }
            }else{
                global.newError(Type.SEMANTICO, "No se pudo ejecutar, null pointer exception.", condicion.fila, condicion.columna)
                return Type.ERROR
            }
        }
        if (bandera && this.else !=null) {
            this.else.ejecutar(this.symbolTable, global)
        }
        return null
    }


}

module.exports = If