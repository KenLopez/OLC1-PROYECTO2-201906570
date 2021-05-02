const SymbolTable = require('./SymbolTable.js')
const Type = require('./Type.js')
const Value = require('./Value.js')
class Global{
    constructor(){
        this.instrucciones = []
        this.exec = null
        this.funciones = []
        this.symbolTable = new SymbolTable(null)
        this.symbols = []
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

    casteoImplicito(val1, val2){
        let r1 = new Value(val1.value, val1.type, val1.typeExp, val1.fila, val1.columna)
        let r2 = new Value(val2.value, val2.type, val2.typeExp, val2.fila, val2.columna)
        switch (val1.type) {
            case Type.INT:
                switch (val2.type) {
                    case Type.INT:
                        
                
                }
        
        }
    }


    newSymbol(_id, _type, _typeExp, _entorno, _fila, _columna){
        let insertar = true
        for (let index = 0; index < this.symbols.length; index++) {
            const symbol = this.symbols[index];
            if ((symbol.id == _id) && (symbol.entorno == _entorno)) {
                insertar = false
                break
            }            
        }
        if (insertar) {
            this.symbols.push({
                id: _id,
                type: _type,
                typeExp: _typeExp,
                entorno: _entorno,
                fila: _fila,
                columna: _columna,
            })   
        }
    }

    getSymbols(){
        return this.symbols
    }

    ejecutar(){
        for (let index = 0; index < this.instrucciones.length; index++) {
            const instruccion = this.instrucciones[index]
            let res = instruccion.ejecutar(this.symbolTable, this, Type.GLOBAL)
            if (res == Type.ERROR) {
                this.newError(Type.SEMANTICO, 'No se pudo realizar la instruccion: '+instruccion.type,instruccion.fila, instruccion.columna)
            }
        }
    }


}

module.exports = Global