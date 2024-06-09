import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { MdAccessTime } from 'react-icons/md';
import './ContactUs.css';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika untuk mengirim formulir
  };

  return (
    <section className='contact' id="contact">
    <Container className="contact-us-container mt-5">
      <Row className="text-center">
        <Col>
          <h1 className="contact-us-header">Contact Us</h1>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3 style={{ paddingRight: '50%' }}>Social Media</h3>
          <div className="social-media-icons" style={{ paddingRight: '50%' }}>
            <div className="d-block mb-3">
              <FaFacebook size={32} /> Cineplexplus
            </div>
            <div className="d-block">
              <FaInstagram size={32} /> Cineplexplus
            </div>
          </div>
          <br />
          <h3 style={{ paddingRight: '60%' }}>Open:</h3>
          <div className="open-hours" style={{ paddingLeft: '14%' }}>
            <p><MdAccessTime size={24} /> Setiap hari, pukul :<b> 09.00 - 11.00 WIB.</b></p>
          </div>
        </Col>
        <Col>
          <h2>Send us a message</h2>
          <Form onSubmit={handleSubmit} className="contact-form">
            <Form.Group controlId="formName" className="mb-3">
              <Form.Control type="text" placeholder="Enter your name" required />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group controlId="formMessage" className="mb-3">
              <Form.Control as="textarea" rows={3} placeholder="Enter your message" required />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </section>
  );
};

export default ContactUs;
