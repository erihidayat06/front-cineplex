import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ShowtimeComponent = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const dates = [
    { day: '26', name: 'Sun' },
    { day: '27', name: 'Mon' }
  ];

  const times = ['10:30', '12:50', '15:00'];

  const handleBuyTicket = () => {
    if (selectedDate && selectedTime) {
      navigate('/SeatBuy', { state: { selectedDate, selectedTime } });
    }
  };

  return (
    <div style={{ textAlign: 'left', paddingTop: '5%' }}>
      <h4>Jadwal</h4>
      <div className="d-flex">
        {dates.map((date) => (
          <Button
            key={date.day}
            variant={selectedDate === date.day ? 'primary' : 'outline-secondary'}
            onClick={() => setSelectedDate(date.day)}
            className="me-2"
          >
            {date.day} <br /> {date.name}
          </Button>
        ))}
      </div>
      <h4 className="mt-4">Jam Tayang</h4>
      <div className="d-flex">
        {times.map((time) => (
          <Button
            key={time}
            variant={selectedTime === time ? 'primary' : 'outline-secondary'}
            onClick={() => setSelectedTime(time)}
            className="me-2"
          >
            {time}
          </Button>
        ))}
      </div>
      <div className="d-flex justify-content-start mt-4 mb-5">
        <Button variant="danger" className="me-2" onClick={() => navigate('/')}>Kembali</Button>
        <Button variant="success" disabled={!selectedDate || !selectedTime} onClick={handleBuyTicket}>
          Beli Tiket
        </Button>
      </div>
    </div>
  );
};

export default ShowtimeComponent;
