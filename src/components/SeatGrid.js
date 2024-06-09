import React, { useState, useContext } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { PurchaseContext } from './PurchaseContext';
import Seat from './Seat';
import './SeatGrid.css';

const SeatGrid = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDate, selectedTime } = location.state || {};
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const totalSeats = 30; // Misalnya, kita punya 30 kursi
  const seatPrice = 35000; // Harga per kursi
  const { purchaseHistory, setPurchaseHistory } = useContext(PurchaseContext);

  const handleSelectSeat = (seatNumber) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatNumber)
        ? prevSelectedSeats.filter((seat) => seat !== seatNumber)
        : [...prevSelectedSeats, seatNumber]
    );
  };

  const handleBuy = () => {
    const newPurchase = {
      id: purchaseHistory.length + 1,
      item: `Seats ${selectedSeats.join(', ')}`,
      date: selectedDate,
      price: selectedSeats.length * seatPrice,
      showTime: selectedTime
    };
    setPurchaseHistory([...purchaseHistory, newPurchase]);
    setModalContent(`You have bought seats: ${selectedSeats.join(', ')} for a total of Rp.${selectedSeats.length * seatPrice}. Check your email for details.`);
    setShowModal(true);
    // Reset selected seats after purchase
    setSelectedSeats([]);
  };

  const renderSeats = () => {
    const seats = [];
    for (let i = 1; i <= totalSeats; i++) {
      seats.push(
        <Col key={i} xs={2}>
          <Seat
            seatNumber={i}
            isSelected={selectedSeats.includes(i)}
            onSelect={handleSelectSeat}
          />
        </Col>
      );
    }
    return seats;
  };

  return (
    <Container className="main-container">
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Awesome!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div className="mb-3">
              <i className="bi bi-check-circle" style={{ fontSize: '2rem', color: 'green' }}></i>
            </div>
            {modalContent}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => navigate('/signin')}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        {renderSeats()}
      </Row>
      <Row className="mt-3">
        <Col className="selected-seats">
          Selected Seats: {selectedSeats.join(', ')}
        </Col>
      </Row>
      <Row>
        <Col className="total-price">
          Total Price: Rp.{selectedSeats.length * seatPrice}
        </Col>
      </Row>
      
      <Row className="mt-3 d-flex justify-content-end">
        <Col>
          <Button
            onClick={() => navigate('/')}
            variant="danger"
            className="mr-2 buy-button"
          >
            KEMBALI
          </Button>
        </Col>
        <Col>
          <Button
            onClick={handleBuy}
            variant="primary"
            disabled={selectedSeats.length === 0}
            className="buy-button"
          >
            ORDER
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SeatGrid;
