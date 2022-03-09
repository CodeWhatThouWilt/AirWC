import './SpotTitle.css'

const SpotTitle = ({ spot }) => {

    return (
        <div>
                <div>{spot.name}</div>
                <div>{spot.city},{spot.state},{spot.country}</div>
        </div>
    )
}

export default SpotTitle;