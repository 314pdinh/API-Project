import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsThunk, getCurrentUserReviewThunk } from '../../store/review';
import OpenModalMenuItem from '../OpenModalButton';
import DeleteReview from "../DeleteReview";
import UpdateReviewForm from "../UpdateReview";

function ManageReviews() {
  const dispatch = useDispatch();
  const reviewObj = useSelector(state => state.reviews.user);
  const user = useSelector(state => state.session.user);
  const list = Object.values(reviewObj);

  const reviewList = list.filter((review) => review.userId === user.id);

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(getCurrentUserReviewThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!e.target.closest(".manage-reviews")) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  if (!reviewList.length) {
    return null;
  }

  const sortedReviews = reviewList.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="manage-reviews">
      <div className="manages">
        <h1>Manage Reviews</h1>
      </div>
      <ul>
        {sortedReviews.map((review) => (
          <div key={review.id} className="review">
            <h3>{review.Spot && review.Spot.name}</h3>
            <div className="date">{new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(review.createdAt))} {review.createdAt && review.createdAt.split('-')[0]}</div>
            <div className="review-text">{review.review}</div>
            <div className="buttons">
              <OpenModalMenuItem
                buttonText="Update"
                onItemClick={closeMenu}
                modalComponent={<UpdateReviewForm
                  review={review}
                  spot={review.Spot}
                />}
              />
              <OpenModalMenuItem
                buttonText="Delete"
                onItemClick={closeMenu}
                modalComponent={<DeleteReview
                  review={review}
                  spot={review.Spot}
                />}
              />
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ManageReviews;
