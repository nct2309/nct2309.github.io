import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { routeData } from "../../data/data";

interface SelectOption {
  value: string;
  label: string;
}

const routes: SelectOption[] = [
  { value: 'route1', label: 'Route 1' },
  { value: 'route2', label: 'Route 2' },
];

const VehicleList = () => {
    const [route, setRoute] = useState('');

    return (
      <Form.Group controlId="route-select">
        <Form.Label>Select Route</Form.Label>
        <Form.Control
          as="select"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
        >
          <option value="">Choose...</option>
          {routes.map((route) => (
            <option key={route.value} value={route.value}>
              {route.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    );
}
export default VehicleList;