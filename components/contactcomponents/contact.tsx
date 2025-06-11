'use client';
import React, { useState } from 'react';
import { useScrollAnimation, useStaggeredAnimation } from '../../src/hooks/useScrollAnimation';
import styles from './contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll animations
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.1, retriggerOnScroll: true });
  const { ref: contactCardsRef, visibleItems: visibleCards } = useStaggeredAnimation(3, 150, true);
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation({ threshold: 0.1, retriggerOnScroll: true });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', formData);
    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    
    setTimeout(() => setStatus(''), 5000);
  };
  const contactInfo = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Call Us',
      description: 'Available 24/7 for urgent matters',
      details: ['+254 123 456 789', '+254 987 654 321'],
      color: 'from-[#22c55e] to-[#f87171]',
      bgColor: 'bg-[#22c55e]/10',
      textColor: 'text-[#22c55e]'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email Us',
      description: 'We respond within 24 hours',
      details: ['info@universallighthouse.org', 'contact@universallighthouse.org'],
      color: 'from-[#22c55e] to-[#f87171]',
      bgColor: 'bg-[#22c55e]/10',
      textColor: 'text-[#22c55e]'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Visit Us',
      description: 'Come see us in person',
      details: ['Kisumu County, Kenya', 'Monday - Friday, 9AM - 5PM'],
      color: 'from-[#22c55e] to-[#f87171]',
      bgColor: 'bg-[#f87171]/10',
      textColor: 'text-[#f87171]'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className={`relative pt-24 pb-20 px-4 overflow-hidden transition-all duration-1000 ${
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#22c55e]/20 to-[#f87171]/20 rounded-full opacity-60 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-[#f87171]/20 to-[#22c55e]/20 rounded-full opacity-60 blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className={`transition-all duration-1000 delay-200 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#22c55e] to-[#f87171] bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[rgba(10,49,10,0.7)] max-w-3xl mx-auto leading-relaxed">
              We&apos;re here to support your journey towards creating positive change. 
              Reach out to us and let&apos;s make a difference together.
            </p>
          </div>          {/* Social Media Links */}
          <div className={`flex justify-center flex-wrap gap-3 mt-10 transition-all duration-1000 delay-400 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Twitter/X */}
            <button 
              className="group bg-white shadow-lg rounded-full p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              aria-label="Follow us on Twitter"
              title="Follow us on Twitter"
            >
              <svg className="w-6 h-6 text-[#22c55e] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>
            
            {/* Facebook */}
            <button 
              className="group bg-white shadow-lg rounded-full p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              aria-label="Follow us on Facebook"
              title="Follow us on Facebook"
            >
              <svg className="w-6 h-6 text-[#22c55e] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            
            {/* Instagram */}
            <button 
              className="group bg-white shadow-lg rounded-full p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              aria-label="Follow us on Instagram"
              title="Follow us on Instagram"
            >
              <svg className="w-6 h-6 text-[#22c55e] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </button>
            
            {/* LinkedIn */}
            <button 
              className="group bg-white shadow-lg rounded-full p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              aria-label="Follow us on LinkedIn"
              title="Follow us on LinkedIn"
            >
              <svg className="w-6 h-6 text-[#22c55e] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>
            
            {/* YouTube */}
            <button 
              className="group bg-white shadow-lg rounded-full p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              aria-label="Subscribe to our YouTube channel"
              title="Subscribe to our YouTube channel"
            >
              <svg className="w-6 h-6 text-[#22c55e] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </button>
            
            {/* TikTok */}
            <button 
              className="group bg-white shadow-lg rounded-full p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              aria-label="Follow us on TikTok"
              title="Follow us on TikTok"
            >
              <svg className="w-6 h-6 text-[#22c55e] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </button>
            
            {/* WhatsApp */}
            <button 
              className="group bg-white shadow-lg rounded-full p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              aria-label="Contact us on WhatsApp"
              title="Contact us on WhatsApp"
            >
              <svg className="w-6 h-6 text-[#22c55e] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
              </svg>
            </button>
            
            {/* Telegram */}
            <button 
              className="group bg-white shadow-lg rounded-full p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              aria-label="Join our Telegram channel"
              title="Join our Telegram channel"
            >
              <svg className="w-6 h-6 text-[#22c55e] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div ref={contactCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}                className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 ${
                  visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${index === 0 ? 'delay-0' : index === 1 ? 'delay-150' : 'delay-300'}`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className={`${info.bgColor} ${info.textColor} rounded-2xl p-4 w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {info.icon}
                </div>                {/* Content */}
                <h3 className="text-2xl font-bold text-[rgba(10,49,10,0.9)] mb-3 group-hover:text-[rgba(10,49,10,1)] transition-colors">
                  {info.title}
                </h3>
                <p className="text-[rgba(10,49,10,0.7)] mb-6 leading-relaxed">
                  {info.description}
                </p>

                {/* Details */}
                <div className="space-y-2">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-[rgba(10,49,10,0.8)] font-medium">
                      {detail}
                    </p>
                  ))}
                </div>

                {/* Hover Effect */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${info.color}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div
              ref={formRef}
              className={`transition-all duration-1000 ${
                formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">                <h2 className="text-3xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-[#22c55e] to-[#f87171] bg-clip-text text-transparent">
                    Send Us a Message
                  </span>
                </h2>
                <p className="text-[rgba(10,49,10,0.7)] mb-8">We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">                    <div className="group">
                      <label htmlFor="name" className="block text-sm font-semibold text-[rgba(10,49,10,0.9)] mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#22c55e] transition-colors duration-300 group-focus-within:border-[#22c55e]"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="group">
                      <label htmlFor="email" className="block text-sm font-semibold text-[rgba(10,49,10,0.9)] mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#22c55e] transition-colors duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>                  <div className="group">
                    <label htmlFor="subject" className="block text-sm font-semibold text-[rgba(10,49,10,0.9)] mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#22c55e] transition-colors duration-300"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="message" className="block text-sm font-semibold text-[rgba(10,49,10,0.9)] mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#22c55e] transition-colors duration-300 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full bg-gradient-to-r from-[#22c55e] to-[#f87171] text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <span className={`transition-opacity duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                      Send Message
                    </span>
                    {isSubmitting && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </button>

                  {status && (                    <div className={`p-4 rounded-xl text-center transition-all duration-500 ${
                      status === 'success'
                        ? 'bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30'
                        : 'bg-[#f87171]/10 text-[#f87171] border border-[#f87171]/30'
                    }`}>
                      <p className="font-medium">
                        {status === 'success' 
                          ? '✅ Thank you! Your message has been sent successfully.' 
                          : '❌ Something went wrong. Please try again.'}
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Map Section */}
            <div className={`transition-all duration-1000 delay-200 ${
              formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>              <div className="bg-white rounded-3xl p-4 shadow-xl border border-gray-100 h-full min-h-[600px]">
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255346.30717348726!2d34.60167871562499!3d-0.10417349999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182aa3e0d3d8b2c5%3A0x2bf3e4a8e3c5f5c!2sKisumu%2C%20Kenya!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                    className={`${styles.contactIframeFullheight} ${styles.contactIframe}`}
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Universal Lighthouse Location Map - Kisumu, Kenya"
                    aria-label="Interactive map showing Universal Lighthouse location in Kisumu, Kenya"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>        </div>
      </section>      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#22c55e] via-[#f87171] to-[#22c55e]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Join our community and help us create positive change in the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[rgba(10,49,10,0.9)] font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors duration-300 hover:-translate-y-1 transform shadow-lg">
              Become a Volunteer
            </button>
            <button className="border-2 border-white text-white font-semibold py-4 px-8 rounded-xl hover:bg-white hover:text-[rgba(10,49,10,0.9)] transition-all duration-300 hover:-translate-y-1 transform">
              Make a Donation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
