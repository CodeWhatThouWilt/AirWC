import './SpotImages.css';

const SpotImages = ({ images }) => {


    if (images.length === 1) {
        return <div><img src={images[0].url} alt='pic 1' /></div>
    }

    return (
        <div>
            {images.length === 1 && (<div><img src={images[0].url} alt='pic 1' /></div>)}
            {images.length > 1 && images.length < 5 && (
                <div>
                    <img src={images[0].url} alt='pic 1' />
                    <img src={images[0].url} alt='pic 2' />
                </div>
            )}
            {images.length >= 5 && (
                <div>
                    <img src={images[0].url} alt='pic 1' />
                    <img src={images[1].url} alt='pic 2' />
                    <img src={images[2].url} alt='pic 3' />
                    <img src={images[3].url} alt='pic 4' />
                    <img src={images[4].url} alt='pic 5' />
                </div>
            )}
        </div>
    )

}

export default SpotImages;