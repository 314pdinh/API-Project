import React from "react";
import { useDispatch } from "react-redux";
import { getSpotThunk } from "../../store/spot";
import { useModal } from "../../context/Modal";
import { getReviewsThunk, deleteReviewThunk } from "../../store/review";

function DeleteReview({ spot, review }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const deleted = await dispatch(deleteReviewThunk(review))
        if(deleted.id === review.id) {
            dispatch(getSpotThunk(spot.id))
            dispatch(getReviewsThunk())
            closeModal()
        }
    };

    return (
        <>
        <div className="delete">
            <h1>Confirm Delete</h1>
            <h4>Are you sure you want to remove this review?</h4>
            <form onSubmit={handleSubmit}>
                <div className='RED'>
                <button type='submit'>
                    Yes(Delete Review)
                </button>
                    </div>
                    <div className="GREY">
                <button onClick={closeModal}>
                    No(Keep Review)
                </button>
                    </div>
            </form>
            </div>
        </>
    );
}

export default DeleteReview;