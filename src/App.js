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
    id: "selectTrait",
    label: "Trait",
    placeholder: "Tough",
    traits: [
      "Tough",
      "Cunning",
      "Wise",
      "Agile",
      "Courageous",
      "Brave",
      "Single"
    ]
  }
];

const formCheckBoxes = [
  {
    id: "checkBoxesStartingItems",
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
    id: "radioRoles",
    label: "Role",
    roles: [
      "Tank",
      "Rogue",
      "Mage"
    ]
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
      <td>{props.data.items.map((item) => <p>{item}</p>)}</td>
      <td>{props.data.role}</td>
      <td>{props.data.trait}</td>
      <td>
        <Button className="btn btn-danger" type="button" onClick={handleEvent}>
          Kick
        </Button>
      </td>
    </tr>
  );
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
            <th>Items</th>
            <th>Role</th>
            <th>Trait</th>
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

function GenerateRadioButtons(data, eventHandler) {
  let radioButtons = data.map((data) =>
    <FormGroup className="container">
      <ControlLabel>{data.label}</ControlLabel>
      <br></br>
      {RadioButtons(data.id, data.roles)}
    </FormGroup>
  );

  function RadioButtons(id, roles) {
    let radioButtons = roles.map((role) =>
      <div>
        <Radio inline id={id} name={id} value={role} onChange={eventHandler}> {role}</Radio>
      </div>
    );
    return radioButtons;
  }
  return radioButtons;
}

function GenerateCheckBoxes(data, eventHandler) {
  let checkBoxesContainer = data.map((data) =>
    <FormGroup className="container">
      <ControlLabel>{data.label}</ControlLabel>
      <br></br>
      {CheckBoxes(data.id, data.items)}
    </FormGroup>
  );

  function CheckBoxes(id, items) {
    let checkBoxes = items.map((item) =>
      <div>
        <Checkbox inline id={id} value={item} onChange={eventHandler}> {item}</Checkbox>
      </div>
    );
    return checkBoxes;
  }

  return checkBoxesContainer;
}

function RightFormContainer(props) {
  let checkBoxes = GenerateCheckBoxes(formCheckBoxes, props.eventHandler);
  let radioButtons = GenerateRadioButtons(formRadioButtons, props.eventHandler);

  return (
    <div className="container">
      {checkBoxes}
      {radioButtons}
    </div>
  )
}

function GenerateSelectElements(data, eventHandler) {
  let selectElements = data.map((data) =>
    <FormGroup>
      <ControlLabel>{data.label}</ControlLabel>
      <FormControl id={data.id} componentClass="select" onChange={eventHandler}>
        {data.traits.map((trait) => <option value={trait}>{trait}</option>)}
      </FormControl>
    </FormGroup>
  );
  return selectElements;
}

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
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
  let selectElements = GenerateSelectElements(formSelectFields, props.eventHandler);

  return (
    <div className="container">
      {inputFields}
      {textAreas}
      {selectElements}
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
      items: [],
      role: "none",
      trait: formSelectFields[0].placeholder,
      table: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCheckboxEvent = this.handleCheckboxEvent.bind(this)
    this.resetInputValues = this.resetInputValues.bind(this)
    this.addToTable = this.addToTable.bind(this)
    this.removeTableRow = this.removeTableRow.bind(this)
  }

  handleChange(e) {
    switch(e.target.id) {
      case "inputName":
        this.setState({name: e.target.value})
        break;
      case "inputTitle":
        this.setState({title: e.target.value})
        break;
      case "inputBackgroundStory":
        this.setState({background: e.target.value})
        break;
      case "checkBoxesStartingItems":
        this.handleCheckboxEvent(e);
        break;
      case "radioRoles":
        this.setState({role: e.target.value});
        break;
      case "selectTrait":
        this.setState({trait: e.target.value})
        console.log("Trait id: " + e.target.id + " value is: " + e.target.value);
        break;
      default:
        console.log("hmmm..")
        break;
    }
  }

  handleCheckboxEvent(e) {
    let newItems = this.state.items.slice();

    if (e.target.checked) {
      newItems.push(e.target.value);
    } else if (!e.target.checked) {
      let indexOfItem = this.state.items.indexOf(e.target.value);
      newItems.splice(indexOfItem, 1);
    }
    this.setState({items: newItems})
  }

  addToTable() {
    let newTable = this.state.table.slice();
    newTable.push(this.state);
    this.setState({table: newTable})
  }

  removeTableRow(index) {
    let newTable = this.state.table.slice();
    newTable.splice(index, 1);
    this.setState({table: newTable})
  }

  //TODO: reset values in state too! Refactor Generate-functions too!!!!
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
            <Row>
              <Col md={6}>
                <LeftFormContainer eventHandler={this.handleChange} />
              </Col>
              <Col md={6}>
                <RightFormContainer eventHandler={this.handleChange} />
              </Col>
            </Row>
            <Row>
              <SubmitHandler addToTable={this.addToTable}
                             resetInputValues={this.resetInputValues}
              />
            </Row>
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
