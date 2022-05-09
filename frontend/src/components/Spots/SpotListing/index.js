import './SpotListing.css';
import { Link } from 'react-router-dom';

const SpotListing = ({ details }) => {
    const images = Object.values(details.Images);
    return (
        <div className='listing-card' >
            <Link to={`/spots/${details.id}`} className='listing-card-link' >
                <div className='listing-card-background'>
                    <img src={images.length ? images[0].url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7pqzMM1bTqxAEkWQ3YHT4pdXByPaZQRYzmA&usqp=CAU'} alt='spot pic' />
                    <div className='listing-details-container'>
                        <span className='listing-name' >{details.name}</span>
                        <span className='listing-price' >{`$${details.price} / 5 min`}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default SpotListing;