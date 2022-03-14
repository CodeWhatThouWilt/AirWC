import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editImages } from '../../../store/spots';


const EditImageForm = ({ spot, setShowModal }) => {
    const dispatch = useDispatch();

    let startingImages = []
    spot.Images.forEach(image => startingImages = [...startingImages, { image: image.url }])

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
                console.log(data && data.errors ? data.errors : false, errors)
            });
        // if (errors.length === 0) setShowModal(false);
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
            <div style={{ height: '30px' }}>{errors.length ? `${errors[0]}(s)` : ''}</div>
            <form onSubmit={(e) => submitHandler(e)}>
                {imageInputs.map((elem, index) => {
                    return (
                        <div key={index} className='image-submission-container' >
                            <div className='input-and-button-div'>
                                <img src={imageInputs[index].image.match(urlCheck) ? imageInputs[index].image : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'} alt={'user pic'} className='submitted-image' />
                                <div>{!elem.image?.match(urlCheck) && setErrors.length ? errors[index] : ''}</div>
                                <input
                                    name='image'
                                    type='text'
                                    placeholder='Enter image url'
                                    value={elem.image}
                                    onChange={e => imagesInputHandler(e, index)}
                                ></input>

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
                    )
                })}
                <button>Submit</button>
            </form>
        </div>
    )
}

export default EditImageForm;