import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import NewListing from './NewListing';
import './ManageSpotModal.css';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSpots } from '../../store/spots';

const ManageSpotModal = () => {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSpots()).then(res => setShowModal(false));
    }, [dispatch])
    
    return (
        <>
            <button className='create-spot-button' onClick={() => setShowModal(true)}>Create New Listing</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <NewListing setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default ManageSpotModal;
