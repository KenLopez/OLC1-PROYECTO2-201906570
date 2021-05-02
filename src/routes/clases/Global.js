const SymbolTable = require('./SymbolTable.js')
const Type = require('./Type.js')
class Global{
    constructor(){
        this.instrucciones = []
        this.exec = null
        this.funciones = []
        this.symbolTable = new SymbolTable(null)
        this.errores = []
        this.output = ''
    }

    newError(_type, _mensaje, _fila, _columna){
        this.errores.push({
            type: _type,
            mensaje: _mensaje,
            fila: _fila,
            columna: _columna
        })
    }

    newPrint(string){
        this.output += String(string.value) + '\n'
    }

    getOutput(){
        return String(this.output)
    }

    getErrors(){
        return this.errores
    }

    ejecutar(){
        for (let index = 0; index < this.instrucciones.length; index++) {
            const instruccion = this.instrucciones[index]
            let res = instruccion.ejecutar(this.symbolTable, this)
            console.log(res)
            if (res == Type.ERROR) {
                this.newError(Type.SEMANTICO, 'No se pudo realizar la instruccion: '+instruccion.type,instruccion.fila, instruccion.columna)
            }
        }
    }


}

module.exports = Global