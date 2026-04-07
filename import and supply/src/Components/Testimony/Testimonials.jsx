import React, { useState, useEffect } from "react";
import "./testimonal.css";
import logo1 from "../../assets/images/partnerWithUs/GIZ.jpg";
import logo2 from "../../assets/images/partnerWithUs/samera.jpg";
import logo3 from "../../assets/images/partnerWithUs/Addis.png";
import logo4 from "../../assets/images/partnerWithUs/Ministry.png";
import logo5 from "../../assets/images/partnerWithUs/SNV.jpg";
import logo6 from "../../assets/images/partnerWithUs/waterMinster.jpeg";

const TestimonialsPage = () => {
  // Updated testimonials data structure with multiple quotes for specific companies
  const testimonials = [
    {
      id: 1,
      name: "GIZ Ethiopia",
      role: "International Development Partner",
      quote:
        "We hereby confirm that HAF Import and supply Trade has won order from us and delivered as per the requirement and in timely manner ",
      rating: 5,
      logo: logo1,
    },
    {
      id: 2,
      name: "Samera Industries",
      role: "Agricultural Solutions Provider",
      quotes: [
        "We wholeheartedly recommend HAF Import and Supply Trade for any organization in need of high-quality cocopeat and seedling trays. Their commitment to quality and customer satisfaction is evident",
        "HAF's consistent delivery of premium agricultural inputs has significantly improved our production quality and yield.",
        "Their customer support team is always responsive and helpful, making them a reliable partner for our business needs.",
      ],
      rating: 5,
      logo: logo2,
      hasCarousel: true,
    },
    {
      id: 3,
      name: "Addis Ababa Science and Technology University",
      role: "Research Institution",
      quote:
        "The University is satisfies by the quality of the product supplied and we then the moment of the HAF Import and Supply Trade for their commitment.",
      rating: 5,
      logo: logo3,
    },
    {
      id: 4,
      name: "Ministry of Peace",
      role: "Government Agency",
      quote:
        "We extremely satisfied with the service provided by HAF Import and Supply Trade would confidently recommend your company for future projects. Thank you for your dedication and the excellent work you have accomplished.",
      rating: 5,
      logo: logo4,
    },
    {
      id: 5,
      name: "SNV Netherlands",
      role: "Development Organization",
      quotes: [
        "We Happily recommend HAF Import and Supply Trade for anyone looking to invest in reliable packing machinery. Their onion seed packing machine has not only enhanced our packing operations but has also contributed significantly to our overall productivity.",
        "They have delivered to us with our expectation we are very happy to recommended their services    ",
      ],
      rating: 5,
      logo: logo5,
      hasCarousel: true,
    },
    {
      id: 6,
      name: "Ministry of Water and Energy",
      role: "Government Agency",
      quote:
        " 	We highly recommend HAF Import and Supply Trade for any organization seeking reliable laboratory furniture and outstanding service. Their commitment to quality and customer satisfaction is commendable. ",
      rating: 5,
      logo: logo6,
    },
  ];

  // State to track current quote index for each testimonial
  const [currentQuoteIndices, setCurrentQuoteIndices] = useState({});
  const [hoveredNav, setHoveredNav] = useState(null);

  // Initialize current quote indices
  useEffect(() => {
    const initialIndices = {};
    testimonials.forEach((testimonial) => {
      if (testimonial.hasCarousel) {
        initialIndices[testimonial.id] = 0;
      }
    });
    setCurrentQuoteIndices(initialIndices);
  }, []);

  // Function to navigate quotes
  const navigateQuote = (testimonialId, direction) => {
    setCurrentQuoteIndices((prev) => {
      const currentIndex = prev[testimonialId];
      const testimonial = testimonials.find((t) => t.id === testimonialId);
      const quoteCount = testimonial.quotes.length;

      let newIndex;
      if (direction === "next") {
        newIndex = (currentIndex + 1) % quoteCount;
      } else {
        newIndex = (currentIndex - 1 + quoteCount) % quoteCount;
      }

      return {
        ...prev,
        [testimonialId]: newIndex,
      };
    });
  };

  // Auto-advance quotes for testimonials with carousels
  useEffect(() => {
    const intervals = {};

    testimonials.forEach((testimonial) => {
      if (testimonial.hasCarousel) {
        intervals[testimonial.id] = setInterval(() => {
          navigateQuote(testimonial.id, "next");
        }, 5000); // Change quote every 5 seconds
      }
    });

    return () => {
      // Clear all intervals on component unmount
      Object.values(intervals).forEach((interval) => clearInterval(interval));
    };
  }, [testimonials]);

  return (
    <div className="neo-testimonials">
      {/* Hero Section */}
      <section className="testimonial-portal">
        <div className="portal-glow"></div>
        <div className="portal-content">
          <h1
            className="glitch-layers"
            data-text="VOICES OF TRUST"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              margin: "0 auto",
              width: "100%",
            }}
          >
            <span>VOICES OF TRUST</span>
          </h1>

          <p className="subtitle-beam">
            What leading organizations say about{" "}
            <span>HAF Import & Supply Trade</span>
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <div className="holographic-grid">
        {testimonials.map((testimonial, index) => (
          <div
            className="testimonial-hologram"
            key={testimonial.id}
            style={{ "--delay": `${index * 0.15}s` }}
          >
            <div className="holo-border"></div>
            <div className="client-orb">
              <img src={testimonial.logo} alt={testimonial.name} />
              <div className="orb-glow"></div>
            </div>
            <div className="testimonial-content">
              <div className="quote-marks">“</div>

              {/* Carousel for quotes (only for logos 2 and 5) */}
              {testimonial.hasCarousel ? (
                <div className="quote-carousel">
                  <p className="testimonial-quote">
                    {
                      testimonial.quotes[
                        currentQuoteIndices[testimonial.id] || 0
                      ]
                    }
                  </p>

                  {/* Unique Navigation for multiple quotes */}
                  <div className="cyber-navigation">
                    <div className="data-stream">
                      <div className="data-bit"></div>
                      <div className="data-bit"></div>
                      <div className="data-bit"></div>
                    </div>

                    <div className="nav-container">
                      <button
                        className="cyber-nav cyber-nav-prev"
                        onClick={() => navigateQuote(testimonial.id, "prev")}
                        onMouseEnter={() =>
                          setHoveredNav(`${testimonial.id}-prev`)
                        }
                        onMouseLeave={() => setHoveredNav(null)}
                        aria-label="Previous quote"
                      >
                        <div className="cyber-line"></div>
                        <div className="cyber-arrow">
                          <div className="arrow-core"></div>
                          <div className="arrow-glitch"></div>
                        </div>
                        <div className="cyber-hud">
                          <span>PREV</span>
                        </div>
                        {hoveredNav === `${testimonial.id}-prev` && (
                          <div className="cyber-hover-effect"></div>
                        )}
                      </button>

                      <div className="matrix-dots">
                        {testimonial.quotes.map((_, quoteIndex) => (
                          <button
                            key={quoteIndex}
                            className={`matrix-dot ${
                              quoteIndex === currentQuoteIndices[testimonial.id]
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              setCurrentQuoteIndices({
                                ...currentQuoteIndices,
                                [testimonial.id]: quoteIndex,
                              })
                            }
                            aria-label={`Go to quote ${quoteIndex + 1}`}
                          >
                            <div className="dot-core"></div>
                            <div className="dot-orb"></div>
                          </button>
                        ))}
                      </div>

                      <button
                        className="cyber-nav cyber-nav-next"
                        onClick={() => navigateQuote(testimonial.id, "next")}
                        onMouseEnter={() =>
                          setHoveredNav(`${testimonial.id}-next`)
                        }
                        onMouseLeave={() => setHoveredNav(null)}
                        aria-label="Next quote"
                      >
                        <div className="cyber-line"></div>
                        <div className="cyber-arrow">
                          <div className="arrow-core"></div>
                          <div className="arrow-glitch"></div>
                        </div>
                        <div className="cyber-hud">
                          <span>NEXT</span>
                        </div>
                        {hoveredNav === `${testimonial.id}-next` && (
                          <div className="cyber-hover-effect"></div>
                        )}
                      </button>
                    </div>

                    <div className="data-stream reverse">
                      <div className="data-bit"></div>
                      <div className="data-bit"></div>
                      <div className="data-bit"></div>
                    </div>
                  </div>
                </div>
              ) : (
                // Regular quote display for other testimonials
                <p className="testimonial-quote">{testimonial.quote}</p>
              )}

              <div className="client-info">
                <h3>{testimonial.name}</h3>
                <p>{testimonial.role}</p>
              </div>
              <div className="star-rating">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < testimonial.rating ? "star filled" : "star"}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="holo-glows">
              <div className="glow-pulse"></div>
              <div className="glow-line"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="cyber-stats">
        <div className="stat-card">
          <div
            className="stat-value"
            style={{
              color: "#378d4b",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: '"Inter", sans-serif',
            }}
          >
            99.9%
          </div>
          <div
            className="stat-label"
            style={{
              color: "#37488D",
              fontSize: "16px",
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Client Satisfaction
          </div>
          <div className="stat-glow"></div>
        </div>

        <div className="stat-card">
          <div
            className="stat-value"
            style={{
              color: "#378d4b",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: '"Inter", sans-serif',
            }}
          >
            50+
          </div>
          <div
            className="stat-label"
            style={{
              color: "#37488D",
              fontSize: "16px",
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Successful Projects
          </div>
          <div className="stat-glow"></div>
        </div>

        <div className="stat-card">
          <div
            className="stat-value"
            style={{
              color: "#378d4b",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: '"Inter", sans-serif',
            }}
          >
            6+
          </div>
          <div
            className="stat-label"
            style={{
              color: "#37488D",
              fontSize: "16px",
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Government Partners
          </div>
          <div className="stat-glow"></div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
