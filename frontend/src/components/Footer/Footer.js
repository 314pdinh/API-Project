import React from 'react';
import './Footer.css';  // Import your CSS file for styling

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <ul>
                        <li style={{ fontWeight: 'bold', fontSize: '18px' }}>Support</li>
                        <li><a href="/">HelpCenter</a></li>
                        <li><a href="/">AirCover</a></li>
                        <li><a href="/">Anti-discrimination</a></li>
                        <li><a href="/">Disability support</a></li>
                        <li><a href="/">Cancellation options</a></li>
                        <li><a href="/">Report neighborhood concern</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <ul>
                        <li style={{ fontWeight: 'bold', fontSize: '18px' }}>Hosting</li>
                        <li><a href="/">Airbnb your home</a></li>
                        <li><a href="/">AirCover for Hosts</a></li>
                        <li><a href="/">Hosting resources</a></li>
                        <li><a href="/">Community forum</a></li>
                        <li><a href="/">Hosting responsibility</a></li>
                        <li><a href="/">Airbnb-friendly apartments</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <ul>
                        <li style={{ fontWeight: 'bold', fontSize: '18px' }}>About</li>
                        <li><a href="/">Newsroom</a></li>
                        <li><a href="/">new features</a></li>
                        <li><a href="/">Careers</a></li>
                        <li><a href="/">Investors</a></li>
                        <li><a href="/">Gift cards</a></li>
                        <li><a href="/">Airbnb.org emergency stays</a></li>
                    </ul>
                </div>
            </div>
            
            <hr />

            <div className="footer-bottom">
                <p>&copy; 2023 314pdinh, Inc. All rights reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
