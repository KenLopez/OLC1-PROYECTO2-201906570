const SymbolTable = require('./SymbolTable.js')
const Logica = require('./Logica.js')
const Type = require('./Type.js')
class Switch{
    constructor( _exp,_data, _default, _fila, _columna){
        this.exp = _exp
        this.condiciones = []
        this.bloques = []
        this.type = Type.SWITCH
        this.fila = _fila
        this.columna = _columna
        this.default = _default
        if (_data!=null) {
            for (let index = 0; index < _data.length; index++) {
                const element = _data[index];
                this.condiciones.push(element.exp)
                this.bloques.push(element.block)
            }    
        }
    }

    ejecutar(table, global, ambito){
        let val = this.exp.ejecutar(table, global)
        if ((val == Type.ERROR) || (val==null)) {
            global.newError(Type.SEMANTICO, 'Expresión no es un valor.', this.fila, this.columna )
            return Type.ERROR
        }
        let current = ambito+'_'+Type.SWITCH
        let bandera = true
        let local = new SymbolTable(table)
        for (let index = 0; index < this.condiciones.length; index++) {
            const condicion = this.condiciones[index]
            let res = condicion.ejecutar(table, global)
            if (res!=Type.ERROR) {
                let pass = new Logica(val,res,Type.IGUAL,Type.LOGICO,condicion.fila, condicion.columna)
                let tmp = pass.ejecutar(table,global, false)
                if((tmp!=null) && tmp.value){
                    let out = this.bloques[index].ejecutar(local, global, current)
                    if (out == Type.ERROR) {
                        global.newError(Type.SEMANTICO, "No se pudo ejecutar la instrucción: "+this.type, condicion.fila, condicion.columna)
                        return Type.ERROR
                    }else if (out == Type.BREAK) {
                        bandera = false
                        break                        
                    }else if((res != null) && (res.type == Type.RETURN)){
                        return res
                    }
                }
            }else{
                global.newError(Type.SEMANTICO, "No se pudo ejecutar, null pointer exception.", condicion.fila, condicion.columna)
                return Type.ERROR
            }
        }
        if (bandera && (this.default !=null)) {
            let res = this.default.ejecutar(this.symbolTable, global, current)
            if (res == Type.ERROR) {
                return Type.ERROR
            }else if (res == Type.CONTINUE) {
                return Type.CONTINUE
            }
        }
        return null
    }


}

module.exports = Switch