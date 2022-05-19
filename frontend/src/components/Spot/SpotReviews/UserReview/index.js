import './UserReview.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Modal } from '../../../../context/Modal';
import CreateReviewModal from '../../../CreateReviewModal';
import EditReviewModal from '../../../EditReviewModal';
import { deleteReview } from '../../../../store/spots';
import { useDispatch } from 'react-redux';

const UserReview = ({ reviews }) => {
    const [reviewModal, setReviewModal] = useState(false);
    const [editReviewModal, setEditReviewModal] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.sessionState);
    const userId = user.user.id;
    const userReview = reviews.find(review => review.userId === userId);

    const deleteHandler = () => {
        const payload = { reviewId: userReview.id, spotId: userReview.spotId };
        dispatch(deleteReview(payload));
    };

    return (
        <>
            <div className='user-review-ctn'>
                {!userReview &&
                    <button onClick={() => setReviewModal(true)} className='user-review-btn'>
                        Leave a review
                    </button>
                }
                {userReview &&
                    <div className='user-review-btn-ctn'>
                        <button onClick={() => setEditReviewModal(true)} className='user-review-btn'>Edit Review</button>
                        <button onClick={() => deleteHandler()} className='user-review-delete-btn'>Delete Review</button>
                    </div>
                }
            </div>
            {reviewModal &&
                <Modal onClose={() => setReviewModal(false)}>
                    <CreateReviewModal setReviewModal={setReviewModal} />
                </Modal>
            }
            {editReviewModal &&
                <Modal onClose={() => setEditReviewModal(false)}>
                    <EditReviewModal setEditReviewModal={setEditReviewModal} userReview={userReview} />
                </Modal>
            }

        </>
    );
};

export default UserReview;