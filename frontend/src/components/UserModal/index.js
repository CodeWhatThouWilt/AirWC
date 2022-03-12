import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CheckEmailForm from './CheckEmailForm';
import './UserModal.css';


const UserModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='login-button' onClick={() => setShowModal(true)}>
                <div className='user-dropdown-icons'>
                    <i className="fa-solid fa-restroom"></i>
                    <i class="fa-solid fa-poop"></i>
                </div>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CheckEmailForm />
                </Modal>
            )}
        </>
    );
}

export default UserModal;

