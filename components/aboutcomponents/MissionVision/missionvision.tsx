"use client"
import React, { useState } from 'react';
import './missionvision.css'; 

const tabs = ['Our Mission', 'Our Vision', 'Charity History'];

const tabContent: { [key: string]: string } = {
  'Our Mission': `Our mission is to bring hope, resources, & opportunities to communities in need, empowering individuals to build brighter, sustainable futures. We are committed to tackling critical challenges.`,
  'Our Vision': `Our vision is a world where everyone has the opportunity to thrive, with access to the resources and support necessary for lasting change guided by compassion, integrity.`,
  'Charity History': `Since our founding, we've partnered with donors, volunteers, and organizations to create sustainable solutions and long-term impacts in local communities around the world.`,
};

const PurposeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Our Mission');

  return (
    <div className="purpose-wrapper">
      <div className="purpose-container">
        {/* Left Image */}
        <div className="purpose-image-container">
          <img
            src="https://img.freepik.com/free-photo/group-young-volunteers-collecting-donations-charity_23-2149151032.jpg"
            alt="Volunteers serving food"
            className="purpose-image"
          />
          <div className="image-overlay" />
        </div>

        {/* Right Content */}
        <div className="purpose-content">
          <span className="section-badge">Our Mission & Vision</span>
          <h2 className="section-title">
            <span className="gradient-text">Our Purpose</span><br />
            Mission and Vision for a Better Future
          </h2>

          <p className="section-description">
            Our mission to bring hope, resources, & opportunity to communities
            in need, empowering individuals to build brighter, sustainable
            futures we are committed to tackling critical challenges.
          </p>

          {/* Tabs */}
          <div className="tab-container">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <p className="tab-content">{tabContent[activeTab]}</p>

          
        </div>
      </div>
    </div>
  );
};

export default PurposeSection;