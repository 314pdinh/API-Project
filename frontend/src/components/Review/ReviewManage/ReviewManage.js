import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserReviewThunk } from '../../../store/review';
import DeleteReview from '../ReviewDelete';
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import './ReviewManage.css';

const ManageReview = () => {
    const ref = useRef();
    const dispatch = useDispatch();
    const reviewObj = useSelector(state => state.reviews.user);

    const user = useSelector(state => state.session.user);

    const list = useSelector(state => Object.values(reviewObj));

    const [menu, setMenu] = useState(false);

    const reviewList = list.filter(review => review.userId === user.id);

    useEffect(() => {
        dispatch(getCurrentUserReviewThunk());
    }, [dispatch]);

    useEffect(() => {
        if (!menu) return;

        const exitMenu = (e) => {
            if (!ref.current.contains(e.target)) {
                setMenu(false);
            }
        }

        document.addEventListener("click", exitMenu);

        return () => document.removeEventListener("click", exitMenu);
    }, [menu]);

    const exitMenu = () => setMenu(false);


    const sortedReviews = reviewList.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    if (!reviewList) {
        return null;
    }

    return (
        <main>
            <div className="manage-outer-container">

                <div className="manage">
                    <h1>Manage Your Reviews</h1>
                </div>
                <ul className="manage-reviews-container">
                    {reviewList.length > 0 ? (
                        reviewList.map(review => (
                            <div key={review.id} className="review">

                                <h3>{review.Spot && review.Spot.name}</h3>

                                <div className="review-text">{review.review}</div>

                                {/* <div className="buttons-del-update">

                                <OpenModalMenuItem
                                    buttonText="Delete"
                                    onItemClick={exitMenu}
                                    modalComponent={<DeleteReview review={review} spot={review.spot} />}
                                />

                            </div> */}
                            </div>
                        ))
                    ) : (
                        <p>You have no reviews.</p>
                    )}
                </ul>
            </div>

        </main>
    );
}

export default ManageReview;