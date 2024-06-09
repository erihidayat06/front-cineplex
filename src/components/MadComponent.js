import React, { useState } from 'react';
import { Tab, Tabs, Image, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileCard from './MadCard';
import ReviewCard from './MadReview';
import ReviewForm from './ReviewForm';
import ShowtimeComponent from './MadShowtime';
import vina from "../image/movies/furiosa-a-mad-max-saga.jpg";
import './MadComponents.css';

const MadComponent = () => {
  const [key, setKey] = useState('synopsis');
  const [show, setShow] = useState(false);
  const [reviews, setReviews] = useState([
    {
      name: 'Ryan',
      date: '2 Mei 2024',
      rating: 4,
      content: 'Ceritanya sangat baik dan menyentuh.'
    },
    {
      name: 'Diah',
      date: '10 Mei 2024',
      rating: 4,
      content: 'Aktingnya luar biasa dan jalan cerita sangat menarik.'
    },
    {
      name: 'Lion',
      date: '11 Mei 2024',
      rating: 3,
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
      <div className="row background-img mb-4">
        <div className="col-md-3 col-sm-4 col-6 mt-3">
          <Image src={vina} fluid rounded />
        </div>
        <div className="col-md-9 col-sm-8 col-12 mt-3 text-left">
          <h2>Furiosa: A Mad Max Saga</h2>
          <p><strong>Duration:</strong> 2h 28m</p>
          <p><strong>Director:</strong> George Miller</p>
          <p><strong>Age range:</strong> 17+</p>
          <div className="d-flex align-items-center">
            <span role="img" aria-label="star" style={{ color: 'yellow' }}>⭐</span>
            <span role="img" aria-label="star" style={{ color: 'yellow' }}>⭐</span>
            <span role="img" aria-label="star" style={{ color: 'yellow' }}>⭐</span>
            <span role="img" aria-label="star" style={{ color: 'yellow' }}>⭐</span>
            <span role="img" aria-label="star" style={{ color: 'yellow' }}>☆</span>
            <span className="ms-2">3,512,100 reviews</span>
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
                    Saat dunia runtuh, Furiosa muda direnggut dari Green Place of Many 
                    Mothers dan jatuh ke tangan Biker Horde besar yang dipimpin oleh Warlord Dementus. 
                    Menyusuri Wasteland, mereka menemukan Citadel yang dipimpin oleh The Immortan Joe. 
                    Saat kedua Tiran saling berebut dominasi, Furiosa harus bertahan dari banyak cobaan 
                    saat dia menyusun cara untuk menemukan jalan pulang.
                  </p>
                  <div className="container">
                    <div className="row justify-content-center">
                      <ProfileCard
                        image="https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2022/11/20/chris-hemsworth-getty-696x442jp-20221120043126.jpg"
                        name="Chris Hemsworth"
                        role="Dr. Dementus"
                      />
                      <ProfileCard
                        image="https://media.cnn.com/api/v1/images/stellar/prod/221117101638-anya-taylor-joy-0405-restricted.jpg?c=original"
                        name="Anya Taylor-Joy"
                        role="Imperator Furiosa"
                      />
                      <ProfileCard
                        image="https://m.media-amazon.com/images/M/MV5BNGUyMjNmNjAtOTQ4My00ZjIwLWIwMDctODc4YTYzZGZlODc5XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg"
                        name="Nathan Jones"
                        role="Rictus Erectus"
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

export default MadComponent;
