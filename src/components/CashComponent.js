import React, { useState } from 'react';
import { Tab, Tabs, Image, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileCard from './CashCard';
import ReviewCard from './CashReview';
import ReviewForm from './ReviewForm';
import ShowtimeComponent from './CashShowtime';
import cash from "../image/movies/cash-out.jpg";
import './CashSchedule.css';

const CastComponent = () => {
  const [key, setKey] = useState('synopsis');
  const [show, setShow] = useState(false);
  const [reviews, setReviews] = useState([
    {
      name: 'Toni',
      date: '11 Mei 2024',
      rating: 4,
      content: 'Ceritanya sangat baik dan menyentuh.'
    },
    {
      name: 'Putri',
      date: '12 Mei 2024',
      rating: 3,
      content: 'Aktingnya luar biasa dan jalan cerita sangat menarik.'
    },
    {
      name: 'Brian',
      date: '19 Mei 2024',
      rating: 4,
      content: 'Ceritanya cukup menarik, tetapi ada beberapa bagian yang membingungkan.'
    }
  ]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const addReview = (review) => {
    setReviews([...reviews, review]);
  };

  return (
    <div className="container">
      <div className="row background-img">
        <div className="col-md-3 col-sm-4 col-6 mt-3">
          <Image src={cash} fluid rounded />
        </div>
        <div className="col-md-9 col-sm-8 col-12 mt-3 text-left">
          <h2>Cash Out</h2>
          <p><strong>Duration:</strong> 1h 32m</p>
          <p><strong>Director:</strong> Randall Emmett</p>
          <p><strong>Age range:</strong> 17+</p>
          <div className="d-flex align-items-center">
            <span role="img" aria-label="star" style={{ color: 'yellow' }}>⭐</span>
            <span role="img" aria-label="star" style={{ color: 'yellow' }}>⭐</span>
            <span role="img" aria-label="star" style={{ color: 'yellow' }}>⭐</span>
            <span role="img" aria-label="star" style={{ color: 'yellow' }}>☆</span>
            <span role="img" aria-label="star" style={{ color: 'yellow' }}>☆</span>
            <span className="ms-2">2,788,160 reviews</span>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-12">
          <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="justify-content-center">
            <Tab eventKey="synopsis" title="Synopsis">
              <div className="tab-content tabs">
                <div className="tab-pane fade show active" id="Section1">
                  <h4>Synopsis</h4>
                  <p>
                    Menceritakan tentang seorang pensiunan pencuri, 
                    Mason Goddard (John Travolta) yang terpaksa kembali kepada pekerjaan lamanya untuk membantu 
                    menyempurnakan rencana adiknya, Shawn Goddard (Lukas Haas) yang berniat mencuri sebuah akun saham di sebuah 
                    bank milik salah satu orang paling berpengaruh di dunia.
                  </p>
                  <div className="container">
                    <div className="row justify-content-center">
                      <ProfileCard
                        image="https://m.media-amazon.com/images/M/MV5BMTMyMjZlYzgtZWRjMC00OTRmLTllZTktMmM1ODVmNjljMTQyXkEyXkFqcGdeQXVyMTExNzQ3MzAw._V1_.jpg"
                        name="John Travolta"
                        role="Mason Goddard"
                      />
                      <ProfileCard
                        image="https://m.media-amazon.com/images/M/MV5BYjFhM2JlMzMtODZlNi00ZGUyLWIwOWYtYWRkMjIyMGQ2ZDYxXkEyXkFqcGdeQXVyNjcwMjgzNDY@._V1_.jpg"
                        name="Natali Yura"
                        role="Link"
                      />
                      <ProfileCard
                        image="https://media.themoviedb.org/t/p/w500/6LNGu3o2aBiYNTDkbXMDIGyQtBh.jpg"
                        name="Lukas Haas"
                        role="Shawn Goddard"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="review" title="Review">
              <div className="tab-content tabs">
                <div className="tab-pane fade show active" id="Section2">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4>Review</h4>
                    <Button variant="primary" onClick={handleShow}>Tambah Ulasan</Button>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    {reviews.map((review, index) => (
                      <ReviewCard
                        key={index}
                        name={review.name}
                        date={review.date}
                        rating={review.rating}
                        content={review.content}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="showtime" title="Show Time">
              <div className="tab-content tabs">
                <div className="tab-pane fade show active" id="Section3">
                  <ShowtimeComponent />
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

export default CastComponent;
