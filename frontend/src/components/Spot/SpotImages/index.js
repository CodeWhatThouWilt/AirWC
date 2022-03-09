import './SpotImages.css';

const SpotImages = ({ images }) => {
    
    return (
        <div><img src={images[0].url} /></div>
    )
}

export default SpotImages;