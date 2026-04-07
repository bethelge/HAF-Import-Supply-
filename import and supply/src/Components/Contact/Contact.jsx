import React from "react";
import emailjs from "emailjs-com";
import "./Contact.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import contactBg from "../../../src/assets/images/cooo.jpg";
import SEO from "../SEO";
const Contact = () => {
  // Function to send email
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_byjf7qq", // ✅ Your EmailJS Service ID
        "template_f4yc1m4", // ✅ Your EmailJS Template ID
        e.target,
        "ixKUwbvpKrAS3R4KO" // ✅ Your EmailJS Public Key
      )
      .then(
        (result) => {
          alert("✅ Message sent successfully!");
          e.target.reset(); // Clear form
        },
        (error) => {
          alert("❌ Failed to send message. Please try again.");
          console.error(error);
        }
      );
  };

  return (
    <>
      <div>
        <SEO
          title="Contact Us - HAF Import & Supply Trade"
          description="Get in touch with HAF Import & Supply Trade for inquiries about water purification, agricultural inputs, lab equipment, and industrial machinery."
          keywords="Contact HAF Import and Supply, Ethiopia import contact, trade company Ethiopia"
          url="https://hafist.com/contact"
          image="/og-image.jpg"
          canonical="https://hafist.com/contact"
        />
       
      </div>
      {/* Header section */}
      <section
        className="contact-header"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${contactBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container header-content">
          <h1>Contact Us</h1>
        </div>
      </section>

      {/* Main contact section */}
      <section className="contact-section">
        <div className="container">
          <div className="section-header">
            <p className="subheading">Contact Us</p>
            <h2>Get In Touch With Us</h2>
            <p className="description">
              We're here to assist you. Reach out to us anytime!
            </p>
          </div>

          <div className="contact-info-grid">
            <div className="contact-card blue">
              <FaMapMarkerAlt className="icon" />
              <h4>Our Location</h4>
              <p>
                Bole Sub-city Woreda 03 Bedria City Mall 6th floor Offices No.
                608, Addis Ababa, Ethiopia
              </p>
            </div>

            <div className="contact-card beige">
              <FaPhoneAlt className="icon" />
              <h4>Phone Number</h4>
              <p>
                Office: +251 116662226
                <br />
                Mobile: +251 929425601 / +251 995723232
              </p>
            </div>

            <div className="contact-card blue">
              <FaEnvelope className="icon" />
              <h4>Email Us</h4>
              <p style={{ marginTop: "10px" }}>
                <a
                  href="mailto:henokimport2011@gmail.com"
                  style={{
                    color: "#333",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "5px",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "#0077B8")}
                  onMouseOut={(e) => (e.target.style.color = "#333")}
                >
                  <FaEnvelope /> henokimport2011@gmail.com
                </a>

                <a
                  href="mailto:hafimports294@gmail.com"
                  style={{
                    color: "#333",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "5px",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "#0077B8")}
                  onMouseOut={(e) => (e.target.style.color = "#333")}
                >
                  <FaEnvelope /> hafimports294@gmail.com
                </a>

                <a
                  href="mailto:lifestrawethiopia@gmail.com"
                  style={{
                    color: "#333",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "#0077B8")}
                  onMouseOut={(e) => (e.target.style.color = "#333")}
                >
                  <FaEnvelope /> lifestrawethiopia@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="contact-main">
            <iframe
              title="Google Map"
              src="https://maps.google.com/maps?q=Bole%20Sub-city%20Woreda%2003%20Bedria%20City%20Mall&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="contact-map"
              loading="lazy"
            ></iframe>

            {/* Contact Form with EmailJS */}
            <form className="contact-form" onSubmit={sendEmail}>
              <div className="form-row">
                <input
                  type="text"
                  name="from_name"
                  placeholder="Your Name"
                  required
                />
                <input
                  type="email"
                  name="from_email"
                  placeholder="Your Email"
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                required
              ></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
