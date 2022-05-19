import './CreateReviewModal.css';
import { useState } from 'react';
import { createReview } from '../../store/spots';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const CreateReviewModal = ({ setReviewModal }) => {
    const [cleanliness, setCleanliness] = useState();
    const [communication, setCommunication] = useState();
    const [checkin, setCheckin] = useState();
    const [accuracy, setAccuracy] = useState();
    const [location, setLocation] = useState();
    const [value, setValue] = useState();
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

    const numValidator = (value, setState) => {
        if (value > 5 || value < 0) return;
        if (value % 1 !== 0) return;
        if (value.length === 2) return;
        setState(value);
    }

    const textValidator = (value) => {
        if (value.length > 2000) return;
        setReview(value)
    }

    const textCounter = (type) => {
        if (type === 'style') {
            return review.length > 2000 ? { color: 'red', marginLeft: '10px' } : { marginLeft: '10px' };
        } else if (type === 'text') {
            return review.length;
        };
    };

    return (
        <div className='create-review-ctn'>
            <span className='create-review-header'>New Review</span>
            <form onSubmit={(e) => submitHandler(e)}>
                <div className='review-input-ctn'>
                    <label>Cleanliness:</label>
                    <input
                        type='number'
                        placeholder='0-5'
                        required
                        value={cleanliness}
                        onChange={e => numValidator(e.target.value, setCleanliness)}
                        max='5'
                        min='0'
                    />
                </div>
                <div className='review-input-ctn'>
                    <label>Communication:</label>
                    <input
                        type='number'
                        placeholder='0-5'
                        required
                        value={communication}
                        onChange={e => numValidator(e.target.value, setCommunication)}
                        max='5'
                        min='0'
                    />
                </div>
                <div className='review-input-ctn'>
                    <label>Check-in:</label>
                    <input
                        type='number'
                        placeholder='0-5'
                        required
                        value={checkin}
                        onChange={e => numValidator(e.target.value, setCheckin)}
                        max='5'
                        min='0'
                    />
                </div>
                <div className='review-input-ctn'>
                    <label>Accuracy:</label>
                    <input
                        type='number'
                        placeholder='0-5'
                        required
                        value={accuracy}
                        onChange={e => numValidator(e.target.value, setAccuracy)}
                        max='5'
                        min='0'
                    />
                </div>
                <div className='review-input-ctn'>
                    <label>Location:</label>
                    <input
                        type='number'
                        placeholder='0-5'
                        required
                        value={location}
                        onChange={e => numValidator(e.target.value, setLocation)}
                        max='5'
                        min='0'
                    />
                </div>
                <div className='review-input-ctn'>
                    <label>Value:</label>
                    <input
                        type='number'
                        placeholder='0-5'
                        required
                        value={value}
                        onChange={e => numValidator(e.target.value, setValue)}
                        max='5'
                        min='0'
                    />
                </div>
                <div className='review-input-ctn'>
                    <label>Review: <span style={textCounter('style')}>{textCounter('text')} / 2000</span></label>
                    <textarea
                        value={review}
                        onChange={e => textValidator(e.target.value)}
                        maxLength='2000'
                        minLength='1'
                        required
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