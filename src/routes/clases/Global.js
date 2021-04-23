class Block{
    constructor(){
        this.Instrucciones = []
        this.Exec = null
        this.Funciones = []
        this.SymbolTable = []
    }

    ejecutar(){
        this.Instrucciones.forEach(instruccion => {
            instruccion.ejecutar()
        });
    }
}