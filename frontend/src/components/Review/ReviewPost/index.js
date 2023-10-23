import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postReviewThunk } from "../../../store/review";
import { useModal } from "../../../context/Modal";
import { getSpotThunk } from "../../../store/spot";
import './postReview.css';

const PostReview = ({ spot }) => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [text, setText] = useState('');
  const [stars, setStars] = useState();
  const [starRating, setStarRating] = useState()
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = {
      spotId: spot.id,
      userId: user.id,
      review: text,
      stars,
    };
    const errors = {};

    if (!text) {
      errors.text = "Review text is required";
    } else if (text.length < 10) {
      errors.text = "Review text must be atleast 10 characters long";
    }
    if (!stars) {
      errors.stars = "Stars must be an integer from 1 to 5";
    }

    if (Object.values(errors).length > 0) {
      setErrors(errors);
    } else {
      await dispatch(postReviewThunk(spot, review, user));
      await dispatch(getSpotThunk(spot.id));
      closeModal();
    }
  };

  let isDisabled = true;
  if (text.length >= 10 && Object.values(errors).length === 0){
      isDisabled = false
  }

  const setStar = (num) => {
    return num <= stars ? "fa-solid fa-star" : "fa-regular fa-star";
  };

  return (
    <div className="post-review">
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmit}>
        {errors.text && <div className="errors">{errors.text}</div>}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Leave your review here..."
        />
        {errors.stars && <div className="errors">{errors.stars}</div>}
        <div className="rating-input">
          {[1, 2, 3, 4, 5].map((num) => (
            <i
              key={num}
              className={`fa-star ${setStar(num)}`}
              style={{ color: "black" }}
              onClick={() => setStars(num)}
              onMouseEnter={() => setStars(num)}
              onMouseLeave={() => setStars(num)}
            />
          ))}
          Stars
        </div>

        <button type="submit" disabled={isDisabled}>
          Submit Your Review
        </button>
      </form>
    </div>
  );
};


export default PostReview;
