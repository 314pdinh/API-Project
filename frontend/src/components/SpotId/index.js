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
import './Spot.css';

const SpotId = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const spot = useSelector(state => state.spots.singleSpot);
  const userId = useSelector(state => state.session.user && state.session.user.id);
  const reviewObj = useSelector(state => state.reviews.spot);

  const reviewList = Object.values(reviewObj);

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(getReviewsThunk(parseInt(spotId)));
    dispatch(getSpotThunk(parseInt(spotId)));
  }, [dispatch, spotId]);

  useEffect(() => {
    const closeMenu = (e) => {
      if (e.target.closest('.box')) return;
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, []);

  const closeMenu = () => setShowMenu(false);

  const reserve = () => {
    window.alert('Feature Coming Soon...');
  };

  if (!spot || !reviewObj || !spot.Owner) {
    return null;
  }

  const newReviewList = reviewList.filter((review) => review.spotId === spot.id);
  const userReview = newReviewList.find((review) => review.userId === userId);

  const shouldRenderReviewForm = !userId && newReviewList.length === 0;







  if (!userId) {
    if (newReviewList.length === 0) {
      return (
        <section>
          <div className='box'>
            <div className='spot-box'>
              <h1>{spot.name}</h1>
              <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
              <SpotImages
                spot={spot}
              />
              <div className='header-host'>
                <div className='host-side'>
                  <div className='host'>
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <div>{spot.description}</div>
                  </div>
                </div>
                <div className="review">
                  <div className='reserve'>
                    <div className='money'>
                      <div>$ {spot.price} night</div>
                      <div>★ New</div>
                    </div>
                    <button onClick={reserve}>Reserve</button>
                  </div>
                </div>
              </div>
              <h1>★ New</h1>
            </div>
          </div>
        </section>
      )
    }

    else {
      return (
        <section>
          <div className='box'>
            <div className='spot-box'>
              <h1>{spot.name}</h1>
              <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
              <SpotImages
                spot={spot}
              />
              <div className='header-host'>
                <div className='host-side'>
                  <div className='host'>
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <div>{spot.description}</div>
                  </div>
                </div>
                <div className="review">
                  <div className='reserve'>
                    <div className='money'>
                      <div>$ {spot.price} night</div>
                      {newReviewList.length === 1 &&
                        <div>★ {spot.avgStarRating}.0 · {newReviewList.length} review</div>
                      }
                      {newReviewList.length > 1 &&
                        <div>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</div>
                      }
                    </div>
                    <button onClick={reserve}>Reserve</button>
                  </div>
                </div>

              </div>
              {newReviewList.length === 1 &&
                <h1>★ {spot.avgStarRating}.0 · {newReviewList.length} review</h1>
              }
              {newReviewList.length > 1 &&
                <h1>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</h1>
              }
              <SpotReviews
                spot={spot}
                newReviewList={newReviewList}
                userReview={userReview}
              />
            </div>
          </div>
        </section>
      )
    }
  }

  if (userId !== spot.ownerId) {
    if (!userReview && userId && newReviewList.length === 0) {
      return (
        <section>
          <div className='box'>
            <div className='spot-box'>
              <h1>{spot.name}</h1>
              <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
              <SpotImages
                spot={spot}
              />
              <div className='header-host'>
                <div className='host-side'>
                  <div className='host'>
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <div>{spot.description}</div>
                  </div>
                </div>
                <div className="review">
                  <div className='reserve'>
                    <div className='money'>
                      <div>$ {spot.price} night</div>
                      <div>★ New</div>
                    </div>
                    <button onClick={reserve}>Reserve</button>
                  </div>
                </div>
              </div>

            </div>
            <div className='new-post'>
              <h1>★ New</h1>
              <div className='post-review-modal'>
                <OpenModalMenuItem
                  buttonText="Post Your Review"
                  onItemClick={closeMenu}
                  modalComponent={<PostReview
                    spot={spot}
                  />}
                />
                <h4>Be the first to post a review!</h4>
              </div>
            </div>
          </div>
        </section>
      )
    }

    if (!userReview && userId && newReviewList.length > 0) {
      return (
        <section>
          <div className='box'>
            <div className='spot-box'>
              <h1>{spot.name}</h1>
              <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
              <SpotImages
                spot={spot}
              />
              <div className='header-host'>
                <div className='host-side'>
                  <div className='host'>
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <div>{spot.description}</div>
                  </div>
                </div>
                <div className="review">
                  <div className='reserve'>
                    <div className='money'>
                      <div>$ {spot.price} night</div>
                      {newReviewList.length === 1 &&
                        <div>★ {spot.avgStarRating}.0 · {newReviewList.length} review</div>
                      }
                      {newReviewList.length > 1 &&
                        <div>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</div>
                      }
                    </div>
                    <button onClick={reserve}>Reserve</button>
                  </div>

                </div>
              </div>
              {newReviewList.length === 1 &&
                <h1>★ {spot.avgStarRating}.0 · {newReviewList.length} review</h1>
              }
              {newReviewList.length > 1 &&
                <h1>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</h1>
              }
              <div className='new-post'>
                <div className='post-review-modal'>
                  <OpenModalMenuItem
                    buttonText="Post Your Review"
                    onItemClick={closeMenu}
                    modalComponent={<PostReview
                      spot={spot}
                    />}
                  />
                </div>
              </div>
            </div>
            <SpotReviews
              spot={spot}
              newReviewList={newReviewList}
              userReview={userReview}
            />
          </div>
        </section>
      )
    }

    if (!userReview && userId && newReviewList.length > 0) {
      return (
        <section>
          <div className='box'>
            <div className='spot-box'>
              <h1>{spot.name}</h1>
              <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
              <SpotImages
                spot={spot}
              />
              <div className='header-host'>
                <div className='host-side'>
                  <div className='host'>
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <div>{spot.description}</div>
                  </div>
                </div>
                <div className="review">
                  <div className='reserve'>
                    <div className='money'>
                      <div>$ {spot.price} night</div>
                      {newReviewList.length === 1 &&
                        <div>★ {spot.avgStarRating}.0 · {newReviewList.length} review</div>
                      }
                      {newReviewList.length > 1 &&
                        <div>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</div>
                      }
                    </div>
                    <button onClick={reserve}>Reserve</button>
                  </div>
                </div>

                {newReviewList.length === 1 &&
                  <h1>★ {spot.avgStarRating}.0 · {newReviewList.length} review</h1>
                }
                {newReviewList.length > 1 &&
                  <h1>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</h1>
                }

              </div>
              <div className='new-post'>
                <div className='post-review-modal'>
                  <OpenModalMenuItem
                    buttonText="Post Your Review"
                    onItemClick={closeMenu}
                    modalComponent={<PostReview
                      spot={spot}
                    />}
                  />
                </div>
              </div>
            </div>
            <SpotReviews
              spot={spot}
              newReviewList={newReviewList}
              userReview={userReview}
            />
          </div>
        </section>
      )
    }


    else {
      return (
        <section>
          <div className='box'>
            <div className='spot-box'>
              <h1>{spot.name}</h1>
              <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
              <SpotImages
                spot={spot}
              />
              <div className='header-host'>
                <div className='host-side'>
                  <div className='host'>
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <div>{spot.description}</div>
                  </div>
                </div>
                <div className="review">
                  <div className='reserve'>
                    <div className='money'>
                      <div>$ {spot.price} night</div>
                      {newReviewList.length === 0 &&
                        <div>★ New</div>
                      }
                      {newReviewList.length === 1 &&
                        <div>★ {spot.avgStarRating}.0 · {newReviewList.length} review</div>
                      }
                      {newReviewList.length > 1 &&
                        <div>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</div>
                      }
                    </div>
                    <button onClick={reserve}>Reserve</button>
                  </div>
                </div>
              </div>
              {newReviewList.length === 1 &&
                <h1>★ {spot.avgStarRating}.0 · {newReviewList.length} review</h1>
              }
              {newReviewList.length > 1 &&
                <h1>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</h1>
              }
              <SpotReviews
                spot={spot}
                newReviewList={newReviewList}
                userReview={userReview}
                userId={userId}
              />
            </div>
          </div>
        </section>
      )
    }
  }


  else if (userId === spot.ownerId) {
    return (
      <section>
        <div className='box'>
          <div className='spot-box'>
            <h1>{spot.name}</h1>
            <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
            <SpotImages
              spot={spot}
            />
            <div className='header-host'>
              <div className='host-side'>
                <div className='host'>
                  <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                  <div>{spot.description}</div>
                </div>
              </div>
              <div className="review">
                <div className='reserve'>
                  <div className='money'>
                    <div>$ {spot.price} night</div>
                    {newReviewList.length === 0 &&
                      <div>★ New</div>
                    }
                    {newReviewList.length === 1 &&
                      <div>★ {spot.avgStarRating}.0 · {newReviewList.length} review</div>
                    }
                    {newReviewList.length > 1 &&
                      <div>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</div>
                    }
                  </div>
                  <button onClick={reserve}>Reserve</button>
                </div>
              </div>
            </div>
            {newReviewList.length === 0 &&
              <h1>★ New</h1>
            }
            {newReviewList.length === 1 &&
              <h1>★ {spot.avgStarRating}.0 · {newReviewList.length} review</h1>
            }
            {newReviewList.length > 1 &&
              <h1>★ {spot.avgStarRating.toFixed(1)} · {newReviewList.length} reviews</h1>
            }
            {newReviewList.length > 0 &&
              <SpotReviews
                spot={spot}
                newReviewList={newReviewList}
                userReview={userReview}
                userId={userId}
              />
            }
          </div>
        </div>
      </section>
    )
  }
};

export default SpotId;

