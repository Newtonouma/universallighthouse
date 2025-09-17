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
            <span className="gradient-text">Empowering Lives</span><br />
            Transforming Communities
          </h2>
          
          <p className="section-description">
            Universal Lighthouse is dedicated to advancing disability inclusion, health, and human rights. 
            We believe every person deserves dignity, opportunity, and the chance to thrive regardless of their abilities.
          </p>

          {/* Image Grid */}
          <div className="image-grid">
            <div className="image-container">
              <img
                src="/images/all.jpg"
                alt="Universal Lighthouse community members"
                className="about-image"
              />
              <div className="image-overlay" />
            </div>
            <div className="image-container">
              <img
                src="/images/assesment.jpg"
                alt="Community assessment and support"
                className="about-image"
              />
              <div className="image-overlay" />
            </div>
          </div>



          
        </div>
        {/* Right Column */}
        <div className="main-image-container">
          <img
            src="/images/en.jpg"
            alt="Universal Lighthouse empowerment program"
            className="main-image"
          />
          <div className="image-overlay" />
        </div>
      </div>

      {/* New Two-Column Section for Detailed Information */}
      <div className="detailed-info-section">
        <div className="detailed-info-container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="gradient-text">Our Impact</span><br />
              Areas & Approach
            </h2>
          </div>
          
          <div className="two-column-layout">
            {/* Left Column */}
            <div className="left-column">
              <div className="info-block">
                <h3 className="section-heading">What We Do (Thematic Areas)</h3>
                
                <div className="thematic-area">
                  <h4 className="area-title">1. Disability Inclusion & Rights Advocacy</h4>
                  <p className="area-description">
                    We advance policy change, inclusive health budgeting, and legal protection for persons with disabilities at both county and national levels.
                  </p>
                </div>

                <div className="thematic-area">
                  <h4 className="area-title">2. Integrated Health & Well-being</h4>
                  <p className="area-description">
                    We provide psychosocial support, peer rehabilitation, and access to prosthetics and mental health services for our beneficiaries.
                  </p>
                </div>

                <div className="thematic-area">
                  <h4 className="area-title">3. Economic Empowerment & Skills Training</h4>
                  <p className="area-description">
                    We equip survivors with income-generating skills—from tailoring to digital literacy—so they can rebuild lives with financial dignity.
                  </p>
                </div>

                <div className="thematic-area">
                  <h4 className="area-title">4. Capacity Building</h4>
                  <p className="area-description">
                    We train caregivers, youth, local leaders, and advocates to drive lasting change in their communities.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="right-column">
              <div className="info-block">
                <h3 className="section-heading">Our Target Groups</h3>
                <ul className="target-list">
                  <li>
                    <CheckCircle className="list-icon" />
                    <span>Persons with Disabilities, especially limb loss and mobility impairments</span>
                  </li>
                  <li>
                    <CheckCircle className="list-icon" />
                    <span>Caregivers and family members</span>
                  </li>
                  <li>
                    <CheckCircle className="list-icon" />
                    <span>Local community champions, leaders, and youth advocates</span>
                  </li>
                  <li>
                    <CheckCircle className="list-icon" />
                    <span>County health stakeholders and policymakers</span>
                  </li>
                </ul>
              </div>

              <div className="info-block">
                <h3 className="section-heading">The Challenges We Address</h3>
                <ul className="challenges-list">
                  <li>
                    <CheckCircle className="list-icon" />
                    <span>Limited and lack of mobility support for disabled individuals</span>
                  </li>
                  <li>
                    <CheckCircle className="list-icon" />
                    <span>Social stigma and emotional isolation faced by Persons with disabilities</span>
                  </li>
                  <li>
                    <CheckCircle className="list-icon" />
                    <span>Exclusion from health funding and services</span>
                  </li>
                  <li>
                    <CheckCircle className="list-icon" />
                    <span>Lack of vocational access and economic opportunity</span>
                  </li>
                  <li>
                    <CheckCircle className="list-icon" />
                    <span>Invisibility in policymaking and community planning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;