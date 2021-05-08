const Type = require('./Type')
class Ternario{
    constructor(_exp, _verdadero, _falso, _fila, _columna){
        this.exp = _exp
        this.verdadero = _verdadero
        this.falso = _falso
        this.type = Type.TERNARIO
        this.fila = _fila
        this.columna = _columna
    }

    ejecutar(tabla, global){
        let res = this.exp.ejecutar(tabla, global)
        if ((res == Type.ERROR)||(res == null)||(res.type != Type.BOOLEAN)){
            return Type.ERROR
        }
        if (res.value) {
            res = this.verdadero.ejecutar(tabla,global)
            if ((res == Type.ERROR)||(res == null)){
                return Type.ERROR
            }
            return res
        }
        res = this.falso.ejecutar(tabla,global)
        if ((res == Type.ERROR)||(res == null)){
            return Type.ERROR
        }
        return res
    }
}
module.exports = Ternario