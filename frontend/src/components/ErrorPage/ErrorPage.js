import React from "react";
import { NavLink } from "react-router-dom";
import './ErrorPage.css';

const ErrorPage = () => {
    return (
        <div className="error-page">
            <div className="content">
                <div className="image-container">
                    {/* background image */}
                </div>
                <div className="text-container">
                    <h1>Oops! We Couldn't Find That Page</h1>
                    <h2>Well, this is awkward!</h2>
                    <p>Our adorable friends was just trying to lend a paw when things got a bit chaotic. We're sorting it out.</p>
                    <NavLink to="/" className="error-button">
                        Back to home
                    </NavLink>
                </div>
            </div>
        </div>
    );
};


export default ErrorPage;