import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ReviewForm = ({ show, handleClose, addReview }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview({ name, date, rating, content });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Tambah Ulasan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label>Tanggal</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formContent">
            <Form.Label>Ulasan</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Tambah
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewForm;
