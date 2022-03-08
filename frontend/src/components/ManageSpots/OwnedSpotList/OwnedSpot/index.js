import './OwnedSpot.css'
import SpotListing from '../../../Spots/SpotsList/SpotListing'

const OwnedSpot = ({ spot }) => {
    
    return (
        <div className='spot-card'>
            <div className='buttons' >
                <button>Edit</button>
                <button>Delete</button>
            </div>
            <SpotListing details={spot} />
        </div>
    )
}

export default OwnedSpot