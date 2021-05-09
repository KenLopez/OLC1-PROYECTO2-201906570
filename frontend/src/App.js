import './App.css';
import Footer from './components/Footer'
import { useState } from 'react';
import Banner from './components/Banner';
import Editor from './components/Editor';
import Reporte from './components/Reporte';
import TablaSymbolos from './components/TablaSymbolos';
import AST from './components/AST';
const axios = require('axios').default

function App() {
  const [paneCount, setPaneCount] = useState(2)
  const [active, setActive] = useState(0)
  const [panes, setPanes] = useState([{name:'Panel 1', text:''}])
  const [currentText, setCurrentText] = useState(panes[active].text)
  const [consola, setConsola] = useState('')
  const [errores, setErrores] = useState([])
  const [symbols, setSymbols] = useState([])
  const [ast, setAst] = useState(null)
  const [tab, setTab] = useState(0)
  //const [file, setFile] = useState(null)
  var compilar = ()=>{
    setAst(null)
    var data = ''
    var errores = []
    var simbolos = []
    let imagen = null
    async function enviar(){
        let res = await axios.post("http://localhost:3000/compilar", {codigo: currentText});
        data = String(res.data.data)
        errores = res.data.errores
        simbolos = res.data.symbols
        imagen = res.data.ast
        setConsola(String(data))  
        setErrores(errores) 
        setSymbols(simbolos)
        if (res.data.ast!= null) {
          setAst("data:image/png;base64,"+imagen) 
        }else{
          setAst(null)
        }
    }
    enviar()
  }
  const add = ()=>{
    let newPanes = panes
    setPaneCount(parseInt(paneCount)+1)
    newPanes.push({name: 'Panel '+paneCount, text:''})
    setPanes(newPanes)
    setActive(panes.length-1)
    setCurrentText(panes[panes.length-1].text)
  }
  const change = (e)=>{
    for (let index = 0; index < panes.length; index++) {
      if(panes[index].name === e.target.innerText){
        setActive(index)
        setCurrentText(panes[index].text)
        break
      }
    }
  }
  const mode = (v)=>{
    setTab(v)
  }
  const cerrar = ()=>{
    if (panes.length>1){
      let newPanes = []
      for (let index = 0; index < panes.length; index++) {
        if(index !== active){
          newPanes.push(panes[index])
        }
      }
      if (newPanes.length-1<active){
        setActive(newPanes.length-1)
        setCurrentText(newPanes[newPanes.length-1].text)
      }else{
        setCurrentText(newPanes[active].text)
      }
      setPanes(newPanes)
    }
  }
  const updateText = (e)=>{
    panes[active].text = e.target.value
    setCurrentText(e.target.value)
  }
    return (
      <>
          <Banner
            panes={panes}
            active={active}
            compilar={compilar}
            setCurrentText={setCurrentText}
            mode={mode}
            tab={tab}
            currentText={currentText}
          />
          <div className='Content'>
            <br/>
            <div className="ui segment cuerpo">
              {
                tab===0?(
                  <Editor
                  cerrar={cerrar}
                  add={add}
                  panes={panes}
                  active={active}
                  change={change}
                  currentText={currentText}
                  consola={consola}
                  updateText={updateText}
                  />
                ):tab===1?(
                  <>
                  <Reporte
                  errores={errores}
                  />
                  </>
                ):tab===2?(
                  <>
                  <TablaSymbolos
                  symbols={symbols}
                  />
                  </>
                ):tab===3?(
                  <>
                  <AST
                  ast={ast}
                  />
                  </>
                ):(
                  <></>
                )
              }
            </div>
            <br/>
          </div>
          <Footer/>
          </>
    );
  
}

export default App;
