import React, { useState, useMemo } from "react";
import { Form } from "react-bootstrap";
import { MCP, Route } from "../../api/types";
import { routeData, mcpData } from "../../data/data";

interface SelectProps {
  role: string;
  mcps: MCP[];
  setMCPs: React.Dispatch<React.SetStateAction<MCP[]>>;
}

const RouteList = (selectProps: SelectProps) => {
    const [routeSelect, setRouteSelect] = useState('');
    const [route, setRoute] = useState<Route | null>(null);
    const mcps = mcpData;
    const routes = routeData;
    
    return (
      <Form.Group controlId="vehicle-select">
          <Form.Label>Select Route</Form.Label>
          <Form.Control
            as="select"
            value={routeSelect}
            onChange={(e) => {
              setRouteSelect(e.target.value);
              setRoute(routes.find(((route: Route) => route.id === Number(e.target.value))) as Route);
              localStorage.removeItem('mcps');
              selectProps.setMCPs(mcps.filter(((mcp: MCP) => route?.mcpList.includes(mcp.id))));
              if (routeSelect !== "") {
                localStorage.setItem('mcps', JSON.stringify(selectProps.mcps));
            }
            }}
          >
            <option value="">Choose...</option>
            {routes.map((route: Route) => (
              <option key={route.id} value={route.id}>
                Route {route.id}
              </option>
            ))}
          </Form.Control>
          {/* { selectProps.mcps ?
            <Form.Text id="vehicleoverview">
                <strong>Location: </strong> {selectProps.mcps.location} <br/>
                <strong>Status: </strong> {selectProps.mcp.is_available === true ? "OK" : "Busy"} <br/>
                <strong>Capacity: </strong> {selectProps.vehicle.capacity} <br/>
                <strong>Fuel: </strong> {selectProps.vehicle.fuel*100}% <br/>
            </Form.Text>
            :  ""} */}
      </Form.Group>
  );
}
export default RouteList;