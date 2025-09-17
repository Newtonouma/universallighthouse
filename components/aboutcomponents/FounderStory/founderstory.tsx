import React from 'react';
import './founderstory.css';

const FounderStory: React.FC = () => {
  return (
    <div className="founder-story-wrapper">
      <div className="founder-story-container">
        <div className="story-header">
          <span className="section-badge">Our Founder</span>
          <h2 className="section-title">
            <span className="gradient-text">From Pain to Purpose</span><br />
            A Journey of Transformation
          </h2>
        </div>

        <div className="story-content">
          {/* Left Column - Story Text */}
          <div className="story-text">
            <div className="quote-section">
              <blockquote className="founder-quote">
                &ldquo;I am motivated to leave behind a legacy as a bold contributor who transformed pain into purpose. 
                Through my journey, I strive to break barriers of stigma and exclusion, to build bridges of hope, 
                and to contribute to a more equitable, inclusive, and just world.&rdquo;
              </blockquote>
            </div>

            <div className="story-paragraphs">
              <p>
                After being involved in a gruesome road accident, my life changed forever. Losing a limb felt like the end of everything I had dreamed of, but what I thought was tragedy turned into the spark that gave birth to a community of resilience, hope, and courage to thrive and dream again.
              </p>

              <p>
                From my hospital bed to taking my first steps with a prosthesis, I realized that countless others were walking a similar journey. Yet, many lacked the support, encouragement, and opportunities to rise again. I knew something had to change.
              </p>

              <p>
                The journey after limb loss is never easy. It is marked by physical pain, emotional struggles, and heavy financial burdens that extend beyond the survivor to affect the entire family. During my own healing, I saw the weight carried not only by me but also by my loved ones, who felt just as lost, vulnerable and mentally drained.
              </p>

              <p>
                Stigma, myths, and misconceptions about disability only deepen this pain, creating isolation and hopelessness. The loss of livelihood is another cruel reality, especially when the survivor is the family&rsquo;s breadwinner. Responsibilities that were once shared suddenly fall on one partner, who must now juggle caregiving with financial pressure.
              </p>

              <p>
                On top of it all, recovery is expensive. Medical costs, mobility devices, and therapy are overwhelming, and for many survivors, the hope of regaining mobility is compromised by lack of resources.
              </p>

              <p className="story-conclusion">
                These realities opened my eyes. I understood that while limb loss changes your body, it does not have to steal your dignity, your future, or your dreams. That conviction gave birth to Universal Lighthouse CBO, a beacon of hope and empowerment for limb loss survivors and their families. Our mission is to restore dignity, spark resilience, and walk with survivors beyond their loss, helping them thrive and dream again.
              </p>
            </div>
          </div>

          {/* Right Column - Founder Image */}
          <div className="founder-image-section">
            <div className="founder-image-container">
              <img
                src="/images/founder-placeholder.jpg"
                alt="Universal Lighthouse Founder and Director"
                className="founder-image"
              />
              <div className="image-overlay" />
              <div className="image-caption">
                <h4>Founder & Director</h4>
                <p>Universal Lighthouse CBO</p>
              </div>
            </div>
            
            <div className="impact-highlight">
              <h4>Transforming Lives</h4>
              <p>
                From personal tragedy to community transformation, our founder&rsquo;s journey embodies the resilience and hope that Universal Lighthouse brings to every survivor and family we serve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderStory;