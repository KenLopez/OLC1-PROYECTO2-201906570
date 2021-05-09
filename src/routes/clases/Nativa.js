const Type = require('./Type')
const Value = require('./Value')
class Nativa{
    constructor(_exp, _type, _fila, _columna){
        this.exp = _exp
        this.type = _type
        this.typeExp = Type.NATIVA
        this.fila = _fila
        this.columna = _columna
    }

    ejecutar(tabla, global){
        let res = this.exp.ejecutar(tabla, global)
        if ((res == Type.ERROR) || (res==null)) {
            global.newError(Type.SEMANTICO, 'No se pudo realizar la función. La expresión no devolvió ningún valor.', this.fila, this.columna)
            return Type.ERROR
        }
        switch (this.type) {
            case Type.TOLOWER:
                if (res.type==Type.STRING) {
                    return new Value(res.value.toLowerCase(),Type.STRING, Type.VALOR, this.fila, this.columna)
                }
                global.newError(Type.SEMANTICO, 'Solo se puede aplicar la función toLower() a valores tipo STRING.', this.fila, this.columna)
                return Type.ERROR
            case Type.TOUPPER:
                if (res.type==Type.STRING) {
                    return new Value(res.value.toUpperCase(),Type.STRING, Type.VALOR, this.fila, this.columna)
                }
                global.newError(Type.SEMANTICO, 'Solo se puede aplicar la función toUpper() a valores tipo STRING.', this.fila, this.columna)
                return Type.ERROR
            case Type.LENGTH:
                if (res.type==Type.STRING) {
                    return new Value(parseInt(res.value.length),Type.INT, Type.VALOR, this.fila, this.columna)
                }
                global.newError(Type.SEMANTICO, 'Solo se puede aplicar la función length a valores tipo STRING.', this.fila, this.columna)
                return Type.ERROR
            case Type.TRUNCATE:
                if ((res.type==Type.INT)||(res.type == Type.DOUBLE)) {
                    return new Value(Math.trunc(res.value),Type.INT, Type.VALOR, this.fila, this.columna)
                }
                global.newError(Type.SEMANTICO, 'Solo se puede aplicar la función truncate() a valores tipo INT o DOUBLE.', this.fila, this.columna)
                return Type.ERROR
            case Type.ROUND:
                if ((res.type==Type.INT)||(res.type == Type.DOUBLE)) {
                    return new Value(Math.round(res.value),Type.INT, Type.VALOR, this.fila, this.columna)
                }
                global.newError(Type.SEMANTICO, 'Solo se puede aplicar la función round() a valores tipo INT o DOUBLE.', this.fila, this.columna)
                return Type.ERROR
            case Type.TYPEOF:
                return new Value(res.type,Type.STRING, Type.VALOR, this.fila, this.columna)
            case Type.TOSTRING:
                return new Value(String(res.value), Type.STRING, Type.VALOR, this.fila, this.columna)
        }
    }
}
module.exports = Nativa