import './NewListing.css';
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addSingleSpot } from '../../../store/spots';
import { useHistory } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fontawesome/react-fontawesome'

const NewListing = ({ setShowModal }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState('');
    const [state, setState] = useState('');
    const [selfCheckIn, setSelfCheckIn] = useState(false);
    const [errors, setErrors] = useState([]);

    const [form, setForm] = useState('content')
    const [imageInputs, setImageInputs] = useState([''])

    const [shortDescription, setshortDescription] = useState('');
    const [shortSelection, setShortSelection] = useState(false);
    let shortError;
    if (shortDescription.length > 35) shortError = { color: 'red' }

    const [longDescription, setLongDescription] = useState('');
    const [longSelection, setLongSelection] = useState(false);
    let longError;
    if (shortDescription.length > 1500) longError = { color: 'red' }

    const secondSubmit = async (e) => {

        setErrors([]);

        e.preventDefault();
        dispatch(addSingleSpot({
            name,
            address,
            city,
            state,
            country,
            price,
            shortDescription,
            longDescription,
            selfCheckIn,
            imageInputs
        }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });

        if (!setErrors.length) setShowModal(false);
    }


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (password === confirmPassword) {
    //         setErrors([]);
    //         return dispatch(sessionActions.signup({ email, firstName, lastName, password }))
    //             .catch(async (res) => {
    //                 const data = await res.json();
    //                 if (data && data.errors) setErrors(data.errors);
    //             });
    //     }
    //     return setErrors(['Confirm Password field must be the same as the Password field']);
    // };

    const firstSubmit = (e) => {
        e.preventDefault();
        setForm('images')
    }

    const addImage = (e) => {
        e.preventDefault();
        setImageInputs([...imageInputs, { image: '' }]);
    }

    const imagesInputHandler = (e, index) => {
        e.preventDefault();
        e.stopPropagation();
        const { value } = e.target;
        const list = [...imageInputs];
        list[index] = value;
        setImageInputs(list);
    };


    if (form === 'content') return (
        <div className='new-list-container' >
            <form className='new-list-form' onSubmit={firstSubmit}>
                <label>
                    Listing Name:
                    <input
                        type='text'
                        required
                        placeholder='Listing name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        autoFocus
                    />
                </label>
                <label>
                    Address:
                    <input
                        type='text'
                        required
                        placeholder='Address'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </label>
                <label>
                    City:
                    <input
                        type='text'
                        required
                        placeholder='City'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                </label>
                <label>
                    State:
                    <input
                        type='text'
                        required
                        placeholder='State'
                        value={state}
                        onChange={e => setState(e.target.value)}
                    />
                </label>
                <label>
                    Country:
                    <input
                        type='text'
                        required
                        placeholder='Country'
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    />
                </label>
                <label>
                    Price per 5 minutes:
                    <input
                        type='number'
                        required
                        placeholder='0'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </label>
                <label>
                    <div className='description-div'>Short description: {shortSelection && <span style={shortError}>{`${shortDescription.length} / 35`}</span>}</div>
                    <input
                        type='text'
                        required
                        placeholder='Short description (35 char max)'
                        value={shortDescription}
                        onChange={e => setshortDescription(e.target.value)}
                        onFocus={() => setShortSelection(true)}
                        onBlur={() => shortDescription.length <= 35 ? setShortSelection(false) : setShortSelection(true)}
                    />
                </label>
                <label>
                    <div className='description-div'>Long description: {longSelection && <span style={longError} >{`${longDescription.length} / 1500`}</span>}</div>
                    <textarea
                        required
                        placeholder='Long description (1500 char max)'
                        value={longDescription}
                        onChange={e => setLongDescription(e.target.value)}
                        onFocus={() => setLongSelection(true)}
                        onBlur={() => longDescription.length < 1500 ? setLongSelection(false) : setLongSelection(true)}
                    />
                </label>
                <label>
                    Allow self check in:
                    <select required value={selfCheckIn} onChange={e => setSelfCheckIn(e.target.value)}>
                        <option value='true' >True</option>
                        <option value='false' >False</option>
                    </select>
                </label>
                <button className='new-list-button'>Submit</button>
            </form>
        </div>
    )

    console.log(imageInputs)
    if (form === 'images') return (
        <div>
            <button onClick={addImage}>Add More Images</button>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <form onSubmit={secondSubmit}>
            {imageInputs.map((x, index) => (
                <div key={index} className='image-submission-container' >
                    <div className='input-and-button-div'>
                    <img src={imageInputs[index]} alt={`pic ${index}`} className='submitted-image' />
                    <input
                    type='text'
                    value={x.image}
                    onChange={e => imagesInputHandler(e, index)}
                    ></input>
                    <button>
                            {/* <FontAwesomeIcon icon="fa-solid fa-circle-minus" /> */}
                    </button>
                    </div>
                </div>
            ))}
            <button>Submit</button>
            </form>
        </div>
    )
}

export default NewListing;