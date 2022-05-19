import './SpotListing.css';
import { Link } from 'react-router-dom';

const SpotListing = ({ details }) => {
    const images = Object.values(details.Images);

    const favoriteStyle = () => {
        
    }

    return (
        <div className='listing-card'>
            <Link to={`/spots/${details.id}`} className='listing-card-link' >
                <img src={images.length ? images[0].url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7pqzMM1bTqxAEkWQ3YHT4pdXByPaZQRYzmA&usqp=CAU'} alt='spot pic' />
                <div className='listing-details-container'>
                    <span className='listing-name' >{details.name}</span>
                    <div className='listing-price' ><span>{`$${details.price}`}</span> / 5 min</div>
                    <div className='listing-fav-ctn'>
                        <i class="fa-regular fa-heart listing-fav"></i>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default SpotListing;