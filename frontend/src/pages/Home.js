import React, { useState, useEffect } from "react";
import "./../styles/home.css";

const images = [
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1600",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600"
];

const cardData = [
  {
    title: "Event Planning",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200",
    shortText:
      "This system helps colleges plan and manage technical, cultural, and academic events in a simple and organized way.",
    fullText:
      "The Event Management System allows colleges to create, organize, and monitor different kinds of events efficiently. It reduces manual work, improves planning, and helps staff coordinate all activities smoothly from one platform."
  },
  {
    title: "Student Participation",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200",
    shortText:
      "Students can browse events, register online, and stay updated about upcoming college activities with ease.",
    fullText:
      "Students can log in, view upcoming events, explore details, and register quickly through the platform. This improves participation, saves time, and ensures students never miss important college activities and programs."
  },
  {
    title: "Event Themes",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200",
    shortText:
      "Different event categories and layouts make the platform more attractive and improve the overall user experience.",
    fullText:
      "The platform supports various types of events such as cultural programs, seminars, workshops, and technical competitions. Attractive themes and organized layouts make it easier for users to interact with event details."
  },
  {
    title: "Admin Management",
    image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1200",
    shortText:
      "Admin can add events, manage registrations, view students, and control the full event system securely.",
    fullText:
      "The admin panel provides full control over the platform. Admin can create events, edit or delete them, check student registrations, manage approvals, and maintain smooth functioning of the complete system securely."
  }
];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="home-container">
      <div className="banner-slider">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="event"
            className={index === current ? "slide active" : "slide"}
          />
        ))}

        <button className="slider-btn prev-btn" onClick={prevSlide}>
          ❮
        </button>

        <button className="slider-btn next-btn" onClick={nextSlide}>
          ❯
        </button>

        <div className="banner-text">
          <h1>College Event Management System</h1>
          <p>Manage events, registrations, and student participation easily</p>
        </div>

        <div className="slider-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={index === current ? "dot active-dot" : "dot"}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <h3>50+</h3>
          <p>Events Conducted</p>
        </div>

        <div className="stat-card">
          <h3>500+</h3>
          <p>Student Registrations</p>
        </div>

        <div className="stat-card">
          <h3>20+</h3>
          <p>Departments Participated</p>
        </div>

        <div className="stat-card">
          <h3>100%</h3>
          <p>Easy Event Management</p>
        </div>
      </div>

      <div className="content">
        <h2 className="section-title">ABOUT EVENT MANAGEMENT SYSTEM</h2>

        <div className="card-grid">
          {cardData.map((card, index) => (
            <div className="info-card" key={index}>
              <img src={card.image} alt={card.title} />
              <div className="card-body">
                <h3>{card.title}</h3>
                <p>{card.shortText}</p>
                <button
                  className="read-btn"
                  onClick={() => setSelectedCard(card)}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCard && (
        <div className="popup-overlay" onClick={() => setSelectedCard(null)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedCard.title}</h2>
            <img src={selectedCard.image} alt={selectedCard.title} />
            <p>{selectedCard.fullText}</p>
            <button
              className="close-btn"
              onClick={() => setSelectedCard(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
