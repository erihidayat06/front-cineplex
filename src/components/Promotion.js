import React from "react";
import { Card } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import diskon50 from "../image/promo/diskon-50.png";
import buy1get1 from "../image/promo/buy-1-get-1.png";
import movie from "../image/promo/movie.png";
import diskon30 from "../image/promo/diskon-30.png";
import bca from "../image/promo/bca.jpeg";
import promocola from "../image/promo/promocola.jpeg";
import ticket from "../image/icon/ticket.jpg";
import snack from "../image/icon/snack.jpg";
import "./Promotion.css";

const Promotion = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const promotions = [
    { img: diskon50, title: "Diskon 50% Untuk Member Baru", link: "#diskon50" },
    { img: buy1get1, title: "Promo Beli 1\nGratis 1", link: "#buy1get1" },
    { img: movie, title: "Movie Treats Hanya 99K", link: "#movie" },
    { img: diskon30, title: "Promo Spesial 30%", link: "#diskon30" },
    { img: bca, title: "Voucher Nonton\nRp. 100 Ribu", link: "#bca" },
    { img: promocola, title: "PROMO WITH\nCOCA COLA", link: "#promocola" },
  ];

  return (
    <div id="promotion" className="promotion">
      <div className="promotion-heading">
        <h1>
          <b>Promotion</b>
        </h1>
        <div className="promotion-icon">
          <h1>
            <b>All</b>
          </h1>
          <img src={ticket} alt="Ticket Icon" />
          <img src={snack} alt="Snack Icon" />
        </div>
      </div>
      <div className="container">
        <Slider {...settings}>
          {promotions.map((promo, index) => (
            <div key={index}>
              <a href={promo.link} className="promotion-link">
                <Card className="promotion-card m-2 shadow">
                  <Card.Img
                    variant="top"
                    src={promo.img}
                    alt={promo.title}
                    className="foto-promo"
                  />
                  <Card.Body>
                    {promo.title.split("\n").map((line, idx) => (
                      <h3 key={idx}>{line}</h3>
                    ))}
                  </Card.Body>
                </Card>
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Promotion;
