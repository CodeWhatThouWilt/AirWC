import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditImageForm from '../EditImagesForm';
import './EditImagesModal.css';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSpots } from '../../../store/spots';

const EditImagesModal = ({ spot }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='create-spot-button' onClick={() => setShowModal(true)}>Edit Images</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditImageForm spot={spot} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default EditImagesModal;