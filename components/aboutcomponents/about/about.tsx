import React from 'react';
import { CheckCircle } from 'lucide-react';
import './about.css'; 

const AboutUs: React.FC = () => {
  return (
    <div className="about-wrapper">
      <div className="about-container">
        {/* Left Column */}
        <div className="about-content">
          <span className="section-badge">About Us</span>
          <h2 className="section-title">
            <span className="gradient-text">Stronger Communities</span><br />
            One Gift at a Time
          </h2>
          
          <p className="section-description">
            Our organization is built on a simple yet powerful belief: together, we can create lasting change.
            Through compassion, dedication, and the generous support of our community, we work to uplift.
          </p>

          {/* Image Grid */}
          <div className="image-grid">
            <div className="image-container">
              <img
                src="https://img.freepik.com/free-photo/group-young-volunteers-collecting-donations-charity_23-2149151032.jpg"
                alt="Volunteers packing food donations"
                className="about-image"
              />
              <div className="image-overlay" />
            </div>
            <div className="image-container">
              <img
                src="https://img.freepik.com/free-photo/volunteer-woman-charity-donation_23-2149214132.jpg"
                alt="Volunteer smiling beside food items"
                className="about-image"
              />
              <div className="image-overlay" />
            </div>
          </div>

          <p className="section-description">
            From providing essential resources to funding life-changing projects, every effort is directed toward building a better,
            more equitable world. By uniting individuals, businesses, and communities:
          </p>

          {/* Benefits List */}
          <ul className="benefits-list">
            <li>
              <CheckCircle className="benefit-icon" />
              <span>Join Our Mission to Make a Difference</span>
            </li>
            <li>
              <CheckCircle className="benefit-icon" />
              <span>Transforming Lives and Communities</span>
            </li>
            <li>
              <CheckCircle className="benefit-icon" />
              <span>Standing Up for Human Rights</span>
            </li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="main-image-container">
          <img
            src="https://img.freepik.com/free-photo/volunteer-with-down-syndrome-food-bank_23-2149214146.jpg"
            alt="Smiling volunteer raising arms"
            className="main-image"
          />
          <div className="image-overlay" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;