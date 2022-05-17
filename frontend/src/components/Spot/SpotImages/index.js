import './SpotImages.css';

const SpotImages = ({ images }) => {
    const imagesArr = Object.values(images);

    // if (images.length === 1) {
    //     return <div><img src={images[0].url} alt='pic 1' /></div>
    // }

    return (
        <div className='spot-image-section'>
            {imagesArr.length < 5 && (<div className='spot-image-container one-item'><img className='spot-solo-image' src={imagesArr[0].url} alt='pic 1' /></div>)}
            {/* {images.length > 1 && images.length < 5 && (
                <div className='spot-image-container two-items'>
                    <img src={images[0].url} alt='pic 1' />
                    <img src={images[1].url} alt='pic 2' />
                </div>
            )} */}
            {imagesArr.length >= 5 && (
                <div className='spot-image-container five-items'>
                    <img src={imagesArr[0].url} alt='pic 1' className='main-image'/>
                    <div className='sm-img-ctn'>
                        <img src={imagesArr[1].url} alt='pic 2' />
                        <img src={imagesArr[2].url} alt='pic 3' />
                        <img src={imagesArr[3].url} alt='pic 4' />
                        <img src={imagesArr[4].url} alt='pic 5' />
                    </div>
                </div>
            )}
        </div>
    )

}

export default SpotImages;