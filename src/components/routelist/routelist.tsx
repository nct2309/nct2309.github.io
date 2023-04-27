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
          <Form.Label>Select Vehicle</Form.Label>
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
      </Form.Group>
  );
}
export default RouteList;