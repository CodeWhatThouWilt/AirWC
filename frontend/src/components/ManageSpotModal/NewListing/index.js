import './NewListing.css';
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addSingleSpot, verifySpotContent } from '../../../store/spots';
import { useHistory } from 'react-router-dom';
import { csrfFetch } from '../../../store/csrf';
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
    const [errorTitles, setErrorTitles] = useState({});

    const [form, setForm] = useState('content')
    const [imageInputs, setImageInputs] = useState([''])

    const [shortDescription, setshortDescription] = useState('');
    const [shortSelection, setShortSelection] = useState(false);
    let shortError;
    if (shortDescription.length > 35 || shortDescription.length === 0) shortError = { color: 'red' }

    const [longDescription, setLongDescription] = useState('');
    const [longSelection, setLongSelection] = useState(false);
    let longError;
    if (shortDescription.length > 1500 || longDescription.length === 0) longError = { color: 'red' }

    const secondSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        await dispatch(addSingleSpot({
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
            .catch(async res => {
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

    const firstSubmit = async (e) => {
        e.preventDefault();
        setErrorTitles({})



        const formContent = {
            name,
            address,
            city,
            state,
            country,
            price,
            shortDescription,
            longDescription,
            selfCheckIn,
        }

        await csrfFetch('api/spots/validate-forms', {
            method: 'POST',
            body: JSON.stringify(formContent)
        }).then(res => res.json())
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) {
                    let errorsObj = {}
                    data.errors.forEach((error, index) => {
                        errorsObj = {...errorsObj, [data.params[index]]: error }
                    })
                    setErrorTitles(errorsObj)
                    
                }
            });
        if (!Object.values(errorTitles).length) setForm('images');
    }

    const addImage = (e) => {
        e.preventDefault();
        setImageInputs([...imageInputs, { image: '' }]);
    }

    const imagesInputHandler = (e, index) => {
        e.preventDefault();
        const list = [...imageInputs];
        list[index] = e.target.value;
        setImageInputs(list);
    };

    console.log(errorTitles)
    if (form === 'content') return (
        <div className='new-list-container' >
            {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
            <form className='new-list-form' onSubmit={firstSubmit}>
                <label>
                    <div className='label-row'>Listing Name:  <div className='error-display' >{errorTitles.name}</div></div>
                    <input
                        type='text'
                        // required
                        placeholder='Listing name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        autoFocus
                    />
                </label>
                <label>
                    <div className='label-row'>Address:  <div className='error-display' >{errorTitles.address}</div></div>
                    <input
                        type='text'
                        // required
                        placeholder='Address'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </label>
                <label>
                    <div className='label-row'>City:  <div className='error-display' >{errorTitles.city}</div></div>
                    <input
                        type='text'
                        // required
                        placeholder='City'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                </label>
                <label>
                    <div className='label-row'>State:  <div className='error-display' >{errorTitles.state}</div></div>
                    <input
                        type='text'
                        // required
                        placeholder='State'
                        value={state}
                        onChange={e => setState(e.target.value)}
                    />
                </label>
                <label>
                    <div className='label-row'>Country:  <div className='error-display' >{errorTitles.country}</div></div>
                    <input
                        type='text'
                        // required
                        placeholder='Country'
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    />
                </label>
                <label>
                    <div className='label-row'>Price per 5 minutes: <div className='error-display'>{errorTitles.price}</div></div>
                    <input
                        type='number'
                        max={500}
                        // required
                        placeholder='0'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </label>
                <label>
                    <div className='description-div'>Short description: {shortSelection && <span style={shortError}>{`${shortDescription.length} / 35`}</span>}</div>
                    <input
                        type='text'
                        // required
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
                        // required
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


    if (form === 'images') return (
        <div>
            <i className="fa-solid fa-chevron-left back-button-modal" onClick={() => setForm('content')} style={{ position: 'absolute', top: '30px', left: '30px', fontSize: '30px' }}></i>
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