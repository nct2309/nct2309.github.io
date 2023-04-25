import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { truckData, trollerData } from "../../data/data";
interface SelectOption {
    value: string;
    label: string;
}

const vehicles: SelectOption[] = [
    { value: 'vehicle1', label: 'Vehicle 1' },
    { value: 'vehicle2', label: 'Vehicle 2' },
];

const VehicleList = () => {
    const [vehicle, setVehicle] = useState('');

    return (
        <Form.Group controlId="vehicle-select">
            <Form.Label>Select Vehicle</Form.Label>
            <Form.Control
              as="select"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
            >
              <option value="">Choose...</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.value} value={vehicle.value}>
                  {vehicle.label}
                </option>
              ))}
            </Form.Control>
        </Form.Group>
    );
}
export default VehicleList;