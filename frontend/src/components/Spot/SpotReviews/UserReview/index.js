import './UserReview.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Modal } from '../../../../context/Modal';
import CreateReviewModal from '../../../CreateReviewModal';

const UserReview = ({ reviews }) => {
    const [reviewModal, setReviewModal] = useState(false);
    const user = useSelector(state => state.sessionState.id);
    const usersReview = reviews.find(review => review.userId === user);

    return (
        <>
            <div className='user-review-ctn'>
                {!usersReview &&
                    <button onClick={() => setReviewModal(true)} className='user-review-btn'>
                        Leave a review
                    </button>
                }
                {usersReview &&
                    <div className='user-review-btn-ctn'>
                        <button className='user-review-btn'>Edit Review</button>
                        <button className='user-review-delete-btn'>Delete Review</button>
                    </div>
                }
            </div>
            {reviewModal &&
                <Modal onClose={() => setReviewModal(false)}>
                    <CreateReviewModal setReviewModal={setReviewModal} />
                </Modal>
            }
        </>
    );
};

export default UserReview;