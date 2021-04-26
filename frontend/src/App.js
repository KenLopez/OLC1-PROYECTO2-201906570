import './App.css';
import { Header, Menu, Segment, Image, Button, Grid, TextArea, Form, Icon } from 'semantic-ui-react';
import Footer from './components/Footer'
import { useState } from 'react';
const axios = require('axios').default

function App() {
  const [paneCount, setPaneCount] = useState(2)
  const [active, setActive] = useState(0)
  const [panes, setPanes] = useState([{name:'Panel 1', text:''}])
  const [currentText, setCurrentText] = useState(panes[active].text)
  const [consola, setConsola] = useState('')
  const [file, setFile] = useState(null)
  var compilar = ()=>{
    var data = ''
    async function enviar(){
        let res = await axios.post("http://localhost:3000/compilar", {codigo: currentText});
        data = res.data
        setConsola(data)   
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
        <Segment inverted color='blue' className="Header">
            <Header className="Title">
                <Image className="img" src='https://upload.wikimedia.org/wikipedia/commons/4/4a/Usac_logo.png' />
                TYPESTY
            </Header>
            <Menu inverted borderless className="Nav">
                <Menu.Item className='opcion'>
                <input type="file" class="inputfile" accept='.ty' onChange={
                  (e)=>{
                    if (e.target.files[0]!=null){
                      let reader = new FileReader()
                      console.log()
                      reader.readAsText(e.target.files[0], "UTF-8")
                      reader.onload=(a)=>{
                      setCurrentText(a.target.result)
                      panes[active].text = a.target.result
                      }
                    }
                }
                } id="abrirArchivo" />

                <label for="abrirArchivo" class="ui purple button"> 
                  Abrir
                </label>
                </Menu.Item>
                <Menu.Item className='opcion'>
                  <Button color='green'>Guardar</Button>
                </Menu.Item>
                <Menu.Item className='opcion'>
                  <Button color='yellow' onClick={compilar}>Compilar</Button> 
                </Menu.Item>
                <Menu.Item className='opcion'>
                  <Button color='orange'>Reporte</Button>
                </Menu.Item>
                <Menu.Item className='opcion'>
                  <Button color='red'>Gramaticas</Button>
                </Menu.Item>
            </Menu>
        </Segment>
        <div className='Content'>
          <br/>
          <div className="ui segment cuerpo">
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Segment>
                    <Header size='large'>
                      <Icon name='code'/>
                      <Header.Content>Editor</Header.Content>
                    </Header>
                  </Segment>
                  <Menu pointing borderless>
                    {
                      panes.length>1?(
                        <Menu.Item as={Button} color='red' icon='delete' onClick={cerrar}/>
                      ):(
                        <Menu.Item as={Button} disabled icon='delete' onClick={cerrar}/>
                      )
                    }
                    <Menu.Item as={Button} color='blue' icon='add' onClick={add}/>
                    {panes.map((c, index)=>
                      <Menu.Item value={index} color='teal' active={active === index} onClick={change}>{c.name}</Menu.Item>
                    )}
                  </Menu>
                  <Form>
                    <TextArea value={currentText} style={{minHeight:500, maxHeight:500}} onChange={updateText}/>
                  </Form>
                </Grid.Column>
                <Grid.Column>
                  <Segment>
                    <Header size='large'>
                      <Icon name='file'/>
                      <Header.Content>Consola</Header.Content>
                    </Header>
                  </Segment>
                  <Form>
                    <TextArea disabled value={consola} style={{minHeight:555, maxHeight:555}}/>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
          <br/>
        </div>
        <Footer/>
        </>
  );
}

export default App;
