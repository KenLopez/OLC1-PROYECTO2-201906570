const Type = require("./Type")
const Value = require("./Value")

class Declaracion{
    constructor(_id, _value, _type, _typeExp, _fila, _columna){
        this.id = _id
        this.value = _value
        this.type = _type
        this.typeExp = _typeExp
        this.fila = _fila
        this.columna = _columna
        if (this.value == null) {
            switch (this.type) {
                case Type.INT:
                    this.value = new Value(0, this.type, Type.VALOR, this.fila, this.columna)
                    break
                case Type.DOUBLE:
                    this.value = new Value(0, this.type, Type.VALOR, this.fila, this.columna)
                    break
                case Type.CHAR:
                    this.value = new Value('', this.type, Type.VALOR, this.fila, this.columna)
                    break
                case Type.STRING:
                    this.value = new Value("", this.type, Type.VALOR, this.fila, this.columna)
                    break
                case Type.BOOLEAN:
                    this.value = new Value(true, this.type, Type.VALOR, this.fila, this.columna)
                default:
                    break
            }
            
        }
    }

    ejecutar(tabla, global, ambito){
        switch (this.value.typeExp) {
            case Type.METODO:
                return null
            default:
                let v = this.value.ejecutar(tabla, global)
                if ((v != Type.ERROR) && (v != null)) {
                    if (v.type != this.type) {
                        switch (this.type) {
                            case Type.DOUBLE:
                                if (v.type == Type.INT) {
                                    v.type = this.type    
                                }else if(v.type == Type.BOOLEAN){
                                    v.type = this.type
                                    v.value = v.value?1:0
                                }
                                break
                            case Type.STRING:
                                break
                            case Type.INT:
                                if(v.type == Type.BOOLEAN){
                                    v.type = this.type
                                    v.value = v.value?1:0
                                }else if(v.type == Type.DOUBLE){
                                    v.type = this.type
                                    v.value = Math.trunc(v.value)
                                }
                            case Type.BOOLEAN:
                                if(v.type == Type.INT){
                                    if (v.value == 0) {
                                        v.type = Type.BOOLEAN
                                        v.value = false
                                    }else if (v.value == 1) {
                                        v.type = Type.BOOLEAN
                                        v.value = false
                                    }
                                }else if (v.type == Type.DOUBLE) {
                                    if (v.value == 0) {
                                        v.type = Type.BOOLEAN
                                        v.value = false
                                    }else if (v.value == 1) {
                                        v.type = Type.BOOLEAN
                                        v.value = false
                                    }
                                }
                            default:
                                break;
                        }
                    }
                    if (v.type == this.type) {
                        if (tabla.newSymbol(this.id, new Value(v.value, this.type, Type.VALOR, this.fila, this.columna),this.type, Type.VARIABLE, this.fila, this.columna)) {
                            global.newSymbol(this.id,this.type, Type.VARIABLE, ambito, this.fila, this.columna)
                            return null
                        }else{
                            global.newError(Type.SEMANTICO,'No se pudo declarar: '+ this.id + ', ya fue declarado.', this.fila, this.columna)
                            return Type.ERROR
                        }
                    }else{
                        global.newError(Type.SEMANTICO, 'No se pudo asignar, tipos incompatibles.', _fila, _columna)
                        return Type.ERROR
                    }
                }
                global.newError(Type.SEMANTICO, "No se pudo asignar valor, null pointer exception.", this.fila, this.columna)
                return Type.ERROR
        }
    }
}
module.exports = Declaracion