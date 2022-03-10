import './NewListing.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSingleSpot } from '../../../store/spots';
import { useHistory } from 'react-router-dom';

const NewListing = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState('');
    const [state, setState] = useState('');
    const [selfCheckIn, setSelfCheckIn] = useState(false);
    // const [images, setImages] = useState([])
    // const [form, setForm] = useState('content')
    
    const [shortDescription, setshortDescription] = useState('');
    const [shortSelection, setShortSelection] = useState(false);
    let shortError;
    if (shortDescription.length > 35) shortError = { color: 'red' }

    const [longDescription, setLongDescription] = useState('');
    const [longSelection, setLongSelection] = useState(false);
    let longError;
    if (shortDescription.length > 1500) longError = { color: 'red' }

    const submitHandler = async (e) => {
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
            selfCheckIn
        }));
        return history.push('/manage-spots')
    }

    return (
        // {form === 'content'}
        <div className='new-list-container' >
            <form className='new-list-form' onSubmit={submitHandler}>
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
                <button className='new-list-button' >Submit</button>
            </form>
        </div>
    )
}

export default NewListing;