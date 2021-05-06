const Type = require('./Type.js')
class Nodo{
    constructor(_label, _sons){
        this.label = _label
        this.sons = _sons
    }

    graficar(counter) {
        if (this.sons == null) {
            let res = {nodos: "nodo"+counter.counter+"[label=\""+this.label+"\"]\n", enlaces:""}
            counter.counter++
            return res
        }else{
            let tag = "nodo"+counter.counter
            let nodos = tag +"[label=\""+this.label+"\"]\n"
            counter.counter++
            let enlaces = ''
            for (let index = 0; index < this.sons.length; index++) {
                const son = this.sons[index];
                enlaces+=tag+"->nodo"+counter.counter+"\n"
                let tmp = son.graficar(counter)
                nodos+=tmp.nodos
                enlaces+=tmp.enlaces
            }
            return {nodos: nodos, enlaces:enlaces}
        }
    }
}
module.exports = Nodo