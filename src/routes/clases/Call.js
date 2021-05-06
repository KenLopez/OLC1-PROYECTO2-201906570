const Type = require('./Type')
const Value = require('./Value')
const SymbolTable = require('./SymbolTable')
class Call{
    constructor(_id, _params, _fila, _columna){
        this.id = _id
        this.params = _params
        this.type = Type.LLAMADA
        this.fila = _fila
        this.columna = _columna
    }

    casteoImplicito(type, value){
        if (type == value.type) {
            return value
        }
        switch (type) {
            case Type.INT:
                switch (value.type) {
                    case Type.DOUBLE:
                        return new Value(Math.trunc(value.value), Type.INT, value.typeExp, value.fila, value.columna)
                    case Type.BOOLEAN:
                        return new Value(value.value?1:0, Type.INT, value.typeExp, value.fila, value.columna)
                    default:
                        return Type.ERROR
                }
            case Type.DOUBLE:
                switch (value.type) {
                    case Type.INT:
                        return new Value(value.value, Type.DOUBLE, value.typeExp, value.fila, value.columna)
                    case Type.BOOLEAN:
                        return new Value(value.value?1:0, Type.DOUBLE, value.typeExp, value.fila, value.columna)
                    default:
                        return Type.ERROR
                }
            case Type.BOOLEAN:
                switch (value.type) {
                    case Type.INT:
                        if (value.value == 1) {
                            return new Value(true, Type.BOOLEAN, value.typeExp, value.fila, value.columna)
                        }else if (value.value == 0) {
                            return new Value(false, Type.BOOLEAN, value.typeExp, value.fila, value.columna)
                        }
                        break;
                    case Type.DOUBLE:
                        if (value.value == 1) {
                            return new Value(true, Type.BOOLEAN, value.typeExp, value.fila, value.columna)
                        }else if (value.value == 0) {
                            return new Value(false, Type.BOOLEAN, value.typeExp, value.fila, value.columna)
                        }
                        break;
                    default:
                        return Type.ERROR
                }
            default:
                return Type.ERROR;
        }
    }

    ejecutar(tabla, global){
        let funcion = tabla.find(this.id)
        if (funcion!=null) {
            if (funcion.typeExp != Type.FUNCION) {
                global.newError(Type.SEMANTICO, 'No se pudo llamar a '+this.id+'; no es una función.', this.fila, this.columna)
                return Type.ERROR
            }else{
                if (funcion.value.params.length == this.params.length) {
                    var newTable = new SymbolTable(global.symbolTable)
                    for (let index = 0; index < this.params.length; index++) {
                        const param = this.params[index];
                        const symbol = funcion.value.params[index]
                        let res = param.ejecutar(tabla, global)
                        if ((res != Type.ERROR) && (res != null)) {
                            let cast = this.casteoImplicito(symbol.type, res)
                            if (cast != Type.ERROR) {
                                newTable.newSymbol(symbol.id, cast, symbol.type, Type.VARIABLE,param.fila, param.columna)
                                global.newSymbol(symbol.id, symbol.type, Type.PARAMETRO, Type.FUNCION+'_'+funcion.id, param.fila, param.columna)    
                            }else{
                                var requeridos = ''
                                var obtenidos = ''
                                for (let i = 0; i < funcion.value.params.length; i++) {
                                    const element = funcion.value.params[i];
                                    const element2 = this.params[i];
                                    requeridos += ' '+element.type
                                    obtenidos += ' '+element2.type
                                }
                                global.newError(Type.SEMANTICO, 'Parámetros incorrectos para '+this.id+', se requería:'+requeridos+'; se encontró:'+obtenidos+'.', this.fila, this.columna)
                                return Type.ERROR
                            }
                        }else{
                            global.newError(Type.SEMANTICO, 'Parámetro no es una expresión.', param.fila, param.columna)
                            return Type.ERROR
                        }
                    }
                    let res = funcion.value.block.ejecutar(newTable, global, Type.FUNCION+'_'+funcion.id)
                    if (res==Type.ERROR) {
                        return Type.ERROR
                    }else{
                        return null
                    }
                }else{
                    var requeridos = ''
                    var obtenidos = ''
                    for (let index = 0; index < funcion.value.params.length; index++) {
                        const element = funcion.value.params[index];
                        requeridos += ' '+element.type
                    }
                    for (let index = 0; index < this.params.length; index++) {
                        const element = this.params[index];
                        obtenidos += ' '+element.type
                    }
                    global.newError(Type.SEMANTICO, 'Parámetros insuficientes para '+this.id+', se requería:'+requeridos+'; se encontró:'+obtenidos+'.', this.fila, this.columna)
                    return Type.ERROR
                }
            }
        }else{
            global.newError(Type.SEMANTICO, 'La función: '+this.id+', no se encuentra definida.', this.fila, this.columna)
            return Type.ERROR
        }
    }
}
module.exports = Call