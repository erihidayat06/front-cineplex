import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Table } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Seat from "./Seat";
import "./SeatGrid.css";
import { getById } from "../services/api";
import { format } from "date-fns";
import axios from "axios";

const SeatGrid = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [dates, setDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const totalRows = 11; // Rows A to K (11 rows)
  const totalCols = 14; // 14 seats per row
  const seatPrice = 35000; // Harga per kursi

  const handleSelectSeat = (seatNumber) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatNumber)
        ? prevSelectedSeats.filter((seat) => seat !== seatNumber)
        : [...prevSelectedSeats, seatNumber]
    );
  };

  const generateRandomNumber = () => {
    const timestamp = Date.now().toString(36); // Convert timestamp to base36 for shorter representation
    const randomPart = Math.random().toString(36).substring(2, 10); // Generate a random string in base36
    return timestamp + randomPart; // Concatenate both parts
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        const moviesData = await getById(id);
        setMovie(moviesData);

        const uniqueDates = [];
        const dateMap = new Map();

        moviesData.times.forEach((time) => {
          const date = new Date(time.dated);
          const day = format(date, "dd");
          const name = format(date, "EEEE");

          if (!dateMap.has(day)) {
            dateMap.set(day, { day, name });
            uniqueDates.push({ day, name });
          }
        });

        setDates(uniqueDates);

        // Set the first date as selectedDate
        if (uniqueDates.length > 0) {
          setSelectedDate(uniqueDates[0].day);
        }
      } catch (error) {
        console.error("Failed to fetch movie data:", error);
      }
    };

    getMovies();
  }, [id]);

  useEffect(() => {
    if (selectedDate && movie) {
      const timesForDate = movie.times
        .filter((time) => format(new Date(time.dated), "dd") === selectedDate)
        .map((time) => time.hour);
      setAvailableTimes(timesForDate);
    }
  }, [selectedDate, movie]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", "SB-Mid-client-iy3vKhUBYwh86HO1");
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleOrder = async () => {
    const random12DigitNumber = generateRandomNumber();
    const totalPrice = selectedSeats.length * seatPrice;
    const selectedTimeObject = movie.times.find(
      (time) => time.hour === selectedTime
    ); // Temukan objek waktu yang sesuai
    const id_time = selectedTimeObject ? selectedTimeObject.id_time : null; // Ambil id_time atau null jika tidak ditemukan

    const orderData = {
      order_id: random12DigitNumber,
      date: selectedDate,
      time: selectedTime,
      seats: selectedSeats,
      totalPrice: totalPrice,
      movie_title: movie.movie.name_film,
      movie_id: movie.movie.id_movie,
      movie_price: totalPrice,
      movie_categori: movie.movie.name_genre,
      id_time: id_time, // Gunakan id_time yang telah ditemukan atau null
      id_movie: movie.movie.id_movie,
      id_user: "1",
      name: "Eri Hidayat", // Dummy first name
      email: "johndoe@gmail.com", // Dummy email
      phone: "08123456789", // Dummy phone
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/transaction",
        orderData
      );
      const { transactionToken } = response.data;

      // Log the transaction token to verify it
      console.log("Received transaction token:", transactionToken);

      // Trigger Midtrans popup
      window.snap.pay(transactionToken, {
        onSuccess: async function (result) {
          console.log("Payment success:", result);
          setModalContent(
            `Payment successful! Transaction ID: ${result.transaction_id}`
          );
          setShowModal(true);
          // Setelah pembayaran berhasil, kirim permintaan untuk mengubah status pesanan menjadi "SUCCESS"
          try {
            await axios.put("http://localhost:5000/api/transaction/update", {
              order_id: orderData.order_id,
              status: "SUCCES",
            });
            console.log("Order status updated to SUCCESS");
          } catch (error) {
            console.error("Failed to update order status:", error);
          }
        },
        onPending: function (result) {
          console.log("Payment pending:", result);
          setModalContent(
            `Payment pending. Transaction ID: ${result.transaction_id}`
          );
          setShowModal(true);
        },
        onError: function (result) {
          console.error("Payment error:", result);
          setModalContent(`Payment failed: ${result.status_message}`);
          setShowModal(true);
        },
        onClose: function () {
          console.log("Payment popup closed without finishing payment");
        },
      });
    } catch (error) {
      console.error("Failed to create transaction:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      setModalContent("Failed to create transaction. Please try again.");
      setShowModal(true);
    }
  };

  if (!movie) {
    return <div>Loading...</div>; // Handle the loading state
  }

  const renderSeats = () => {
    const rowLabels = "ABCDEFGHIJK";
    return (
      <Table className="seat-table">
        <tbody>
          {Array.from({ length: totalRows }).map((_, rowIndex) => {
            const rowLabel = rowLabels[rowIndex];
            return (
              <tr key={rowIndex}>
                {Array.from({ length: totalCols }).map((_, colIndex) => {
                  if (colIndex === 9) {
                    return (
                      <>
                        <td key={`gap-${rowIndex}-1`} className="empty"></td>
                        <td key={`gap-${rowIndex}-2`} className="empty"></td>
                        <td key={`gap-${rowIndex}-3`} className="empty"></td>
                        <td key={`${rowLabel}${colIndex + 1}`}>
                          <Seat
                            seatNumber={`${rowLabel}${colIndex + 1}`}
                            isSelected={selectedSeats.includes(
                              `${rowLabel}${colIndex + 1}`
                            )}
                            onSelect={handleSelectSeat}
                          />
                        </td>
                      </>
                    );
                  }
                  return (
                    <td key={`${rowLabel}${colIndex + 1}`}>
                      <Seat
                        seatNumber={`${rowLabel}${colIndex + 1}`}
                        isSelected={selectedSeats.includes(
                          `${rowLabel}${colIndex + 1}`
                        )}
                        onSelect={handleSelectSeat}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  return (
    <Container className="mt-5">
      <h4 style={{ marginTop: "100px" }}>Jadwal</h4>
      <div className="d-flex">
        {dates.map((date) => (
          <Button
            key={date.day}
            variant={
              selectedDate === date.day ? "primary" : "outline-secondary"
            }
            onClick={() => setSelectedDate(date.day)}
            className="me-2">
            {date.day} <br /> {date.name}
          </Button>
        ))}
      </div>
      <h4 className="mt-4">Jam Tayang</h4>
      <div className="d-flex">
        {availableTimes.map((time) => (
          <Button
            key={time}
            variant={selectedTime === time ? "primary" : "outline-secondary"}
            onClick={() => setSelectedTime(time)}
            className="me-2">
            {format(new Date(`2000-01-01 ${time}`), "HH:mm")}
          </Button>
        ))}
      </div>
      <hr></hr>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div className="mb-3">
              <i
                className="bi bi-check-circle"
                style={{ fontSize: "2rem", color: "green" }}></i>
            </div>
            {modalContent}
          </div>
        </Modal.Body>
      </Modal>
      {renderSeats()}
      <div className="mt-3">
        <div className="selected-seats">
          Selected Seats: {selectedSeats.join(", ")}
        </div>
        <div className="total-price">
          Total Price: Rp.{selectedSeats.length * seatPrice}
        </div>
      </div>
      <div className="mt-3 d-flex justify-content-end">
        <Button
          onClick={() => navigate("/")}
          variant="danger"
          className="mr-2 buy-button">
          KEMBALI
        </Button>
        <Button
          onClick={handleOrder}
          variant="primary"
          disabled={selectedSeats.length === 0}
          className="buy-button">
          ORDER
        </Button>
      </div>
    </Container>
  );
};

export default SeatGrid;
