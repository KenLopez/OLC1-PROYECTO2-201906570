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

    newPrint(string){
        this.output += String(string.value) + '\n'
    }

    getOutput(){
        return String(this.output)
    }

    ejecutar(){
        this.instrucciones.forEach(instruccion => {
            instruccion.ejecutar(this.symbolTable, this)
        });
    }


}

module.exports = Global