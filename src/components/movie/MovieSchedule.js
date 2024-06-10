import React, { useState, useEffect } from "react";
import { Tab, Tabs, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReviewForm from "../ReviewForm";
import "./MovieSchedule.css";
import { formatDate, imageBest } from "../../utils/utils"; // Import function from utils.js
import { getById } from "../../services/api";
//import hook history dan params dari react router dom
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const MovieSchedule = () => {
  // Get ID from parameter URL
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [key, setKey] = useState("synopsis");
  const [show, setShow] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [dates, setDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const moviesData = await getById(id);
        console.log(moviesData); // Debugging line to check the fetched data
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

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const addReview = (review) => {
    setReviews([...reviews, review]);
  };

  if (!movie) {
    return <div>Loading...</div>; // Handle the loading state
  }

  const calculateAverageRating = (votes) => {
    if (votes.length === 0) return 0;
    const totalRating = votes.reduce((sum, vote) => sum + vote.rating, 0);
    return totalRating / votes.length;
  };

  const renderStars = (averageRating) => {
    const fullStars = Math.floor(averageRating);
    const halfStar = averageRating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar ? "★" : ""}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  const totalReviews = movie.votes.length;
  const totalRating = movie.votes.reduce((sum, vote) => sum + vote.rating, 0);
  const jumalahRating = (totalRating / totalReviews).toFixed(1);
  const averageRating = calculateAverageRating(movie.votes);

  return (
    <div>
      <div
        className="background-image p-5"
        style={{
          backgroundImage: `url(${imageBest(movie.movie.picture_movie)})`,
        }}>
        <div className="row row-cols-1 row-cols-lg-3">
          <div className="col-lg-2 d-flex ">
            <img
              src={imageBest(movie.movie.picture_movie)}
              className="shadow object-fit-cover border rounded img-film card-movie"
              alt="Movie Poster"
            />
          </div>
          <div className="col ">
            <h2>{movie.movie.name_film}</h2>
            <table>
              <tbody>
                <tr>
                  <td>Duration</td>
                  <td> : </td>
                  <td>{movie.movie.durasi}</td>
                </tr>
                <tr>
                  <td>Director</td>
                  <td> : </td>
                  <td>{movie.movie.sutradara}</td>
                </tr>
                <tr>
                  <td>Age range</td>
                  <td> : </td>
                  <td>{movie.movie.rate_age}</td>
                </tr>
              </tbody>
            </table>

            <div className="d-flex align-items-center">
              <span role="img" aria-label="star" className="text-warning">
                {renderStars(averageRating)} ({jumalahRating})
              </span>
              <span className="ms-2">
                {totalReviews.toLocaleString()} reviews
              </span>
            </div>

            <a
              href={movie.movie.trailer}
              className="text-white text-decoration-none"
              target="_blank">
              <div className="trailer card-movie">
                <i className="bi bi-play-circle fs-3"></i> Trailer
              </div>
            </a>
            <div className="btn-buy text-white">
              <a href={"/SeatBuy/" + movie.movie.id_movie} className="buy-now">
                <div>BUY NOW</div>
              </a>
            </div>
          </div>
          <div className="col d-flex align-items-center"></div>
        </div>
      </div>
      <div className="container">
        <div className="m-5">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="justify-content-center nav-underline">
            <Tab eventKey="synopsis" title="Synopsis">
              <div className="tab-content tabs">
                <div className="tab-pane fade in active show" id="Section1">
                  <p className="deskripsi">{movie.movie.deskripsi}</p>
                  <hr></hr>
                  <div className="container">
                    <h4 className="text-start mt-5 mb-5 fw-bold">Cast</h4>
                    <div className="row row-cols-3 row-cols-lg-6">
                      {movie.actor.map((act) => (
                        <div className="col">
                          <div className="card  mb-5 card-movie">
                            <img
                              src={imageBest(act.picture)}
                              alt="Actor"
                              className="rounded-top img-cast"
                            />
                            <div className="card-footer text-center">
                              <h5>{act.name_actor}</h5>
                              <h6>{act.cast}</h6>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <hr></hr>
                    <h4 className="text-start mt-5 mb-5 fw-bold">Picture</h4>
                    <div className="row row-cols-3 row-cols-lg-4">
                      {movie.pictures.map((pic) => (
                        <div className="col">
                          <div className="card card-movie">
                            <img
                              src={imageBest(pic.picture)}
                              alt={pic.name_pictures}
                              className="picture-movie rounded"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <hr></hr>
                    <h4 className="text-start mt-5  fw-bold">Review</h4>
                    <div className="d-flex align-items-center mb-5">
                      <span
                        role="img"
                        aria-label="star"
                        className="text-warning">
                        {renderStars(averageRating)} ({jumalahRating})
                      </span>
                      <span className="ms-2">
                        {totalReviews.toLocaleString()} reviews
                      </span>
                    </div>
                    <hr></hr>
                    <div className="review text-start">
                      {movie.votes.slice(0, 5).map((v) => (
                        <div>
                          <strong>{v.username}</strong>
                          <div className="text-warning mb-3">
                            {"★".repeat(v.rating) + "☆".repeat(5 - v.rating)}
                            <span className="text-light ">
                              {"  " + formatDate(v.updated_at)}
                            </span>
                          </div>
                          <p>{v.comment}</p>
                          <hr></hr>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="review" title="Review">
              <div className="tab-content tabs">
                <div className="tab-pane fade in active show" id="Section2">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4>Review</h4>
                    <Button variant="primary" onClick={handleShow}>
                      Tambah Ulasan
                    </Button>
                  </div>
                  <div className="d-flex align-items-center">
                    <span role="img" aria-label="star" className="text-warning">
                      {renderStars(averageRating)} ({jumalahRating})
                    </span>
                    <span className="ms-2">
                      {totalReviews.toLocaleString()} reviews
                    </span>
                  </div>

                  <div className="review text-start">
                    <hr></hr>
                    {movie.votes.map((v) => (
                      <div>
                        <strong>{v.username}</strong>
                        <div className="text-warning mb-3">
                          {"★".repeat(v.rating) + "☆".repeat(5 - v.rating)}
                          <span className="text-light">
                            {"  " + formatDate(v.updated_at)}
                          </span>
                        </div>

                        <p>{v.comment}</p>
                        <hr></hr>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="showtime" title="Show Time">
              <div className="tab-content tabs">
                <div className="tab-pane fade in active show" id="Section3">
                  <div style={{ textAlign: "left", paddingTop: "5%" }}>
                    <h4>Jadwal</h4>
                    <div className="d-flex">
                      {dates.map((date) => (
                        <Button
                          key={date.day}
                          variant={
                            selectedDate === date.day
                              ? "primary"
                              : "outline-secondary"
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
                          variant={
                            selectedTime === time
                              ? "primary"
                              : "outline-secondary"
                          }
                          onClick={() => setSelectedTime(time)}
                          className="me-2">
                          {format(new Date(`2000-01-01 ${time}`), "HH:mm")}
                        </Button>
                      ))}
                    </div>
                    <div className="d-flex justify-content-start mt-4 mb-5">
                      <Button
                        variant="danger"
                        className="me-2"
                        onClick={() => navigate("/")}>
                        Kembali
                      </Button>
                      <Button
                        variant="success"
                        disabled={!selectedDate || !selectedTime}
                        onClick={() => {
                          console.log(
                            "Buying ticket for",
                            selectedDate,
                            selectedTime
                          );
                          // Implement your ticket buying logic here
                        }}>
                        Beli Tiket
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      <ReviewForm show={show} handleClose={handleClose} addReview={addReview} />
    </div>
  );
};

export default MovieSchedule;