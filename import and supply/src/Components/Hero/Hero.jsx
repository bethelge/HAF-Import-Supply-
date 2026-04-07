import React, { useEffect, useState, useRef } from "react";
import CustomCarousel from "../Carousel/CustomCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import TestimonialsPage from "../Testimony/Testimonials";
import {
  faArrowRight,
  faHandshake,
  faCirclePlay,
  faCloudSun,
  faIndustry,
  faWheatAwn,
  faChair,
} from "@fortawesome/free-solid-svg-icons";
import {
  FaVideo,
  FaCamera,
  FaMicrophone,
  FaFilm,
  FaPlayCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Hero.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

// Partner images (import instead of hardcoding paths)
import ministryLogo from "../../../src/assets/images/partnerWithUs/Ministry.png";
import addisLogo from "../../../src/assets/images/partnerWithUs/Addis.png";
import agriculturalLogo from "../../../src/assets/images/partnerWithUs/agricultural.jpg";
import awashLogo from "../../../src/assets/images/partnerWithUs/AwashBank.jpg";
import ecsuLogo from "../../../src/assets/images/partnerWithUs/Ecsu.png";
import gizLogo from "../../../src/assets/images/partnerWithUs/GIZ.jpg";
import mercyLogo from "../../../src/assets/images/partnerWithUs/mercy.jpg";
import transitionImage from "../../../src/assets/images/trans.jpg";
import samera from "../../../src/assets/images/partnerWithUs/samera.jpg"
import water from "../../../src/assets/images/partnerWithUs/water.jpg"
import SNV from "../../../src/assets/images/partnerWithUs/SNV.jpg"
import SEE from "../../../src/assets/images/partnerWithUs/SEE.PNG"
import gambellaUniversity from "../../../src/assets/images/partnerWithUs/gambellaUniversity.jpg"
import { useNavigate } from "react-router-dom";
import SEO from "../SEO";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const partners = [
  { id: 1, name: "Ministry of Peace", logo: ministryLogo },
  { id: 2, name: " Addis Ababa Science & Technology University", logo: addisLogo },
  { id: 3, name: "Ethiopian Agricultural Transformation Agency ", logo: agriculturalLogo },
  { id: 4, name: "Awash Bank", logo: awashLogo },
  { id: 5, name: " 	Ethiopian Civil Service University", logo: ecsuLogo },
  { id: 6, name: "GIZ", logo: gizLogo },
  { id: 7, name: "Mercy Corps", logo: mercyLogo },
  { id: 8, name: "Samara University ", logo: samera },
  { id: 9, name: "Ministry of Water and Energy", logo: water },
  { id: 10, name: "SNV Ethiopia", logo: SNV },
  { id: 11, name: "Save the Environment Ethiopia ", logo: SEE },
  { id: 12, name: "Gambella University", logo: gambellaUniversity },

];

const services = [
  {
    id: 1,
    title: "Agricultural Equipment",
    description:
      "High-quality farming machinery and tools for modern agriculture",
    icon: faCloudSun,
    color: "#2ecc71",
  },
  {
    id: 2,
    title: "Industrial Machines",
    description: "Wide range of machinery for various industrial applications",
    icon: faIndustry,
    color: "#3498db",
  },
  {
    id: 3,
    title: "Grain Mills & Accessories",
    description:
      "Complete grain milling solutions with all necessary components",
    icon: faWheatAwn,
    color: "#f39c12",
  },
  {
    id: 4,
    title: "Laboratory Furniture & Equipment",
    description: "Premium local and imported furniture for all needs",
    icon: faChair,
    color: "#9b59b6",
  },
];

const floatingIcons = [
  { Icon: FaVideo, x: "15%", y: "25%", delay: "0s" },
  { Icon: FaCamera, x: "75%", y: "35%", delay: "1s" },
  { Icon: FaMicrophone, x: "65%", y: "90%", delay: "2s" },
  { Icon: FaFilm, x: "80%", y: "70%", delay: "1.5s" },
  { Icon: FaPlayCircle, x: "55%", y: "15%", delay: "0.5s" },
];

const Home = () => {
  const [latestMedia, setLatestMedia] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const titleRef = useRef(null);
  const partnerRefs = useRef([]);

  useEffect(() => {
    const fetchLatestMedia = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/media`);
        if (res.data.length > 0) {
          setLatestMedia(res.data[0]);
        }
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    fetchLatestMedia();
  }, [API_BASE_URL]);

  useEffect(() => {
    const section = document.querySelector(".neo-services");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("animate-active");
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("title-visible");
          }
        });
      },
      { threshold: 0.5 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
    };
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsPlaying(false);
  };

  return (
    <>
      <CustomCarousel />
      <div>
        <SEO
          title="HAF Import & Supply Trade - Quality Machines & Equipment"
          description="HAF Import and Supply Trade provides high-quality water purification, agricultural inputs, lab equipment, industrial machinery, and more in Ethiopia."
          keywords="HAF Import and Supply, water purification Ethiopia, agriculture inputs, lab equipment, industrial machinery"
          url="https://hafist.com/"
          image="/og-image.jpg"
          canonical="https://hafist.com/"
        />
       
      </div>
      {/* <div className="section-wave">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,32 C480,160 960,0 1440,96 L1440,0 L0,0 Z"
            fill="#587091" // <-- change this to match your background color
          />
        </svg>
      </div> */}

      <div className="neo-services" id="services-bg" style={{}}>
        {/* Wave shape at the top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "60px",
            overflow: "hidden",
          }}
        >
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
            }}
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="#456286ff"
            ></path>
          </svg>
        </div>

        <div className="animated-bg"></div>

        <div className="modern-services-container">
          <div className="services-cards-container">
            {services.map((service, index) => (
              <div
                className="modern-card"
                key={service.id}
                style={{
                  "--hue": service.color,
                  "--delay": `${index * 0.15}s`,
                }}
              >
                <div className="card-icon">
                  <FontAwesomeIcon
                    icon={service.icon}
                    style={{ color: service.color }}
                  />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="card-glow"></div>
              </div>
            ))}
          </div>

          <div className="services-content" ref={titleRef}>
            <h2 className="modern-section-title">
              <span>WHAT</span>
              <span>WE</span>
              <span>OFFER</span>
            </h2>
            <div className="modern-underline"></div>
            <p className="services-description">
              We provide cutting-edge solutions across multiple industries with
              top-quality equipment and exceptional service.
            </p>
            <Link to="/products" className="modern-cta-button">
              Explore All Products
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </div>

      {/* Holographic Media Section */}
      <section className="holographic-media-section">
        <div className="media-icons-bg">
          {floatingIcons.map(({ Icon, x, y, delay }, idx) => (
            <div
              key={idx}
              className="media-icon"
              style={{ "--x": x, "--y": y, "--delay": delay }}
            >
              <Icon className="icon-svg" />
              <div className="icon-glow"></div>
            </div>
          ))}
        </div>

        <div className="cyber-header">
          <h2 className="neon-glitch-title" data-text="MEDIA COVERAGE">
            <span>MEDIA COVERAGE</span>
          </h2>
          <p className="cyber-subheader">
            See how we're <span className="highlight-pulse">transforming</span>{" "}
            global trade operations
          </p>
        </div>

        {latestMedia && (
          <div className="holo-video-container">
            <div className="holographic-card">
              <div
                className="holo-video-wrapper"
                onClick={() => {
                  if (window.innerWidth > 768) {
                    openModal(); // only open modal on desktop
                  }
                }}
              >
                {latestMedia.media_type === "video" ? (
                  <video
                    src={`${API_BASE_URL}${latestMedia.media_url}`}
                    className="quantum-video"
                    playsInline
                    muted
                    loop
                    controls // ✅ show native play controls on mobile
                  />
                ) : (
                  <img
                    src={`${API_BASE_URL}${latestMedia.media_url}`}
                    alt={latestMedia.title}
                    className="quantum-video"
                  />
                )}
                <div className="holographic-overlay">
                  <div className="play-halo">
                    <FontAwesomeIcon
                      icon={faCirclePlay}
                      className="quantum-play-icon"
                    />
                  </div>
                  <div className="scanlines"></div>
                </div>
              </div>

              <div className="cyber-info-panel">
                <div className="cyber-badge">
                  <span>FEATURED STORY</span>
                  <div className="badge-glows">
                    <div className="pulse-ring"></div>
                    <div className="pulse-ring delay-1"></div>
                  </div>
                </div>

                <h3 className="cyber-media-title">{latestMedia.title}</h3>
                <p className="cyber-media-desc">{latestMedia.description}</p>

                <div className="cyber-stats">
                  <div className="stat-meter">
                    <span>98%</span>
                    <p>Positive Feedback</p>
                  </div>
                </div>

                <Link to="/media" className="cyber-link">
                  <span>VIEW ALL COVERAGE</span>
                  <div className="link-arrow">
                    <FontAwesomeIcon icon={faArrowRight} />
                    <div className="arrow-trail"></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {isModalOpen && latestMedia && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {latestMedia.media_type === "video" ? (
              <video
                controls
                autoPlay
                className="modal-video"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source
                  src={`${API_BASE_URL}${latestMedia.media_url}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={`${API_BASE_URL}${latestMedia.media_url}`}
                className="modal-video"
                alt="media"
              />
            )}
            <button className="modal-close" onClick={closeModal}>
              ✖
            </button>
          </div>
        </div>
      )}

      <div className="transition-image-wrapper">
        <img
          src={transitionImage}
          alt="Transition Graphic"
          className="transition-image"
        />
      </div>

      <TestimonialsPage />

      {/* Partners */}
      <section className="partners-section with-bg-effect">
        <span class="droplet"></span>
        <span class="droplet"></span>
        <span class="droplet"></span>
        <span class="droplet"></span>
        <span class="droplet"></span>
        <div className="section-header">
          <h2>
            <FontAwesomeIcon icon={faHandshake} /> Our Trusted Partners
          </h2>
          <p className="section-subtitle">
            Collaborating with industry leaders
          </p>
        </div>
        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 10,
            stretch: 0,
            depth: 150,
            modifier: 2,
            slideShadows: true,
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop
          className="partners-slider"
        >
          {partners.map((partner, index) => (
            <SwiperSlide key={partner.id}>
              <div
                className="partner-card"
                ref={(el) => (partnerRefs.current[index] = el)}
              >
                <div className="partner-logo-container">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="partner-logo"
                    loading="lazy"
                  />
                </div>
                <span className="partner-name">{partner.name}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="cta-section with-bg-effect">
        <span className="droplet"></span>
        <span className="droplet"></span>
        <span className="droplet"></span>
        <span className="droplet"></span>
        <span className="droplet"></span>

        <div className="cta-content">
          <h2>Ready to Transform Your Supply Chain?</h2>
          <p>Get in touch with our experts for customized solutions</p>
          <button className="cta-button">
            <Link to="/contact" className="cta-button">
              Contact Us Today
            </Link>
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
