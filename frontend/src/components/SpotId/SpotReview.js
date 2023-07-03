import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotThunk, getAllSpotsThunk, createSpotThunk } from "../../store/spot";
import { getReviewsThunk } from "../../store/review";
import { useParams, useHistory } from "react-router-dom";

const SpotIdReview = ({ spotId }) => {
    const review = useSelector((state) => state.reviews.spot);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getReviewsThunk(spotId));
    }, [dispatch, spotId]);
  
    return (
      <div className="reviews-list">
        {Object.values(review).map(({ id, User: { firstName }, review }) => [
          <h3 className="reviewUser-name" key={`${id}-name`}>{firstName}</h3>,
          <h4 key={`${id}-date`}>July 2020</h4>,
          <p key={`${id}-review`}>{review}</p>
        ])}
      </div>
    );
  };
  
  export default SpotIdReview;