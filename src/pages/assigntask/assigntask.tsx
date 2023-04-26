import React, { useState } from 'react';
import Map from '../../components/map/map';
import { Form, Button, Container, Row } from 'react-bootstrap';
import WorkerList from '../../components/workerlist/workerlist';
import VehicleList from '../../components/vehiclelist/vehiclelist';
import RouteList from '../../components/routelist/routelist';
import { User, Worker, Vehicle } from '../../api/types';
import './assigntask.css';

const AssignTask: React.FC = () => {
  const [role, setRole] = useState("");
  const [worker, setWorker] = useState<User | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [mcps, setMcps] = useState<[number, number][]>([]);
  const [dateTime, setDateTime] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

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
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Choose...</option>
              <option value="collector">Collector - Truck</option>
              <option value="janitor">Janitor - Troller</option>
            </Form.Control>
          </Form.Group>

          <WorkerList role={role} setWorker={setWorker} />

          <VehicleList role={role} setVehicle={setVehicle} />

          <RouteList role={role} setMCPs={setMcps} />

          <div style={{ height: '25rem', width: '95%', margin: "1rem" }}>
            <Map />
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