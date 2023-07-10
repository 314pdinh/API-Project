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
        const deleteRev = await dispatch(deleteReviewThunk(review))
        if (deleteRev.id === review.id) {
            dispatch(getSpotThunk(spot.id))
            dispatch(getReviewsThunk())
            closeModal()
        }
    };

    return (
        <>
            <div className="delete-box">
                <h1>Confirm Delete</h1>
                <h4>Are you sure you want to delete this review?</h4>
                <form onSubmit={handleSubmit}>
                    <div className='yes'>
                        <button type='submit'>
                            Yes(Delete Review)
                        </button>
                    </div>
                    <div className="no">
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