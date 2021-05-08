const Type = require('./Type')
const Value = require('./Value')
class Casteo{
    constructor(_casteo, _exp, _typeExp, _fila, _columna){
        this.casteo = _casteo
        this.exp = _exp
        this.type = Type.CASTEO
        this.typeExp = _typeExp
        this.fila = _fila
        this.columna = _columna
    }

    ejecutar(tabla, global){
        let res = null
        if ((this.casteo == Type.STRING)&&(this.typeExp == Type.CASTEO)) {
            global.newError(Type.SEMANTICO, 'Para castear a string, utilizar la función toString().', this.fila, this.columna )
            return Type.ERROR
        }
        res = this.exp.ejecutar(tabla, global)
        if ((res == Type.ERROR)||(res == null)) {
            global.newError(Type.SEMANTICO, 'No se pudo castear.', this.fila, this.columna )
            return Type.ERROR
        }
        switch (this.casteo) {
            case Type.INT:
                if (res.type == Type.DOUBLE) {
                    return new Value(Math.trunc(res.value),this.casteo, Type.VALOR, this.fila, this.columna)
                }else if(res.type == Type.CHAR){
                    return new Value(res.value.charCodeAt(0),this.casteo, Type.VALOR, this.fila, this.columna)
                }else if (res.type == Type.INT) {
                    return res
                }
                break;
            case Type.DOUBLE:
                if (res.type == Type.INT) {
                    return new Value(res.value,this.casteo, Type.VALOR, this.fila, this.columna)
                }else if(res.type == Type.CHAR){
                    return new Value(res.value.charCodeAt(0),this.casteo, Type.VALOR, this.fila, this.columna)
                }else if (res.type == Type.DOUBLE) {
                    return res
                }
                break;
            case Type.CHAR:
                if(res.type == Type.INT){
                    return new Value(String.fromCharCode(res.value),this.casteo, Type.VALOR, this.fila, this.columna)
                }else if (res.type == Type.CHAR) {
                    return res
                }
            case Type.BOOLEAN:
                if(res.type == Type.BOOLEAN){
                    return res
                }
                break;
            default:
                break;
        }
        global.newError(Type.SEMANTICO, 'No se pudo castear, tipos incompatibles: '+ res.type + ' a ' + this.casteo, this.fila, this.columna)
        return Type.ERROR
    }
}
module.exports = Casteo