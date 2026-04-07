import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Carousel.css';
import img1 from '../../assets/images/5.jpg';
import img2 from '../../assets/images/6.jpg';
import img3 from '../../assets/images/7.jpg';

function MiniCarousel() {
  return (
    <div className="modern-carousel-container mini-carousel">
      <Carousel
        interval={4000}
        controls={false}
        indicators={false}
        fade={true}
        pause={false}
      >
        {[img1, img2, img3].map((image, index) => (
          <Carousel.Item key={index} className="carousel-item-wrapper mini-slide">
            <div className="image-overlay"></div>
            <img
              className="d-block w-100 carousel-image"
              src={image}
              alt={`Slide ${index + 1}`}
              loading="lazy"
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default MiniCarousel;
