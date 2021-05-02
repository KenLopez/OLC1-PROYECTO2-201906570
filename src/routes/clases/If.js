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

    ejecutar(table, global, ambito){
        let current = ambito+'_'+Type.IF
        let bandera = true
        for (let index = 0; index < this.condiciones.length; index++) {
            const condicion = this.condiciones[index]
            let res = condicion.ejecutar(table, global)
            if (res!=null) {
                if (res.type == Type.BOOLEAN) {
                    if (res.value) {
                        let res = this.bloques[index].ejecutar(new SymbolTable(table), global, current)
                        if (res == Type.ERROR) {
                            return Type.ERROR
                        }else if (res == Type.BREAK) {
                            return Type.BREAK
                        }else if (res == Type.CONTINUE) {
                            return Type.CONTINUE
                        }
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
            let res = this.else.ejecutar(this.symbolTable, global, current)
            if (res == Type.ERROR) {
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

module.exports = If