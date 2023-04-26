import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { truckData, trollerData } from "../../data/data";
import { Vehicle } from "../../data/types";

interface SelectProps {
  role: string;
}

const VehicleList = (selectProps: SelectProps) => {

    const [vehicleSelect, setVehicleSelect] = useState('');
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);

    let vehicles = [] as any;
    if (selectProps.role === "collector") {
        vehicles = truckData;
    } else if (selectProps.role === "janitor") {
        vehicles = trollerData;
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
                setVehicle(vehicles.find((vehicle: Vehicle) => vehicle.id === e.target.value))
              }}
            >
              <option value="">Choose...</option>
              {vehicles.map((vehicle: Vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.location}
                </option>
              ))}
            </Form.Control>
            <Form.Text id="vehicleoverview">
                <strong>ID: </strong> { vehicle ? vehicle?.id : "" } <br/>
                <strong>Status: </strong> { vehicle ? vehicle?.status === 0 ? "OK" : "Busy" : "" } <br/>
            </Form.Text>
        </Form.Group>
    );
}
export default VehicleList;