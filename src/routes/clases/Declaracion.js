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

    ejecutar(tabla, global){
        switch (this.value.typeExp) {
            case Type.METODO:
                return null
            default:
                let v = this.value.ejecutar(tabla, global)
                if (v != null) {
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
                                if (v.type == Type.CHAR) {
                                    v.type = this.type   
                                }
                            case Type.INT:
                                if(v.type == Type.CHAR){
                                    v.type = this.type
                                    v.value = v.value.charCodeAt(0)
                                }else if(v.type == Type.BOOLEAN){
                                    v.type = this.type
                                    v.value = v.value?1:0
                                }else if(v.type == Type.DOUBLE){
                                    v.type = this.type
                                    v.value = Math.trunc(v.value)
                                }
                            default:
                                break;
                        }
                    }
                    if (v.type == this.type) {
                        if (tabla.newSymbol(this.id, new Value(v.value, this.type, Type.VALOR, this.fila, this.columna),this.type, Type.VARIABLE, this.fila, this.columna)) {
                            return null
                        }
                    }
                }
                return Type.ERROR
        }
    }
}
module.exports = Declaracion