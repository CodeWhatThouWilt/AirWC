import './SpotListing.css';
import { Link } from 'react-router-dom';

const SpotListing = ({ details }) => {
    console.log(details);
    return (
        <Link to={`/spots/${details.id}`} >
            <div>
                <div>{details.name}</div>
                <img src={details.Images[0] ? details.Images[0].url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7pqzMM1bTqxAEkWQ3YHT4pdXByPaZQRYzmA&usqp=CAU'} alt='spot pic' />
            </div>
        </Link>
    )
}

export default SpotListing;