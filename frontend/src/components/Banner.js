import React from 'react'
import { Header, Menu, Segment, Image, Button } from 'semantic-ui-react'

function Banner(props) {
    return (
        <Segment inverted color='blue' className="Header">
            <Header className="Title">
                <Image className="img" src='https://upload.wikimedia.org/wikipedia/commons/4/4a/Usac_logo.png' />
                TYPESTY
            </Header>
            <Menu inverted borderless className="Nav">
                <Menu.Item className='opcion'>
                  <Button color='teal' onClick={()=>{props.mode(0)}}>Código</Button> 
                </Menu.Item>
                <Menu.Item className='opcion'>
                <input type="file" class="inputfile" accept='.ty' onChange={
                  (e)=>{
                    if (e.target.files[0]!=null){
                      let reader = new FileReader()
                      console.log()
                      reader.readAsText(e.target.files[0], "UTF-8")
                      reader.onload=(a)=>{
                      props.setCurrentText(a.target.result)
                      props.panes[props.active].text = a.target.result
                      }
                    }
                }
                } id="abrirArchivo" />

                <label for="abrirArchivo" class={("ui purple button ")+((props.tab!==0)?'disabled':'')}> 
                  Abrir
                </label>
                </Menu.Item>
                <Menu.Item className='opcion'>
                  <Button color='green' className={props.tab!==0?'disabled':''} onClick={()=>{
                    const url = window.URL.createObjectURL(
                      new Blob([props.currentText], {type:'text/plain'})
                    )
                    const link = document.createElement('a')
                    link.href = url
                    link.setAttribute('download', 'Archivo.ty')
                    document.body.appendChild(link)
                    link.click()
                  }}>Guardar</Button>
              </Menu.Item>
                <Menu.Item className='opcion'>
                  <Button color='yellow' onClick={props.compilar} className={props.tab!==0?'disabled':''}>Compilar</Button> 
                </Menu.Item>
                <Menu.Item className='opcion'>
                  <Button color='orange' onClick={()=>{props.mode(1)}}>Errores</Button>
                </Menu.Item>
                <Menu.Item className='opcion'>
                  <Button color='violet' onClick={()=>{props.mode(2)}}>Símbolos</Button>
                </Menu.Item>
                <Menu.Item className='opcion'>
                  <Button color='red' onClick={()=>{props.mode(3)}}>AST</Button>
                </Menu.Item>
                {/*<Menu.Item className='opcion'>
                  <Button color='red'>Gramaticas</Button>
                </Menu.Item>*/}
            </Menu>
        </Segment>
    )
}

export default Banner
