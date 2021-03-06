import './Banner.css';
import { Link } from 'react-router-dom';
import background from '../../../assets/banner-background.jpeg'

const Banner = () => {

    return (
        <div className='banner-container'>
            <img src={background} alt='banner' />
            <div className='banner-txt'>
                <h1>We get it, you're on the go.</h1>
                <h2>Public restrooms? Let's not.</h2>
                <h3>Find a respectable bathroom near you.</h3>
                <Link to='/spots'><button className='home-list-button' >Click here</button></Link>
            </div>
        </div>
    )
}

export default Banner;