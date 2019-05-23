import React, { Component } from 'react';
import { Grid, Row, Col, Jumbotron, Button, Table, FormGroup, FormControl, ControlLabel, InputGroup, Modal, Alert } from 'react-bootstrap';
import $ from 'jquery';
window.$ = $;

export default class Inventory extends Component {
  render() {
    return (
      <div>
        <Jumbotron><h1 className="title">Dealership Inventory</h1></Jumbotron>
        <InventoryTable />
      </div>
    );
  }
}

class PercentMarkup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 3
    };

    this.handleChange = this.handleChange.bind(this);
    this.updatePercentMarkup = this.updatePercentMarkup.bind(this);
  }

  validateInput() {
    // ensure the value entered is a number
    if (isNaN(this.state.value)) return "error";
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  updatePercentMarkup() {
    this.props.updatePercentMarkup(this.state.value);
  }

  render() {
    return (
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.validateInput()}
        >
          <InputGroup>
            <InputGroup.Addon style={{ fontWeight: "bold" }}>Percent Markup:</InputGroup.Addon>
            <FormControl
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <InputGroup.Button>
              <Button onClick={this.updatePercentMarkup}>Update</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    );
  }
}

class AddCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      make: 'Ford',
      model: 'Focus',
      type: 'Car',
      retailPrice: 10000,
      year: 2019,
      quantity: 1,
      doorOption: 'Two Door',
      fuelOption: 'Gas',
      transmissionOption: 'Automatic',
      interiorOption: 'Cloth'
    };

    this.addCar = this.addCar.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModel = this.closeModel.bind(this);
    this.handleMakeChange = this.handleMakeChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleRetailPriceChange = this.handleRetailPriceChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleDoorOptionChange = this.handleDoorOptionChange.bind(this);
    this.handleFuelOptionChange = this.handleFuelOptionChange.bind(this);
    this.handleTransmissionOptionChange = this.handleTransmissionOptionChange.bind(this);
    this.handleInteriorOptionChange = this.handleInteriorOptionChange.bind(this);
    this.formIsInvalid = this.formIsInvalid.bind(this);
  }

  addCar(event) {
    event.preventDefault();
    if (this.formIsInvalid()) {
      alert("One of your input values is incorrect. Please revise values.");
    } else {
      // Calculate cost with Features
      var priceWithFeatures = this.state.retailPrice;
      if (this.state.doorOption === "Four Door") priceWithFeatures += 2500;
      if (this.state.fuelOption === "Hybrid") priceWithFeatures += 10000;
      else if (this.state.fuelOption === "Electric") priceWithFeatures += 15000;
      if (this.state.transmissionOption === "Automatic") priceWithFeatures += 1000;

      const vehicle = {
        make: this.state.make,
        model: this.state.model,
        year: this.state.year,
        type: this.state.type,
        features: [this.state.doorOption, this.state.fuelOption, this.state.transmissionOption, this.state.interiorOption],
        priceWithFeatures: priceWithFeatures
      }
      this.setState({ show: false });
      this.props.handleAddingCar(vehicle);
    }
  }
  // Validate all form options
  formIsInvalid() {
    if (this.state.model === '' ||
      isNaN(this.state.year) || this.state.year <= 1900 ||
      isNaN(this.state.retailPrice) || this.state.retailPrice <= 0 ||
      isNaN(this.state.quantity) || this.state.quantity < 1) {
      return true;
    }
    return false;
  }

  // Modal controls
  showModal() {
    this.setState({ show: true });
  }
  closeModel() {
    this.setState({ show: false });
  }

  // Form values
  handleMakeChange(e) {
    this.setState({ make: e.target.value });
  }
  validateModelInput() {
    if (this.state.model === "") return "error";
    return null;
  }
  handleModelChange(e) {
    this.setState({ model: e.target.value });
  }
  validateYearInput() {
    if (isNaN(this.state.year) || this.state.year <= 1900) return "error";
    return null;
  }
  handleYearChange(e) {
    this.setState({ year: e.target.value });
  }
  handleTypeChange(e) {
    this.setState({ type: e.target.value });
  }
  validateRetailPriceInput() {
    if (isNaN(this.state.retailPrice) || this.state.retailPrice <= 0) return "error";
    return null;
  }
  handleRetailPriceChange(e) {
    this.setState({ retailPrice: e.target.value });
  }
  validateQuantityInput() {
    if (isNaN(this.state.quantity) || this.state.quantity < 1) return "error";
    return null;
  }
  handleQuantityChange(e) {
    this.setState({ quantity: e.target.value });
  }
  handleDoorOptionChange(e) {
    this.setState({ doorOption: e.target.value });
  }
  handleFuelOptionChange(e) {
    this.setState({ fuelOption: e.target.value });
  }
  handleTransmissionOptionChange(e) {
    this.setState({ transmissionOption: e.target.value });
  }
  handleInteriorOptionChange(e) {
    // this is never going to be used, but adding incase we add interior options
    this.setState({ interiorOption: e.target.value });
  }


  render() {
    return (
      <div>
        <Button onClick={this.showModal}>Add Vehicle to Inventory</Button>

        <Modal backdrop='static' show={this.state.show} onHide={this.closeModel}>
          <form onSubmit={this.addCar}>
            <Modal.Header closeButton>
              <Modal.Title>Add a Vehicle to the Inventory</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <FormGroup controlId="formControlsSelect" onChange={this.handleMakeChange}>
                <ControlLabel>Make</ControlLabel>
                <FormControl componentClass="select" placeholder="Ford">
                  <option value="Ford">Ford</option>
                  <option value="Lincoln">Lincoln</option>
                  <option value="Dodge">Dodge</option>
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formBasicText" validationState={this.validateModelInput()}>
                <ControlLabel>Model</ControlLabel>
                <FormControl type="text" defaultValue={this.state.model} onChange={this.handleModelChange}/>
              </FormGroup>
              <FormGroup controlId="formBasicText" validationState={this.validateYearInput()}>
                <ControlLabel>Year</ControlLabel>
                <FormControl type="text" defaultValue={this.state.year} onChange={this.handleYearChange} />
              </FormGroup>
              <FormGroup controlId="formControlsSelect" onChange={this.handleTypeChange}>
                <ControlLabel>Type</ControlLabel>
                <FormControl componentClass="select" placeholder="Car">
                  <option value="Car">Car</option>
                  <option value="Truck">Truck</option>
                  <option value="SUV">SUV</option>
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formBasicText" validationState={this.validateRetailPriceInput()}>
                <ControlLabel>Retail Price</ControlLabel>
                <FormControl type="text" defaultValue={this.state.retailPrice} onChange={this.handleRetailPriceChange}/>
              </FormGroup>
              <FormGroup controlId="formBasicText" validationState={this.validateQuantityInput()}>
                <ControlLabel>Quantity in Stock</ControlLabel>
                <FormControl type="text" defaultValue={this.state.quantity} onChange={this.handleQuantityInput}/>
              </FormGroup>
              <h3>Features</h3>
              <FormGroup controlId="formControlsSelect" onChange={this.handleDoorOptionChange}>
                <ControlLabel>Door Options</ControlLabel>
                <FormControl componentClass="select" placeholder="TwoDoor">
                  <option value="Two Door">Two Door</option>
                  <option value="Four Door">Four Door</option>
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formControlsSelect" onChange={this.handleFuelOptionChange}>
                <ControlLabel>Fuel Options</ControlLabel>
                <FormControl componentClass="select" placeholder="Gas">
                  <option value="Gas">Gas</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formControlsSelect" onChange={this.handleTransmissionOptionChange}>
                <ControlLabel>Transmission</ControlLabel>
                <FormControl componentClass="select" placeholder="Automatic">
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formControlsSelect" onChange={this.handleInteriorOptionChange}>
                <ControlLabel>Interior</ControlLabel>
                <FormControl componentClass="select" placeholder="Cloth">
                  <option value="Cloth">Cloth</option>
                </FormControl>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <input type="submit" value="Submit" color="primary" className="btn btn-primary" />
              <Button onClick={this.closeModel}>Cancel</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

class InventoryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: [],
      loading: true,
      percentMarkup: 3,
      showSuccessRemovalAlert: false
    };

    $.ajax({
      dataType: "json",
      url: '/api/SampleData/GetVehicles',
      type: "GET",
      context: this,
      success: function (data, status, xhr) {
        this.setState({ vehicles: data, loading: false });
      }
    });

    this.formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });

    this.handleUpdatePercentMarkup = this.handleUpdatePercentMarkup.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.handleAddingCar = this.handleAddingCar.bind(this);
    this.onDismissSuccessRemovalAlert = this.onDismissSuccessRemovalAlert.bind(this);
  }

  handleUpdatePercentMarkup(percent) {
    this.setState({ percentMarkup: percent });
  }

  deleteRow(index) {
    var vehicles = [...this.state.vehicles];
    vehicles.splice(index, 1);
    this.setState({ vehicles, showSuccessRemovalAlert: true });
  }

  onDismissSuccessRemovalAlert() {
    this.setState({ showSuccessRemovalAlert: false });
  }

  handleAddingCar(vehicle) {
    var vehicles = [...this.state.vehicles];
    vehicles.push(vehicle);
    this.setState({ vehicles });
  }



  render() {
    const rows = [];
    var inventoryTotal = 0;
    var profitTotal = 0;
    this.state.vehicles.sort((a, b) => (a.make > b.make) ? 1 : ((a.model > b.model) ? 1 : -1));
    this.state.vehicles.forEach((vehicle, i) => {
      inventoryTotal += vehicle.priceWithFeatures;
      var profitForThisVehicle = vehicle.priceWithFeatures * (this.state.percentMarkup / 100);
      profitTotal += profitForThisVehicle;
      rows.push(<tr key={vehicle.guid}>
        <td>{vehicle.make}</td>
        <td>{vehicle.model}</td>
        <td>{vehicle.year}</td>
        <td>{vehicle.type}</td>
        <td>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {vehicle.features.map((item, i) =>
              <li key={i}>{item}</li>
            )}
          </ul>
        </td>
        <td>{this.formatter.format(vehicle.priceWithFeatures + profitForThisVehicle)}</td>
        <td><Button onClick={this.deleteRow} >Remove from Inventory</Button></td>
      </tr>);
    });
    rows.push(
      <tr key="totalInventory">
        <td style={{ fontWeight: "bold" }}>Total value of cars on the lot:</td>
        <td>{this.formatter.format(inventoryTotal)}</td>
      </tr>
    );
    rows.push(
      <tr key="totalProfit">
        <td style={{fontWeight: "bold"}}>Total potential profit:</td>
        <td>{this.formatter.format(profitTotal)}</td>
      </tr>
    );

    const SuccessAlert = this.state.showSuccessRemovalAlert ? <Alert bsStyle="success" onDismiss={this.onDismissSuccessRemovalAlert}>Vehicle successfully removed from inventory.</Alert> : '';

    return (
      <div>
        {SuccessAlert}
        <Grid>
          <Row>
            <Col xs={12} md={4}><PercentMarkup updatePercentMarkup={this.handleUpdatePercentMarkup} /></Col>
            <Col xs={12} md={2}><AddCar handleAddingCar={this.handleAddingCar}/></Col>
          </Row>
        </Grid>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th style={{width: "125px"}}>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Type</th>
              <th>Features</th>
              <th>Calculated Sales Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.loading ? <tr><th>Loading...</th></tr> : rows}
          </tbody>
        </Table>
      </div>
    );
  }
}
