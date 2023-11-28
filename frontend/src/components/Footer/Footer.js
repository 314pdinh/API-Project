import React from 'react';

import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <ul>
                        <li style={{ fontWeight: 'bold', fontSize: '18px' }}>Support</li>
                        <li><a href="/e">HelpCenter</a></li>
                        <li><a href="/e">AirCover</a></li>
                        <li><a href="/e">Anti-discrimination</a></li>
                        <li><a href="/e">Disability support</a></li>
                        <li><a href="/e">Cancellation options</a></li>
                        <li><a href="/e">Report neighborhood concern</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <ul>
                        <li style={{ fontWeight: 'bold', fontSize: '18px' }}>Hosting</li>
                        <li><a href="/e">Airbnb your home</a></li>
                        <li><a href="/e">AirCover for Hosts</a></li>
                        <li><a href="/e">Hosting resources</a></li>
                        <li><a href="/e">Community forum</a></li>
                        <li><a href="/e">Hosting responsibility</a></li>
                        <li><a href="/e">Airbnb-friendly apartments</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <ul>
                        <li style={{ fontWeight: 'bold', fontSize: '18px' }}>About</li>
                        <li><a href="/e">Newsroom</a></li>
                        <li><a href="/e">new features</a></li>
                        <li><a href="/e">Careers</a></li>
                        <li><a href="/e">Investors</a></li>
                        <li><a href="/e">Gift cards</a></li>
                        <li><a href="/e">Airbnb.org emergency stays</a></li>
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
