import React, { useState } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useAuthContext, AuthContextType } from '../../components/auth/context';
import "./profile.css"

const UserProfile: React.FC = () => {
  const { currentUser } = useAuthContext() as AuthContextType;
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordAgain, setNewPasswordAgain] = useState<string>("");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }
  const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  }
  const handleNewPasswordAgainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPasswordAgain(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== currentUser?.password) {
      alert('Wrong password!');
    }
    else if (newPassword !== newPasswordAgain) {
      alert('Password does not match!');
    }
    else if (newPassword === "" || newPasswordAgain === "") {
      alert('Password cannot be empty!');
    }
    else { 
      currentUser.password = newPassword;
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      alert('Password Changed!');
    }
  };
  
  return (
    <>
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
      </Form>


      <Form id="changepassword" onSubmit={handleSubmit}>
      <Form.Label id="header">Change Password</Form.Label>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column>
            Old password:
          </Form.Label>
          <Col xxl="auto">
            <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column>
            New password:
          </Form.Label>
          <Col xxl="auto">
            <Form.Control type="password" placeholder="Password" value={newPassword} onChange={handleNewPasswordChange}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column>
            New password again:
          </Form.Label>
          <Col xxl="auto">
            <Form.Control type="password" placeholder="Password" value={newPasswordAgain} onChange={handleNewPasswordAgainChange}/>
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          Change Password
        </Button>
      </Form>
    </>
  );
};

export default UserProfile;