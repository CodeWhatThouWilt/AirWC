import './CreateReviewModal.css';
import { useState } from 'react';
import { createReview } from '../../store/spots';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const CreateReviewModal = ({ setReviewModal }) => {
    const [cleanliness, setCleanliness] = useState(0);
    const [communication, setCommunication] = useState(0);
    const [checkin, setCheckin] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [location, setLocation] = useState(0);
    const [value, setValue] = useState(0);
    const [review, setReview] = useState('');
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const submitHandler = (e) => {
        e.preventDefault();
        const payload = {
            spotId,
            cleanliness,
            communication,
            checkin,
            accuracy,
            location,
            value,
            review
        }
        dispatch(createReview(payload))
        .then(() => setReviewModal(false) )
    };

    return (
        <div className='create-review-ctn'>
            <span className='create-review-header'>New Review</span>
            <form onSubmit={(e) => submitHandler(e)}>
                <div className='review-input-ctn'>
                    <label>Cleanliness:</label>
                    <input
                        type='number'
                        value={cleanliness}
                        onChange={e => setCleanliness(e.target.value)}
                        max='5'
                        min='0'
                    />
                </div>
                <div className='review-input-ctn'>
                    <label>Communication:</label>
                    <input
                        type='number'
                        value={communication}
                        onChange={e => setCommunication(e.target.value)}
                        max='5'
                        min='0'
                    />
                </div>
                <div className='review-input-ctn'>
                    <label>Check-in:</label>
                    <input
                        type='number'
                        value={checkin}
                        onChange={e => setCheckin(e.target.value)}
                        max='5'
                        min='0'
                    />
                </div>
                <div className='review-input-ctn'>
                    <label>Accuracy:</label>
                    <input
                        type='number'
                        value={accuracy}
                        onChange={e => setAccuracy(e.target.value)}
                        max='5'
                        min='0'
                    />
                </div>
                <div className='review-input-ctn'>
                    <label>Location:</label>
                    <input
                        type='number'
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        max='5'
                        min='0'
                    />
                </div>
                <div className='review-input-ctn'>
                    <label>Value:</label>
                    <input
                        type='number'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        max='5'
                        min='0'
                    />
                </div>
                <div className='review-input-ctn'>
                    <label>Review:</label>
                    <textarea
                        value={review}
                        onChange={e => setReview(e.target.value)}
                        maxLength='2000'
                    />
                </div>
                <div className='create-review-btn-ctn'>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CreateReviewModal;