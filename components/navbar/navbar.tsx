"use client";
import React, { useState } from 'react';
import styles from './Navbar.module.css';
import Image from 'next/image';
import { FaPhoneAlt, FaHandsHelping } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHelpline, setShowHelpline] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleHelpline = () => setShowHelpline(!showHelpline);

  const initiateCall = () => {
    // Replace with actual helpline number
    window.location.href = 'tel:+254728000747';
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className={styles.overlay} onClick={toggleMenu}></div>
      )}

      {/* Helpline Popup */}
      {showHelpline && (
        <div className={styles.helplinePopup}>
          <div className={styles.helplineContent}>
            <h3>Need Help?</h3>
            <p>Call our 24/7 Support Line:</p>
            <button onClick={initiateCall} className={styles.callButton}>
              <FaPhoneAlt /> Call Now: +254728000747
            </button>
            <button 
              onClick={toggleHelpline} 
              className={styles.closeButton}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <nav className={styles.navbar}>
        {/* Logo/Image Section */}
        <div className={styles.logoContainer}>
          <Image
            src="/images/Logo.png" // NGO logo
            alt="universal lighthouse logo"
            width={50}
            height={50}
            className={styles.profileImage}
            priority
          />
          <span className={styles.name}>Universal Lighthouse</span>
        </div>

        {/* Desktop Navigation */}
        <div className={styles.desktopLinks}>
          <a href="#home">Home</a>
          <a href="#about">Our Mission</a>
          <a href="#stories">Success Stories</a>
          <a href="#volunteer">Volunteer</a>
          <a href="#contact">Contact</a>
          <a 
            href="/donate" 
            className={styles.donateButton}
          >
            <FaHandsHelping /> Donate
          </a>
          <button 
            onClick={toggleHelpline} 
            className={styles.helplineButton}
          >
            <FaPhoneAlt /> Helpline
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={styles.menuButton} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Mobile Navigation */}
        <div className={`${styles.mobileLinks} ${isOpen ? styles.open : ''}`}>
          <a href="#home" onClick={toggleMenu}>Home</a>
          <a href="#about" onClick={toggleMenu}>Our Mission</a>
          <a href="#stories" onClick={toggleMenu}>Success Stories</a>
          <a href="#volunteer" onClick={toggleMenu}>Volunteer</a>
          <a href="#contact" onClick={toggleMenu}>Contact</a>
          <a 
            href="/donate" 
            className={styles.donateButton}
            onClick={toggleMenu}
          >
            <FaHandsHelping /> Donate
          </a>
          <button 
            onClick={() => {
              toggleMenu();
              toggleHelpline();
            }} 
            className={styles.helplineButton}
          >
            <FaPhoneAlt /> Emergency Helpline
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;