import './FavoriteButton.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createFavorite, deleteFavorite } from '../../store/favorites';

const FavoriteButton = ({ type, spot }) => {
    const dispatch = useDispatch();
    const favorite = useSelector(state => state.favoritesState);
    const userFav = favorite[spot.id];

    const newFav = () => {
        dispatch(createFavorite(spot.id));
    };

    const deleteFav = () => {
        dispatch(deleteFavorite(userFav.id));
    };

    const favoriteStyle = () => {
        if (userFav) {
            return <i onClick={() => deleteFav()} className="fa-solid fa-heart favorited" />
        } else {
            return <i onClick = {() => newFav()} className="fa-regular fa-heart unfavorited" />
        }
    }

    const listStyling = {
        position: 'absolute',
        top: '5px',
        right: '5px'
    }

    return (
        <div className='listing-fav-ctn' style={type === 'list' && listStyling}>
            {favoriteStyle()}
        </div>
    )
}

export default FavoriteButton;