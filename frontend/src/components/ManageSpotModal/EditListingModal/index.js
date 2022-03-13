import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditListing from '../EditListing';
import './EditListingModal.css';


const EditListingModal = ({ spot }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='create-spot-button' onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditListing spot={spot} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default EditListingModal;