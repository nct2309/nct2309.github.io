import React, { useState } from 'react';
import { Container, Row, Form, Table } from 'react-bootstrap';
import "./taskprogress.css"
import { activityData, tasksData } from '../../data/data';
import { useAuthContext, AuthContextType } from '../../components/auth/context';
//export const items = tasksData;

const TaskProgress = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform search here
  };
  const { tasks } = useAuthContext() as AuthContextType;
  const items = tasks;

  const filteredItems = items.filter((item) => {
    if (searchTerm === '') {
      return true;
    }
    else return item.id === Number(searchTerm);
  });

  
  return (
    <Container id="listing">
      <Row>
        <Form onSubmit={handleFormSubmit}>
          <Form.Control
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form>
      </Row>
      <div style={{ overflowX: 'visible' }}>
        <Row>
          <div style={{ overflow: 'auto', height: '33rem' }}>
            <Table striped bordered hover>
              <thead style={{ backgroundColor: '#f8f9fa', position: 'sticky', top: 0 }}>
                <tr>
                  <th>ID</th>
                  <th>Back officer ID</th>
                  <th>Worker ID</th>
                  <th>Vehicle ID</th>
                  <th>Route ID</th>
                  <th>Create at</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.from_user_id}</td>
                    <td>{item.to_user_id}</td>
                    <td>{item.vehicle_id}</td>
                    <td>{item.route_id}</td>
                    <td>{item.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Row>
      </div>
    </Container>
  );
};

export default TaskProgress;
