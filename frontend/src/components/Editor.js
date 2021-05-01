import React from 'react'
import { Button, Form, Grid, Header, Icon, Menu, Segment, TextArea } from 'semantic-ui-react'

function Editor(props) {
    return (
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
                props.panes.length>1?(
                    <Menu.Item as={Button} color='red' icon='delete' onClick={props.cerrar}/>
                ):(
                    <Menu.Item as={Button} disabled icon='delete' onClick={props.cerrar}/>
                )
                }
                <Menu.Item as={Button} color='blue' icon='add' onClick={props.add}/>
                {props.panes.map((c, index)=>
                <Menu.Item key={index} value={index} color='teal' active={props.active === index} onClick={props.change}>{c.name}</Menu.Item>
                )}
            </Menu>
            <Form>
                <TextArea 
                value={props.currentText} 
                style={{minHeight:500, maxHeight:500, fontFamily:"consolas"}} 
                onChange={props.updateText}
                spellCheck={false}
                />
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
                <TextArea 
                disabled value={props.consola} 
                style={{minHeight:555, maxHeight:555, fontFamily:"consolas"}}
                spellCheck = {false}
                />
            </Form>
            </Grid.Column>
        </Grid.Row>
        </Grid>
    )
}

export default Editor
