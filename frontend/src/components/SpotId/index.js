import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotThunk, getAllSpotsThunk } from "../../store/spot";
import { getReviewsThunk } from "../../store/review";
import SpotIdReview from "./SpotReview";
import { useParams } from "react-router-dom";
import SpotImages from "./SpotImages";
import SpotReviews from "./SpotReview";
import OpenModalMenuItem from '../OpenModalButton'
import CreateForm from "../SpotNew";
import PostReview from "../PostReview";


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

  const totalReviews = newReviewList.length;
  const avgStarRating = spot.avgStarRating.toFixed(1);

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
            <div className='review'>
              <div className='reserve'>
                <div className='money'>
                  <div>$ {spot.price} night</div>
                  {totalReviews === 1 ? (
                    <div>★ {avgStarRating} · {totalReviews} review</div>
                  ) : (
                    <div>★ {avgStarRating} · {totalReviews} reviews</div>
                  )}
                </div>
                <button onClick={reserve}>Reserve</button>
              </div>
            </div>
          </div>
          <h1>★ {avgStarRating} · {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}</h1>
          <SpotReviews spot={spot} newReviewList={newReviewList} userReview={userReview} userId={userId} />
        </div>
        <div className='new-post'>
          {userId && !userReview && (
            <div className='modal'>
              <OpenModalMenuItem
                buttonText='Post Your Review'
                onItemClick={closeMenu}
                modalComponent={<PostReview spot={spot} />}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SpotId;
