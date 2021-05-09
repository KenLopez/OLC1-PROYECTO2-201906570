const Type = require('./Type.js')
class Funcion{
    constructor(_id, _params, _block, _type, _typeExp, _fila, _columna){
        this.id = _id
        this.params = _params
        this.block = _block
        this.type = _type
        this.typeExp = _typeExp
        this.fila = _fila
        this.columna = _columna
    }

    ejecutar(tabla, global, ambito){
        let aux = []
        for (let index = 0; index < this.params.length; index++) {
            const element = this.params[index];
            for (let index = 0; index < aux.length; index++) {
                const id = aux[index];
                if (id.id == element.id) {
                    global.newError(Type.SEMANTICO,'No se pudo declarar: '+ this.id + ', parámetros con id iguales.', this.fila, this.columna)
                    return Type.ERROR
                }
            }
            aux.push(element)
        }
        if (tabla.newSymbol(this.id, {params: this.params, block:this.block}, this.type, Type.FUNCION, this.fila, this.columna)) {
            global.newSymbol(this.id,this.type, Type.FUNCION, ambito, this.fila, this.columna)
            return null
        }else{
            global.newError(Type.SEMANTICO,'No se pudo declarar: '+ this.id + ', ya fue declarado.', this.fila, this.columna)
            return Type.ERROR
        }
    }

}
module.exports = Funcion