import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotThunk, getAllSpotsThunk } from "../../store/spot";
import { getReviewsThunk } from "../../store/review";
import SpotIdReview from "./SpotReview";
import { useParams } from "react-router-dom";
import SpotImages from "./SpotImages";
import SpotReviews from "./SpotReview";
import OpenModalMenuItem from '../OpenModalButton'
import PostReview from "../ReviewPost";

const SpotId = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const spot = useSelector(state => state.spots.singleSpot);
  const userId = useSelector(state => state.session.user && state.session.user.id);
  const reviewObj = useSelector(state => state.reviews.spot);

  const reviewList = Object.values(reviewObj);

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(getReviewsThunk(spotId));
    dispatch(getSpotThunk(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!e.target.closest('.menu-container')) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const reserve = () => {
    window.alert('Feature Coming Soon...');
  };

  if (!spot || !reviewObj || !spot.Owner) {
    return null;
  }

  const newReviewList = reviewList.filter(review => review.spotId === spot.id);
  const userReview = newReviewList.find(review => review.userId === userId);


  return (
<section>
  <div className='box'>
    <div className='spot-box'>
      <h1>{spot.name}</h1>
      <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
      <SpotImages spot={spot} />
      <div className='reserve-box'>
        <div className='reserve-wrap'>
          <div className='host'>
            <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
            <div>{spot.description}</div>
          </div>
        </div>
        <div className="review">
          <div className='reserve'>
            <div className='money'>
              <div>$ {spot.price} night</div>
              {(!userId && newReviewList.length === 0) && <div>★ New</div>}
              {newReviewList.length === 1 && (
                <div>★ {spot.avgStarRating}.0 · {newReviewList.length} review</div>
              )}
              {newReviewList.length > 1 && (
                <div>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</div>
              )}
            </div>
            <button onClick={reserve}>Reserve</button>
          </div>
        </div>
      </div>
      {(!userId || newReviewList.length === 0) && <h1>★ New</h1>}
      {newReviewList.length === 1 && (
        <h1>★ {spot.avgStarRating}.0 · {newReviewList.length} review</h1>
      )}
      {newReviewList.length > 1 && (
        <h1>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</h1>
      )}
      {userId !== spot.ownerId && !userReview && userId && (
        <div className='new-post'>
          <div className='modal'>
            <OpenModalMenuItem
              buttonText="Post Your Review"
              onItemClick={closeMenu}
              modalComponent={<PostReview spot={spot} />}
            />
            {newReviewList.length === 0 && <h4>Be the first to post a review!</h4>}
          </div>
        </div>
      )}
      {userId !== spot.ownerId && (
        <SpotReviews
          spot={spot}
          newReviewList={newReviewList}
          userReview={userReview}
        />
      )}
    </div>
  </div>
</section>
  );
};

export default SpotId;

