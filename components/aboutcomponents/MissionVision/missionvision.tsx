"use client"
import React, { useState } from 'react';
import './missionvision.css'; 

const tabs = ['Our Mission', 'Our Vision', 'Charity History'];

const tabContent: { [key: string]: string } = {
  'Our Mission': `To champion inclusivity as our guiding light and uplifting the vulnerable groups in our society`,
  'Our Vision': `A society where every person with a disability can live with dignity, independence, and opportunity.`,
  'Charity History': `Universal Lighthouse was founded with a commitment to transforming lives through disability inclusion and rights advocacy. Since our inception, we have worked at county and national levels to advance policy change, provide integrated health services, and empower individuals through skills training and capacity building programs.`,
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
            Universal Lighthouse is dedicated to advancing disability inclusion, health, and human rights. 
            Through advocacy, support services, and empowerment programs, we work to create a world where 
            every person with disabilities can live with dignity and reach their full potential.
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