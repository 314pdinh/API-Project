import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateReviewThunk } from '../../store/review';
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getCurrentUserReviewThunk } from "../../store/review";

const UpdateReviewForm = ({ review, spot }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [text, setText] = useState(review && review.review);
  const [stars, setStars] = useState(review && review.stars);
  const [errors, setErrors] = useState({});
  const user = useSelector(state => state.session.user);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewObj = {
      ...review,
      spotId: spot.id,
      userId: user.id,
      review: text,
      stars,
    };

    const newErrors = {};

    if (!text) {
      newErrors.text = 'Review text is required';
    }
    if (!stars) {
      newErrors.stars = "Stars must be an integer from 1 to 5";
    }

    if (Object.values(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      await dispatch(updateReviewThunk(reviewObj));
      await dispatch(getCurrentUserReviewThunk());
      closeModal();
    }
  };

  const setStar = (num) => {
    return num <= stars ? "fa-solid fa-star" : "fa-regular fa-star";
  };

  const isDisabled = !text || text.length <= 10 || Object.values(errors).length > 0;

  return (
    <div className="post-review">
      <h1>How was your stay at {spot.name}?</h1>
      <form onSubmit={handleSubmit}>
        <div className="errors">{errors.text}</div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="errors">{errors.stars}</div>
        <div className="rating-input">
          {[1, 2, 3, 4, 5].map((num) => (
            <i
              key={num}
              className={`fa-regular fa-star ${setStar(num)}`}
              style={{ color: 'black' }}
              onClick={() => setStars(num)}
            //   onMouseEnter={() => setStars(num)}
              onMouseLeave={() => setStars(stars)}
            />
          ))}
          Stars
        </div>
        <button type='submit' disabled={isDisabled}>Update Your Review</button>
      </form>
    </div>
  );
};

export default UpdateReviewForm;
