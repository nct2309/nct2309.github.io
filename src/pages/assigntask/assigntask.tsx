import React, { useState } from 'react';
import Map from '../../components/map/map';
import { Form, Button, Container, Row } from 'react-bootstrap';
import { User, Vehicle, MCP, Route, Task } from '../../api/types';
import { useAuthContext, AuthContextType } from '../../components/auth/context';
import { userData, vehicleData, routeData, mcpData } from '../../data/data';
import './assigntask.css';

const AssignTask: React.FC = () => {
  const [role, setRole] = useState("");
  const [worker, setWorker] = useState<User | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [mcps, setMcps] = useState<MCP[]>([]);
  const [dateTime, setDateTime] = useState('');
  const { currentUser, tasks } = useAuthContext() as AuthContextType;
  const [workerSelect, setWorkerSelect] = useState("");

    let workers = userData;
    if (role !== "") {
        workers = workers.filter((worker: User) => worker.role === role);
    } else {
        workers = [];
    }

    const [vehicleSelect, setVehicleSelect] = useState('');
    let vehicles = vehicleData;
    if (role === "collector") {
        vehicles = vehicles.filter((vehicle: Vehicle) => vehicle.type === "truck");
    } else if (role === "janitor") {
      vehicles = vehicles.filter((vehicle: Vehicle) => vehicle.type === "troller");
    } else {
        vehicles = [];
    }

    const [routeSelect, setRouteSelect] = useState('');
    const [route, setRoute] = useState<Route | null>(null);
    const mcplist = mcpData;
    const routes = routeData;

    const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (role === "" || dateTime === "" || worker === null || vehicle === null || route === null) {
      alert('There should be no empty sections!');
    }
    else {
      localStorage.removeItem('tasks');
      tasks.push({
        id: tasks.length + 1,
        from_user_id: currentUser?.id || 0,
        to_user_id: worker.id,
        vehicle_id: vehicle.id,
        route_id: route.id,
        created_at: dateTime,
        completed_at: "",
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      alert('Task Assigned!');

    }
  };
  
  // console.log(worker);
  // console.log(vehicle);
  // console.log(mcps);
  // console.log(dateTime);
  // console.log(route);

  return (
    <Container>
      <Row>
        <Form id="assigntask" onSubmit={handleSubmit}>
          <Form.Label id="header"> Assign Task </Form.Label>
          <Form.Group controlId="role-select">
            <Form.Label>Select role</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => {
                  localStorage.removeItem('role');
                  setRole(e.target.value);
                  if (role === "") {
                    setRoute(null);
                    setWorker(null);
                    setVehicle(null);
                    setMcps([]);
                    setDateTime('');
                  }
                }
              }
            >
              <option value="">Choose...</option>
              <option value="collector">Collector - Truck</option>
              <option value="janitor">Janitor - Troller</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="worker-select">
            <Form.Label>Select Worker</Form.Label>
                <Form.Control
                as="select"
                value={workerSelect}
                onChange={(e) => {
                    setWorkerSelect(e.target.value);
                    localStorage.removeItem('worker');
                    setWorker(workers.find(((worker: User) => worker.id === Number(e.target.value))) as User);
                }}
                >
                <option value="">Choose...</option>
                {workers.map((worker: User) => (
                    <option key={worker.id} value={worker.id}>
                    {worker.lastName + " " + worker.firstName}
                    </option>
                ))}
            </Form.Control>
            { worker ?
            <Form.Text id="workeroverview">
                <strong>Username: </strong> {worker.username} <br/>
                <strong>ID: </strong> {worker.id} <br/>
                <strong>Status: </strong> {worker.is_available === true ? "OK" : "Busy"} <br/>
            </Form.Text>
            : ""}
        </Form.Group>

        <Form.Group controlId="vehicle-select">
            <Form.Label>Select Vehicle</Form.Label>
            <Form.Control
              as="select"
              value={vehicleSelect}
              onChange={(e) => {
                setVehicleSelect(e.target.value)
                setVehicle(vehicles.find(((vehicle: Vehicle) => vehicle.id === Number(e.target.value))) as Vehicle);
              }}
            >
              <option value="">Choose...</option>
              {vehicles.map((vehicle: Vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)} {vehicle.id}
                </option>
              ))}
            </Form.Control>
            { vehicle ?
            <Form.Text id="vehicleoverview">
                <strong>Location: </strong> {vehicle.location} <br/>
                <strong>Status: </strong> {vehicle.is_available === true ? "OK" : "Busy"} <br/>
                <strong>Capacity: </strong> {vehicle.capacity} <br/>
                <strong>Fuel: </strong> {vehicle.fuel*100}% <br/>
            </Form.Text>
            :  ""}
        </Form.Group>

        <Form.Group controlId="vehicle-select">
          <Form.Label>Select Route</Form.Label>
          <Form.Control
            as="select"
            value={routeSelect}
            onChange={(e) => {
              setRouteSelect(e.target.value);
              setRoute(routes.find(((route: Route) => route.id === Number(e.target.value))) as Route);
              setMcps(mcplist.filter(((mcp: MCP) => route?.mcpList.includes(mcp.id))));
            }}
          >
            <option value="">Choose...</option>
            {routes.map((route: Route) => (
              <option key={route.id} value={route.id}>
                Route {route.id}
              </option>
            ))}
          </Form.Control>
          { route ?
            <Form.Text id="vehicleoverview">
                <strong>MCP(s) pass: </strong> {route.mcpList.map((id) => id + ", ")} <br/>
            </Form.Text>
            :  ""}
      </Form.Group>

          <div style={{ height: '25rem', width: '95%', margin: "1rem" }}>
            <Map mcps={mcps}/>
          </div>

          <Form.Group controlId="date-time-picker">
            <Form.Label>Select date and time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={dateTime}
              onChange={(e) => {setDateTime(e.target.value); console.log(dateTime);}}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Assign Task
          </Button>

        </Form>
      </Row>

    </Container>
  );
};

export default AssignTask;