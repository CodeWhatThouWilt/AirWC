import './ManageSpotModal.css';
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import NewListing from './NewListing';


const ManageSpotModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='create-spot-button' onClick={() => setShowModal(true)}>Create New Listing</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <NewListing />
                </Modal>
            )}
        </>
    );
}

export default ManageSpotModal;