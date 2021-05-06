const Symbol = require('./Symbol')
const Type = require('./Type')
const Value = require('./Value')
class SymbolTable{
    constructor(_padre){
        this.padre = _padre
        this.symbols = []
    }

    find(_id, global = true){
        for (let index = 0; index < this.symbols.length; index++) {
            if (this.symbols[index].id == _id) {
                return this.symbols[index]
            }
        }
        if (global && (this.padre != null)) {
            let v = this.padre.find(_id) 
            if (v!=Type.ERROR) {
                return v
            }
        }
        return Type.ERROR
    }

    increment(_id, _fila, _columna, global){
        let s = this.find(_id)
        if (s != Type.ERROR) {
            switch (s.type) {
                case Type.INT:
                    s.value = new Value(s.value.value+1, s.type, Type.VALOR,_fila, _columna)
                    break
                case Type.DOUBLE:
                    s.value = new Value(s.value.value+1, s.type, Type.VALOR,_fila, _columna)
                    break
                default:
                    global.newError(Type.SEMANTICO, 'No se pudo asignar, tipos incompatibles.', _fila, _columna)
                    return false
            }
            return true
        }else{
            global.newError(Type.SEMANTICO, _id + ' no está definido.', _fila, _columna)
        }
    }

    decrement(_id,_fila, _columna, global){
        let s = this.find(_id)
        if (s != Type.ERROR) {
            switch (s.type) {
                case Type.INT:
                    s.value = new Value(s.value.value-1, s.type, Type.VALOR,_fila, _columna)
                    break
                case Type.DOUBLE:
                    s.value = new Value(s.value.value-1, s.type, Type.VALOR,_fila, _columna)
                    break
                default:
                    global.newError(Type.SEMANTICO, 'No se pudo asignar, tipos incompatibles.', _fila, _columna)
                    return false
            }
            return true
        }else{
            global.newError(Type.SEMANTICO, _id + ' no está definido.', _fila, _columna)
        }
    }

    updateSymbol(_id, _value,_fila,_columna, global){
        let s = this.find(_id);
        if (s != Type.ERROR){
            if (_value.type != s.type) {
                switch (s.type) {
                    case Type.DOUBLE:
                        if (_value.type == Type.INT) {
                            _value.type = s.type    
                        }else if(_value.type == Type.BOOLEAN){
                            _value.type = s.type
                            _value.value = _value.value?1:0
                        }
                        break
                    case Type.INT:
                        if(_value.type == Type.CHAR){
                            _value.type = s.type
                            _value.value = _value.value.charCodeAt(0)
                        }else if(_value.type == Type.BOOLEAN){
                            _value.type = s.type
                            _value.value = _value.value?1:0
                        }else if(_value.type == Type.DOUBLE){
                            _value.type = s.type
                            _value.value = Math.trunc(_value.value)
                        }
                        break
                    case Type.BOOLEAN:
                        if(_value.type == Type.INT){
                            if (_value.value == 1) {
                                _value.type = s.type
                                _value.value = true
                            }else if (_value.value == 0) {
                                _value.type = s.type
                                _value.value = false
                            }
                        }else if(_value.type == Type.DOUBLE){
                            if (_value.value == 1) {
                                _value.type = s.type
                                _value.value = true
                            }else if (_value.value == 0) {
                                _value.type = s.type
                                _value.value = false
                            }
                        }
                        break
                    default:
                        global.newError(Type.SEMANTICO, 'No se pudo asignar, tipos incompatibles.', _fila, _columna)
                        return false
                }
            }
            if (_value.type == s.type) {
                s.value = new Value(_value.value, _value.type, _value.typeExp,_value.fila, 
                    _value.columna)
                return true
            }
        }else{
            global.newError(Type.SEMANTICO, _id + ' no está definido.', _fila, _columna)
            return false
        }
    }

    newSymbol(_id, _value, _type, _typeExp, _fila, _columna){
        if (this.find(_id,false) == Type.ERROR){
            var nuevo = null
            if (_typeExp == Type.VARIABLE) {
                nuevo = new Symbol(_id, new Value(_value.value, _value.type, _value.typeExp,_value.fila, 
                    _value.columna),_type, _typeExp, _fila, _columna)   
            }else if (_typeExp == Type.FUNCION) {
                nuevo = new Symbol(_id, _value, _type, _typeExp, _fila, _columna)
            }
            this.symbols.push(nuevo)
            return true
        }
        return false
    }

}
module.exports = SymbolTable