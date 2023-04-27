import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { vehicleData } from "../../data/data";
import { Vehicle } from "../../api/types";

interface SelectProps {
  role: string;
  vehicle: Vehicle | null;
  setVehicle: React.Dispatch<React.SetStateAction<Vehicle | null>>;
}

const VehicleList = (selectProps: SelectProps) => {

    const [vehicleSelect, setVehicleSelect] = useState('');
    let vehicles = vehicleData;
    if (selectProps.role === "collector") {
        vehicles = vehicles.filter((vehicle: Vehicle) => vehicle.type === "truck");
    } else if (selectProps.role === "janitor") {
      vehicles = vehicles.filter((vehicle: Vehicle) => vehicle.type === "troller");
    } else {
        vehicles = [];
    }

    return (
        <Form.Group controlId="vehicle-select">
            <Form.Label>Select Vehicle</Form.Label>
            <Form.Control
              as="select"
              value={vehicleSelect}
              onChange={(e) => {
                setVehicleSelect(e.target.value)
                localStorage.removeItem('vehicle');
                selectProps.setVehicle(vehicles.find(((vehicle: Vehicle) => vehicle.id === Number(e.target.value))) as Vehicle);
                if (vehicleSelect !== "") {
                  localStorage.setItem('vehicle', JSON.stringify(selectProps.vehicle));
                }
              }}
            >
              <option value="">Choose...</option>
              {vehicles.map((vehicle: Vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)} {vehicle.id}
                </option>
              ))}
            </Form.Control>
            { selectProps.vehicle ?
            <Form.Text id="vehicleoverview">
                <strong>Location: </strong> {selectProps.vehicle.location} <br/>
                <strong>Status: </strong> {selectProps.vehicle.is_available === true ? "OK" : "Busy"} <br/>
                <strong>Capacity: </strong> {selectProps.vehicle.capacity} <br/>
                <strong>Fuel: </strong> {selectProps.vehicle.fuel*100}% <br/>
            </Form.Text>
            :  ""}
        </Form.Group>
    );
}

export default VehicleList;
