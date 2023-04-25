import React, { useState } from 'react';
import Map from '../../components/map/map';
import { Form, Button, Container, Row } from 'react-bootstrap';
import WorkerList from '../../components/workerlist/workerlist';
import VehicleList from '../../components/vehiclelist/vehiclelist';
import RouteList from '../../components/routelist/routelist';


const AssignTask: React.FC = () => {
  const [role, setRole] = useState('');
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <Container>
      <Row>
        <Form onSubmit={handleSubmit}>

        <Form.Group controlId="role-select">
            <Form.Label>Select role</Form.Label>
                <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                >
                <option value="">Choose...</option>
                <option value="collector">Collector</option>
                <option value="janitor">Janitor</option>
            </Form.Control>
        </Form.Group>
        
          <WorkerList />

          <VehicleList />
          
          <RouteList />

          <Button variant="primary" type="submit">
            Assign Task
          </Button>

        </Form>
      </Row>

      <Row>
        <div style={{ height: '20rem', width: '100%' }}>
          <Map/>
        </div>
      </Row>
    </Container>
  );
};

export default AssignTask;