import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const ProfileUpdate = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ firstName, lastName, mobileNo })
      });

      if (!response.ok) {
        throw new Error('Profile update failed');
      }

      setSuccess('Profile updated successfully!');
      setError(null); // Clear previous errors
    } catch (error) {
      setError(error.message);
      setSuccess(null); // Clear previous success messages
    }
  };

  return (
    <Container>
      <h2>Update Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName" className="my-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formLastName" className="my-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formMobileNo" className="my-3">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter your mobile number"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            required
          />
        </Form.Group>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <Button variant="danger" type="submit" className="mb-3">
          Update Profile
        </Button>
      </Form>
    </Container>
  );
};

export default ProfileUpdate;
