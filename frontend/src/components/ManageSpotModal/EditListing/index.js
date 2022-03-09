import './EditListing.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editSpot } from '../../../store/spots';

const EditListing = ({ spot }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState('');
    const [state, setState] = useState('');
    console.log('SPOT', spot)
    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(editSpot({
            name,
            address,
            city,
            state,
            country,
            price
        }));
        history.push('/manage-spots')
    }


    return (
        <form onSubmit={submitHandler}>
            <label>
                Listing Name:
                <input
                    type='text'
                    required
                    placeholder='Listing name'
                    value={name}
                    onChange={e => setName(e.target.value)}
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
            <button>Submit</button>
        </form>
    )

}

export default EditListing