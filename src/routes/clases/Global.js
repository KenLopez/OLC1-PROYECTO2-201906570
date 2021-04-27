const Type = require('./Type.js')
class Global{
    constructor(){
        this.instrucciones = []
        this.exec = null
        this.funciones = []
        this.symbolTable = []
        this.errores = []
        this.output = ''
    }

    newPrint(string){
        this.output += string
    }

    getOutput(){
        return this.output
    }

    ejecutar(){
        this.instrucciones.forEach(instruccion => {
            instruccion.ejecutar(this.symbolTable, this)
        });
    }
}

module.exports = Global