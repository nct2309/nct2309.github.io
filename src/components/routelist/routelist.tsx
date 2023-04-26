import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { routeData } from "../../data/data";

interface SelectProps {
  role: string;
  setMCPs: React.Dispatch<React.SetStateAction<[number, number][]>>;
}


interface SelectOption {
  id: string;
  value: [number, number][];
}

const routes: SelectOption[] = [
  { id: 'Route 1', value: [] },
  { id: 'Route 2', value: [] },
];

const RouteList = (selectProps: SelectProps) => {
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
            <option key={route.id} value={route.id}>
              {route.id}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    );
}
export default RouteList;