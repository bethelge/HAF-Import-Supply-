import React, { useState, useEffect } from "react";
import "./Carousel.css";
import bg1 from "../../assets/images/bgg.jpg";
import bg2 from "../../assets/images/2.jpg";

const CustomCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [textColor, setTextColor] = useState("#6CE489"); // Start with green

  const fullText =
    "Exclusive Distributor To Lifestraw Products In Ethiopia, Djibouti & Somaliland";

  const slides = [
    { image: bg1, alt: "Shipping containers" },
    { image: bg2, alt: "Cargo ship" },
  ];

    useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Typewriter effect with color change
  useEffect(() => {
    const handleType = () => {
      const currentText = fullText;

      setText(
        isDeleting
          ? currentText.substring(0, text.length - 1)
          : currentText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      // Change color with each character
      if (!isDeleting) {
        setTextColor(text.length % 2 === 0 ? "#6CE489" : "#22d3ee");
      } else {
        setTextColor(text.length % 2 === 0 ? "#22d3ee" : "#6CE489");
      }

      if (!isDeleting && text === currentText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, fullText]);

  return (
    <div className="carousel-container">
      <div className="carousel-background">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`background-slide ${
              index === currentSlide ? "active" : ""
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
            aria-hidden={index !== currentSlide}
          />
        ))}
      </div>

      <div className="carousel-content">
        <div className="carousel-title">
          <span>HAF</span>
          <span>IMPORT</span>
          <span className="ampersand">&</span>
          <span>SUPPLY TRADE</span>
        </div>
        <div className="carousel-heading" style={{ color: textColor }}>
          {text}
          <span className="typewriter-cursor">|</span>
        </div>
      </div>
    </div>
  );
};

export default CustomCarousel;
