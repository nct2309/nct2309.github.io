import React, { useState } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { useAuthContext, AuthContextType } from '../../components/auth/context';
import "./profile.css"

const UserProfile: React.FC = () => {
  const { currentUser } = useAuthContext() as AuthContextType;

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
      <Form id = "userprofile">
        <Form.Label id="header">User Profile</Form.Label>
        <Form.Group as={Row} className="mb-3" controlId="readOnly">
          <Form.Label column>
            ID:
          </Form.Label>
          <Col xxl="auto">
            <Form.Control plaintext readOnly defaultValue= {currentUser?.id}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="readOnly">
          <Form.Label column>
            Name:
          </Form.Label>
          <Col xxl="auto">
            <Form.Control plaintext readOnly defaultValue= {currentUser?.lastName + " " + currentUser?.firstName}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="readOnly">
          <Form.Label column>
            Role:
          </Form.Label>
          <Col xxl="auto">
            <Form.Control plaintext readOnly defaultValue= {currentUser?.role}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="readOnly">
          <Form.Label column>
            Password:
          </Form.Label>
          <Col xxl="auto">
            <Form.Control type="password" plaintext readOnly defaultValue = {currentUser?.password} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column>
            Password:
          </Form.Label>
          <Col xxl="auto">
            <Form.Control type="password" placeholder="Password" />
          </Col>
        </Form.Group>
      </Form>
  );
};

export default UserProfile;