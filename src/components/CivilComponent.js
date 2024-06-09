import React, { useState } from 'react';
import { Tab, Tabs, Image, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileCard from './CivilCard';
import ReviewCard from './CivilReview';
import ReviewForm from './ReviewForm';
import ShowtimeComponent from './CivilShowtime';
import civil from "../image/movies/Civil-war.jpg";
import './CivilSchedule.css';

const CivilComponent = () => {
  const [key, setKey] = useState('synopsis');
  const [show, setShow] = useState(false);
  const [reviews, setReviews] = useState([
    {
      name: 'Zyan',
      date: '21 Mei 2024',
      rating: 5,
      content: 'Ceritanya sangat baik dan menyentuh.'
    },
    {
      name: 'Rony',
      date: '17 Mei 2024',
      rating: 4,
      content: 'Aktingnya luar biasa dan jalan cerita sangat menarik.'
    },
    {
      name: 'Citra',
      date: '10 Mei 2024',
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
      <div className="row background-img mb-4">
        <div className="col-md-3 col-sm-4 col-6 mt-3">
          <Image src={civil} fluid rounded />
        </div>
        <div className="col-md-9 col-sm-8 col-12 mt-3 text-left">
          <h2>Civil War</h2>
          <p><strong>Duration:</strong> 1h 49m</p>
          <p><strong>Director:</strong> Alex Garland</p>
          <p><strong>Age range:</strong> 17+</p>
          <div className="d-flex align-items-center">
            <span role="img" aria-label="star" style={{ color: 'yellow' }}>⭐</span>
            <span role="img" aria-label="star" style={{ color: 'yellow' }}>⭐</span>
            <span role="img" aria-label="star" style={{ color: 'yellow' }}>⭐</span>
            <span role="img" aria-label="star" style={{ color: 'yellow' }}>☆</span>
            <span role="img" aria-label="star" style={{ color: 'yellow' }}>☆</span>
            <span className="ms-2">2,622,060 reviews</span>
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
                    Kepiluan Lee Smith (Kirsten Dunst) dan rekan-rekannya kala bertugas di 
                    tengah situasi porak-poranda imbas perang juga ditampilkan begitu apik dalam film ini.
                    Garland memberikan panggung bagaimana nurani dan idealisme para jurnalis ini bergejolak 
                    dengan situasi sosial dan politik dari presiden otoriter Amerika Serikat yang berkuasa selama tiga periode.
                  </p>
                  <div className="container">
                    <div className="row justify-content-center">
                      <ProfileCard
                        image="https://www.instyle.com/thmb/vlSdJSDy4P1HjArtp3Mb5q3jBfE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/instyle-cailee-spaeny-social-c12be4c634f447119358e036cb238142.jpg"
                        name="Cailee Spaeny"
                        role="Jessie"
                      />
                      <ProfileCard
                        image="https://m.media-amazon.com/images/M/MV5BYmE4MzYyYTktMjc3NS00ZjE4LTk5ZWYtMTdiZWY0ZjM5M2U5XkEyXkFqcGdeQXJoYW5uYWg@._V1_.jpg"
                        name="Kirsten Dunst"
                        role="Lee Smith"
                      />
                      <ProfileCard
                        image="https://www.washingtonpost.com/resizer/_crGj88flqvhteGFwswG87PqogU=/arc-anglerfish-washpost-prod-washpost/public/HYHSY5ASC2PWRJIY4N4CQQDRAE.jpg"
                        name="Nick Offerman"
                        role="President"
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

export default CivilComponent;
