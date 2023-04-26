import React, { useState } from 'react';
import Map from '../../components/map/map';
import { Form, Button, Container, Row } from 'react-bootstrap';
import WorkerList from '../../components/workerlist/workerlist';
import VehicleList from '../../components/vehiclelist/vehiclelist';
import RouteList from '../../components/routelist/routelist';
import { Worker, Vehicle } from '../../data/types';
import './assigntask.css';

const AssignTask: React.FC = () => {
  const [role, setRole] = useState("");
  const [worker, setWorker] = useState<Worker | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [mcps, setMcps] = useState<[number, number][]>([]);
  
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

          <WorkerList role = {role} setWorker={setWorker}/>

          <VehicleList role = {role} setVehicle={setVehicle}/>
          
          <RouteList />

          <Button variant="primary" type="submit">
            Assign Task
          </Button>

        </Form>
      </Row>

      <Row>
        <div style={{ height: '25rem', width: '100%' }}>
          <Map/>
        </div>
      </Row>
    </Container>
  );
};

export default AssignTask;