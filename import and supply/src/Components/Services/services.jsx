// src/components/ServicesProducts.js
import React from "react";
import "./services.css";
import { FaShippingFast, FaNetworkWired, FaGlobe } from "react-icons/fa";


const ServiceCard = ({ icon: Icon, imgSrc, title, description }) => (
  <div className="service-card special-effect">
    <Icon className="icon" />
    <img src={imgSrc} alt={title} className="image-hover"/>
    <h3>{title}</h3>
    <p>{description}</p>
    <a href="#" className="button-hover">Learn more</a>
  </div>
);

const ServicesProducts = () => {
  return (
    <div>
      {/* Services Section */}
      <h1>Our Services</h1>
      <section className="services">
        <ServiceCard
          icon={FaShippingFast}
          imgSrc="images/download.jpg"
          title="Import Services"
          description="Efficient and reliable import services tailored to your needs."
        />
        <ServiceCard
          icon={FaNetworkWired}
          imgSrc="images/download.jpg"
          title="Supply Chain"
          description="Comprehensive supply chain solutions for seamless operations."
        />
        <ServiceCard
          icon={FaGlobe}
          imgSrc="images/download.jpg"
          title="Global Reach"
          description="Connecting your business to markets around the world."
        />
      </section>

      {/* Import the Products Component */}
    
    </div>
  );
};

export default ServicesProducts;
