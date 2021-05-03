const Type = require('./Type.js')
class Control{
    constructor(_type, _typeExp, _fila, _columna){
        this.type = _type
        this.fila = _fila
        this.typeExp = _typeExp
        this.columna = _columna
    }



    ejecutar(tabla, global, ambito) {
        switch (this.type) {
            case Type.BREAK:
                if(String(ambito).includes(Type.FOR)||String(ambito).includes(Type.WHILE)||String(ambito).includes(Type.DOWHILE)||String(ambito).includes(Type.SWITCH)){
                    return Type.BREAK
                }else{
                    global.newError(Type.SEMANTICO, 'No se pudo realizar la instruccion: '+Type.BREAK+', no se encuentra en ámbito permitido.',instruccion.fila, instruccion.columna)
                    return Type.ERROR
                }
            case Type.CONTINUE:
                if(String(ambito).includes(Type.FOR)||String(ambito).includes(Type.WHILE)||String(ambito).includes(Type.DOWHILE)){
                    return Type.CONTINUE
                }else{
                    global.newError(Type.SEMANTICO, 'No se pudo realizar la instruccion: '+Type.CONTINUE+', no se encuentra en ámbito permitido.',instruccion.fila, instruccion.columna)
                    return Type.ERROR
                }
        }
        return new Value(this.value, this.type, this.typeExp, this.fila, this.columna)
    }
}
module.exports = Control