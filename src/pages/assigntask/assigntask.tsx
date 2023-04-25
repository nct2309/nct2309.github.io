import React, { useState } from 'react';
import Map from '../../components/map/map';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const center: [number, number] = [10.7731603, 106.6595802];
const zoom = 18;

interface SelectOption {
  value: string;
  label: string;
}

const workers: SelectOption[] = [
  { value: 'worker1', label: 'Worker 1' },
  { value: 'worker2', label: 'Worker 2' },
];

const vehicles: SelectOption[] = [
  { value: 'vehicle1', label: 'Vehicle 1' },
  { value: 'vehicle2', label: 'Vehicle 2' },
];

const routes: SelectOption[] = [
  { value: 'route1', label: 'Route 1' },
  { value: 'route2', label: 'Route 2' },
];

const AssignTask: React.FC = () => {
  const [worker, setWorker] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [route, setRoute] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ worker, vehicle, route });
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="worker-select">
              <Form.Label>Select Worker</Form.Label>
              <Form.Control
                as="select"
                value={worker}
                onChange={(e) => setWorker(e.target.value)}
              >
                <option value="">Choose...</option>
                {workers.map((worker) => (
                  <option key={worker.value} value={worker.value}>
                    {worker.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

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

            <Button variant="primary" type="submit">
              Assign Task
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <div style={{ height: '15rem', width: '55rem' }}>
          <Map center={center} zoom={zoom} />
        </div>
      </Row>
    </Container>
  );
};

export default AssignTask;