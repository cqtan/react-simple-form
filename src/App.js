import React, {Component} from 'react';
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, Checkbox, Radio, Button, Table} from 'react-bootstrap';
import './App.css';

const formInputFields= [
  {
    id: "inputName",
    label: "Character Name",
    type: "text",
    placeholder: "Enter your in-game name."
  },
  {
    id: "inputTitle",
    label: "Character Title",
    type: "text",
    placeholder: "Title with which you are known for."
  }
];

const formTextAreas = [
  {
    id: "inputBackgroundStory",
    label: "Tragic Background Story",
    componentClass: "textarea",
    placeholder: "I tripped once..."
  }
];

const formSelectFields = [
  {

  }
];

const formCheckBoxes = [
  {
    label: "Starting Items",
    items: [
      "Life Ring",
      "Fire Bombs x5",
      "Cracked Red Eye Orb"
    ]
  }
];

const formRadioButtons = [
  {

  }
];

function TableRow(props) {
  function handleEvent() {
    props.removeTableRow(props.index);
    console.log("Removing Entry from index: " + props.index);
  }

  return(
    <tr>
      <td>{props.data.name}</td>
      <td>{props.data.title}</td>
      <td>{props.data.background}</td>
      <td>
        <Button className="btn btn-danger" type="button" onClick={handleEvent}>
          Kick-{props.index}
        </Button>
      </td>
    </tr>
  )
}

function TableContainer(props) {
  let tableRow = props.tableData.map((data, index) =>
    <TableRow data={data} index={index} removeTableRow={props.removeTableRow}/>
  );

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Background Story</th>
            <th>Kick From Party</th>
          </tr>
        </thead>
        <tbody>
          {tableRow}
        </tbody>
      </Table>
    </div>
  );
}

function SubmitButton(props) {
  function handleEvent() {
    props.addToTable(props.entries);
    props.resetInputValues();
  }

  return (
    <div className="container">
      <Button className="btn btn-success" type="button" onClick={handleEvent}>
        Create Character
      </Button>
    </div>
  );
}

function SubmitHandler(props) {
  return(
    <SubmitButton entries={props.entries}
                  addToTable={props.addToTable}
                  resetInputValues={props.resetInputValues}
    />
  );
}

function RightFormContainer(props) {
  let checkBoxes = GenerateCheckBoxes(formCheckBoxes, props.eventHandler);

  return (
    <div>
      {checkBoxes}
    </div>
  )
}

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <Col md={6}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </Col>
    </FormGroup>
  );
}

//TODO: here!
function GenerateCheckBoxes(data, eventHandler) {

  let checkBoxes = data.items.map((e, index) =>
      <Col md={2}>
        <Checkbox inline>{e.items[index]}</Checkbox>
      </Col>
  );

  let checkBoxesContainer = data.map((e) =>
    <FieldGroup>
      <ControlLabel>{e.label}</ControlLabel>
      {checkBoxes}
    </FieldGroup>
  );

  return checkBoxesContainer;
}

function GenerateTextAreas(data, eventHandler) {
  let textAreas = data.map((e) =>
    <FieldGroup id={e.id}
                label={e.label}
                componentClass={e.componentClass}
                placeholder={e.placeholder}
                onChange={eventHandler}
    />
  );

  return textAreas;
}

function GenerateInputFields(data, eventHandler) {
  let inputFields = data.map((e) =>
    <FieldGroup id={e.id}
                label={e.label}
                type={e.type}
                placeholder={e.placeholder}
                onChange={eventHandler}
    />
  );

  return inputFields;
}

function LeftFormContainer(props) {
  let inputFields = GenerateInputFields(formInputFields, props.eventHandler);
  let textAreas = GenerateTextAreas(formTextAreas, props.eventHandler);

  return (
    <div>
      {inputFields}
      {textAreas}
    </div>
  );
}

function Description(props) {
  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          Create a posting of your dream
          team by filling out this form. Have fun!
        </div>
      </div>
    </div>
  );
}

function Title(props) {
  return (
    <div className="container">
      <div className="jumbotron">
        Fictional RPG Party Creator!
      </div>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "none",
      title: "none",
      background: "none",
      table: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.resetInputValues = this.resetInputValues.bind(this)
    this.addToTable = this.addToTable.bind(this)
    this.removeTableRow = this.removeTableRow.bind(this)
  }

  handleChange(e) {
    switch(e.target.id) {
      case "inputName":
        this.setState({ name: e.target.value})
        break;
      case "inputTitle":
        this.setState({ title: e.target.value})
        break;
      case "inputBackgroundStory":
        this.setState({ background: e.target.value})
        break;
      default:
        console.log("hmmm..")
        break;
    }
  }

  addToTable() {
    let newTable = this.state.table.slice();
    newTable.push(this.state);
    this.setState({
      table: newTable
    })
  }

  removeTableRow(index) {
    let newTable = this.state.table.slice();
    newTable.splice(index, 1);
    this.setState({
      table: newTable
    })
  }

  resetInputValues() {
    this.formRef.reset();
  }

  render() {
    return (
      <div className="container">
        <Grid>
          <Row>
            <Col md={12}>
              <Title/>
              <Description/>
            </Col>
          </Row>
          <form ref={(e) => {this.formRef = e;}}>
              <LeftFormContainer eventHandler={this.handleChange} />
              <RightFormContainer eventHandler={this.handleChange} />
              <SubmitHandler addToTable={this.addToTable}
                             resetInputValues={this.resetInputValues}
              />
          </form>
          <br></br><br></br>
          <Row>
            <Col md={12}>
              <TableContainer tableData={this.state.table}
                              removeTableRow={this.removeTableRow}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
