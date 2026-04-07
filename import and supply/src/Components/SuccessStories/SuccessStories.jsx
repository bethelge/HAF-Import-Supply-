import React from "react";
import "./SuccessStories.css";
import firstImg from "../../assets/images/first.jpg";
import secImg from "../../assets/images/sec.jpg";
import thirdImg from "../../assets/images/third.jpg";
import fourthImg from "../../assets/images/fourth.jpg";
import fifthImg from "../../assets/images/fifth.jpg";
import sixImg from "../../assets/images/six.jpg";
import gambella1 from "../../assets/images/gambella1.jpg";
import gambella2 from "../../assets/images/gambella2.jpg";
import gambella3 from "../../assets/images/gambella3.jpg";
import gambella4 from "../../assets/images/gambella4.jpg";
import gambella5 from "../../assets/images/gambella5.jpg";
import gambella6 from "../../assets/images/gambella6.jpg";
import gambella7 from "../../assets/images/gambella7.jpg";
import gambella8 from "../../assets/images/gambella8.jpg";
import gambella9 from "../../assets/images/gambella9.jpg";

import gode1 from "../../assets/images/gode1.jpg";
import gode2 from "../../assets/images/gode2.jpg";
import gode3 from "../../assets/images/gode3.jpg";

import seven from "../../assets/images/seven.jpg";
import eight from "../../assets/images/eight.jpg";

import nine from "../../assets/images/nine.jpg";
import ten from "../../assets/images/ten.jpg";
import eleven from "../../assets/images/eleven.jpg";
import twelve from "../../assets/images/tewelve.jpg";
import onethree from "../../assets/images/onethree.jpg";

import SEO from "../SEO";



const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      title: "Science Museum Product Exhibition",
      company: "MoWE Collaboration",
      location: "Addis Ababa, Ethiopia",
      date: "2024",
      description:
        "Our Product Exhibition at the Science Museum, organized by the Ministry of Water and Energy (MoWE), showcased innovative water solutions to thousands of visitors, demonstrating LifeStraw's impact on clean water accessibility.",
      impact:
        "Empowered thousands of visitors to learn about clean water solutions",
      category: "Exhibition",
      images: [
        { src: firstImg, alt: "Showcasing innovative water solutions" },
        { src: secImg, alt: "Visitors exploring our LifeStraw products" },
        { src: thirdImg, alt: "Science Museum booth setup" },
        { src: fourthImg, alt: "Engagement with youth and professionals" },
        { src: fifthImg, alt: "Product demonstration session" },
        { src: sixImg, alt: "Product demonstration session" },
      ],
    },
    {
      id: 2,
      title: "Gode Catholic Mission",
      company: "Eastern Ethiopia",
      location: "Gode, Somali Region",
      date: "2024",
      description:
        "Transforming lives in Gode, Somali Region, where LifeStraw provides clean drinking water by purifying raw water sources, significantly improving community health outcomes.",
      impact:
        "Transformed daily lives in rural communities with access to safe water",
      category: "Community Development",
      images: [
        { src: gode3, alt: "LifeStraw in use by the local community" },
        { src: gode2, alt: "LifeStraw in use by the local community" },
        { src: gode1, alt: "LifeStraw in use by the local community" },
      ],
    },
    {
      id: 3,
      title: "Jewish Voice Ministry Collaboration",
      company: "LifeStraw + Jewish Voice",
      location: "Multiple Locations",
      date: "2024",
      description:
        "Our collaboration with Jewish Voice Ministry has brought clean water solutions to underserved communities, combining humanitarian efforts with innovative technology.",
      impact: "Distributed life-saving water filters and educated communities",
      category: "Partnership",
      images: [
        { src: seven, alt: "Team preparing water filters for distribution" },
        { src: eight, alt: "On-site LifeStraw setup" },
      ],
    },
    {
      id: 4,
      title: "Giveback Program in Ethiopia",
      company: "LifeStraw First Campaign",
      location: "Rural Ethiopia",
      date: "2024",
      description:
        "LifeStraw's Giveback program's first campaign in Ethiopia created measurable impact, providing clean water access and education to rural communities in need.",
      impact: "Created long-term clean water access and awareness programs",
      category: "Giveback Program",
      images: [
        { src: nine, alt: "Distribution of filters to households" },
        { src: ten, alt: "LifeStraw team in rural site" },
        { src: eleven, alt: "Awareness campaign in schools" },
        { src: twelve, alt: "Measuring water quality improvements" },
        { src: onethree, alt: "Team and community photo" },
      ],
    },
    {
      id: 5,
      title: "Success Story: Gambella University Clean Water Supply Project",
      company: "Gambella University Initiative",
      location: "Gambella, Ethiopia",
      date: "2025",
      description:
        "The Gambella University Clean Water Supply Project successfully implemented a sustainable water system, providing safe drinking water to the university and surrounding communities while promoting hygiene education.",
      impact: "Ensured reliable access to clean water and improved health awareness for the university and local residents",
      category: "Clean Water Project",
      images: [
        { src: gambella1, alt: "Installation of water supply infrastructure at Gambella University" },
        { src: gambella2, alt: "Community accessing clean water from new facilities" },
        { src: gambella3, alt: "Hygiene awareness session for local community" },
        { src: gambella4, alt: "Monitoring water quality improvements" },
        { src: gambella5, alt: "Installation of water supply infrastructure at Gambella University" },
        { src: gambella6, alt: "Installation of water supply infrastructure at Gambella University" },
        { src: gambella7, alt: "Installation of water supply infrastructure at Gambella University" },
        { src: gambella8, alt: "New water storage tanks installation" },
        { src: gambella9, alt: "Installation of water supply infrastructure at Gambella University" },
      ],
    }
  ];

  return (
    <div className="success-stories-page">
      <SEO
        title="Success Stories - HAF Import & Supply Trade"
        description="Discover real success stories from HAF Import & Supply Trade. From exhibitions to community development, see how our clean water and equipment solutions impact lives across Ethiopia."
        keywords="HAF success stories, Ethiopia water projects, LifeStraw Ethiopia, community development Ethiopia, HAF impact"
        url="https://hafist.com/success-stories"
        image="/og-image.jpg"
        canonical="https://hafist.com/success-stories"
      />
      {/* Hero Section */}
      <section
        className="stories-hero"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",

          position: "relative",
        }}
      >
        <div className="water-drop"></div>
        <div className="water-drop"></div>
        <div className="water-drop"></div>
        <div className="water-drop"></div>
        <div className="water-drop"></div>
        <div className="curve-water"></div>

        <div className="hero-content" style={{ zIndex: 2 }}>
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <h1 className="hero-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug">
              Transforming Lives Through
              <span className="gradient-text"> Clean Water</span>
            </h1>
          </div>

          <p className="hero-subtitle">
            Discover how our partnerships and initiatives are making a real
            difference in communities across Ethiopia
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="stories-grid">
        <div className="section-header">
          <h2>Our Impact Stories</h2>
          <p>Real stories of transformation and positive change</p>
        </div>

        <div className="stories-container">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className="story-card"
              style={{ "--card-index": index }}
            >
              <div className="card-header">
                <div className="story-meta">
                  <span className="story-category">{story.category}</span>
                  <span className="story-date">{story.date}</span>
                </div>
                <h3 className="story-title">{story.title}</h3>
                <h4 className="story-company">{story.company}</h4>
                <p className="story-location">{story.location}</p>
              </div>

              <div className="card-body">
                <p className="story-description">{story.description}</p>
                <div className="story-impact">
                  <span className="impact-label">Impact:</span>
                  <span className="impact-value">{story.impact}</span>
                </div>
              </div>

              <div className="card-gallery">
                <div className="gallery-grid">
                  {story.images.map((image, imgIndex) => (
                    <div key={imgIndex} className="gallery-item">
                      <img src={image.src} alt={image.alt} />
                      <div className="image-overlay">
                        <span className="image-caption">{image.alt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* <div className="card-footer">
                <button className="read-more-btn">Read Full Story</button>
              </div> */}
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      {/* <section className="stories-cta">
        <div className="cta-content">
          <h2>Join Our Mission</h2>
          <p>Be part of the solution. Help us bring clean water to more communities.</p>
          <div className="cta-buttons">
            <button className="cta-primary">Partner With Us</button>
            <button className="cta-secondary">Learn More</button>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default SuccessStories;
