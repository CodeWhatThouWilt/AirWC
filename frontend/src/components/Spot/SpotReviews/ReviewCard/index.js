import './ReviewCard.css'

const ReviewCard = ({ review }) => {
    
    const dateFormat = (reviewDate) => {
        const date = new Date(reviewDate);
        const months = [
            'January', 'February', 'March',
            'April', 'May', 'June', 
            'July', 'August', 'September',
            'October', 'Novermber', 'December'
        ]
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${month} ${year}`;
    }

    return (
        <div className='review-card'>
            <div className='review-header'>
            <span className='review-name'>{review.User.firstName}</span>
            <span className='review-date'>{dateFormat(review.createdAt)}</span>
            </div>
            <div>{review.review}</div>
        </div>
    )
}

export default ReviewCard