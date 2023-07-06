import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotThunk, getAllSpotsThunk, createSpotThunk } from "../../store/spot";
import { getReviewsThunk } from "../../store/review";
import { useParams, useHistory } from "react-router-dom";
import PostReview from "./PostReview";
import OpenModalButton from "../OpenModalButton";

const SpotIdReview = ({ spotId }) => {
  const review = useSelector((state) => state.reviews.spot);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviewsThunk(spotId));
    dispatch(getSpotThunk(spotId));
  }, [dispatch, spotId]);


  const oneSpot = useSelector((state) => state.spots.singleSpot);
  const userId = useSelector((state) => state.session.user);

  const reviewId = Object.values(review);
  let userReview = null;
  if(userId) {
    userReview = reviewId.find((review) => review.User && review.User.id === userId.id);
  }
  let isSpotOwner = false;
  if (userId && oneSpot && oneSpot.Owner) {
    isSpotOwner = userId.id === oneSpot.Owner.id;
  }


  return (
    <>
    {!userReview && !isSpotOwner && (
      <div>
        <OpenModalButton
          buttonText='Post Your Review'
          modalComponent={<PostReview spotId={spotId} />}
        />
        {!reviewId.length && (
          <p>Be the first to post a review!</p>
        )}
      </div>
    )}
      
      <div className="reviews-list">
        {reviewId.map((review) => (
          <div key={review.id}>
          <h3 className="reviewUser-name">{review.User && review.User.firstName}
          </h3>
          <h4>July 2020</h4>
          <p>{review.review}</p>
          </div>
        ))}
      </div>

    </>
  );
};

export default SpotIdReview;