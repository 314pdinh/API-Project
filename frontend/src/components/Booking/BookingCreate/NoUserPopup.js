import React, { useEffect, useState } from "react";
import './NoUserPopup.css';


const NoUserPopup = ({ onClose }) => {

    return (
        <div className="no-user-popup">
            <div className="popup-content">
                <p>You must sign up or log in to make a reservation.</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default NoUserPopup;