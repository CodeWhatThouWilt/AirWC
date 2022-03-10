import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CheckEmailForm from './CheckEmailForm';
import './UserModal.css';


const UserModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='login-button' onClick={() => setShowModal(true)}>Log in / Sign up</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CheckEmailForm />
                </Modal>
            )}
        </>
    );
}

export default UserModal;

