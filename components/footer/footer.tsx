"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from './footer.module.css';

const footerLinks = {
  "Quick Links": ["Home Page", "About Us", "Appointment", "News & Blog", "Testimonials"],
  "Our Services": ["Donation Online", "Donor Centres", "Volunteering", "Your Philanthropy", "Senior Care"],
  "Contact Us": [
    { icon: "📧", label: "info@universallighthouse.org" },
    { icon: "📍", label: "Friends Quakers Church Compound, Next to Kisumu National Library" },
    { icon: "📞", label: "+254 728 000 747" }
  ],
};

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleAccordion = (title: string) => {
    setOpenSection(openSection === title ? null : title);
  };

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerWrapper}>
        <div className={styles.footerGrid}>
          {/* Logo and Text */}
          <div className={styles.footerBrand}>
            <h2 className={styles.footerLogo}>
              <span className={styles.footerLogoIcon}></span> Universal Lighthouse 
            </h2>
            <p className={styles.footerDescription}>
              Universal Lighthouse fosters inclusive communities by designing programs that eliminate disability stigma, registered under the Ministry of Labour and Social Protection
            </p>
            <div className={styles.footerSocials}>
              {["facebook", "instagram", "twitter", "github"].map((platform) => (
                <a 
                  key={platform} 
                  href="#" 
                  aria-label={platform}
                  className={styles.socialIcon}
                >
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
            <div key={section} className={styles.footerSection}>
              {/* Desktop */}
              <div className={styles.footerSectionDesktop}>
                <h3 className={styles.footerHeading}>{section}</h3>
                <ul className={styles.footerLinks}>
                  {Array.isArray(links) &&
                    links.map((item, idx) =>
                      typeof item === "string" ? (
                        <li key={idx}>
                          <a href="#" className={styles.footerLink}>
                            {item}
                          </a>
                        </li>
                      ) : (
                        <li key={idx} className={styles.footerContactItem}>
                          <span className={styles.contactIcon}>{item.icon}</span>
                          <span>{item.label}</span>
                        </li>
                      )
                    )}
                </ul>
              </div>

              {/* Mobile Accordion */}
              <div className={styles.footerSectionMobile}>
                <button 
                  className={styles.footerAccordionBtn} 
                  onClick={() => toggleAccordion(section)}
                >
                  {section}
                  <ChevronDown 
                    className={`${styles.footerChevron} ${openSection === section ? styles.rotate : ''}`} 
                    size={18}
                  />
                </button>
                {openSection === section && (
                  <ul className={styles.footerAccordionContent}>
                    {Array.isArray(links) &&
                      links.map((item, idx) =>
                        typeof item === "string" ? (
                          <li key={idx}>
                            <a href="#" className={styles.footerLink}>
                              {item}
                            </a>
                          </li>
                        ) : (
                          <li key={idx} className={styles.footerContactItem}>
                            <span className={styles.contactIcon}>{item.icon}</span>
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
        <div className={styles.footerBottom}>
          <p>© 2025 Universal Lighthouse , Inc. All Rights Reserved.</p>
          <div className={styles.footerBottomLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;