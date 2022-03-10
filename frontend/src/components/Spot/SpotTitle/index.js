import './SpotTitle.css'

const SpotTitle = ({ spot }) => {

    return (
        <div className='spot-title-area'>
                <div className='spot-name'>{spot.name}</div>
                <div className='spot-location'>{spot.city}, {spot.state}, {spot.country}</div>
        </div>
    )
}

export default SpotTitle;