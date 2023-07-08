import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotThunk, getAllSpotsThunk, deleteSpotThunk } from "../../store/spot";
import { useModal } from "../../context/Modal";
import { getReviewsThunk } from "../../store/review";
import { useParams } from "react-router-dom";

function DeleteSpot({ spot }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault()
        return dispatch(deleteSpotThunk(spot))
            .then(closeModal)
    };

    return (
        <>
        <div className="delete-box">
            <h1>Confirm Delete</h1>
            <h4>Are you sure you want to remove this spot from the listings?</h4>
            <form onSubmit={handleSubmit}>
                <div className='RED'>
                <button type='submit'>
                    Yes(Delete Spot)
                </button>
                    </div>
                    <div className="GREY">
                <button onClick={closeModal}>
                    No(Keep Spot)
                </button>
                    </div>
            </form>
            </div>
        </>
    );
}

export default DeleteSpot;