import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editImages } from '../../../store/spots';


const EditImageForm = ({ spot, setShowModal }) => {
    const dispatch = useDispatch();

    let startingImages = []
    const images = Object.values(spot.Images);
    images.forEach(image => startingImages = [...startingImages, { image: image.url }])

    const [errors, setErrors] = useState([]);
    const [imageInputs, setImageInputs] = useState(startingImages)


    const submitHandler = async (e) => {
        e.preventDefault();
        setErrors([]);

        return dispatch(editImages({
            spotId: spot.id,
            imageInputs
        })).then(() => setShowModal(false))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    useEffect(() => {

    }, [imageInputs])



    const addImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setImageInputs([...imageInputs, { image: '' }]);
    }

    const removeImage = (e, index) => {
        e.preventDefault();
        e.stopPropagation();
        let newState = [...imageInputs]
        newState.splice(index, 1);
        setImageInputs(newState);
    }

    const imagesInputHandler = (e, index) => {
        e.preventDefault();
        const { name } = e.target
        const list = [...imageInputs];
        list[index][name] = e.target.value;
        setImageInputs(list);
    };

    const urlCheck = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/i

    return (
        <div className='image-form-container'>
            <form onSubmit={submitHandler} className='image-form'>
                <div style={{ height: '30px' }}>{errors.length ? `${errors[0]}(s)` : ''}</div>
                {imageInputs.map((elem, index) => {
                    return (
                        <div key={index} className='image-submission-container' >
                            <img src={imageInputs[index].image.match(urlCheck) ? imageInputs[index].image : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'} alt={'user pic'} className='submitted-image' />
                            <div className='input-and-button-div'>
                                <input
                                    name='image'
                                    type='text'
                                    placeholder='Enter image url'
                                    value={elem.image}
                                    onChange={e => imagesInputHandler(e, index)}
                                ></input>
                                <div style={{ display: 'flex' }}>
                                    {imageInputs.length !== 1 &&
                                        <button onClick={(e) => removeImage(e, index)} style={{ padding: '5px 7px', marginLeft: '10px', backgroundColor: 'red', border: 'none', borderRadius: '500px' }}>
                                            <i className="fa-solid fa-minus" style={{ color: 'white' }}></i>
                                        </button>}
                                    {imageInputs.length - 1 === index &&
                                        <button onClick={(e) => addImage(e, index)} style={{ padding: '5px 7px', marginLeft: '10px', backgroundColor: '#4F72C4', border: 'none', borderRadius: '500px' }}>
                                            <i className="fa-solid fa-plus" style={{ color: 'white' }} />
                                        </button>}
                                </div>
                            </div>
                        </div>
                    )
                })}
                <button className='login-button'>Submit</button>
            </form>
        </div>
    )
}

export default EditImageForm;