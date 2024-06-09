import React, { useState } from 'react';
import { Tab, Tabs, Image, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileCard from './ProfileCard';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import './MovieSchedule.css';
import ShowtimeComponent from './ShowtimeComponent';
import vina from "../image/movies/Vina.jpg";

const MovieSchedule = () => {
  const [key, setKey] = useState('synopsis');
  const [show, setShow] = useState(false);
  const [reviews, setReviews] = useState([
    {
      name: 'Soni',
      date: '27 Mei 2024',
      rating: 3,
      content: 'Ceritanya sangat baik dan menyentuh.'
    },
    {
      name: 'Rendy',
      date: '27 Mei 2024',
      rating: 4,
      content: 'Aktingnya luar biasa dan jalan cerita sangat menarik.'
    },
    {
      name: 'Sinta',
      date: '27 Mei 2024',
      rating: 2,
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
      <div className="row background-image mb-4">
        <div className="col-md-3 col-sm-4 col-6" style={{ marginTop: '45px' }}>
          <Image src={vina} fluid rounded />
        </div>
        <div className="col-md-9 col-sm-8 col-12" style={{ textAlign: 'left' }}>
          <h2>Vina: Sebelum 7 Hari</h2>
          <p><strong>Duration:</strong> 2h 28m</p>
          <p><strong>Director:</strong> Anggy Umbara</p>
          <p><strong>Age range:</strong> 17+</p>
          <div className="d-flex align-items-center">
            <span role="img" aria-label="star" style={{ color: 'yellow' }}>⭐</span>
            <span role="img" aria-label="star" style={{ color: 'yellow' }}>☆</span>
            <span role="img" aria-label="star" style={{ color: 'yellow' }}>☆</span>
            <span role="img" aria-label="star" style={{ color: 'yellow' }}>☆</span>
            <span role="img" aria-label="star" style={{ color: 'yellow' }}>☆</span>
            <span className="ms-2">1,012,000 reviews</span>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-12">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="justify-content-center"
          >
            <Tab eventKey="synopsis" title="Synopsis">
              <div className="tab-content tabs">
                <div className="tab-pane fade in active show" id="Section1">
                  <h4>Synopsis</h4>
                  <p>
                    Jenazah Almarhumah Vina (Nayla Purnama) yang ditemukan di flyover Cirebon 
                    dianggap mengalami kecelakaan motor tunggal. Nenek Vina (Lydia Kandou) 
                    curiga karena tubuh Vina remuk tak wajar namun tak punya cukup bukti 
                    untuk menolak berita acara. Vina merasuki tubuh sahabatnya Linda 
                    (Gisellma Firmansyah), ia hanya punya waktu sebelum 7 hari usai 
                    kematiannya untuk mengungkap kebenaran yang menyakitkan. Alfatihah.
                  </p>
                  <div className="container">
                    <div className="row justify-content-center">
                      <ProfileCard
                        image="https://cms.disway.id/uploads/35c97dd2e8dec85ed606eae88cdb1bb5.jpeg"
                        name="Nayla Purnama"
                        role="Vina"
                      />
                      <ProfileCard
                        image="https://cloud.jpnn.com/photo/arsip/normal/2021/11/09/lydia-kandou-foto-instagramlydiakandou-bvorb-kina.jpg"
                        name="Lydia Kandou"
                        role="Nenek Vina"
                      />
                      <ProfileCard
                        image="https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/04/23/PhotoGrid_Plus_1682097347231-1327645096.jpg"
                        name="Gisellma Firmansyah"
                        role="Linda"
                      />
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
                <div className="tab-pane fade in active show" id="Section3">
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

export default MovieSchedule;
