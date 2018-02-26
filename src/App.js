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

function TableRow(props) {
  return(
    <tr>
      <td>{props.data.name}</td>
      <td>{props.data.title}</td>
      <td>{props.data.background}</td>
    </tr>
  )
}

function TableContainer(props) {
  let tableRow = props.tableData.map((data) =>
    <TableRow data={data}/>
  );

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Background Story</th>
          </tr>
        </thead>
        <tbody>
          {tableRow}
        </tbody>
      </Table>
    </div>
  )
}

function SubmitButton(props) {
  function handleEvent() {
    props.addToTable(props.entries);
    props.resetHandler();
  }

  return (
    <div className="container">
      <Button className="btn btn-success" type="button" onClick={handleEvent}>
        Create Character
      </Button>
    </div>
  )
}

class SubmitHandler extends Component {
  constructor(props) {
    super(props)
    this.state = {
      table: []
    }
    this.addToTable = this.addToTable.bind(this)
  }

  // TODO: Move this to parent
  addToTable(entries) {
    let newTable = this.state.table.slice();
    newTable.push(entries);
    this.setState({
      table: newTable
    }, function() {
      this.props.tableHandler(this.state.table);
    })
  }

  render() {
    return(
      <SubmitButton entries={this.props.entries}
                    addToTable={this.addToTable}
                    resetHandler={this.props.resetHandler}
      />
    );
  }
}

function RightFormContainer(props) {
  return (
    <div>

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
  )
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
  )
}

function Title(props) {
  return (
    <div className="container">
      <div className="jumbotron">
        Fictional RPG Party Creator!
      </div>
    </div>
  )
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
    this.getTableValues = this.getTableValues.bind(this)
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

  //TODO: Replace this with 'addToTable()'
  getTableValues(newTable) {
    this.setState({
      table: newTable
    }, function () {
      console.log("GetTableData: " + this.state.table[0].name);
    })
  }

  resetInputValues() {
    this.formRef.reset();
  }

  render() {
    return (
      <div className="container">
        <Grid>
          <Row className="show-grid">
            <Col md={12}>
              <Title/>
              <Description/>
            </Col>
          </Row>
          <form ref={(e) => {this.formRef = e;}}>
              <LeftFormContainer eventHandler={this.handleChange} />
              <RightFormContainer />
              <SubmitHandler entries={this.state}
                             tableHandler={this.getTableValues}
                             resetHandler={this.resetInputValues}
              />
          </form>
          <br></br><br></br>
          <Row className="show-grid">
            <Col md={12}>
              <TableContainer tableData={this.state.table}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
