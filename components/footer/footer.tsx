
"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./footer.css";

const footerLinks = {
  "Quick Links": ["Home Page", "About Us", "Appointment", "News & Blog", "Testimonials"],
  "Our Services": ["Donation Online", "Donor Centres", "Volunteering", "Your Philanthropy", "Senior Care"],
  "Contact Us": [
    { icon: "📧", label: "support@charity.com" },
    { icon: "📍", label: "8708 Technology Forest Pl Suite 125-G, The Woodlands, TX 773" },
    { icon: "📞", label: "123-456-7890" },
  ],
};

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleAccordion = (title: string) => {
    setOpenSection(openSection === title ? null : title);
  };

  return (
    <footer className="footer-container">
      <div className="footer-wrapper">
        <div className="footer-grid">
          {/* Logo and Text */}
          <div>
            <h2 className="footer-logo">
              <span className="footer-logo-icon">🤝</span> Helpy
            </h2>
            <p className="footer-description">
              Now the time act because every second counts, and contribution brings one step closer a brighter
              future. Join us today & difference.
            </p>
            <div className="footer-socials">
              {["facebook", "instagram", "twitter", "github"].map((platform) => (
                <a key={platform} href="#" aria-label={platform}>
                  {platform === "facebook" && "🌐"}
                  {platform === "instagram" && "📸"}
                  {platform === "twitter" && "🐦"}
                  {platform === "github" && "💻"}
                </a>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              {/* Desktop */}
              <div className="footer-section-desktop">
                <h3 className="footer-heading">{section}</h3>
                <ul>
                  {Array.isArray(links) &&
                    links.map((item, idx) =>
                      typeof item === "string" ? (
                        <li key={idx}>
                          <a href="#" className="footer-link">
                            {item}
                          </a>
                        </li>
                      ) : (
                        <li key={idx} className="footer-contact-item">
                          <span>{item.icon}</span>
                          <span>{item.label}</span>
                        </li>
                      )
                    )}
                </ul>
              </div>

              {/* Mobile Accordion */}
              <div className="footer-section-mobile">
                <button className="footer-accordion-btn" onClick={() => toggleAccordion(section)}>
                  {section}
                  <ChevronDown className={`footer-chevron ${openSection === section ? "rotate" : ""}`} />
                </button>
                {openSection === section && (
                  <ul className="footer-accordion-content">
                    {Array.isArray(links) &&
                      links.map((item, idx) =>
                        typeof item === "string" ? (
                          <li key={idx}>
                            <a href="#" className="footer-link">
                              {item}
                            </a>
                          </li>
                        ) : (
                          <li key={idx} className="footer-contact-item">
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                          </li>
                        )
                      )}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <p>© 2025 Helpy, Inc. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
