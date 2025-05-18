'use client';
import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setStatus('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <div className="pt-24 mx-auto px-4 py-16 bg-[rgba(10,49,10,0.05)] font-['Montserrat']">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#22c55e] to-[#f87171] bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <p className="text-lg text-[rgba(10,49,10,0.8)] max-w-2xl mx-auto">
          We are here to help and answer any questions you might have
        </p>
      </div>

      {/* Contact Cards */}
      <div className="flex flex-col md:flex-row gap-8 justify-center mb-20">
        {/* Phone Card */}
        <div className="flex-1 bg-white rounded-xl shadow-md overflow-hidden p-8 min-w-[300px] border border-[rgba(10,49,10,0.1)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex flex-col h-full">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
              <FaPhone className="text-blue-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-[rgba(10,49,10,0.9)] mb-2">24/7 Service</h3>
            <p className="text-[rgba(10,49,10,0.7)] mb-6">Call Us Today</p>
            <div className="space-y-2 mt-auto">
              <p className="text-gray-800">+00 123 456 789</p>
              <p className="text-gray-800">+00 987 654 321</p>
            </div>
          </div>
        </div>

        {/* Email Card */}
        <div className="flex-1 bg-white rounded-xl shadow-md overflow-hidden p-8 min-w-[300px] border border-[rgba(10,49,10,0.1)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex flex-col h-full">
            <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
              <FaEnvelope className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-[rgba(10,49,10,0.9)] mb-2">Drop Line</h3>
            <p className="text-[rgba(10,49,10,0.7)] mb-6">Mail Information</p>
            <div className="space-y-2 mt-auto">
              <p className="text-gray-800">info@charity.com</p>
              <p className="text-gray-800">info.charity@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Address Card */}
        <div className="flex-1 bg-white rounded-xl shadow-md overflow-hidden p-8 min-w-[300px] border border-[rgba(10,49,10,0.1)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex flex-col h-full">
            <div className="bg-orange-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
              <FaMapMarkerAlt className="text-orange-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-[rgba(10,49,10,0.9)] mb-2">Address</h3>
            <p className="text-[rgba(10,49,10,0.7)] mb-6">Our Location</p>
            <div className="space-y-2 mt-auto">
              <p className="text-gray-800">8708 Technology Forest Pl</p>
              <p className="text-gray-800">Suite 125 -G</p>
              <p className="text-gray-800">The Woodlands, TX 77381</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map and Contact Form */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Map Section */}
        <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-md border border-[rgba(10,49,10,0.1)]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.771036399593!2d-95.54882368489215!3d29.73323498200383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640db3e2e8e5c9f%3A0x4b1e4e8e4a9e3c1d!2s8708%20Technology%20Forest%20Pl%20Suite%20125%2C%20The%20Woodlands%2C%20TX%2077381!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-8 border border-[rgba(10,49,10,0.1)]">
          <h2 className="text-2xl font-bold text-[rgba(10,49,10,0.9)] mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[rgba(10,49,10,0.7)] mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[rgba(10,49,10,0.2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[rgba(10,49,10,0.7)] mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[rgba(10,49,10,0.2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[rgba(10,49,10,0.7)] mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[rgba(10,49,10,0.2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-transparent"
                placeholder="How can we help you?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#22c55e] to-[#f87171] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Send Message
            </button>

            {status && (
              <div className={`mt-4 p-3 rounded-lg text-center ${
                status.includes('Thank you') 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                <p className="text-sm">{status}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;