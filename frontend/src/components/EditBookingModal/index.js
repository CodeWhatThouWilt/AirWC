import './EditBookingModal.css'
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditBookingForm from './EditBookingForm';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSpots } from '../../store/spots';

const EditBookingModal = ({ booking, spot }) => {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSpots()).then(res => setShowModal(false));
    }, [dispatch])

    return (
        <>
            <button className='create-spot-button' onClick={() => setShowModal(true)}>Edit booking</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditBookingForm booking={booking} spot={spot} />
                </Modal>
            )}
        </>
    );
}

export default EditBookingModal;