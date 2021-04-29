const Symbol = require('./Symbol')
const Type = require('./Type')
const Value = require('./Value')
class SymbolTable{
    constructor(_padre){
        this.padre = _padre
        this.symbols = []
    }

    find(_id){
        for (let index = 0; index < this.symbols.length; index++) {
            if (this.symbols[index].id == _id) {
                return this.symbols[index]
            }
        }
        if (this.padre != null) {
            let v = this.padre.find(_id) 
            if (v!=null) {
                return v
            }
        }
        return null
    }

    increment(_id, _fila, _columna){
        let s = this.find(_id)
        if (s != null) {
            switch (s.type) {
                case Type.INT:
                    s.value = new Value(s.value.value+1, s.type, Type.VALOR,_fila, _columna)
                    break
                case Type.DOUBLE:
                    s.value = new Value(s.value.value+1, s.type, Type.VALOR,_fila, _columna)
                    break
                default:
                    return null
            }
        }
    }

    decrement(_id,_fila, _columna){
        let s = this.find(_id)
        if (s != null) {
            switch (s.type) {
                case Type.INT:
                    s.value = new Value(s.value.value-1, s.type, Type.VALOR,_fila, _columna)
                    break
                case Type.DOUBLE:
                    s.value = new Value(s.value.value-1, s.type, Type.VALOR,_fila, _columna)
                    break
                default:
                    return null
            }
        }
    }

    updateSymbol(_id, _value){
        let s = this.find(_id);
        if (s != null){
            if (_value.type != s.type) {
                switch (s.type) {
                    case Type.DOUBLE:
                        if (_value.type == Type.INT) {
                            _value.type = this.type    
                        }else if(_value.type == Type.BOOLEAN){
                            _value.type = this.type
                            _value.value = _value.value?1:0
                        }
                        break
                    case Type.STRING:
                        if (_value.type == Type.CHAR) {
                            _value.type = this.type   
                        }
                    case Type.INT:
                        if(_value.type == Type.CHAR){
                            _value.type = this.type
                            _value.value = _value.value.charCodeAt(0)
                        }else if(v.type == Type.BOOLEAN){
                            _value.type = this.type
                            _value.value = _value.value?1:0
                        }else if(v.type == Type.DOUBLE){
                            _value.type = this.type
                            _value.value = Math.trunc(_value.value)
                        }
                    default:
                        break;
                }
            }
            if (_value.type == s.type) {
                s.value = new Value(_value.value, _value.type, _value.typeExp,_value.fila, 
                    _value.columna)
                return true
            }
        }
        return false
    }

    newSymbol(_id, _value, _type, _typeExp, _fila, _columna){
        if (this.find(_id) == null){
            var nuevo = new Symbol(_id, new Value(_value.value, _value.type, _value.typeExp,_value.fila, 
                        _value.columna),_type, _typeExp, _fila, _columna)
            this.symbols.push(nuevo)
            return true
        }
        return false
    }

}
module.exports = SymbolTable