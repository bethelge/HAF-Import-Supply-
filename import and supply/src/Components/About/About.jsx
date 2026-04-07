import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import MiniCarousel from "../../Components/Carousel/MiniCarousel";
import StatsCard from "../StatsCard/StatsCard";
import coreBg from "../../assets/images/final.jpg";
import {
  FaUsers,
  FaCogs,
  FaFire,
  FaTools,
  FaLightbulb,
  FaHandshake,
  FaBalanceScale,
  FaBullseye,
  FaEye,
} from "react-icons/fa";

import "./about.css";
import img1 from "../../assets/images/5.jpg";
import img2 from "../../assets/images/6.jpg";
import img3 from "../../assets/images/7.jpg";
import SEO from "../SEO";

// Animated Counter Hook
function useCountUp(end, duration = 3000) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  useEffect(() => {
    let start = 0;
    let startTime = null;
    function animateCount(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        ref.current = requestAnimationFrame(animateCount);
      } else {
        setCount(end);
      }
    }
    ref.current = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(ref.current);
  }, [end, duration]);
  return count;
}

const coreValues = [
  {
    icon: <FaUsers />,
    title: "Integrity",
    desc: "We operate with transparency and honesty in all our dealings.",
    color: "#4CAF50",
  },
  {
    icon: <FaCogs />,
    title: "Impact",
    desc: "We focus on products that deliver tangible, positive change to lives and livelihoods.",
    color: "#2196F3",
  },
  {
    icon: <FaLightbulb />,
    title: "Reliability",
    desc: "We are committed to delivering on our promises to customers, partners, and stakeholders.",
    color: "#FF5722",
  },
  {
    icon: <FaHandshake />,
    title: "Innovation",
    desc: "We continuously seek out and promote modern solutions to persistent challenges.",
    color: "#FFC107",
  },
];

// Add AboutImagesShowcase component
function AboutImagesShowcase() {
  return (
    <div className="about-images-grid">
      <div className="about-image-card medium-card">
        <img src={img1} alt="Showcase 1" loading="lazy" />
      </div>
      <div className="about-image-card medium-card">
        <img src={img2} alt="Showcase 2" loading="lazy" />
      </div>
      <div className="about-image-card medium-card">
        <img src={img3} alt="Showcase 3" loading="lazy" />
      </div>
    </div>
  );
}

const About = () => {
  // Animated counters for stats
  const years = useCountUp(6);
  const clients = useCountUp(50);
  const products = useCountUp(100);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div>
        <SEO
          title="About Us - HAF Import & Supply Trade"
          description="Established in 2017, HAF Import & Supply Trade is committed to importing and distributing high-quality equipment and machinery in Ethiopia."
          keywords="About HAF Import and Supply, Ethiopian import company, machinery distributor Ethiopia"
        />
      </div>

      <main>
        {/* About Us Section */}
        <section className="about-section content-section animate-slide-up">
          <div className="content-grid container">
            <div className="about-us-modern-grid">
              <div className="about-us-modern-left">
                <div className="section-header">
                  <h2 style={{ fontSize: "24px" }}>About Us</h2>
                  <div className="divider"></div>
                </div>
                <p style={{ fontSize: "16px" }}>
                  HAF IMPORT AND SUPPLY TRADE Company is established during the
                  year of 2017 under Addis Ababa City Administration Trade and
                  Industry Development Bureau, with an aim to import, supply and
                  distributes different machines, equipment's and materials.
                  <br />
                  <span className="highlight-text">
                    The company is established by full commitment of the owner
                    and General manager Mr. Henok Ataklty.
                  </span>
                  <br />
                  Our company has successfully completed various supplies with
                  dedication and commitment in supplying and installing machines
                  to governmental and non-governmental organizations.
                  <br />
                  Our pledge is to honor our commitment with high-quality
                  products manufactured by globally reputed companies —
                  supported with professional service and sound management
                  principles.
                </p>
              </div>
              <div className="about-us-modern-right">
                <div className="about-us-images-2x2">
                  <div className="about-us-img small-top">
                    <img src={img1} alt="Showcase 1" loading="lazy" />
                  </div>
                  <div className="about-us-img large">
                    <img src={img2} alt="Showcase 2" loading="lazy" />
                  </div>
                  <div className="about-us-img small-bottom">
                    <img src={img3} alt="Showcase 3" loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Floating Stats Card Overlap */}
        <div className="stats-card-overlap-wrapper">
          <StatsCard
            position="top"
            years={years}
            clients={clients}
            products={products}
          />
        </div>

        {/* Mission & Vision Section */}
        <section className="mission-vision-section">
          <div className="container">
            <div className="section-intro">
              <h2 className="section-title">Our Guiding Principles</h2>
              <p className="section-description">
                The foundation of everything we do at HAF IMPORT AND SUPPLY
                TRADE
              </p>
              <div className="animated-divider">
                <div className="divider-line"></div>
                <div className="divider-dot"></div>
                <div className="divider-line"></div>
              </div>
            </div>

            <div className="mission-vision-container">
              {/* Mission Card */}
              <div className="principle-card mission-card animate-slide-up">
                <div className="card-badge">Mission</div>
                <div className="card-content">
                  <div className="card-icon">
                    <FaBullseye className="icon" />
                    <div className="icon-pulse"></div>
                  </div>
                  <h3>Our Mission</h3>
                  <div className="card-divider">
                    <div className="divider-progress"></div>
                  </div>
                  <p>
                   To be the leading supplier of innovative and essential technologies in water purification, Laboratory Equipment and agriculture in the Horn of Africa, enhancing the quality of life and improving food security
                  </p>
                  <div className="card-footer">
                    <div className="commitment-meter">
                      <div className="meter-label">Commitment Level</div>
                      <div className="meter-bar">
                        <div
                          className="meter-progress"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-glow"></div>
              </div>

              {/* Vision Card */}
              <div className="principle-card vision-card animate-slide-up">
                <div className="card-badge">Vision</div>
                <div className="card-content">
                  <div className="card-icon">
                    <FaEye className="icon" />
                    <div className="icon-rings">
                      <div className="ring"></div>
                      <div className="ring"></div>
                      <div className="ring"></div>
                    </div>
                  </div>
                  <h3>Our Vision</h3>
                  <div className="card-divider">
                    <div className="divider-progress"></div>
                  </div>
                  <p>
                    To evolve from a leading distributor into a local manufacturer of water purification equipment within five years, thereby creating sustainable employment, building domestic industrial capacity, and securing Ethiopia's supply chain for this critical resource.
                  </p>
                  <div className="card-footer">
                    <div className="timeline">
                      <div className="timeline-marker">
                        <div className="marker-dot"></div>
                        <div className="marker-line"></div>
                      </div>
                      <div className="timeline-text">Target: 2025</div>
                    </div>
                  </div>
                </div>
                <div className="card-glow"></div>
              </div>
            </div>

            {/* Connection Element */}
            <div className="connection-line">
              <div className="connection-dot"></div>
              <div className="connection-dot"></div>
              <div className="connection-dot"></div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="values-section">
          <div className="values-overlay">
            <div className="container">
              <div className="section-header">
                <h2>Our Core Values</h2>
                <div className="divider"></div>
                <p className="section-subtitle text-black font-bold">
                  The principles that guide everything we do
                </p>
              </div>
              <div className="values-grid">
                {coreValues.map((val, index) => (
                  <div
                    className="value-card"
                    key={index}
                    style={{ "--accent-color": val.color }}
                  >
                    <div className="value-icon">{val.icon}</div>
                    <h3>{val.title}</h3>
                    <div className="value-divider"></div>
                    <p>{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
