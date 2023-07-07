import React, { useEffect, useState } from "react";
import DeleteReview from "../DeleteReview";
import OpenModalMenuItem from '../OpenModalButton';

const SpotReviews = ({ spot, newReviewList, userReview, userId }) => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!e.target.closest(".menu-container")) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  if (!newReviewList) {
    return null;
  }

  return (
    <>
      <ul>
        {newReviewList.length > 0 && newReviewList.map(review => (
          <li key={review.id}>
            <div>{review.User && review.User.firstName}</div>
            {review.createdAt.split('-')[1] && (
              <div className="date">
                {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(review.createdAt))}
                {' '}
                {new Date(review.createdAt).getFullYear()}
              </div>
            )}
            <div>{review.review}</div>
            {userReview && userId && review.userId === userId && (
              <div className='modal'>
                <OpenModalMenuItem
                  buttonText="Delete"
                  onItemClick={closeMenu}
                  modalComponent={<DeleteReview review={review} spot={spot} />}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default SpotReviews;
