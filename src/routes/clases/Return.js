const Type = require("./Type")

class Return{
    constructor(_exp, _fila, _columna){
        this.exp = _exp
        this.value = null
        this.fila = _fila
        this.columna = _columna
        this.type = Type.RETURN
    }

    ejecutar(tabla, global, ambito){
        if(String(ambito).includes(Type.METODO)||String(ambito).includes(Type.FUNCION)){
            if(this.exp!=null){
                this.value = this.exp.ejecutar(tabla, global)
                if(this.value == Type.ERROR){
                    return Type.ERROR
                }else if(this.value == null){
                    return Type.ERROR
                }
            }
            return this
        }else{
            global.newError(Type.SEMANTICO, 'No se pudo realizar la instruccion: '+Type.RETURN+', no se encuentra en ámbito permitido.',this.fila, instruccion.columna)
            return Type.ERROR
        }
    }
}
module.exports = Return