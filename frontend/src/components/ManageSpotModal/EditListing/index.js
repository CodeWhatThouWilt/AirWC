import './EditListing.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editSpot } from '../../../store/spots';
import { getSpots } from '../../../store/spots';

const EditListing = ({ spot, setShowModal }) => {
    const dispatch = useDispatch();
    // const spots = useSelector((state) => Object.values(state.spotsState));

    // useEffect(() => {
    //     dispatch(getSpots())
    // }, [dispatch])

    const [name, setName] = useState(spot.name);
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [country, setCountry] = useState(spot.country);
    const [price, setPrice] = useState(spot.price);
    const [state, setState] = useState(spot.state);
    const [selfCheckIn, setSelfCheckIn] = useState(spot.selfCheckIn);
    const [errorTitles, setErrorTitles] = useState({});

    const [shortDescription, setshortDescription] = useState(spot.shortDescription);
    const [shortSelection, setShortSelection] = useState(false);
    let shortError;
    if (shortDescription.length > 35 || shortDescription.length === 0) shortError = { color: 'red' }

    const [longDescription, setLongDescription] = useState(spot.longDescription);
    const [longSelection, setLongSelection] = useState(false);
    let longError;
    if (shortDescription.length > 1500 || longDescription.length === 0) longError = { color: 'red' }


    const submitHandler = async (e) => {
        e.preventDefault();
        setErrorTitles({})

        dispatch(editSpot({
            spotId: spot.id,
            name,
            address,
            city,
            state,
            country,
            price,
            shortDescription,
            longDescription,
            selfCheckIn
        }))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) {
                    let errorsObj = {}
                    data.errors.forEach((error, index) => {
                        errorsObj = { ...errorsObj, [data.params[index]]: error }
                    })
                    setErrorTitles(errorsObj)

                }
            });

        // if (!errorTitles.length) setShowModal(false);
    }



    return (
        <div className='new-list-container' >
            {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
            <form className='new-list-form' onSubmit={submitHandler}>
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
                <button className='new-list-button'>Continue</button>
            </form>
        </div>
    )

}

export default EditListing