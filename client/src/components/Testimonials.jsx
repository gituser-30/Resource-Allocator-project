import React, { useEffect, useRef, useState } from "react";
import anime from "animejs";
import "./Testimonials.css";

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const intervalRef = useRef(null);

  const testimonials = [
    {
      name: "Abdullah Hajwane",
      role: "Computer Engineering, 2nd Year",
      text: "Scholar Hub has been a game-changer for my exam prep. Having all the PYQs and notes in one place saved me countless hours of searching through WhatsApp groups.",
      avatar: "A",
      color: "#a855f7",
    },
    {
      name: "Priya Sharma",
      role: "Information Technology, 3rd Year",
      text: "The organized structure by department and semester makes it incredibly easy to find exactly what I need. Best resource platform for DBATU students!",
      avatar: "P",
      color: "#00e5ff",
    },
    {
      name: "Rahul Patil",
      role: "Electrical Engineering, 2nd Year",
      text: "I love how the video tutorials are curated alongside the notes. It gives a complete learning experience that no other platform offers for our university.",
      avatar: "R",
      color: "#fbbf24",
    },
    {
      name: "Sneha Deshmukh",
      role: "Civil Engineering, 4th Year",
      text: "As a final year student, I wish Scholar Hub existed from my first year! The assignments with solutions are incredibly helpful for understanding concepts.",
      avatar: "S",
      color: "#f472b6",
    },
  ];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    anime({
      targets: '.testimonial__card--active',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      easing: 'easeOutExpo',
    });
  }, [active]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.testimonial__wrapper',
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 800,
              easing: 'easeOutExpo',
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('testimonials-section');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="testimonials" id="testimonials-section">
      <div className="container">
        <div className="section-heading">
          <h2 className="gradient-text">What Students Say</h2>
          <p>Hear from fellow DBATU scholars about their experience</p>
          <div className="section-divider"></div>
        </div>

        <div className="testimonial__wrapper" style={{ opacity: 0 }}>
          <div className="testimonial__card testimonial__card--active glass-card">
            <div className="testimonial__quote">
              <i className="fas fa-quote-left"></i>
            </div>
            <p className="testimonial__text">{testimonials[active].text}</p>
            <div className="testimonial__author">
              <div
                className="testimonial__avatar"
                style={{ background: testimonials[active].color }}
              >
                {testimonials[active].avatar}
              </div>
              <div>
                <h5 className="testimonial__name">{testimonials[active].name}</h5>
                <span className="testimonial__role">{testimonials[active].role}</span>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="testimonial__dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonial__dot ${i === active ? 'testimonial__dot--active' : ''}`}
                onClick={() => {
                  setActive(i);
                  clearInterval(intervalRef.current);
                  intervalRef.current = setInterval(() => {
                    setActive((prev) => (prev + 1) % testimonials.length);
                  }, 5000);
                }}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
