const SymbolTable = require('./SymbolTable.js')
const Type = require('./Type.js')
const fs = require('fs')
const {exec} = require('child_process')
class Global{
    constructor(){
        this.instrucciones = []
        this.exec = null
        this.funciones = []
        this.symbolTable = new SymbolTable(null)
        this.symbols = []
        this.errores = []
        this.ast = null
        this.output = ''
    }

    graficar(){
        var counter = {counter:0}
        let tmp = this.ast.graficar(counter)
        let data = tmp.nodos+"\n"+tmp.enlaces
        data = "digraph ast{\n" + data + "}"
        fs.writeFile('ast.dot', data, function (err) {
            if (err) throw err;
            console.log('ast creado');
        })
        exec('dot -Tpng ast.dot -o ast.png', (error, stdout,stderr)=>{
            if (error) {
                console.log(`error: ${error.message}`)
                return
            }
            if (stderr) {
                console.log(`error: ${stderr}`)
                return
            }
            console.log(stdout)
        })
        if (this.errores.length==0) {
            var bitmap = fs.readFileSync('ast.png');
            let base =  new Buffer.from(bitmap).toString('base64'); 
            return base
        }else{
            return null
        }
    }

    newError(_type, _mensaje, _fila, _columna){
        this.errores.push({
            type: _type,
            mensaje: _mensaje,
            fila: _fila,
            columna: _columna
        })
        this.output+='Error: '+_type+'; '+_mensaje+' En línea: '+_fila+", columna: "+_columna+'\n'
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
                break
            }
        }
    }


}

module.exports = Global